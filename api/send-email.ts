import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface UnitData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

interface SupportRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderRef?: string;
}

interface ResendManualRequest {
  email: string;
  manualUrl: string;
  unitA?: UnitData;
  unitB?: UnitData;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, type, unitA, unitB, manualUrl, supportRequest, resendRequest } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Missing email type' });
    }

    let subject: string;
    let html: string;
    let recipients: string[];
    let replyTo: string | undefined;

    switch (type) {
      case 'purchase_confirmation':
        if (!to) return res.status(400).json({ error: 'Missing recipient' });
        subject = 'DEFRAG // YOUR MANUAL IS READY';
        html = generatePurchaseEmail(unitA, unitB, manualUrl);
        recipients = [to];
        break;
      
      case 'manual_delivery':
        if (!to) return res.status(400).json({ error: 'Missing recipient' });
        subject = 'DEFRAG // MANUAL GENERATED';
        html = generateManualDeliveryEmail(unitA, unitB, manualUrl);
        recipients = [to];
        break;

      case 'welcome':
        if (!to) return res.status(400).json({ error: 'Missing recipient' });
        subject = 'DEFRAG // SYSTEM INITIALIZATION';
        html = generateWelcomeEmail(unitA?.name);
        recipients = [to];
        break;

      case 'resend_manual':
        if (!resendRequest?.email) return res.status(400).json({ error: 'Missing email' });
        subject = 'DEFRAG // MANUAL RECOVERY';
        html = generateResendManualEmail(resendRequest);
        recipients = [resendRequest.email];
        break;

      case 'support_confirmation':
        if (!supportRequest?.email) return res.status(400).json({ error: 'Missing support request' });
        subject = 'DEFRAG // SUPPORT REQUEST RECEIVED';
        html = generateSupportConfirmationEmail(supportRequest);
        recipients = [supportRequest.email];
        break;

      case 'support_internal':
        if (!supportRequest) return res.status(400).json({ error: 'Missing support request' });
        subject = `DEFRAG SUPPORT // ${supportRequest.subject}`;
        html = generateSupportInternalEmail(supportRequest);
        recipients = ['chadowen93@gmail.com']; // Internal notification
        replyTo = supportRequest.email;
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }

    const { data, error } = await resend.emails.send({
      from: 'DEFRAG <noreply@defrag.app>',
      to: recipients,
      subject,
      html,
      replyTo,
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

// ============================================
// EMAIL TEMPLATES
// ============================================

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DEFRAG</title>
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
              ${content}
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

// WELCOME EMAIL
function generateWelcomeEmail(name?: string): string {
  const greeting = name ? `UNIT ${name.toUpperCase()}` : 'OPERATOR';
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
      // SYSTEM INITIALIZATION
    </h1>
    
    <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;">
      WELCOME, ${greeting}.
    </p>
    
    <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;">
      You've entered the DEFRAG system—a diagnostic framework for human relationships.
      Your coordinates have been logged. The next step: input your unit specifications 
      to generate your personalized relationship operating manual.
    </p>
    
    <div style="background-color: #111; border: 1px solid #333; padding: 20px; margin: 25px 0;">
      <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">WHAT HAPPENS NEXT</span>
      <ul style="color: #a1a1aa; font-size: 13px; line-height: 2; margin: 15px 0 0 0; padding-left: 20px;">
        <li>Enter birth coordinates for both units</li>
        <li>System processes planetary alignment data</li>
        <li>AI generates your custom relationship manual</li>
        <li>Receive troubleshooting protocols, maintenance schedules, and operating procedures</li>
      </ul>
    </div>
    
    <table cellpadding="0" cellspacing="0" style="margin-top: 30px;">
      <tr>
        <td style="background-color: #ea580c; padding: 15px 30px;">
          <a href="https://defrag.app/start" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 2px; font-weight: bold;">
            BEGIN CALIBRATION →
          </a>
        </td>
      </tr>
    </table>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 30px; line-height: 1.6;">
      Questions? Reply to this email or visit <a href="https://defrag.app/how-it-works" style="color: #ea580c;">defrag.app/how-it-works</a>
    </p>
  `);
}

// RESEND MANUAL EMAIL (Forgot Password equivalent)
function generateResendManualEmail(request: ResendManualRequest): string {
  const unitNames = request.unitA && request.unitB 
    ? `${request.unitA.name.toUpperCase()} × ${request.unitB.name.toUpperCase()}`
    : 'YOUR UNITS';
  
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
      // MANUAL RECOVERY
    </h1>
    
    <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;">
      You requested access to your relationship operating manual.
    </p>
    
    <div style="background-color: #111; border: 1px solid #333; padding: 20px; margin: 25px 0;">
      <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">MANUAL IDENTIFIED</span>
      <p style="color: #fff; font-size: 16px; margin: 10px 0 0 0; letter-spacing: 1px;">${unitNames}</p>
    </div>
    
    <table cellpadding="0" cellspacing="0" style="margin-top: 30px;">
      <tr>
        <td style="background-color: #ea580c; padding: 15px 30px;">
          <a href="${request.manualUrl}" style="color: #ffffff; text-decoration: none; font-size: 14px; letter-spacing: 2px; font-weight: bold;">
            ACCESS MANUAL →
          </a>
        </td>
      </tr>
    </table>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 30px; line-height: 1.6;">
      Didn't request this? You can safely ignore this email.
    </p>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 15px; line-height: 1.6;">
      Can't find your manual? Contact <a href="mailto:info@defrag.app" style="color: #ea580c;">info@defrag.app</a> with your order details.
    </p>
  `);
}

// SUPPORT CONFIRMATION EMAIL (to user)
function generateSupportConfirmationEmail(request: SupportRequest): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
      // SUPPORT REQUEST LOGGED
    </h1>
    
    <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;">
      We've received your transmission and will respond within 24 hours.
    </p>
    
    <div style="background-color: #111; border: 1px solid #333; padding: 20px; margin: 25px 0;">
      <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">YOUR REQUEST</span>
      <table style="margin-top: 15px; width: 100%;">
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 5px 0; width: 100px;">SUBJECT:</td>
          <td style="color: #fff; font-size: 13px; padding: 5px 0;">${request.subject}</td>
        </tr>
        ${request.orderRef ? `
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 5px 0;">ORDER REF:</td>
          <td style="color: #fff; font-size: 13px; padding: 5px 0;">${request.orderRef}</td>
        </tr>
        ` : ''}
      </table>
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #333;">
        <span style="color: #52525b; font-size: 12px;">MESSAGE:</span>
        <p style="color: #a1a1aa; font-size: 13px; margin: 10px 0 0 0; line-height: 1.6; white-space: pre-wrap;">${request.message}</p>
      </div>
    </div>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 30px; line-height: 1.6;">
      Reply to this email to add more information to your request.
    </p>
  `);
}

// SUPPORT INTERNAL EMAIL (to chadowen93@gmail.com)
function generateSupportInternalEmail(request: SupportRequest): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
      // NEW SUPPORT REQUEST
    </h1>
    
    <div style="background-color: #111; border: 1px solid #ea580c; padding: 20px; margin: 25px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0; width: 100px;">FROM:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${request.name}</td>
        </tr>
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">EMAIL:</td>
          <td style="color: #ea580c; font-size: 13px; padding: 8px 0;">
            <a href="mailto:${request.email}" style="color: #ea580c;">${request.email}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">SUBJECT:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${request.subject}</td>
        </tr>
        ${request.orderRef ? `
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">ORDER REF:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${request.orderRef}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    
    <div style="background-color: #0a0a0a; border: 1px solid #333; padding: 20px; margin: 25px 0;">
      <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">MESSAGE</span>
      <p style="color: #a1a1aa; font-size: 14px; margin: 15px 0 0 0; line-height: 1.8; white-space: pre-wrap;">${request.message}</p>
    </div>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 20px;">
      Reply directly to respond to the user.
    </p>
  `);
}

// PURCHASE CONFIRMATION EMAIL
function generatePurchaseEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return emailWrapper(`
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
    
    <p style="color: #52525b; font-size: 12px; margin-top: 15px;">
      Need help? Contact <a href="mailto:info@defrag.app" style="color: #ea580c;">info@defrag.app</a>
    </p>
  `);
}

function generateManualDeliveryEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return generatePurchaseEmail(unitA, unitB, manualUrl);
}
