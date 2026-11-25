import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { PROFILE } from "../data/profile";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { EASE } from "../styles/tokens";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function Monogram() {
  return (
    <a href="#home" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label={`${PROFILE.name}, back to top`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-elevated text-[13px] font-semibold tracking-tight text-ink shadow-surface">
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,rgba(139,92,246,0.55),rgba(34,211,238,0.45),transparent_60%)] opacity-60 [mask:radial-gradient(circle,transparent_62%,#000_64%)]" />
        ND
      </span>
      <span className="hidden text-sm font-medium tracking-tight text-ink lg:inline">{PROFILE.name}</span>
    </a>
  );
}

export function Navbar({ active }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef(null);
  useFocusTrap(sheetRef, open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile sheet when resizing up to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div ref={sheetRef} className="mx-auto max-w-[1120px]">
        <nav
          aria-label="Primary"
          className={[
            "relative flex h-14 items-center justify-between gap-3 rounded-full border pl-2.5 pr-2 transition-all duration-300 ease-premium",
            scrolled || open
              ? "border-line-strong bg-[#0b0b13]/75 shadow-raised backdrop-blur-xl"
              : "border-line bg-[#0b0b13]/40 backdrop-blur-md",
          ].join(" ")}
        >
          {/* hairline top highlight */}
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

          <Monogram />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 lg:px-4 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={PROFILE.socials.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-shell transition-colors hover:bg-white"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
              <span className="sr-only">(PDF, opens in new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-2 origin-top rounded-[24px] border border-line-strong bg-[#0b0b13]/95 p-2 shadow-raised backdrop-blur-xl md:hidden"
            >
              <ul className="grid gap-0.5">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-autofocus={i === 0 ? "" : undefined}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "location" : undefined}
                      className={`flex min-h-[48px] items-center justify-between rounded-2xl px-4 text-[15px] font-medium transition-colors ${
                        active === item.id ? "bg-white/[0.06] text-ink" : "text-zinc-300 hover:bg-white/[0.04] hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
