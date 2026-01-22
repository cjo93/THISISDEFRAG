import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);

interface UnitData {
  name?: string;
  birthDate?: string;
  birthTime?: string;
  location?: string;
  sun_sign?: string;
  mars_sign?: string;
  os_type?: string;
  fuel?: string;
  warning?: string;
  operatingMode?: string;
  energyType?: string;
}

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

async function sendConfirmationEmail(to: string, unitA: UnitData, unitB: UnitData, manualUrl: string) {
  const unitAName = unitA?.name?.toUpperCase() || 'UNIT_A';
  const unitBName = unitB?.name?.toUpperCase() || 'UNIT_B';
  
  // Determine unit types for compatibility analysis
  const unitAType = unitA?.os_type?.includes('GUIDE') ? 'GUIDE' : 'DOER';
  const unitBType = unitB?.os_type?.includes('GUIDE') ? 'GUIDE' : 'DOER';
  const compatType = unitAType === unitBType ? 'MATCHED' : 'COMPLEMENTARY';
  
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
          
          <!-- Unit Cards with Full Specs -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- UNIT A -->
                  <td width="48%" style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 12px; font-weight: bold;">UNIT_A // OPERATOR</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${unitAName}</div>
                    <div style="color: #52525b; font-size: 11px; margin-bottom: 12px;">${unitA?.birthDate || '—'} • ${unitA?.birthTime || ''} • ${unitA?.location || ''}</div>
                    
                    <div style="border-top: 1px solid #222; padding-top: 12px; margin-top: 8px;">
                      <div style="color: #3f3f46; font-size: 9px; letter-spacing: 2px; margin-bottom: 6px;">CORE SIGNATURE</div>
                      <div style="color: #ea580c; font-size: 13px; font-weight: 600;">☉ ${unitA?.sun_sign?.toUpperCase() || '—'} SUN</div>
                      <div style="color: #a1a1aa; font-size: 12px; margin-top: 2px;">♂ MARS IN ${unitA?.mars_sign?.toUpperCase() || '—'}</div>
                    </div>
                    
                    <div style="border-top: 1px solid #222; padding-top: 12px; margin-top: 12px;">
                      <div style="color: #3f3f46; font-size: 9px; letter-spacing: 2px; margin-bottom: 6px;">OPERATING SYSTEM</div>
                      <div style="color: #fff; font-size: 11px; line-height: 1.5;">${unitA?.os_type || 'PENDING ANALYSIS'}</div>
                    </div>
                    
                    ${unitA?.warning ? `
                    <div style="background: #111; padding: 10px; margin-top: 12px; border-left: 2px solid #fbbf24;">
                      <div style="color: #fbbf24; font-size: 9px; letter-spacing: 1px;">⚠ WARNING</div>
                      <div style="color: #a1a1aa; font-size: 10px; margin-top: 4px;">${unitA.warning}</div>
                    </div>
                    ` : ''}
                  </td>
                  
                  <td width="4%"></td>
                  
                  <!-- UNIT B -->
                  <td width="48%" style="background: #0a0a0a; border: 1px solid #27272a; padding: 20px; vertical-align: top;">
                    <div style="color: #ea580c; font-size: 9px; letter-spacing: 3px; margin-bottom: 12px; font-weight: bold;">UNIT_B // SUBJECT</div>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${unitBName}</div>
                    <div style="color: #52525b; font-size: 11px; margin-bottom: 12px;">${unitB?.birthDate || '—'} • ${unitB?.birthTime || ''} • ${unitB?.location || ''}</div>
                    
                    <div style="border-top: 1px solid #222; padding-top: 12px; margin-top: 8px;">
                      <div style="color: #3f3f46; font-size: 9px; letter-spacing: 2px; margin-bottom: 6px;">CORE SIGNATURE</div>
                      <div style="color: #ea580c; font-size: 13px; font-weight: 600;">☉ ${unitB?.sun_sign?.toUpperCase() || '—'} SUN</div>
                      <div style="color: #a1a1aa; font-size: 12px; margin-top: 2px;">♂ MARS IN ${unitB?.mars_sign?.toUpperCase() || '—'}</div>
                    </div>
                    
                    <div style="border-top: 1px solid #222; padding-top: 12px; margin-top: 12px;">
                      <div style="color: #3f3f46; font-size: 9px; letter-spacing: 2px; margin-bottom: 6px;">OPERATING SYSTEM</div>
                      <div style="color: #fff; font-size: 11px; line-height: 1.5;">${unitB?.os_type || 'PENDING ANALYSIS'}</div>
                    </div>
                    
                    ${unitB?.warning ? `
                    <div style="background: #111; padding: 10px; margin-top: 12px; border-left: 2px solid #fbbf24;">
                      <div style="color: #fbbf24; font-size: 9px; letter-spacing: 1px;">⚠ WARNING</div>
                      <div style="color: #a1a1aa; font-size: 10px; margin-top: 4px;">${unitB.warning}</div>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- System Compatibility Analysis -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0f0f0f 0%, #0a0a0a 100%); border: 1px solid #ea580c;">
                <tr>
                  <td style="padding: 25px;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 3px; font-weight: bold; margin-bottom: 15px;">⚡ SYSTEM COMPATIBILITY ANALYSIS</div>
                    
                    <div style="color: #ffffff; font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
                      <strong>${unitAType} × ${unitBType} CONFIGURATION DETECTED</strong>
                    </div>
                    
                    <div style="color: #a1a1aa; font-size: 13px; line-height: 1.8;">
                      ${compatType === 'COMPLEMENTARY' 
                        ? `This pairing creates a <span style="color: #4ade80;">complementary dynamic</span>: ${unitAName}'s ${unitA?.operatingMode || 'processing style'} provides balance for ${unitBName}'s ${unitB?.operatingMode || 'approach'}. Your manual contains specific protocols for leveraging this dynamic.`
                        : `This pairing creates a <span style="color: #4ade80;">matched dynamic</span>: Both units operate on similar frequencies. Your manual contains specific protocols for avoiding resonance conflicts and maximizing synchronization.`
                      }
                    </div>
                    
                    <div style="border-top: 1px solid #222; margin-top: 20px; padding-top: 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="33%" style="text-align: center;">
                            <div style="color: #4ade80; font-size: 20px; font-weight: bold;">${compatType}</div>
                            <div style="color: #52525b; font-size: 9px; letter-spacing: 1px; margin-top: 4px;">PAIRING TYPE</div>
                          </td>
                          <td width="33%" style="text-align: center;">
                            <div style="color: #fbbf24; font-size: 20px; font-weight: bold;">ANALYZED</div>
                            <div style="color: #52525b; font-size: 9px; letter-spacing: 1px; margin-top: 4px;">FRICTION POINTS</div>
                          </td>
                          <td width="33%" style="text-align: center;">
                            <div style="color: #ea580c; font-size: 20px; font-weight: bold;">MAPPED</div>
                            <div style="color: #52525b; font-size: 9px; letter-spacing: 1px; margin-top: 4px;">PROTOCOLS</div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Detailed Manual Sections -->
          <tr>
            <td style="padding: 0 20px 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #0a0a0a; border: 1px solid #27272a;">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 10px; letter-spacing: 3px; font-weight: bold;">MANUAL CONTENTS</div>
                  </td>
                </tr>
                
                <!-- Section 01: System Specifications -->
                <tr>
                  <td style="padding: 25px 20px;">
                    <div style="color: #ea580c; font-size: 11px; letter-spacing: 2px; margin-bottom: 15px; font-weight: bold;">01 // SYSTEM SPECIFICATIONS</div>
                    
                    <div style="color: #ffffff; font-size: 14px; font-weight: 600; margin-bottom: 10px;">Core Processing Differences</div>
                    <div style="color: #a1a1aa; font-size: 12px; line-height: 1.7; margin-bottom: 15px;">
                      Detailed analysis of how ${unitAName} and ${unitBName}'s behavioral patterns interact. Core processing differences, energy signatures, and communication protocols mapped.
                    </div>
                    
                    <div style="color: #ffffff; font-size: 14px; font-weight: 600; margin-bottom: 10px;">Energy Signatures</div>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                      <tr>
                        <td style="padding: 12px; background: #111; border-left: 3px solid #ea580c;">
                          <div style="color: #ea580c; font-size: 10px; letter-spacing: 1px;">${unitAName}'S FUEL</div>
                          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${unitA?.fuel || 'Detailed in full manual'}</div>
                        </td>
                      </tr>
                      <tr><td style="height: 8px;"></td></tr>
                      <tr>
                        <td style="padding: 12px; background: #111; border-left: 3px solid #4ade80;">
                          <div style="color: #4ade80; font-size: 10px; letter-spacing: 1px;">${unitBName}'S FUEL</div>
                          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${unitB?.fuel || 'Detailed in full manual'}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Section 02: Operating Procedures -->
                <tr>
                  <td style="padding: 0 20px 25px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 11px; letter-spacing: 2px; margin: 25px 0 15px 0; font-weight: bold;">02 // OPERATING PROCEDURES</div>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #111;">
                          <div style="color: #fff; font-size: 13px; font-weight: 600;">→ Engagement Protocol</div>
                          <div style="color: #71717a; font-size: 12px; margin-top: 6px; line-height: 1.6;">
                            Specific approaches for initiating meaningful exchanges between ${unitAName} and ${unitBName}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #111;">
                          <div style="color: #fff; font-size: 13px; font-weight: 600;">→ Decision Making</div>
                          <div style="color: #71717a; font-size: 12px; margin-top: 6px; line-height: 1.6;">
                            How to navigate joint decisions based on each unit's processing style
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0;">
                          <div style="color: #fff; font-size: 13px; font-weight: 600;">→ Conflict Navigation</div>
                          <div style="color: #71717a; font-size: 12px; margin-top: 6px; line-height: 1.6;">
                            Resolution protocols specific to your pairing type
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Section 03: Troubleshooting -->
                <tr>
                  <td style="padding: 0 20px 25px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 11px; letter-spacing: 2px; margin: 25px 0 15px 0; font-weight: bold;">03 // TROUBLESHOOTING PROTOCOLS</div>
                    
                    <div style="margin-bottom: 15px;">
                      <div style="padding: 12px; background: #1a1a0a; border-left: 3px solid #fbbf24;">
                        <div style="color: #fbbf24; font-size: 10px; letter-spacing: 1px; font-weight: bold;">⚠ COMMON FRICTION POINTS</div>
                        <div style="color: #fff; font-size: 12px; margin-top: 6px;">Identified based on ${unitA?.sun_sign || 'your'} × ${unitB?.sun_sign || 'pairing'} dynamics</div>
                      </div>
                      <div style="padding: 12px; background: #0a1a0a; border-left: 3px solid #4ade80;">
                        <div style="color: #4ade80; font-size: 10px; letter-spacing: 1px; font-weight: bold;">✓ RESOLUTION PROTOCOLS</div>
                        <div style="color: #a1a1aa; font-size: 12px; margin-top: 6px;">Step-by-step procedures for each identified issue</div>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Section 04: Maintenance -->
                <tr>
                  <td style="padding: 0 20px 25px 20px; border-top: 1px solid #1a1a1a;">
                    <div style="color: #ea580c; font-size: 11px; letter-spacing: 2px; margin: 25px 0 15px 0; font-weight: bold;">04 // MAINTENANCE SCHEDULE</div>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 12px; background: #111; border-bottom: 1px solid #1a1a1a;">
                          <span style="color: #ea580c; font-size: 10px; font-weight: bold;">DAILY</span>
                          <span style="color: #a1a1aa; font-size: 12px; margin-left: 15px;">Connection rituals tailored to your types</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 12px; background: #111; border-bottom: 1px solid #1a1a1a;">
                          <span style="color: #ea580c; font-size: 10px; font-weight: bold;">WEEKLY</span>
                          <span style="color: #a1a1aa; font-size: 12px; margin-left: 15px;">Shared activities based on sun sign compatibility</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 12px; background: #111; border-bottom: 1px solid #1a1a1a;">
                          <span style="color: #ea580c; font-size: 10px; font-weight: bold;">MONTHLY</span>
                          <span style="color: #a1a1aa; font-size: 12px; margin-left: 15px;">System check-ins and recalibration</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 12px; background: #111;">
                          <span style="color: #ea580c; font-size: 10px; font-weight: bold;">QUARTERLY</span>
                          <span style="color: #a1a1aa; font-size: 12px; margin-left: 15px;">Deep maintenance and goal alignment</span>
                        </td>
                      </tr>
                    </table>
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
                      ACCESS FULL MANUAL →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #3f3f46; font-size: 11px; margin-top: 20px; letter-spacing: 1px;">
                INCLUDES AUDIO NARRATION + DOWNLOADABLE FORMAT
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
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Full Personality Analysis</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Communication Protocols</td>
                      </tr>
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Conflict Resolution Guide</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Maintenance Rituals</td>
                      </tr>
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ AI Audio Narration</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Lifetime Access</td>
                      </tr>
                      <tr>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Friction Forecasting</td>
                        <td width="50%" style="color: #71717a; font-size: 11px; padding: 4px 0;">✓ Bookmark & Share</td>
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

  await resend.emails.send({
    from: 'DEFRAG <noreply@defrag.app>',
    to: [to],
    subject: `DEFRAG // MANUAL READY: ${unitAName} × ${unitBName}`,
    html,
  });
}
