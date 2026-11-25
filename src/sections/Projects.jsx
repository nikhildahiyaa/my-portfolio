import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, Github } from "lucide-react";
import { Section, SectionHeader } from "../components/layout/Section";
import { SpotlightCard } from "../components/SpotlightCard";
import { Reveal } from "../components/Reveal";
import { CaseStudySheet } from "../components/CaseStudySheet";
import { DataGuardStack } from "../components/visuals/DataGuardStack";
import { VisualFrame } from "../components/visuals/VisualFrame";
import { ProjectCover, toneOf } from "../components/visuals";
import { CATEGORIES, FEATURED_PROJECTS, OTHER_PROJECTS } from "../data/projects";
import { EASE } from "../styles/tokens";

const COLLAPSED_COUNT = 3;
const matches = (p, cat) => cat === "All" || p.tags.includes(cat);

function Actions({ project, onOpen, size = "md" }) {
  const sm = size === "sm";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className={sm ? "btn h-9 px-3.5 text-[13px] border border-line-strong bg-white/[0.04] text-ink hover:bg-white/[0.09]" : "btn-primary"}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        {project.caseStudy ? "Case Study" : "Details"}
        <span className="sr-only">: {project.title}</span>
      </button>
      {project.links.code && (
        <a
          href={project.links.code}
          target="_blank"
          rel="noreferrer"
          className={sm ? "btn h-9 px-3.5 text-[13px] text-muted hover:text-ink" : "btn-ghost"}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <span className="sr-only">repository for {project.title} (opens in new tab)</span>
        </a>
      )}
    </div>
  );
}

/* ── DataGuard AI flagship showcase ── */
function Showcase({ project, onOpen }) {
  return (
    <Reveal>
      <article className="surface-elevated overflow-hidden rounded-panel" aria-labelledby="p-dataguard">
        {/* illuminated top edge */}
        <span className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent" aria-hidden="true" />
        <div className="grid lg:grid-cols-12">
          <VisualFrame className="lg:col-span-7 min-h-[420px] lg:min-h-[540px] border-b border-line lg:border-b-0 lg:border-r" label="Interactive · illustrative" labelTop>
            <DataGuardStack steps={project.caseStudy.architecture} className="pt-4" />
          </VisualFrame>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="eyebrow flex items-center gap-2">
              <span className="rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-violet-soft">Featured</span>
              {project.tags.slice(0, 2).join(" · ")}
            </p>
            <h3 id="p-dataguard" className="mt-5 text-display-md font-semibold text-ink">
              {project.title}
            </h3>
            <p className="mt-1 font-display text-xl italic text-zinc-300">Automated credit risk data quality monitoring</p>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-300">{project.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.details}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-surface p-4">
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">Dataset</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">~{project.metric}</dd>
                <dd className="text-xs text-muted">synthetic, with seeded anomalies</dd>
              </div>
              <div className="bg-surface p-4">
                <dt className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">Checks</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">PD · LGD · EAD</dd>
                <dd className="text-xs text-muted">ratings & duplicate borrowers</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
              {project.technologies.map((t) => (
                <li key={t} className="chip-mono">{t}</li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Actions project={project} onOpen={onOpen} />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── Featured card (asymmetric grid) ── */
function FeatureCard({ project, onOpen, wide }) {
  return (
    <SpotlightCard as="article" tilt tone={toneOf(project.id)} className="surface group flex h-full flex-col overflow-hidden" aria-labelledby={`p-${project.id}`}>
      <ProjectCover id={project.id} className={`border-b border-line ${wide ? "h-60 sm:h-64" : "h-60 sm:h-64"}`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 id={`p-${project.id}`} className="text-lg font-semibold leading-snug text-ink">{project.title}</h3>
          {project.metric && (
            <span className="shrink-0 rounded-full border border-line-strong bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-ink">
              {project.metric}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 5).map((t) => (
            <li key={t} className="chip-mono">{t}</li>
          ))}
          {project.technologies.length > 5 && <li className="chip-mono text-subtle">+{project.technologies.length - 5}</li>}
        </ul>
        <div className="mt-auto pt-5">
          <Actions project={project} onOpen={onOpen} size="sm" />
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Compact secondary card ── */
function CompactCard({ project, onOpen }) {
  return (
    <SpotlightCard as="article" tone={toneOf(project.id)} className="surface flex h-full flex-col overflow-hidden" aria-labelledby={`p-${project.id}`}>
      <ProjectCover id={project.id} className="h-36 border-b border-line" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] uppercase tracking-wider text-subtle">{project.tags.join(" · ")}</p>
          {project.metric && <span className="font-mono text-[11px] text-cyan-soft">{project.metric}</span>}
        </div>
        <h3 id={`p-${project.id}`} className="mt-2 text-[15px] font-semibold leading-snug text-ink">{project.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-auto pt-4">
          <Actions project={project} onOpen={onOpen} size="sm" />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(null);

  const featured = useMemo(() => FEATURED_PROJECTS.filter((p) => matches(p, cat)), [cat]);
  const others = useMemo(() => OTHER_PROJECTS.filter((p) => matches(p, cat)), [cat]);
  const showcase = featured.find((p) => p.id === "dataguard-ai");
  const grid = featured.filter((p) => p.id !== "dataguard-ai");
  // When a filter is active, every matching project is shown (collapse applies to "All" only).
  const collapsible = cat === "All" && others.length > COLLAPSED_COUNT;
  const visibleOthers = collapsible && !expanded ? others.slice(0, COLLAPSED_COUNT) : others;
  const total = featured.length + others.length;

  // asymmetric spans for the featured grid: 7/5 then 5/7
  const span = (i, n) => {
    if (n === 1) return "lg:col-span-12";
    const pattern = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
    return pattern[i % 4];
  };

  const item = reduce
    ? {}
    : { layout: true, initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.98 }, transition: { duration: 0.35, ease: EASE } };

  return (
    <Section id="projects" className="bg-[linear-gradient(180deg,transparent,rgba(17,17,27,0.6)_18%,rgba(17,17,27,0.6)_82%,transparent)]">
      <SectionHeader
        index="03"
        eyebrow="Projects"
        title="Selected work,"
        accent="built end to end."
        description="Credit risk tooling, forecasting, machine learning and automation. Visual covers are original illustrations, not screenshots."
      />

      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <div role="group" aria-label="Filter projects by category" className="inline-flex gap-1 rounded-full border border-line bg-surface/80 p-1">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  cat === c ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="proj-filter"
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-subtle" aria-live="polite">
          {total} {total === 1 ? "project" : "projects"}
        </p>
      </div>

      <LayoutGroup>
        {showcase && (
          <div className="mb-4">
            <Showcase project={showcase} onOpen={setOpen} />
          </div>
        )}

        {grid.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-12">
            <AnimatePresence mode="popLayout">
              {grid.map((p, i) => (
                <motion.div key={p.id} {...item} className={span(i, grid.length)}>
                  <FeatureCard project={p} onOpen={setOpen} wide={span(i, grid.length) !== "lg:col-span-5"} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-4">
              <p className="eyebrow">More projects</p>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
            <div id="more-projects" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visibleOthers.map((p) => (
                  <motion.div key={p.id} {...item}>
                    <CompactCard project={p} onOpen={setOpen} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {collapsible && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  aria-expanded={expanded}
                  aria-controls="more-projects"
                  className="btn-ghost"
                >
                  {expanded ? "Show fewer projects" : `Show all projects (${others.length - COLLAPSED_COUNT} more)`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}

        {total === 0 && (
          <p className="surface p-10 text-center text-sm text-muted">
            No projects match this filter.{" "}
            <button type="button" className="inline-flex items-center gap-1 text-ink underline underline-offset-4" onClick={() => setCat("All")}>
              Show all <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </p>
        )}
      </LayoutGroup>

      <CaseStudySheet project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
