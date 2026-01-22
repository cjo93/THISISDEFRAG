import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
      const customerEmail = session.customer_email;

      // Send confirmation email (non-blocking)
      if (customerEmail && process.env.RESEND_API_KEY) {
        const manualUrl = `https://defrag.app/manual?session_id=${sessionId}`;
        sendConfirmationEmail(customerEmail, unitA, unitB, manualUrl).catch(err => {
          console.error('Failed to send confirmation email:', err);
        });
      }

      res.status(200).json({
        success: true,
        paid: true,
        unitA,
        unitB,
        customerEmail,
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

async function sendConfirmationEmail(to: string, unitA: any, unitB: any, manualUrl: string) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header with glow effect -->
          <tr>
            <td style="padding: 30px 0; text-align: center; border-bottom: 1px solid #222;">
              <div style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #ea580c;">
                DEFRAG
              </div>
              <div style="font-size: 10px; letter-spacing: 3px; color: #444; margin-top: 8px;">
                USER MANUALS FOR YOUR PEOPLE
              </div>
            </td>
          </tr>
          
          <!-- Status Badge -->
          <tr>
            <td style="padding: 30px 0 10px 0; text-align: center;">
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #14532d; padding: 8px 16px; border-radius: 4px;">
                    <span style="color: #4ade80; font-size: 11px; letter-spacing: 2px; font-weight: bold;">● COMPILATION COMPLETE</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Message -->
          <tr>
            <td style="padding: 20px 30px 30px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 15px 0; letter-spacing: 1px; font-weight: 400;">
                Your manual is ready
              </h1>
              <p style="color: #71717a; font-size: 14px; line-height: 1.7; margin: 0;">
                The relationship operating manual has been generated<br>
                and is ready for immediate deployment.
              </p>
            </td>
          </tr>
          
          <!-- Unit Cards -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background: linear-gradient(135deg, #18181b 0%, #0a0a0a 100%); border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 8px; font-weight: bold;">UNIT_A</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${unitA?.name?.toUpperCase() || 'UNKNOWN'}</div>
                    <div style="color: #52525b; font-size: 11px;">${unitA?.birthDate || '—'}</div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background: linear-gradient(135deg, #18181b 0%, #0a0a0a 100%); border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 8px; font-weight: bold;">UNIT_B</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${unitB?.name?.toUpperCase() || 'UNKNOWN'}</div>
                    <div style="color: #52525b; font-size: 11px;">${unitB?.birthDate || '—'}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 40px 20px; text-align: center;">
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #ea580c; padding: 18px 50px; border-radius: 0;">
                    <a href="${manualUrl}" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 3px; font-weight: bold; display: block;">
                      ACCESS MANUAL →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #3f3f46; font-size: 11px; margin-top: 20px; letter-spacing: 1px;">
                BOOKMARK THIS LINK FOR FUTURE REFERENCE
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="border-top: 1px solid #222;"></div>
            </td>
          </tr>
          
          <!-- Manual Preview -->
          <tr>
            <td style="padding: 30px;">
              <div style="color: #52525b; font-size: 10px; letter-spacing: 2px; margin-bottom: 15px;">MANUAL CONTENTS</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #71717a; font-size: 12px; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #ea580c; margin-right: 10px;">01</span> SYSTEM SPECIFICATIONS
                  </td>
                </tr>
                <tr>
                  <td style="color: #71717a; font-size: 12px; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #ea580c; margin-right: 10px;">02</span> OPERATING PROCEDURES
                  </td>
                </tr>
                <tr>
                  <td style="color: #71717a; font-size: 12px; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #ea580c; margin-right: 10px;">03</span> TROUBLESHOOTING GUIDE
                  </td>
                </tr>
                <tr>
                  <td style="color: #71717a; font-size: 12px; padding: 8px 0;">
                    <span style="color: #ea580c; margin-right: 10px;">04</span> MAINTENANCE SCHEDULE
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; border-top: 1px solid #222; text-align: center;">
              <div style="color: #3f3f46; font-size: 10px; letter-spacing: 2px; margin-bottom: 10px;">
                DEFRAG // ${new Date().getFullYear()}
              </div>
              <a href="https://defrag.app" style="color: #52525b; font-size: 11px; text-decoration: none;">defrag.app</a>
              <div style="color: #27272a; font-size: 9px; margin-top: 15px;">
                Questions? Reply to this email or contact info@defrag.app
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  await resend.emails.send({
    from: 'DEFRAG <noreply@defrag.app>',
    to: [to],
    subject: 'DEFRAG // YOUR MANUAL IS READY',
    html,
  });
}
