import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Note: In a real implementation, you'd look up the user's manual URL from a database
    // For now, we'll send them to support since we don't have a user database
    
    const { data, error } = await resend.emails.send({
      from: 'DEFRAG <noreply@defrag.app>',
      to: [email],
      subject: 'DEFRAG // MANUAL RECOVERY',
      html: generateRecoveryEmail(email),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Always return success to prevent email enumeration
    res.status(200).json({ 
      success: true, 
      message: 'If a manual exists for this email, recovery instructions have been sent.'
    });

  } catch (error: any) {
    console.error('Recovery error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

function generateRecoveryEmail(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Courier New', monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <tr>
            <td style="padding: 20px 0; border-bottom: 1px solid #333;">
              <span style="color: #ea580c; font-size: 24px; font-weight: bold; letter-spacing: 4px;">DEFRAG</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 0;">
              <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
                // MANUAL RECOVERY REQUEST
              </h1>
              
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;">
                You've requested to recover access to your relationship operating manual.
              </p>
              
              <div style="background-color: #111; border: 1px solid #333; padding: 20px; margin: 25px 0;">
                <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">RECOVERY OPTIONS</span>
                
                <p style="color: #a1a1aa; font-size: 13px; line-height: 1.8; margin: 15px 0;">
                  <strong style="color: #fff;">1. CHECK YOUR EMAIL</strong><br>
                  Search for "DEFRAG" in your inbox. Your original purchase confirmation 
                  contains the link to access your manual.
                </p>
                
                <p style="color: #a1a1aa; font-size: 13px; line-height: 1.8; margin: 15px 0;">
                  <strong style="color: #fff;">2. CHECK SPAM/PROMOTIONS</strong><br>
                  Sometimes emails get filtered. Check your spam folder or promotions tab.
                </p>
                
                <p style="color: #a1a1aa; font-size: 13px; line-height: 1.8; margin: 15px 0;">
                  <strong style="color: #fff;">3. CONTACT SUPPORT</strong><br>
                  Still can't find it? Reply to this email with:
                </p>
                <ul style="color: #a1a1aa; font-size: 13px; line-height: 1.8; margin: 10px 0 0 20px;">
                  <li>Your approximate purchase date</li>
                  <li>Names of both units in your manual</li>
                  <li>Payment method used (last 4 digits if card)</li>
                </ul>
              </div>
              
              <table cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td style="background-color: #ea580c; padding: 15px 30px;">
                    <a href="mailto:chadowen93@gmail.com?subject=Manual%20Recovery%20Request&body=Email:%20${encodeURIComponent(email)}%0A%0APurchase%20date:%20%0AUnit%20names:%20%0APayment%20last%204:%20" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 2px; font-weight: bold;">
                      CONTACT SUPPORT →
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #52525b; font-size: 12px; margin-top: 30px; line-height: 1.6;">
                Didn't request this? You can safely ignore this email.
              </p>
            </td>
          </tr>
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
