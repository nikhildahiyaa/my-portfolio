// api/contact.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // CORS: harmless on same-origin, useful if you test from elsewhere
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { name, email, subject, message, company } = req.body || {};

    // simple bot trap
    if (company) return res.status(400).send("Bot detected");

    if (!name || !email || !subject || !message) {
      return res.status(400).send("Missing fields");
    }

    // Use a verified Resend sender. For quick testing, 'onboarding@resend.dev' works.
    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";
    const to = process.env.CONTACT_TO;

    if (!process.env.RESEND_API_KEY) return res.status(500).send("RESEND_API_KEY missing");
    if (!to) return res.status(500).send("CONTACT_TO missing");

    // 1) Forward the message to you
    await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // 2) Send confirmation to the sender (optional)
    await resend.emails.send({
      from,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      text:
        `Hi ${name},\n\nThanks for your message. I’ll reply shortly.\n\n` +
        `Copy of your message:\n${message}\n\n— Nikhil`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send(err?.message || "Error sending email");
  }
};
