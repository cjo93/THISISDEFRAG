import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface UnitData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export interface SupportRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderRef?: string;
}

export interface ResendManualRequest {
  email: string;
  manualUrl: string;
  unitA?: UnitData;
  unitB?: UnitData;
}

export interface EmailOptions {
  type: string;
  to?: string;
  unitA?: UnitData;
  unitB?: UnitData;
  manualUrl?: string;
  supportRequest?: SupportRequest;
  resendRequest?: ResendManualRequest;
}

export async function sendEmail(options: EmailOptions) {
  const { type, to, unitA, unitB, manualUrl, supportRequest, resendRequest } = options;

  let subject: string;
  let html: string;
  let recipients: string[];
  let replyTo: string | undefined;

  switch (type) {
    case 'purchase_confirmation':
      if (!to) throw new Error('Missing recipient');
      subject = 'DEFRAG // YOUR MANUAL IS READY';
      html = generatePurchaseEmail(unitA!, unitB!, manualUrl!);
      recipients = [to];
      break;

    case 'manual_delivery':
      if (!to) throw new Error('Missing recipient');
      subject = 'DEFRAG // MANUAL GENERATED';
      html = generateManualDeliveryEmail(unitA!, unitB!, manualUrl!);
      recipients = [to];
      break;

    case 'welcome':
      if (!to) throw new Error('Missing recipient');
      subject = 'DEFRAG // SYSTEM INITIALIZATION';
      html = generateWelcomeEmail(unitA?.name);
      recipients = [to];
      break;

    case 'resend_manual':
      if (!resendRequest?.email) throw new Error('Missing email');
      subject = 'DEFRAG // MANUAL RECOVERY';
      html = generateResendManualEmail(resendRequest);
      recipients = [resendRequest.email];
      break;

    case 'support_confirmation':
      if (!supportRequest?.email) throw new Error('Missing support request');
      subject = 'DEFRAG // SUPPORT REQUEST RECEIVED';
      html = generateSupportConfirmationEmail(supportRequest);
      recipients = [supportRequest.email];
      break;

    case 'support_internal':
      if (!supportRequest) throw new Error('Missing support request');
      subject = `DEFRAG SUPPORT // ${supportRequest.subject}`;
      html = generateSupportInternalEmail(supportRequest);
      recipients = ['info@defrag.app']; // Internal notification
      replyTo = supportRequest.email;
      break;

    default:
      throw new Error('Invalid email type');
  }

  const { data, error } = await resend.emails.send({
    from: 'DEFRAG <noreply@defrag.app>',
    to: recipients,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
              <span style="color: #ea580c; font-size: 28px; font-weight: 700; letter-spacing: 3px;">DEFRAG</span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
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

// WELCOME EMAIL
function generateWelcomeEmail(name?: string): string {
  const greeting = name ? name : 'there';
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
      Welcome to DEFRAG
    </h1>

    <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
      Hi ${greeting}, you're in! DEFRAG creates relationship operating manuals—practical guides that help you understand and connect with the people who matter most.
    </p>

    <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 24px; margin: 24px 0;">
      <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0 0 16px 0;">Here's how it works:</p>
      <p style="color: #a1a1aa; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;">1. Enter basic info for two people</p>
      <p style="color: #a1a1aa; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;">2. We analyze the patterns and dynamics</p>
      <p style="color: #a1a1aa; font-size: 15px; line-height: 1.7; margin: 0;">3. Get your personalized manual with insights and scripts</p>
    </div>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
      <tr>
        <td align="center">
          <a href="https://defrag.app/start" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 16px 32px; border-radius: 8px;">
            Create Your Manual
          </a>
        </td>
      </tr>
    </table>

    <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.6; text-align: center;">
      Questions? Reply to this email or visit <a href="https://defrag.app/how-it-works" style="color: #ea580c; text-decoration: none;">defrag.app/how-it-works</a>
    </p>
  `);
}

// RESEND MANUAL EMAIL (Forgot Password equivalent)
function generateResendManualEmail(request: ResendManualRequest): string {
  const unitNames = request.unitA && request.unitB
    ? `${request.unitA.name} & ${request.unitB.name}`
    : 'Your Manual';

  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
      Here's Your Manual
    </h1>

    <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
      You requested access to your relationship operating manual. Click below to view it.
    </p>

    <div style="background-color: rgba(234, 88, 12, 0.1); border: 1px solid rgba(234, 88, 12, 0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #ea580c; font-size: 13px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Manual</p>
      <p style="color: #ffffff; font-size: 18px; font-weight: 500; margin: 0;">${unitNames}</p>
    </div>

    <table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
      <tr>
        <td align="center">
          <a href="${request.manualUrl}" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 16px 32px; border-radius: 8px;">
            Access Manual
          </a>
        </td>
      </tr>
    </table>

    <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.6; text-align: center;">
      Didn't request this? You can safely ignore this email.
    </p>

    <p style="color: #71717a; font-size: 14px; margin-top: 12px; line-height: 1.6; text-align: center;">
      Need help? Contact <a href="mailto:info@defrag.app" style="color: #ea580c; text-decoration: none;">info@defrag.app</a>
    </p>
  `);
}

// SUPPORT CONFIRMATION EMAIL (to user)
function generateSupportConfirmationEmail(request: SupportRequest): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
      We Got Your Message
    </h1>

    <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
      Thanks for reaching out. We'll get back to you within 24 hours.
    </p>

    <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 24px; margin: 24px 0;">
      <p style="color: #ea580c; font-size: 13px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Your Request</p>
      <table style="width: 100%;">
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 6px 0; width: 80px; vertical-align: top;">Subject:</td>
          <td style="color: #ffffff; font-size: 14px; padding: 6px 0;">${request.subject}</td>
        </tr>
        ${request.orderRef ? `
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 6px 0; vertical-align: top;">Order:</td>
          <td style="color: #ffffff; font-size: 14px; padding: 6px 0;">${request.orderRef}</td>
        </tr>
        ` : ''}
      </table>
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
        <p style="color: #71717a; font-size: 14px; margin: 0 0 8px 0;">Message:</p>
        <p style="color: #a1a1aa; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${request.message}</p>
      </div>
    </div>

    <p style="color: #71717a; font-size: 14px; margin-top: 24px; line-height: 1.6; text-align: center;">
      Reply to this email to add more information.
    </p>
  `);
}

// SUPPORT INTERNAL EMAIL (to info@defrag.app)
function generateSupportInternalEmail(request: SupportRequest): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
      New Support Request
    </h1>

    <div style="background-color: rgba(234, 88, 12, 0.1); border: 1px solid rgba(234, 88, 12, 0.3); border-radius: 8px; padding: 24px; margin: 24px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 8px 0; width: 80px; vertical-align: top;">From:</td>
          <td style="color: #ffffff; font-size: 14px; padding: 8px 0;">${request.name}</td>
        </tr>
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 8px 0; vertical-align: top;">Email:</td>
          <td style="color: #ea580c; font-size: 14px; padding: 8px 0;">
            <a href="mailto:${request.email}" style="color: #ea580c; text-decoration: none;">${request.email}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 8px 0; vertical-align: top;">Subject:</td>
          <td style="color: #ffffff; font-size: 14px; padding: 8px 0;">${request.subject}</td>
        </tr>
        ${request.orderRef ? `
        <tr>
          <td style="color: #71717a; font-size: 14px; padding: 8px 0; vertical-align: top;">Order:</td>
          <td style="color: #ffffff; font-size: 14px; padding: 8px 0;">${request.orderRef}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <div style="background-color: rgba(255,255,255,0.03); border-radius: 8px; padding: 24px; margin: 24px 0;">
      <p style="color: #ea580c; font-size: 13px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">Message</p>
      <p style="color: #a1a1aa; font-size: 15px; margin: 0; line-height: 1.7; white-space: pre-wrap;">${request.message}</p>
    </div>

    <p style="color: #71717a; font-size: 14px; margin-top: 24px; text-align: center;">
      Reply directly to respond to the user.
    </p>
  `);
}

// PURCHASE CONFIRMATION EMAIL
function generatePurchaseEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.3;">
      Your Manual is Ready
    </h1>

    <p style="color: #a1a1aa; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
      Your personalized relationship operating manual has been generated and is ready to view.
    </p>

    <!-- Unit Cards -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
      <tr>
        <td style="padding: 16px; background-color: rgba(255,255,255,0.03); border-radius: 8px;">
          <p style="color: #71717a; font-size: 12px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Person 1</p>
          <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0;">${unitA?.name || 'Unknown'}</p>
        </td>
        <td width="16"></td>
        <td style="padding: 16px; background-color: rgba(255,255,255,0.03); border-radius: 8px;">
          <p style="color: #71717a; font-size: 12px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Person 2</p>
          <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0;">${unitB?.name || 'Unknown'}</p>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <a href="${manualUrl}" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 16px 32px; border-radius: 8px;">
            View Your Manual
          </a>
        </td>
      </tr>
    </table>

    <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.6; text-align: center;">
      This link will remain active. Bookmark it for easy access.
    </p>

    <p style="color: #71717a; font-size: 14px; margin-top: 12px; line-height: 1.6; text-align: center;">
      Need help? Contact <a href="mailto:info@defrag.app" style="color: #ea580c; text-decoration: none;">info@defrag.app</a>
    </p>
  `);
}

function generateManualDeliveryEmail(unitA: UnitData, unitB: UnitData, manualUrl: string): string {
  return generatePurchaseEmail(unitA, unitB, manualUrl);
}
