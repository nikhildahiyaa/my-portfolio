import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/profile";

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-slate-400 hover:text-fuchsia-300 transition-colors text-sm"
            aria-label={`Email ${PROFILE.email}`}
          >
            {PROFILE.email}
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-slate-400 hover:text-fuchsia-300 transition-colors"
            aria-label="Send email"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
