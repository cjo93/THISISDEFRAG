import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface UnitData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, type, unitA, unitB, manualUrl } = req.body;

    if (!to || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let subject: string;
    let html: string;

    switch (type) {
      case 'purchase_confirmation':
        subject = 'DEFRAG // YOUR MANUAL IS READY';
        html = generatePurchaseEmail(unitA, unitB, manualUrl);
        break;
      
      case 'manual_delivery':
        subject = 'DEFRAG // MANUAL GENERATED';
        html = generateManualDeliveryEmail(unitA, unitB, manualUrl);
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }

    const { data, error } = await resend.emails.send({
      from: 'DEFRAG <noreply@defrag.app>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('Send email error:', error);
    res.status(500).json({ error: error.message });
  }
}

function generatePurchaseEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DEFRAG Manual Ready</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Courier New', monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="padding: 20px 0; border-bottom: 1px solid #333;">
              <span style="color: #ea580c; font-size: 24px; font-weight: bold; letter-spacing: 4px;">DEFRAG</span>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 0;">
              <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
                // MANUAL COMPILATION COMPLETE
              </h1>
              
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0;">
                Your relationship operating manual has been generated and is ready for review.
              </p>
              
              <!-- Unit Cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #111; border: 1px solid #333;">
                    <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">UNIT_A</span>
                    <p style="color: #fff; font-size: 16px; margin: 5px 0 0 0;">${unitA?.name || 'Unknown'}</p>
                  </td>
                  <td width="20"></td>
                  <td style="padding: 15px; background-color: #111; border: 1px solid #333;">
                    <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">UNIT_B</span>
                    <p style="color: #fff; font-size: 16px; margin: 5px 0 0 0;">${unitB?.name || 'Unknown'}</p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #ea580c; padding: 15px 30px;">
                    <a href="${manualUrl}" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 2px; font-weight: bold;">
                      ACCESS MANUAL →
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #52525b; font-size: 12px; margin-top: 30px;">
                This link will remain active. Bookmark it for future reference.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 0; border-top: 1px solid #333;">
              <p style="color: #52525b; font-size: 10px; margin: 0; letter-spacing: 1px;">
                DEFRAG // USER MANUALS FOR YOUR PEOPLE<br>
                <a href="https://defrag.app" style="color: #52525b;">defrag.app</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generateManualDeliveryEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return generatePurchaseEmail(unitA, unitB, manualUrl); // Same template for now
}
