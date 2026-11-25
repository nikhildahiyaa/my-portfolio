/**
 * Frame for project illustrations: layered backdrop, hairline grid and a
 * clear "Illustrative" tag so conceptual art is never mistaken for a
 * screenshot or real model output.
 */
export function VisualFrame({ children, className = "", tone = "139,92,246", label = "Illustrative", showLabel = true, labelTop = false }) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-[#0a0a12] ${className}`}
      style={{
        backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(${tone},0.16), transparent 70%)`,
      }}
    >
      <div className="absolute inset-0 -z-10 grid-texture opacity-70" aria-hidden="true" />
      {children}
      {showLabel && (
        <span className={`absolute ${labelTop ? "top-3" : "bottom-2.5"} right-3 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-zinc-400 backdrop-blur`}>
          {label}
        </span>
      )}
    </div>
  );
}
