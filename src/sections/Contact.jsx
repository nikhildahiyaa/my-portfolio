import { useState } from "react";
import { ArrowUpRight, CheckCircle2, FileText, Github, Linkedin, Mail, MapPin, Send, XCircle } from "lucide-react";
import { Section } from "../components/layout/Section";
import { Reveal } from "../components/Reveal";
import { PROFILE } from "../data/profile";

// Web3Forms public access key — intentionally client-side (not a secret).
const WEB3FORMS_KEY = "7b84995d-0778-4267-99ef-5a27e6c8f587";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
  { name: "message", label: "Message", textarea: true },
];

function validate(form) {
  const errors = {};
  const get = (k) => String(form.get(k) ?? "").trim();
  if (!get("name")) errors.name = "Please enter your name.";
  if (!get("email")) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) errors.email = "Please enter a valid email address.";
  if (!get("subject")) errors.subject = "Please add a subject.";
  if (!get("message")) errors.message = "Please write a message.";
  return errors;
}

const LINKS = [
  { href: `mailto:${PROFILE.email}`, label: PROFILE.email, sub: "Email", icon: Mail },
  { href: PROFILE.socials.linkedin, label: "linkedin.com/in/nikhil-dahiya", sub: "LinkedIn", icon: Linkedin, external: true },
  { href: PROFILE.socials.github, label: "github.com/nikhildahiyaa", sub: "GitHub", icon: Github, external: true },
];

export function Contact() {
  const [mailStatus, setMailStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    if (mailStatus === "sending") return; // duplicate-submission guard

    // Capture the form element before async operations
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      formEl.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setMailStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
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

  const busy = mailStatus === "sending";
  const inputCls = (err) =>
    `peer w-full rounded-xl border bg-shell/60 px-4 text-[15px] text-ink placeholder:text-zinc-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet/40 disabled:opacity-60 ${
      err ? "border-rose-400/70 focus:border-rose-400" : "border-line-strong hover:border-white/25 focus:border-violet/70"
    }`;

  return (
    <Section id="contact" className="pb-16 lg:pb-20">
      <div className="relative overflow-hidden rounded-panel border border-line bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,rgba(139,92,246,0.16),transparent_60%),radial-gradient(ellipse_60%_70%_at_100%_100%,rgba(34,211,238,0.08),transparent_60%)] bg-surface/60">
        <div className="absolute inset-0 -z-10 grid-texture opacity-50" aria-hidden="true" />
        <div className="grid lg:grid-cols-12">
          {/* ── Invitation ── */}
          <Reveal className="flex flex-col p-6 sm:p-10 lg:col-span-5 lg:p-12">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-violet-soft">05</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
              Contact
            </p>
            <h2 className="mt-5 text-display-lg font-semibold text-ink">
              Let's turn data into{" "}
              <span className="font-display font-normal italic text-zinc-300">better decisions.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-300">
              Interested in working together or have a question? Get in touch — send a note and I'll get back within 1–2 business days.
            </p>

            <ul className="mt-8 space-y-2">
              {LINKS.map(({ href, label, sub, icon: Icon, external }) => (
                <li key={sub}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-transparent p-2.5 -mx-2.5 transition-colors hover:border-line hover:bg-white/[0.03]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-elevated text-zinc-300 group-hover:text-ink">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10.5px] uppercase tracking-wider text-subtle">{sub}</span>
                      <span className="block truncate text-[15px] text-ink">{label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                    {external && <span className="sr-only">(opens in new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {PROFILE.location}
              </span>
              <a href={PROFILE.socials.resume} target="_blank" rel="noreferrer" className="link-quiet">
                <FileText className="h-4 w-4" aria-hidden="true" /> Resume (PDF)
                <span className="sr-only">opens in new tab</span>
              </a>
            </div>
          </Reveal>

          {/* ── Form ── */}
          <Reveal delay={0.08} className="border-t border-line p-4 sm:p-6 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-8">
            <form onSubmit={handleSubmit} noValidate className="surface-elevated grid gap-4 p-5 sm:grid-cols-2 sm:p-7" aria-describedby="form-status">
              {/* Honeypot spam protection — hidden from real users */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" defaultChecked={false} />

              {FIELDS.map((f) => {
                const id = `contact-${f.name}`;
                const err = errors[f.name];
                const common = {
                  id,
                  name: f.name,
                  required: true,
                  disabled: busy,
                  "aria-invalid": err ? "true" : undefined,
                  "aria-describedby": err ? `${id}-error` : undefined,
                  onInput: () => err && setErrors((e) => ({ ...e, [f.name]: undefined })),
                };
                return (
                  <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                    <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-zinc-200">
                      {f.label}
                    </label>
                    {f.textarea ? (
                      <textarea {...common} rows={5} className={`${inputCls(err)} min-h-[140px] resize-y py-3`} placeholder="What would you like to talk about?" />
                    ) : (
                      <input {...common} type={f.type} autoComplete={f.autoComplete} className={`${inputCls(err)} h-12`} />
                    )}
                    {err && (
                      <p id={`${id}-error`} className="mt-1.5 text-[13px] text-rose-300">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">
                  Prefer email?{" "}
                  <a href={`mailto:${PROFILE.email}`} className="text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/60">
                    {PROFILE.email}
                  </a>
                </p>
                <button type="submit" disabled={busy || mailStatus === "sent"} aria-busy={busy} className="btn-primary h-12 px-6 disabled:cursor-not-allowed disabled:opacity-60">
                  {busy ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  {busy ? "Sending…" : mailStatus === "sent" ? "Message sent" : "Send message"}
                </button>
              </div>

              {/* Status messages — announced to screen readers */}
              <div id="form-status" className="sm:col-span-2" aria-live="polite" aria-atomic="true">
                {mailStatus === "sent" && (
                  <p className="flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] p-3.5 text-sm text-emerald-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Thanks! I've received your message and will respond within 1–2 business days.
                  </p>
                )}
                {mailStatus === "error" && (
                  <p className="flex items-start gap-2.5 rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-3.5 text-sm text-rose-200">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Something went wrong. Please email me directly at{" "}
                      <a href={`mailto:${PROFILE.email}`} className="underline underline-offset-2">
                        {PROFILE.email}
                      </a>
                    </span>
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
