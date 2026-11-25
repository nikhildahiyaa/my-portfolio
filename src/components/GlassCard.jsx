export function GlassCard({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
