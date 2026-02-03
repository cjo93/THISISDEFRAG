import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { db } from '../src/lib/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to read raw body
async function buffer(readable: any) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'stripe-signature');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Get the raw body
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];

        if (!sig) {
            console.error('❌ Missing Stripe signature');
            return res.status(400).json({ error: 'Missing stripe-signature header' });
        }

        if (!webhookSecret) {
            console.error('❌ Missing STRIPE_WEBHOOK_SECRET environment variable');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }

        // Verify the webhook signature
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log('✅ Webhook signature verified:', event.type);
        } catch (err: any) {
            console.error('❌ Webhook signature verification failed:', err.message);
            return res.status(400).json({ error: `Webhook Error: ${err.message}` });
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log('💰 Payment successful:', session.id);

                // Extract customer info
                const customerEmail = session.customer_email || session.customer_details?.email;
                const sessionId = session.id;
                const customerId = session.customer as string;
                const paymentIntentId = session.payment_intent as string;

                if (!customerEmail) {
                    console.error('❌ No customer email found in session');
                    break;
                }

                console.log('📧 Customer email:', customerEmail);
                console.log('🎫 Session ID:', sessionId);

                // Update user's payment status in Firestore
                try {
                    // Find user by email
                    const usersRef = doc(db, 'users', customerEmail);

                    await setDoc(usersRef, {
                        email: customerEmail,
                        paymentVerified: true,
                        stripeCustomerId: customerId,
                        stripeSessionId: sessionId,
                        paymentIntentId: paymentIntentId,
                        paidAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }, { merge: true });

                    console.log('✅ Updated payment status for:', customerEmail);

                    // Send confirmation email
                    try {
                        await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/send-email`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                type: 'purchase_confirmation',
                                to: customerEmail,
                                sessionId: sessionId,
                            }),
                        });
                        console.log('📧 Confirmation email sent to:', customerEmail);
                    } catch (emailErr) {
                        console.error('❌ Failed to send confirmation email:', emailErr);
                        // Don't fail the webhook if email fails
                    }

                } catch (firestoreErr) {
                    console.error('❌ Failed to update Firestore:', firestoreErr);
                    // Return 500 so Stripe retries
                    return res.status(500).json({ error: 'Failed to update database' });
                }

                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log('💳 PaymentIntent succeeded:', paymentIntent.id);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.error('❌ PaymentIntent failed:', paymentIntent.id);
                console.error('Error:', paymentIntent.last_payment_error?.message);
                break;
            }

            default:
                console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }

        // Return 200 to acknowledge receipt
        return res.status(200).json({ received: true });

    } catch (err: any) {
        console.error('❌ Webhook handler error:', err);
        return res.status(500).json({ error: err.message });
    }
}
