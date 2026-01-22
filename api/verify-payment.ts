import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Return the stored unit data from metadata
      const unitA = session.metadata?.unitA ? JSON.parse(session.metadata.unitA) : null;
      const unitB = session.metadata?.unitB ? JSON.parse(session.metadata.unitB) : null;

      res.status(200).json({
        success: true,
        paid: true,
        unitA,
        unitB,
        customerEmail: session.customer_email,
      });
    } else {
      res.status(200).json({
        success: true,
        paid: false,
        status: session.payment_status,
      });
    }
  } catch (error: any) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: error.message });
  }
}
