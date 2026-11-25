import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Check, Github, Sparkles, X } from "lucide-react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { ProjectCover } from "./visuals";
import { VisualFrame } from "./visuals/VisualFrame";
import { DataGuardStack } from "./visuals/DataGuardStack";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { EASE } from "../styles/tokens";

function Block({ title, children, className = "" }) {
  return (
    <section className={className}>
      <h3 className="eyebrow mb-3 text-zinc-400">{title}</h3>
      {children}
    </section>
  );
}

function Steps({ items }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5 rounded-xl border border-line bg-white/[0.02] p-3.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-violet/15 font-mono text-[11px] text-violet-soft">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed text-zinc-200">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function List({ items, icon: Icon, tone = "text-zinc-400" }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
          <Icon className={`mt-[3px] h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudySheet({ project, onClose }) {
  const reduce = useReducedMotion();
  const panel = useRef(null);
  const isOpen = !!project;
  useFocusTrap(panel, isOpen, onClose);

  // Lock page scroll while open (compensate scrollbar width to avoid layout shift).
  useEffect(() => {
    if (!isOpen) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const prev = { o: document.body.style.overflow, p: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    if (sbw) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = prev.o;
      document.body.style.paddingRight = prev.p;
    };
  }, [isOpen]);

  const cs = project?.caseStudy;
  const isDG = project?.id === "dataguard-ai";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-title"
            initial={reduce ? { opacity: 0 } : { x: "6%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "6%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative flex h-full w-full max-w-[1040px] flex-col overflow-y-auto overscroll-contain border-l border-line-strong bg-[#0a0a12] shadow-raised sm:m-3 sm:h-[calc(100%-1.5rem)] sm:rounded-[28px] sm:border"
          >
            {/* sticky bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-[#0a0a12]/85 px-5 py-3 backdrop-blur-xl sm:px-8">
              <p className="eyebrow truncate">{cs ? "Case study" : "Project"} · {project.tags.join(" · ")}</p>
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-white/5 hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* hero band */}
            <div className="relative">
              {isDG ? (
                <VisualFrame className="h-[440px] sm:h-[480px]" label="Interactive · illustrative" labelTop>
                  <DataGuardStack steps={cs.architecture} className="mx-auto max-w-[620px] pt-2" />
                </VisualFrame>
              ) : (
                <ProjectCover id={project.id} className="h-56 sm:h-72" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a12] to-transparent" />
            </div>

            <div className="px-5 pb-12 sm:px-8 lg:px-12">
              <header className={`relative ${isDG ? "mt-6" : "-mt-6"}`}>
                <h2 id="cs-title" className="text-display-md font-semibold text-ink lg:text-[2.5rem]">
                  {project.fullTitle ?? project.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-[17px]">{project.summary}</p>
              </header>

              <div className="mt-10 grid gap-10 lg:grid-cols-12">
                {/* main column */}
                <div className="space-y-10 lg:col-span-8">
                  {cs ? (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Block title="Business problem" className="surface p-5">
                          <p className="text-sm leading-relaxed text-zinc-300">{cs.businessProblem}</p>
                        </Block>
                        <Block title="Objective" className="surface p-5">
                          <p className="text-sm leading-relaxed text-zinc-300">{cs.objective}</p>
                        </Block>
                      </div>

                      {cs.architecture && (
                        <Block title="Architecture">
                          <ArchitectureFlow steps={cs.architecture} />
                        </Block>
                      )}

                      {cs.dataset && (
                        <Block title="Dataset">
                          <p className="text-[15px] leading-relaxed text-zinc-300">{cs.dataset}</p>
                        </Block>
                      )}

                      {cs.validationRules?.length > 0 && (
                        <Block title="Validation rules">
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {cs.validationRules.map((r) => (
                              <li key={r} className="flex gap-2.5 rounded-xl border border-line bg-white/[0.02] p-3 text-sm text-zinc-300">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </Block>
                      )}

                      {cs.methodology?.length > 0 && (
                        <Block title="Approach">
                          <Steps items={cs.methodology} />
                        </Block>
                      )}

                      {cs.results?.length > 0 && (
                        <Block title="Results">
                          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-violet/25 bg-violet/[0.04]">
                            {cs.results.map((r) => (
                              <li key={r} className="flex gap-3 p-4 text-[15px] leading-relaxed text-ink">
                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-violet-soft" aria-hidden="true" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </Block>
                      )}

                      <div className="grid gap-8 sm:grid-cols-2">
                        {cs.limitations?.length > 0 && (
                          <Block title="Limitations">
                            <List items={cs.limitations} icon={AlertTriangle} tone="text-amber-300/80" />
                          </Block>
                        )}
                        {cs.futureEnhancements?.length > 0 && (
                          <Block title="Future enhancements">
                            <List items={cs.futureEnhancements} icon={Sparkles} tone="text-cyan-soft" />
                          </Block>
                        )}
                      </div>
                    </>
                  ) : (
                    <Block title="Overview">
                      <p className="text-[15px] leading-relaxed text-zinc-300">{project.details}</p>
                    </Block>
                  )}
                </div>

                {/* side column */}
                <aside className="lg:col-span-4">
                  <div className="surface-elevated space-y-6 p-5 lg:sticky lg:top-20">
                    {project.metric && (
                      <div>
                        <p className="eyebrow">Headline</p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{project.metric}</p>
                      </div>
                    )}
                    {cs && project.details && (
                      <div>
                        <p className="eyebrow">In brief</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.details}</p>
                      </div>
                    )}
                    <div>
                      <p className="eyebrow">Technology stack</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <li key={t} className="chip-mono">{t}</li>
                        ))}
                      </ul>
                    </div>
                    {project.links.code && (
                      <a href={project.links.code} target="_blank" rel="noreferrer" className="btn-primary w-full">
                        <Github className="h-4 w-4" aria-hidden="true" />
                        View repository
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
