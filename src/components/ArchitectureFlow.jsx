/**
 * Connected node flow for a pipeline architecture (data from projects.js).
 * 3-column snake on desktop, vertical on mobile. Descriptions are always visible —
 * no hover-only information.
 */
export function ArchitectureFlow({ steps }) {
  return (
    <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Pipeline steps in order">
      {steps.map((s, i) => (
        <li key={s.step} className="relative flex gap-3 rounded-2xl border border-line bg-gradient-to-b from-white/[0.035] to-transparent p-4">
          <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-violet/40 bg-violet/10 font-mono text-[11px] text-violet-soft">
            {String(s.step).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">{s.name}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.description}</p>
          </div>
          {i < steps.length - 1 && (
            <span
              className="absolute -bottom-3 left-8 h-3 w-px bg-gradient-to-b from-violet/60 to-transparent sm:hidden"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
