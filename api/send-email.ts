import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from './_utils/email';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, type, unitA, unitB, manualUrl, supportRequest, resendRequest } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Missing email type' });
    }

    const data = await sendEmail({
      type,
      to,
      unitA,
      unitB,
      manualUrl,
      supportRequest,
      resendRequest
    });

    res.status(200).json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('Send email error:', error);
    res.status(500).json({ error: error.message });
  }
}
