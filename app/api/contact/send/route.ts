import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// POST /api/contact/send - Send contact form email with reCAPTCHA verification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, website, subject, msg, captcha } = body;

    // 1. Validate captcha token
    if (!captcha) {
      return NextResponse.json(
        { message: 'Captcha token is missing.' },
        { status: 400 }
      );
    }

    // 2. Verify captcha with Google
    const secretKey = process.env.SECRET_SITE_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const verifyResponse = await fetch(verifyUrl, { method: 'POST' });
    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { message: 'Captcha verification failed.', error: verifyData['error-codes'] },
        { status: 400 }
      );
    }

    // 3. Save to database (save message regardless of email success/failure)
    try {
      await query(
        'INSERT INTO contact_messages (subject, name, email, phone, business_name, website, message) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [subject, name, email, phone, businessName, website || null, msg]
      );
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue to send email even if DB save fails
    }

    // 4. Send email via Resend
    const safeMsg = escapeHtml(msg?.trim()) || 'No message provided';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeBusiness = escapeHtml(businessName);
    const safeWebsite = escapeHtml(website);
    const safeSubject = escapeHtml(subject);

    const { data, error } = await getResend().emails.send({
      from: 'Verdura Valley <contact@verduravalley.com>',
      to: ['info@verduravalley.com'],
      replyTo: email,
      subject: `New Request: ${safeSubject} - [Verdura Valley]`,
      text: `New Contact Form Submission\n\nName: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nBusiness: ${safeBusiness}\nWebsite: ${safeWebsite || 'Not provided'}\nSubject: ${safeSubject}\n\nMessage:\n${safeMsg}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2D6A4F;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Business:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safeBusiness}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Website:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safeWebsite || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Subject:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${safeSubject}</td>
            </tr>
          </table>
          <br/>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 10px solid #2D6A4F; margin: 1.5em 10px; padding: 1.5em 20px; font-style: italic;">
            ${safeMsg}
          </blockquote>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { message: 'Failed to send email. Ensure you are sending to a verified address.', error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Backend Error:', error);
    return NextResponse.json(
      { message: 'Internal server error.', error: errorDetail(error) },
      { status: 500 }
    );
  }
}
