// api/contact.js
import { Resend } from "resend";

// env vars: RESEND_API_KEY, CONTACT_FROM, CONTACT_TO
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name = "", email = "", subject = "", message = "", company = "" } = req.body || {};

    // simple honeypot (bots fill hidden "company")
    if (company) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1) send the message to you
    await resend.emails.send({
      from: `Portfolio Contact <${process.env.CONTACT_FROM}>`,
      to: [process.env.CONTACT_TO],
      reply_to: email, // so you can hit Reply
      subject: `[Portfolio] ${subject || "New message"}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 2) confirmation to the sender
    await resend.emails.send({
      from: `Nikhil Dahiya <${process.env.CONTACT_FROM}>`,
      to: [email],
      subject: `Thanks, ${name.split(" ")[0]} — message received`,
      text:
        `Hi ${name.split(" ")[0]},\n\nThanks for reaching out! I'll get back within 1–2 business days.\n\n` +
        `— Summary —\nSubject: ${subject || "(none)"}\n\n${message}\n\n— Nikhil`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed to send" });
  }
}
