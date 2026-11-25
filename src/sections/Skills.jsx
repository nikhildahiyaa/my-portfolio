import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BarChart3, BrainCircuit, Cloud, Code2, Database, Landmark, Sigma, Workflow } from "lucide-react";
import { Section, SectionHeader } from "../components/layout/Section";
import { Reveal } from "../components/Reveal";
import { SKILLS } from "../data/skills";
import { EXPERIENCE } from "../data/experience";
import { ALL_PROJECTS } from "../data/projects";
import { EASE } from "../styles/tokens";

const ICONS = {
  programming: Code2,
  ml: BrainCircuit,
  "data-engineering": Database,
  bi: BarChart3,
  "credit-risk": Landmark,
  stats: Sigma,
  "ai-automation": Workflow,
  "cloud-devops": Cloud,
};

// "Applied in" evidence, derived from technologies already listed on roles and projects.
function buildEvidence() {
  const map = new Map();
  const add = (tech, where) => {
    const k = tech.toLowerCase();
    if (!map.has(k)) map.set(k, []);
    if (!map.get(k).includes(where)) map.get(k).push(where);
  };
  EXPERIENCE.forEach((e) => e.technologies.forEach((t) => add(t, e.company.split(" — ")[0])));
  ALL_PROJECTS.forEach((p) => p.technologies.forEach((t) => add(t, p.title.split(" (")[0].split(" — ")[0])));
  return map;
}

/* Roving-tabindex keyboard support for a set of category buttons. */
function useRoving(count, index, onChange) {
  const refs = useRef([]);
  const onKeyDown = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (e.key in keys) next = (index + keys[e.key] + count) % count;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

/* Orbit constellation — category navigation on desktop. */
function Constellation({ active, onSelect }) {
  const reduce = useReducedMotion();
  const { refs, onKeyDown } = useRoving(SKILLS.length, active, onSelect);
  const nodes = SKILLS.map((s, i) => {
    const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
    return { ...s, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="sk-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sk-link" x1="0" x2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
        <g className={reduce ? "" : "origin-center animate-orbit"} style={{ transformBox: "fill-box" }}>
          <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" strokeDasharray="0.6 1.6" />
          <circle cx="78" cy="50" r="0.9" fill="#22D3EE" />
        </g>
        <circle cx="50" cy="50" r="20" fill="url(#sk-core)" />
        {nodes.map((n, i) => (
          <line
            key={n.id}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke={i === active ? "url(#sk-link)" : "rgba(255,255,255,0.08)"}
            strokeWidth={i === active ? 0.5 : 0.25}
            style={{ transition: "stroke .3s" }}
          />
        ))}
      </svg>

      {/* core */}
      <div className="absolute left-1/2 top-1/2 grid h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-shell/80 text-center shadow-raised backdrop-blur">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">Stack</p>
          <p className="text-lg font-semibold text-ink">{SKILLS.reduce((n, s) => n + s.items.length, 0)}</p>
        </div>
      </div>

      <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {nodes.map((n, i) => {
          const Icon = ICONS[n.id] ?? Code2;
          const on = i === active;
          return (
            <button
              key={n.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="skill-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(i)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl p-1 outline-offset-2`}
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 ${
                  on ? "border-violet/60 bg-violet/20 text-ink shadow-glow" : "border-line-strong bg-elevated text-muted group-hover:text-ink group-hover:border-white/25"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className={`max-w-[96px] text-center text-[11px] font-medium leading-tight transition-colors ${on ? "text-ink" : "text-muted group-hover:text-zinc-200"}`}>
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Chip tablist — category navigation on small screens. */
function CategoryChips({ active, onSelect }) {
  const { refs, onKeyDown } = useRoving(SKILLS.length, active, onSelect);
  return (
    <div className="-mx-5 overflow-x-auto px-5 no-scrollbar">
      <div role="tablist" aria-label="Skill categories" onKeyDown={onKeyDown} className="flex gap-2 pb-1">
        {SKILLS.map((s, i) => {
          const Icon = ICONS[s.id] ?? Code2;
          const on = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="skill-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(i)}
              className={`inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
                on ? "border-violet/50 bg-violet/15 text-ink" : "border-line bg-white/[0.03] text-muted"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const evidence = useMemo(buildEvidence, []);
  const group = SKILLS[active];
  const Icon = ICONS[group.id] ?? Code2;

  return (
    <Section id="skills">
      <SectionHeader
        index="04"
        eyebrow="Skills"
        title="A connected"
        accent="technology ecosystem."
        description="Eight disciplines, each linked to the roles and projects where it was applied. No ratings — just evidence."
      />

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="hidden lg:col-span-5 lg:block">
          <Constellation active={active} onSelect={setActive} />
        </Reveal>

        <div className="min-w-0 lg:col-span-7">
          <div className="mb-4 lg:hidden">
            <CategoryChips active={active} onSelect={setActive} />
          </div>

          <div id="skill-panel" role="tabpanel" aria-label={group.label} className="surface-elevated overflow-hidden p-5 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet/40 bg-violet/10 text-violet-soft">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{group.label}</h3>
                    <p className="mt-1 text-sm text-muted">{group.summary}</p>
                  </div>
                  <span className="ml-auto font-mono text-[11px] text-subtle">
                    {String(active + 1).padStart(2, "0")}/{String(SKILLS.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {group.items.map((skill) => {
                    const where = evidence.get(skill.toLowerCase());
                    return (
                      <li key={skill} className="rounded-xl border border-line bg-white/[0.025] px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
                        <p className="text-[15px] font-medium text-ink">{skill}</p>
                        {where && (
                          <p className="mt-1 line-clamp-2 font-mono text-[11px] leading-relaxed text-subtle" title={where.join(", ")}>
                            Applied in: {where.join(" · ")}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Full index — every skill visible and indexable without interaction */}
      <Reveal className="mt-10">
        <div className="rounded-card border border-line p-5 sm:p-6">
          <p className="eyebrow mb-5">Full index</p>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((s, i) => (
              <div key={s.id}>
                <dt>
                  <button type="button" onClick={() => setActive(i)} className="-my-1.5 py-1.5 text-left text-[13px] font-semibold text-zinc-200 hover:text-ink">
                    {s.label}
                  </button>
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-muted">{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
