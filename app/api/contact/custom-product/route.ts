import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, website, productName, category, quantity, description, captcha } = body;

    // 1. Validate captcha
    if (!captcha) {
      return NextResponse.json({ message: 'Captcha token is missing.' }, { status: 400 });
    }

    // 2. Verify captcha with Google
    const secretKey = process.env.SECRET_SITE_KEY;
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`,
      { method: 'POST' }
    );
    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { message: 'Captcha verification failed.', error: verifyData['error-codes'] },
        { status: 400 }
      );
    }

    // 3. Send email via Resend
    const safeDesc = description?.trim() || 'No description provided';
    const { error } = await resend.emails.send({
      from: 'Verdura Valley <contact@verduravalley.com>',
      to: ['info@verduravalley.com'],
      replyTo: email,
      subject: `Custom Product Request: ${productName} - [Verdura Valley]`,
      text: `Custom Product Request\n\nContact Information:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${businessName}\nWebsite: ${website || 'Not provided'}\n\nProduct Details:\nProduct Name: ${productName}\nCategory: ${category}\nQuantity: ${quantity}\n\nDescription:\n${safeDesc}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2D6A4F;">Custom Product Request</h2>

          <h3 style="color: #2D6A4F; font-size: 16px; margin-top: 20px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Business:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Website:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${website || 'Not provided'}</td>
            </tr>
          </table>

          <h3 style="color: #2D6A4F; font-size: 16px; margin-top: 20px;">Product Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Product Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Category:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Quantity:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${quantity}</td>
            </tr>
          </table>

          <br/>
          <p><strong>Description:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 10px solid #2D6A4F; margin: 1.5em 10px; padding: 1.5em 20px; font-style: italic;">
            ${safeDesc}
          </blockquote>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { message: 'Failed to send email.', error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Request sent successfully!' });
  } catch (error) {
    console.error('Backend Error:', error);
    return NextResponse.json(
      { message: 'Internal server error.', error: String(error) },
      { status: 500 }
    );
  }
}
