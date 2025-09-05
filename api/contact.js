// /api/contact.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, message: 'Missing required fields' });
  }

  try {
    const from = process.env.CONTACT_FROM;       // ← this is CONTACT_FROM
    const to = process.env.CONTACT_TO;           // ← your inbox

    // 1) Forward the message to you
    await resend.emails.send({
      from,                                      // must be verified or onboarding@resend.dev
      to,
      subject: `[Portfolio] ${subject}`,
      reply_to: email,                           // so hitting Reply goes to the sender
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 2) Optional: auto-confirmation to the sender
    await resend.emails.send({
      from,
      to: email,
      subject: 'Thanks for your message!',
      text: `Hi ${name},\n\nThanks for reaching out — I’ll get back to you soon.\n\n— Nikhil`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Mail send failed' });
  }
}
