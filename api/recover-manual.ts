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
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #141414; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #ea580c; font-size: 28px; font-weight: 700; letter-spacing: 3px;">DEFRAG</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
                Recover Your Manual
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
                You requested to recover access to your relationship operating manual. Here's how to find it:
              </p>
              
              <!-- Step 1 -->
              <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">1. Check Your Inbox</p>
                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6; margin: 0;">
                  Search for "DEFRAG" in your email. Your original confirmation contains the access link.
                </p>
              </div>
              
              <!-- Step 2 -->
              <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">2. Check Spam/Promotions</p>
                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6; margin: 0;">
                  Sometimes emails get filtered. Check your spam folder or promotions tab.
                </p>
              </div>
              
              <!-- Step 3 -->
              <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">3. Contact Support</p>
                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6; margin: 0;">
                  Still can't find it? Reach out with your purchase date and the names entered.
                </p>
              </div>
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:info@defrag.app?subject=Manual%20Recovery%20Request&body=Email:%20${encodeURIComponent(email)}%0A%0APurchase%20date:%20%0ANames%20entered:%20" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 16px 32px; border-radius: 8px;">
                      Contact Support
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.6; text-align: center;">
                Didn't request this? You can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.08); background-color: rgba(0,0,0,0.2);">
              <p style="color: #52525b; font-size: 13px; margin: 0; text-align: center;">
                DEFRAG · User Manuals for Your People<br>
                <a href="https://defrag.app" style="color: #71717a; text-decoration: none;">defrag.app</a>
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
