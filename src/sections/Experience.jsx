import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { Section, SectionHeader } from "../components/layout/Section";
import { SpotlightCard } from "../components/SpotlightCard";
import { EXPERIENCE } from "../data/experience";
import { EASE, VIEWPORT } from "../styles/tokens";

const VISIBLE_BULLETS = 4;
const VISIBLE_TAGS = 6;

// Presentation-only formatting: "January 2026 – June 2026" → ["Jan 2026", "Jun 2026"]
const shortDate = (s) => s.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/g, (m) => m.slice(0, 3));
const splitPeriod = (p) => shortDate(p).split(/\s*[–-]\s*/);

function Role({ exp, index, last }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const recent = index === 0;
  const [start, end] = splitPeriod(exp.period);
  const extraBullets = exp.bullets.slice(VISIBLE_BULLETS);
  const extraTags = exp.technologies.slice(VISIBLE_TAGS);
  const hasMore = extraBullets.length > 0 || extraTags.length > 0;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE, delay: Math.min(index * 0.05, 0.2) }}
      className="relative grid grid-cols-[36px_1fr] gap-x-3 sm:gap-x-4 sm:grid-cols-[120px_52px_1fr] sm:gap-x-5 lg:grid-cols-[150px_56px_1fr]"
    >
      {/* dates (desktop column) */}
      <div className="hidden pt-5 text-right sm:block">
        <p className="font-mono text-[12px] text-ink">{end}</p>
        <p className="font-mono text-[12px] text-subtle">{start}</p>
        <p className="mt-2 inline-block rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">{exp.type}</p>
      </div>

      {/* rail + monogram */}
      <div className="relative flex justify-center">
        {!last && (
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute top-14 bottom-[-12px] w-px origin-top bg-gradient-to-b from-violet/50 via-line-strong to-line"
          />
        )}
        <span
          className={`relative mt-4 grid h-9 w-9 place-items-center rounded-xl border font-mono text-[10px] sm:text-[11px] sm:rounded-2xl font-medium tracking-tight sm:h-12 sm:w-12 ${
            recent ? "border-violet/50 bg-violet/15 text-ink shadow-glow" : "border-line-strong bg-elevated text-zinc-200"
          }`}
          aria-hidden="true"
        >
          {exp.monogram}
        </span>
      </div>

      {/* content */}
      <div className="pb-3 sm:pb-4 col-start-2 sm:col-start-3">
        <SpotlightCard
          className={`${recent ? "surface-elevated" : "surface"} p-5 sm:p-6`}
          tone={recent ? "139,92,246" : "99,102,241"}
        >
          {recent && (
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent" aria-hidden="true" />
          )}
          <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h3 className="text-[17px] font-semibold leading-snug text-ink sm:text-lg">{exp.role}</h3>
              <p className="mt-0.5 text-[15px] text-zinc-300">{exp.company}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-subtle sm:flex-col sm:items-end sm:gap-1 sm:pt-1">
              <span className="sm:hidden text-zinc-300">{start} – {end}</span>
              <span className="sm:hidden uppercase">{exp.type}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {exp.location}
              </span>
              {recent && <span className="text-violet-soft">Most recent role</span>}
            </div>
          </header>

          <ul className="mt-4 space-y-2">
            {exp.bullets.slice(0, VISIBLE_BULLETS).map((b) => (
              <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-zinc-300">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet-soft" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="more"
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                {extraBullets.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {extraBullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-zinc-300">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-500" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {(open ? exp.technologies : exp.technologies.slice(0, VISIBLE_TAGS)).map((t) => (
                <li key={t} className="chip-mono">{t}</li>
              ))}
              {!open && extraTags.length > 0 && <li className="chip-mono text-subtle">+{extraTags.length}</li>}
            </ul>
            {hasMore && (
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={panelId}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-2 py-1 text-[13px] font-medium text-zinc-300 transition-colors hover:text-ink sm:self-auto"
              >
                {open ? "Hide details" : "View details"}
                {!open && extraBullets.length > 0 && <span className="font-mono text-[11px] text-subtle">+{extraBullets.length}</span>}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            )}
          </div>
        </SpotlightCard>
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Professional"
        accent="journey."
        description={`${EXPERIENCE.length} roles in reverse chronological order. Expand any role for full responsibilities and tooling.`}
      />
      <ol className="mx-auto max-w-[1120px]">
        {EXPERIENCE.map((exp, i) => (
          <Role key={exp.id} exp={exp} index={i} last={i === EXPERIENCE.length - 1} />
        ))}
      </ol>
    </Section>
  );
}
