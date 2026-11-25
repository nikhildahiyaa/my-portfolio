import { useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { PROFILE } from "../data/profile";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

export function Contact() {
  const [mailStatus, setMailStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (mailStatus === "sending") return;

    // Capture the form element before async operations
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    setMailStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "7b84995d-0778-4267-99ef-5a27e6c8f587",
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
          botcheck: form.get("botcheck"), // honeypot spam protection
        }),
      });

      if (!res.ok) {
        setMailStatus("error");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setMailStatus("sent");
        formEl.reset();
      } else {
        setMailStatus("error");
      }
    } catch {
      setMailStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Contact"
          subtitle="Interested in working together or have a question? Get in touch."
        />

        <Reveal>
          <GlassCard className="p-6 sm:p-8 max-w-2xl">
            <p className="font-semibold text-slate-100 text-lg">Let's work together</p>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Send a note and I'll get back within 1–2 business days.
            </p>

            <form
              className="grid sm:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Honeypot spam protection — hidden from real users */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
                defaultChecked={false}
              />

              <div>
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={mailStatus === "sending"}
                  className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Your email</label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                  disabled={mailStatus === "sending"}
                  className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="sr-only">Subject</label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  disabled={mailStatus === "sending"}
                  className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Message"
                  required
                  disabled={mailStatus === "sending"}
                  className="min-h-[120px] bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={mailStatus === "sending" || mailStatus === "sent"}
                className="sm:col-span-2 rounded-xl w-full h-11 bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors appearance-none inline-flex items-center justify-center gap-2"
                aria-busy={mailStatus === "sending"}
              >
                {mailStatus === "sending" && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {mailStatus === "sending" ? "Sending…" : mailStatus === "sent" ? "Message Sent!" : "Send Message"}
              </button>

              {/* Status messages — announced to screen readers */}
              <div className="sm:col-span-2" aria-live="polite" aria-atomic="true">
                {mailStatus === "sent" && (
                  <p className="text-sm text-emerald-400">
                    Thanks! I've received your message and will respond within 1–2 business days.
                  </p>
                )}
                {mailStatus === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please email me directly at{" "}
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="underline hover:text-red-300 transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </p>
                )}
              </div>

              <p className="sm:col-span-2 text-xs text-slate-500">
                Or reach me directly at{" "}
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="underline text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {PROFILE.email}
                </a>
              </p>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
