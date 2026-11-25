import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "../../styles/tokens";

/**
 * Section shell — consistent compact rhythm (40px mobile / 56px desktop per side)
 * and the 1360px container.
 */
export function Section({ id, className = "", innerClassName = "", children, ...props }) {
  return (
    <section id={id} className={`relative py-10 sm:py-12 lg:py-14 ${className}`} {...props}>
      <div className={`shell ${innerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * Editorial section header. `title` is plain text; `accent` renders in
 * Instrument Serif italic. Optional `aside` sits on the right on desktop.
 */
export function SectionHeader({ index, eyebrow, title, accent, description, aside, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE }}
      className={`mb-8 lg:mb-10 grid gap-5 lg:grid-cols-12 lg:items-end ${className}`}
    >
      <div className="lg:col-span-7">
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-violet-soft">{index}</span>}
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-4 text-display-lg font-semibold text-ink">
          {title}{" "}
          {accent && <span className="font-display font-normal italic text-zinc-300">{accent}</span>}
        </h2>
      </div>
      {(description || aside) && (
        <div className="lg:col-span-5 lg:justify-self-end lg:text-right">
          {description && <p className="text-[15px] leading-relaxed text-muted max-w-md lg:ml-auto">{description}</p>}
          {aside}
        </div>
      )}
    </motion.header>
  );
}
