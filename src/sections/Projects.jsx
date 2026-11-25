import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, BookOpen, Filter } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { TiltCard } from "../components/TiltCard";
import { Reveal } from "../components/Reveal";
import { Badge } from "../components/ui/badge";
import { ProjectModal } from "../components/ProjectModal";
import {
  FEATURED_PROJECTS,
  OTHER_PROJECTS,
  CATEGORIES,
  FALLBACK_COVER,
} from "../data/projects";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-indigo-500 to-cyan-500" />
    </div>
  );
}

function ProjectCard({ project, large = false, onCaseStudy }) {
  const coverStyle = project.cover
    ? {}
    : { background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)" };

  return (
    <TiltCard className="h-full">
      <GlassCard className="overflow-hidden hover:border-white/20 transition-colors duration-200 h-full flex flex-col">
        {/* Cover image or gradient */}
        <div className={`relative ${large ? "h-52 sm:h-56" : "h-40"}`} style={coverStyle}>
          {project.cover && (
            <img
              src={project.cover}
              alt=""
              role="presentation"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_COVER;
              }}
            />
          )}
          {!project.cover && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-black text-indigo-400/20 select-none uppercase tracking-tighter">
                {project.title.split(" ").slice(0, 2).join("")}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
          {project.metric && (
            <span className="absolute top-3 right-3 rounded-full bg-indigo-600/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white shadow-lg">
              {project.metric}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <p className="font-semibold text-slate-100 text-sm sm:text-base leading-snug">
              {project.title}
            </p>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{project.summary}</p>
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge
                key={t}
                className="rounded-full bg-white/5 border-white/10 text-slate-300 text-xs py-0.5"
              >
                {t}
              </Badge>
            ))}
          </div>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs text-slate-500">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>

          {/* Business problem snippet */}
          {project.caseStudy?.businessProblem && (
            <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">
              {project.caseStudy.businessProblem}
            </p>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 pt-2 border-t border-white/5 mt-auto">
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                Code
              </a>
            )}
            {project.caseStudy && (
              <button
                onClick={() => onCaseStudy(project)}
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-indigo-300 transition-colors"
                aria-label={`View ${project.title} case study`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Case Study
              </button>
            )}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  );
}

export function Projects() {
  const [cat, setCat] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredFeatured = useMemo(
    () =>
      cat === "All"
        ? FEATURED_PROJECTS
        : FEATURED_PROJECTS.filter((p) => p.tags.some((t) => t === cat)),
    [cat]
  );

  const filteredOther = useMemo(
    () =>
      cat === "All"
        ? OTHER_PROJECTS
        : OTHER_PROJECTS.filter((p) => p.tags.some((t) => t === cat)),
    [cat]
  );

  return (
    <section id="projects" className="scroll-mt-20 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Projects"
          subtitle="Data science, analytics and AI projects spanning credit risk, forecasting, machine learning and automation."
        />

        {/* Filter bar */}
        <div className="sticky top-16 z-30 mb-8">
          <div className="backdrop-blur-md bg-slate-950/70 border border-white/5 rounded-xl p-2">
            <div
              className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter projects by category"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  role="tab"
                  aria-selected={cat === c}
                  className={
                    "shrink-0 rounded-full px-3.5 py-1.5 text-sm border transition-colors duration-150 " +
                    (cat === c
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10")
                  }
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Filter className="h-3 w-3 hidden sm:inline opacity-60" aria-hidden="true" />
                    {c}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured Projects ── */}
        {filteredFeatured.length > 0 && (
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-indigo-400 mb-5 font-medium">
              Featured Projects
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredFeatured[0]?.id === "dataguard-ai" ? (
                <>
                  <div className="lg:col-span-2">
                    <Reveal>
                      <ProjectCard
                        project={filteredFeatured[0]}
                        large
                        onCaseStudy={setActiveProject}
                      />
                    </Reveal>
                  </div>
                  {filteredFeatured.slice(1).map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.07}>
                      <ProjectCard project={p} onCaseStudy={setActiveProject} />
                    </Reveal>
                  ))}
                </>
              ) : (
                filteredFeatured.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.07}>
                    <ProjectCard project={p} onCaseStudy={setActiveProject} />
                  </Reveal>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── All Other Projects ── */}
        {filteredOther.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-5 font-medium">
              All Projects
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredOther.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <ProjectCard project={p} onCaseStudy={setActiveProject} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredFeatured.length === 0 && filteredOther.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No projects match the selected filter.
          </div>
        )}
      </div>

      {/* Case study modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
