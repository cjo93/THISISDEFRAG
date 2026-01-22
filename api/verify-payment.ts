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
  const unitAName = unitA?.name?.toUpperCase() || 'UNIT_A';
  const unitBName = unitB?.name?.toUpperCase() || 'UNIT_B';
  
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
          
          <!-- Header -->
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
                The relationship operating manual for <span style="color: #ea580c;">${unitAName}</span> × <span style="color: #ea580c;">${unitBName}</span><br>
                has been compiled and is ready for deployment.
              </p>
            </td>
          </tr>
          
          <!-- Unit Cards -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 8px; font-weight: bold;">UNIT_A // OPERATOR</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${unitAName}</div>
                    <div style="color: #52525b; font-size: 11px;">${unitA?.birthDate || '—'}</div>
                    <div style="color: #3f3f46; font-size: 10px; margin-top: 8px;">${unitA?.sun_sign || ''} ${unitA?.mars_sign ? '/ ' + unitA.mars_sign : ''}</div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 8px; font-weight: bold;">UNIT_B // SUBJECT</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${unitBName}</div>
                    <div style="color: #52525b; font-size: 11px;">${unitB?.birthDate || '—'}</div>
                    <div style="color: #3f3f46; font-size: 10px; margin-top: 8px;">${unitB?.sun_sign || ''} ${unitB?.mars_sign ? '/ ' + unitB.mars_sign : ''}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Manual Preview Section -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #0a0a0a; border: 1px solid #27272a;">
                <!-- Preview Header -->
                <tr>
                  <td style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; font-weight: bold;">MANUAL PREVIEW</div>
                  </td>
                </tr>
                
                <!-- Section 01 -->
                <tr>
                  <td style="padding: 20px;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 2px; margin-bottom: 10px;">01 // SYSTEM SPECIFICATIONS</div>
                    <div style="color: #a1a1aa; font-size: 13px; line-height: 1.6;">
                      Your manual contains a detailed analysis of how ${unitAName} and ${unitBName}'s behavioral patterns interact. Core processing differences, energy signatures, and communication protocols have been mapped.
                    </div>
                  </td>
                </tr>
                
                <!-- Section 02 -->
                <tr>
                  <td style="padding: 0 20px 20px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 2px; margin: 20px 0 10px 0;">02 // OPERATING PROCEDURES</div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #111;">
                          <div style="color: #fff; font-size: 12px; font-weight: 600;">→ Engagement Protocol</div>
                          <div style="color: #71717a; font-size: 11px; margin-top: 4px;">Specific approaches for initiating meaningful exchanges</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #111;">
                          <div style="color: #fff; font-size: 12px; font-weight: 600;">→ Response Timing</div>
                          <div style="color: #71717a; font-size: 11px; margin-top: 4px;">Optimal intervals for input and feedback cycles</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <div style="color: #fff; font-size: 12px; font-weight: 600;">→ Support Modes</div>
                          <div style="color: #71717a; font-size: 11px; margin-top: 4px;">How to provide effective assistance during system stress</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Section 03 -->
                <tr>
                  <td style="padding: 0 20px 20px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 2px; margin: 20px 0 10px 0;">03 // TROUBLESHOOTING</div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 12px; background: #111; margin-bottom: 8px; display: block;">
                          <div style="color: #fbbf24; font-size: 11px;">⚠ SYMPTOM:</div>
                          <div style="color: #a1a1aa; font-size: 11px; margin-top: 2px;">Unexpected silence or withdrawal</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 12px; background: #0f1f0f;">
                          <div style="color: #4ade80; font-size: 11px;">✓ RESOLUTION:</div>
                          <div style="color: #a1a1aa; font-size: 11px; margin-top: 2px;">Identified cause and specific re-engagement protocol</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Section 04 -->
                <tr>
                  <td style="padding: 0 20px 20px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 2px; margin: 20px 0 10px 0;">04 // MAINTENANCE SCHEDULE</div>
                    <div style="color: #71717a; font-size: 11px; line-height: 1.6;">
                      Regular check-ins, connection rituals, and preventive maintenance tasks to keep your system running optimally.
                    </div>
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
                  <td style="background-color: #ea580c; padding: 18px 50px;">
                    <a href="${manualUrl}" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 3px; font-weight: bold; display: block;">
                      READ FULL MANUAL →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #3f3f46; font-size: 11px; margin-top: 20px; letter-spacing: 1px;">
                INCLUDES AUDIO NARRATION + FULL SPECIFICATIONS
              </p>
            </td>
          </tr>
          
          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #27272a;">
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #1a1a1a;">
                    <div style="color: #52525b; font-size: 10px; letter-spacing: 2px;">YOUR MANUAL INCLUDES</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Personality Analysis</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Communication Guide</td>
                      </tr>
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Conflict Resolution</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Maintenance Rituals</td>
                      </tr>
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Audio Narration</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Unlimited Access</td>
                      </tr>
                    </table>
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
                Questions? Contact info@defrag.app
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
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
