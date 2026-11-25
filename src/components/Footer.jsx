import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-elevated text-[11px] font-semibold text-ink" aria-hidden="true">
            ND
          </span>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {PROFILE.name}
            <span className="mx-2 text-zinc-700" aria-hidden="true">/</span>
            <span className="font-mono text-xs text-subtle">{PROFILE.location}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ink" aria-label="GitHub profile (opens in new tab)">
            <Github className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ink" aria-label="LinkedIn profile (opens in new tab)">
            <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ink" aria-label={`Email ${PROFILE.email}`}>
            <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <a href="#home" className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
