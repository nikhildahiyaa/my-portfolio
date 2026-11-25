import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import { Badge } from "../components/ui/badge";
import { EXPERIENCE } from "../data/experience";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

const TYPE_STYLES = {
  Contract:   "bg-amber-500/10 border-amber-500/30 text-amber-300",
  Research:   "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  "Co-op":    "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  Internship: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300",
};

const DOT_STYLES = {
  indigo:  "bg-indigo-400 shadow-indigo-400/30",
  cyan:    "bg-cyan-400 shadow-cyan-400/30",
  fuchsia: "bg-fuchsia-400 shadow-fuchsia-400/30",
};

const RAIL_STYLES = {
  indigo:  "border-indigo-500/40",
  cyan:    "border-cyan-500/40",
  fuchsia: "border-fuchsia-500/40",
};

const COMPANY_STYLES = {
  indigo:  "text-indigo-300",
  cyan:    "text-cyan-300",
  fuchsia: "text-fuchsia-300",
};

function TimelineEntry({ exp, index }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative flex gap-5 sm:gap-7"
      initial={shouldReduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center pt-1.5">
        {/* Dot */}
        <div
          className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-lg ${DOT_STYLES[exp.accent] ?? "bg-indigo-400 shadow-indigo-400/30"}`}
          aria-hidden="true"
        />
        {/* Connecting line */}
        <div
          className={`w-px flex-1 mt-2 border-l-2 border-dashed ${RAIL_STYLES[exp.accent] ?? "border-indigo-500/40"}`}
          aria-hidden="true"
        />
      </div>

      {/* Card */}
      <div className="flex-1 pb-8">
        <GlassCard className="p-5 sm:p-6 hover:border-white/20 transition-colors duration-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-semibold text-slate-100 text-base sm:text-lg leading-tight">
                  {exp.role}
                </p>
                <span
                  className={
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border " +
                    (TYPE_STYLES[exp.type] ?? "bg-white/5 border-white/10 text-slate-300")
                  }
                >
                  {exp.type}
                </span>
              </div>
              <p className={`text-sm font-medium ${COMPANY_STYLES[exp.accent] ?? "text-indigo-300"}`}>
                {exp.company}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-xs text-slate-400">{exp.period}</p>
              <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-2 text-sm text-slate-400 mb-4">
            {exp.bullets.map((b, j) => (
              <li key={j} className="flex gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500/60 shrink-0"
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {exp.technologies.map((tech) => (
              <Badge
                key={tech}
                className="rounded-full bg-white/5 border-white/10 text-slate-300 text-xs py-0.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Experience"
          subtitle="Professional work history in reverse chronological order."
        />

        <div>
          {EXPERIENCE.map((exp, i) => (
            <TimelineEntry key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
