import { buffer } from 'micro';
import { stripe, generateApiKey, hashKey } from '../lib/stripe';
import { db } from '../../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Resend } from 'resend';

export const config = {
    api: {
        bodyParser: false,
    },
};

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/webhooks/stripe
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        const rawBody = await buffer(req);
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret || '');
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    // We handle checkout.session.completed (best for new signups)
    // And customer.subscription.created (if created via API directly)
    if (event.type === 'checkout.session.completed') {
        await handleCheckoutCompleted(event.data.object);
    } else if (event.type === 'customer.subscription.created') {
        // Optional: Add logic if subscriptions are created outside checkout sessions
        // For now, checkout session is the primary driver
    }

    res.status(200).json({ received: true });
}

async function handleCheckoutCompleted(session: any) {
    // Check if this was an API subscription
    // Metadata passed from Checkout should include 'product_type': 'api'
    // or infer from Product ID or just assume all checkouts are valid for MVP

    // User ID is critical
    const userId = session.client_reference_id || session.metadata?.user_id;

    if (userId) {
        try {
            // Determine Tier
            // Logic: Check session.amount_total or line_items
            // MVP: If standard price, it's Pro. If free, it's Free.
            const tier = session.amount_total > 0 ? 'pro' : 'free';

            // Generate Key
            const apiKey = generateApiKey();
            const keyHash = hashKey(apiKey);
            const customerEmail = session.customer_details?.email || session.customer_email;

            // Store Key
            await addDoc(collection(db, 'api_keys'), {
                key_hash: keyHash,
                user_id: userId,
                tier: tier,
                is_active: true,
                created_at: serverTimestamp(),
                stripe_subscription_id: session.subscription,
                stripe_customer_id: session.customer,
                usage_count: 0,
                rate_limit_monthly: tier === 'pro' ? 50000 : 1000,
                endpoints: tier === 'pro' ? ['seda', 'telemetry', 'orbit'] : ['telemetry'],
                email_sent_to: customerEmail
            });

            console.log(`[Provisioning] API Key generated for User ${userId}`);

            // Send Email
            if (customerEmail) {
                await resend.emails.send({
                    from: 'api@defrag.app',
                    to: customerEmail,
                    subject: 'Your DEFRAG API Key',
                    html: `
                        <h1>Welcome to DEFRAG API</h1>
                        <p>Your access is ready. Here is your API Key:</p>
                        <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${apiKey}</pre>
                        <p><strong>Keep this safe.</strong> It will not be shown again.</p>
                        <p>Documentation: <a href="https://defrag.app/platform">defrag.app/platform</a></p>
                    `
                });
                console.log(`[Provisioning] Email sent to ${customerEmail}`);
            }

        } catch (error) {
            console.error('Provisioning failed:', error);
            // We don't throw here to avoid failing the webhook response to Stripe (which would cause retries)
            // Ideally we log this to a alerting system
        }
    }
}
