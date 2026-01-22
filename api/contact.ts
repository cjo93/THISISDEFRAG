import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderRef?: string;
}

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
    const { name, email, subject, message, orderRef } = req.body as ContactForm;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, subject, message' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send notification to support
    const internalResult = await resend.emails.send({
      from: 'DEFRAG <noreply@defrag.app>',
      to: ['chadowen93@gmail.com'],
      replyTo: email,
      subject: `DEFRAG SUPPORT // ${subject}`,
      html: generateInternalEmail({ name, email, subject, message, orderRef }),
    });

    if (internalResult.error) {
      console.error('Failed to send internal notification:', internalResult.error);
      return res.status(500).json({ error: 'Failed to process request' });
    }

    // Send confirmation to user
    const confirmResult = await resend.emails.send({
      from: 'DEFRAG <noreply@defrag.app>',
      to: [email],
      subject: 'DEFRAG // SUPPORT REQUEST RECEIVED',
      html: generateConfirmationEmail({ name, email, subject, message, orderRef }),
    });

    if (confirmResult.error) {
      console.error('Failed to send confirmation:', confirmResult.error);
      // Don't fail - internal email was sent
    }

    res.status(200).json({ 
      success: true, 
      message: 'Support request submitted successfully',
      id: internalResult.data?.id 
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

function emailWrapper(content: string): string {
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
              ${content}
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

function generateConfirmationEmail(form: ContactForm): string {
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
          <td style="color: #fff; font-size: 13px; padding: 5px 0;">${form.subject}</td>
        </tr>
        ${form.orderRef ? `
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 5px 0;">ORDER REF:</td>
          <td style="color: #fff; font-size: 13px; padding: 5px 0;">${form.orderRef}</td>
        </tr>
        ` : ''}
      </table>
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #333;">
        <span style="color: #52525b; font-size: 12px;">MESSAGE:</span>
        <p style="color: #a1a1aa; font-size: 13px; margin: 10px 0 0 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(form.message)}</p>
      </div>
    </div>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 30px; line-height: 1.6;">
      Reply to this email to add more information to your request.
    </p>
  `);
}

function generateInternalEmail(form: ContactForm): string {
  return emailWrapper(`
    <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; letter-spacing: 2px;">
      // NEW SUPPORT REQUEST
    </h1>
    
    <div style="background-color: #111; border: 1px solid #ea580c; padding: 20px; margin: 25px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0; width: 100px;">FROM:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${escapeHtml(form.name)}</td>
        </tr>
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">EMAIL:</td>
          <td style="color: #ea580c; font-size: 13px; padding: 8px 0;">
            <a href="mailto:${form.email}" style="color: #ea580c;">${escapeHtml(form.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">SUBJECT:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${escapeHtml(form.subject)}</td>
        </tr>
        ${form.orderRef ? `
        <tr>
          <td style="color: #52525b; font-size: 12px; padding: 8px 0;">ORDER REF:</td>
          <td style="color: #fff; font-size: 13px; padding: 8px 0;">${escapeHtml(form.orderRef)}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    
    <div style="background-color: #0a0a0a; border: 1px solid #333; padding: 20px; margin: 25px 0;">
      <span style="color: #ea580c; font-size: 10px; letter-spacing: 2px;">MESSAGE</span>
      <p style="color: #a1a1aa; font-size: 14px; margin: 15px 0 0 0; line-height: 1.8; white-space: pre-wrap;">${escapeHtml(form.message)}</p>
    </div>
    
    <p style="color: #52525b; font-size: 12px; margin-top: 20px;">
      Reply directly to respond to the user.
    </p>
  `);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
