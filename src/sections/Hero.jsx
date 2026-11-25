import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { DataCoreStage } from "../components/three/DataCoreStage";
import { KpiStrip } from "./KpiStrip";
import { PROFILE } from "../data/profile";
import { EASE } from "../styles/tokens";

function RotatingRole() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % PROFILE.roleWords.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-7 items-center overflow-hidden align-middle">
      {/* screen readers get the full list once, not a live-updating ticker */}
      <span className="sr-only">{PROFILE.roleWords.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono text-[13px] text-cyan-soft"
        >
          {PROFILE.roleWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Circular portrait with a fine gradient ring — sits beside the name in the hero copy column. */
function Portrait({ size = "h-32 w-32" }) {
  return (
    <div className={`relative shrink-0 ${size}`}>
      <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_210deg,#8B5CF6,#22D3EE,#6366F1,#8B5CF6)] opacity-80" />
      <div className="absolute -inset-[1px] rounded-full bg-shell" />
      <img
        src="/portrait.jpg"
        alt="Portrait of Nikhil Dahiya"
        width="520"
        height="520"
        fetchpriority="high"
        decoding="async"
        className="relative h-full w-full rounded-full object-cover scale-[1.04]"
      />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (d) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: EASE } };
  // Primary text (name, headline, intro) is visible from the first paint — motion only, no fade —
  // so it is never hidden behind an entrance animation (and LCP is not delayed).
  const settle = (d) =>
    reduce ? {} : { initial: { y: 10 }, animate: { y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } };

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-28 pb-10 lg:pb-12">
      {/* layered hero atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-texture opacity-60" />
        <div className="absolute -top-40 right-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_62%)]" />
        <div className="absolute top-[30%] -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.10),transparent_65%)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-shell" />
      </div>

      <div className="shell">
        <div className="grid items-center gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          {/* ── Copy ── */}
          <div className="relative z-10 lg:col-span-6">
            <motion.p {...rise(0)} className="eyebrow flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-cyan" />
              </span>
              <span className="sm:hidden">{PROFILE.title.split("|")[0].trim()}</span>
              <span className="hidden sm:inline">{PROFILE.title}</span>
            </motion.p>

            {/* identity — portrait, name (shown once), rotating role, location */}
            <motion.div {...settle(0)} className="mt-5 flex items-center gap-4 sm:gap-5">
              <Portrait size="h-16 w-16 sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20" />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span className="text-2xl sm:text-[28px] font-semibold leading-tight tracking-tight text-ink">{PROFILE.name}</span>
                  <span className="hidden sm:inline-block h-px w-6 bg-line-strong" aria-hidden="true" />
                  <RotatingRole />
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {PROFILE.location}
                </p>
              </div>
            </motion.div>

            <motion.h1 {...settle(0.04)} className="mt-6 text-display-xl font-semibold text-ink">
              <span className="sr-only">{PROFILE.name}: </span>
              Complex data.
              <br />
              <span className="font-display font-normal italic bg-gradient-to-r from-violet-soft via-[#c7c2ff] to-cyan-soft bg-clip-text text-transparent pr-2">
                Clear decisions.
              </span>
            </motion.h1>

            <motion.p {...settle(0.08)} className="mt-6 max-w-[34rem] text-base sm:text-[17px] leading-relaxed text-zinc-300">
              {PROFILE.intro}
            </motion.p>

            <motion.div {...rise(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary group">
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a href={PROFILE.socials.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText className="h-4 w-4" aria-hidden="true" />
                View Resume
                <span className="sr-only">(PDF, opens in new tab)</span>
              </a>
            </motion.div>

            <motion.div {...rise(0.22)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="link-quiet">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="link-quiet">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
              <a href="#contact" className="link-quiet">
                <Mail className="h-4 w-4" aria-hidden="true" /> Contact
              </a>
            </motion.div>
          </div>

          {/* ── Data Core stage ── */}
          <div className="relative lg:col-span-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative mx-auto aspect-square w-full max-w-[360px] sm:max-w-[460px] lg:max-w-none lg:w-[110%] lg:-mr-[10%] lg:-my-6"
            >
              <DataCoreStage className="absolute inset-0" />

              {/* figure caption */}
              <p className="absolute right-[6%] top-[6%] hidden font-mono text-[10px] uppercase tracking-[0.2em] text-subtle lg:block">
                fig.01 — neural data core
              </p>

            </motion.div>
          </div>
        </div>

        <KpiStrip />
      </div>
    </section>
  );
}
