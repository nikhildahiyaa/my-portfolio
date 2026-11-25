import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { DataGuardArchitecture } from "./DataGuardArchitecture";

/** Trap keyboard focus within `containerRef` while `isOpen` is true. */
function useFocusTrap(containerRef, isOpen) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const el = containerRef.current;
    const focusable = el.querySelectorAll(
      'button, [href], input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function onKeyDown(e) {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) { e.preventDefault(); return; }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [containerRef, isOpen]);
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 text-sm text-slate-300">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <ArrowRight className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useFocusTrap(containerRef, !!project);

  // Store trigger so we can restore focus on close
  useEffect(() => {
    if (project) {
      triggerRef.current = document.activeElement;
    } else {
      triggerRef.current?.focus();
    }
  }, [!!project]);

  // Close on Escape
  useEffect(() => {
    if (!project) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [!!project]);

  const cs = project?.caseStudy;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.fullTitle} case study`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" aria-hidden="true" />

          {/* Modal panel */}
          <motion.div
            ref={containerRef}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 pb-4 border-b border-white/5 bg-slate-900/95 backdrop-blur-md">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">
                  {project.fullTitle}
                </h2>
                <p className="text-sm text-slate-400 mt-1">{project.summary}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-0">

              {/* Business Problem */}
              {cs?.businessProblem && (
                <Section title="Business Problem">
                  <p className="text-sm text-slate-300 leading-relaxed">{cs.businessProblem}</p>
                </Section>
              )}

              {/* Objective */}
              {cs?.objective && (
                <Section title="Objective">
                  <p className="text-sm text-slate-300 leading-relaxed">{cs.objective}</p>
                </Section>
              )}

              {/* Architecture (DataGuard AI) */}
              {project.id === "dataguard-ai" && cs?.architecture && (
                <Section title="">
                  <DataGuardArchitecture />
                </Section>
              )}

              {/* Dataset */}
              {cs?.dataset && (
                <Section title="Dataset">
                  <p className="text-sm text-slate-300 leading-relaxed">{cs.dataset}</p>
                </Section>
              )}

              {/* Validation Rules (DataGuard AI) */}
              {cs?.validationRules && cs.validationRules.length > 0 && (
                <Section title="Validation Rules">
                  <BulletList items={cs.validationRules} />
                </Section>
              )}

              {/* Methodology */}
              {cs?.methodology && cs.methodology.length > 0 && (
                <Section title="Methodology">
                  <BulletList items={cs.methodology} />
                </Section>
              )}

              {/* Results */}
              {cs?.results && cs.results.length > 0 && (
                <Section title="Results">
                  <BulletList items={cs.results} />
                </Section>
              )}

              {/* Technology Stack */}
              <Section title="Technology Stack">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Badge
                      key={t}
                      className="rounded-full bg-indigo-500/10 border-indigo-500/30 text-indigo-200 text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </Section>

              {/* Limitations */}
              {cs?.limitations && cs.limitations.length > 0 && (
                <Section title="Limitations">
                  <BulletList items={cs.limitations} />
                </Section>
              )}

              {/* Future Enhancements */}
              {cs?.futureEnhancements && cs.futureEnhancements.length > 0 && (
                <Section title="Future Enhancements">
                  <BulletList items={cs.futureEnhancements} />
                </Section>
              )}

              {/* Repository link */}
              {project.links.code ? (
                <div className="pt-2 border-t border-white/5">
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 transition-colors"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View on GitHub
                  </a>
                </div>
              ) : project.id === "dataguard-ai" ? (
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs text-slate-500 italic">
                    GitHub repository link to be confirmed before publication.
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
