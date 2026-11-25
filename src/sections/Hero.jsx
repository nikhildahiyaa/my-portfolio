import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ChevronDown, MapPin, GraduationCap } from "lucide-react";
import HeroCanvas from "../components/HeroCanvas";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { PROFILE } from "../data/profile";

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((w) => (w + 1) % PROFILE.roleWords.length),
      1900
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="scroll-mt-20 py-20 sm:py-28 relative overflow-hidden min-h-[88vh] flex items-center"
    >
      <HeroCanvas />

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* ── Left: text content ── */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                {PROFILE.headline}
              </span>
            </h1>

            {/* Name */}
            <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-100">
              {PROFILE.name}
            </p>

            {/* Animated role word */}
            <div className="h-8 mt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={PROFILE.roleWords[wordIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="text-base sm:text-lg text-indigo-300 font-medium"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {PROFILE.roleWords[wordIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Intro paragraph */}
            <p className="mt-5 text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed">
              {PROFILE.intro}
            </p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 transition-colors"
              >
                Explore My Work <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.socials.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-slate-100 hover:bg-white/15 text-sm font-medium px-5 py-2.5 transition-colors"
                aria-label="Download resume PDF"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" /> Resume
              </a>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-slate-100 hover:bg-white/15 text-sm font-medium px-4 py-2.5 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-cyan-300 hover:bg-white/15 text-sm font-medium px-4 py-2.5 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 text-fuchsia-300 hover:bg-white/15 text-sm font-medium px-4 py-2.5 transition-colors"
                aria-label={`Email ${PROFILE.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Contact
              </a>
            </div>

            {/* Hero stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PROFILE.heroStats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col border-l-2 border-indigo-500/40 pl-3"
                >
                  <span className="text-xl font-bold text-indigo-300">{s.value}</span>
                  <span className="text-xs font-medium text-slate-300 mt-0.5">{s.label}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{s.context}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: profile card ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="shrink-0 w-full lg:w-64"
          >
            <GlassCard className="p-6 flex flex-col items-center text-center gap-4">
              {/* Profile photo */}
              <div className="h-44 w-44 rounded-full overflow-hidden ring-2 ring-indigo-500/30">
                <img
                  src="/IMG_9302.jpg"
                  alt="Nikhil Dahiya"
                  className="h-full w-full object-cover object-top"
                  fetchpriority="high"
                  width="176"
                  height="176"
                />
              </div>

              {/* Info */}
              <div className="space-y-2 w-full">
                <p className="font-semibold text-slate-100 text-lg">{PROFILE.name}</p>
                <p className="text-sm text-indigo-300 font-medium">
                  Data Science · Analytics · AI
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {PROFILE.location}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <GraduationCap className="h-3 w-3 shrink-0" aria-hidden="true" />
                  BSc Data Science, SFU · 2025
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-center gap-4">
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-slate-400 hover:text-fuchsia-300 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
