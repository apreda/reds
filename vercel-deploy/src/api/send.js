import nodemailer from 'nodemailer';

// Email sending API endpoint
export default async function handler(req, res) {
  const { emailText, senderName, senderEmail } = req.body;

  if (!emailText || !senderName || !senderEmail) {
    return res.status(400).json({ error: 'Email text, sender name, and sender email are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.yourservice.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: `"${senderName} via Dear Bobbot" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'owner@reds.com',
      subject: 'A Message From a Passionate Reds Fan',
      text: emailText,
      replyTo: senderEmail
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
