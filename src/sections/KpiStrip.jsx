import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "../data/profile";
import { EASE } from "../styles/tokens";

/** One understated, hairline-separated strip of verified highlights. */
export function KpiStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.dl
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
      className="relative mt-8 lg:mt-6 grid grid-cols-2 lg:grid-cols-4 border-y border-line"
      aria-label="Selected highlights"
    >
      {/* fine illuminated top edge */}
      <span className="pointer-events-none absolute -top-px left-0 h-px w-2/5 bg-gradient-to-r from-transparent via-violet/70 to-transparent" aria-hidden="true" />
      {PROFILE.heroStats.map((s, i) => (
        <div
          key={s.label}
          className={[
            "flex flex-col gap-1 px-1 py-5 sm:px-5 lg:py-6",
            i % 2 === 1 ? "pl-4 border-l border-line" : "",
            i >= 2 ? "border-t border-line lg:border-t-0" : "",
            i === 2 ? "lg:border-l lg:pl-5" : "",
            i === 0 ? "sm:pl-0 lg:pl-0" : "",
          ].join(" ")}
        >
          <dt className="order-2 text-sm font-medium text-zinc-200">{s.label}</dt>
          <dd className="order-1 text-[28px] sm:text-[34px] font-semibold leading-none tracking-tight text-ink tabular-nums">
            {s.value}
          </dd>
          <dd className="order-3 font-mono text-[11px] uppercase tracking-wider text-subtle">{s.context}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
