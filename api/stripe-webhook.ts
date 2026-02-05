import type { VercelRequest, VercelResponse } from '@vercel/node';
import { waitUntil } from '@vercel/functions';
import Stripe from 'stripe';
import { db } from '../src/lib/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { sendEmail } from './_utils/email';

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
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'stripe-signature');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
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
                const eventSession = event.data.object as Stripe.Checkout.Session;
                console.log('💰 Payment successful:', eventSession.id);

                // Extract customer info
                const customerEmail = eventSession.customer_email || eventSession.customer_details?.email;
                const sessionId = eventSession.id;
                const customerId = eventSession.customer as string;
                const paymentIntentId = eventSession.payment_intent as string;

                if (!customerEmail) {
                    console.error('❌ No customer email found in session');
                    break;
                }

                console.log('📧 Customer email:', customerEmail);
                console.log('🎫 Session ID:', sessionId);

                // Retrieve full session to ensure we have metadata
                let unitA, unitB;
                try {
                    const session = await stripe.checkout.sessions.retrieve(sessionId);
                    unitA = session.metadata?.unitA ? JSON.parse(session.metadata.unitA) : undefined;
                    unitB = session.metadata?.unitB ? JSON.parse(session.metadata.unitB) : undefined;
                } catch (err) {
                    console.error('⚠️ Failed to retrieve full session or parse metadata:', err);
                }

                const manualUrl = `https://defrag.app/manual?session_id=${sessionId}`;

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

                    // Send confirmation email (Non-blocking)
                    waitUntil(
                        sendEmail({
                            type: 'purchase_confirmation',
                            to: customerEmail,
                            unitA,
                            unitB,
                            manualUrl,
                        })
                        .then(() => console.log('📧 Confirmation email queued for:', customerEmail))
                        .catch((emailErr) => console.error('❌ Failed to send confirmation email:', emailErr))
                    );

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
