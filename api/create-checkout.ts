import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, unitA, unitB } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'DEFRAG Relationship Manual',
              description: `Personalized manual for ${unitA?.name || 'Unit A'} & ${unitB?.name || 'Unit B'}`,
              images: ['https://defrag.app/og-image.png'],
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/manual?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout?cancelled=true`,
      customer_email: email || undefined,
      metadata: {
        unitA: JSON.stringify(unitA),
        unitB: JSON.stringify(unitB),
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
