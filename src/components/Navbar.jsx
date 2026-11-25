import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import { PROFILE } from "../data/profile";

const NAV_LABELS = {
  home: "Home",
  about: "About",
  experience: "Experience",
  impact: "Impact",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
};

export function Navbar({ sections, active }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavClick() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
      <nav
        className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4"
        role="navigation"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-semibold tracking-tight text-indigo-300 shrink-0 text-sm sm:text-base"
          aria-label="Go to top"
        >
          {PROFILE.name}
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-5 text-sm flex-1 justify-center">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={
                "whitespace-nowrap transition-colors duration-150 " +
                (active === id
                  ? "text-indigo-300 font-medium"
                  : "text-slate-400 hover:text-slate-200")
              }
              aria-current={active === id ? "page" : undefined}
            >
              {NAV_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        {/* Desktop resume button */}
        <div className="hidden md:flex shrink-0">
          <a
            href={PROFILE.socials.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 transition-colors"
            aria-label="Download resume PDF"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-slate-950/90 backdrop-blur-md"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {sections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={handleNavClick}
                  className={
                    "py-2.5 px-3 rounded-lg text-sm transition-colors " +
                    (active === id
                      ? "text-indigo-300 bg-indigo-500/10 font-medium"
                      : "text-slate-300 hover:text-slate-100 hover:bg-white/5")
                  }
                  aria-current={active === id ? "page" : undefined}
                >
                  {NAV_LABELS[id] ?? id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5">
                <a
                  href={PROFILE.socials.resume}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleNavClick}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 transition-colors w-full justify-center"
                  aria-label="Download resume PDF"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
