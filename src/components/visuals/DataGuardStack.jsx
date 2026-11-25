import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { box, iso, pts } from "./iso";

// Visual treatment per pipeline layer (content comes from projects.js architecture).
const STYLE = [
  { hue: "161,161,170", motif: "records" }, // Synthetic data
  { hue: "99,102,241", motif: "table" }, // PostgreSQL
  { hue: "192,132,252", motif: "workflow" }, // n8n
  { hue: "34,211,238", motif: "checks" }, // FastAPI validation
  { hue: "129,140,248", motif: "anomalies" }, // Anomaly store
  { hue: "139,92,246", motif: "dashboard" }, // Streamlit
];

const O = { cx: 226, cy: 302, s: 1 }; // base slab front corner sits near the bottom
const W = 150;
const GAP = 50;
const T = 10; // slab thickness

function Motif({ kind, z, hue, on }) {
  const P = (x, y) => iso(x, y, z + T + 0.5, O);
  const c = `rgba(${hue},${on ? 0.95 : 0.6})`;
  switch (kind) {
    case "records": {
      const out = [];
      for (let i = 0; i < 6; i++)
        for (let j = 0; j < 6; j++) {
          const [x, y] = P(22 + i * 21, 22 + j * 21);
          const flag = (i === 4 && j === 1) || (i === 1 && j === 4) || (i === 3 && j === 3);
          out.push(<circle key={`${i}${j}`} cx={x} cy={y} r={flag ? 2.6 : 1.8} fill={flag ? "#FBBF24" : c} opacity={flag ? 0.95 : 0.7} />);
        }
      return <g>{out}</g>;
    }
    case "table":
      return (
        <g stroke={c} strokeWidth="1.4" strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((r) => {
            const a = P(24, 26 + r * 24);
            const b = P(126, 26 + r * 24);
            return <line key={r} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} opacity={r === 0 ? 1 : 0.55} />;
          })}
        </g>
      );
    case "workflow": {
      const n = [P(36, 40), P(75, 110), P(114, 40), P(114, 110)];
      return (
        <g>
          <polyline points={pts([n[0], n[1], n[2], n[3]])} fill="none" stroke={c} strokeWidth="1.4" />
          {n.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#0a0a12" stroke={c} strokeWidth="1.6" />
          ))}
        </g>
      );
    }
    case "checks":
      return (
        <g>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((k) => {
              const [x, y] = P(30 + k * 28, 30 + r * 28);
              const bad = (r === 1 && k === 2) || (r === 3 && k === 0);
              return <circle key={`${r}${k}`} cx={x} cy={y} r="3.2" fill={bad ? "#FBBF24" : c} opacity={bad ? 1 : 0.75} />;
            })
          )}
        </g>
      );
    case "anomalies":
      return (
        <g strokeLinecap="round">
          {[0, 1, 2, 3].map((r) => {
            const a = P(30, 30 + r * 28);
            const b = P(118, 30 + r * 28);
            const flag = r === 1 || r === 3;
            return <line key={r} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={flag ? "#FBBF24" : c} strokeWidth={flag ? 2.2 : 1.4} opacity={flag ? 0.9 : 0.5} />;
          })}
        </g>
      );
    case "dashboard":
    default: {
      const bars = [0.4, 0.7, 0.5, 0.9, 0.6];
      return (
        <g>
          {bars.map((h, i) => {
            const x = 28 + i * 22;
            const f = box(x, 92, z + T, 12, 12, h * 34, O);
            return (
              <g key={i}>
                <polygon points={f.left} fill={`rgba(${hue},0.35)`} />
                <polygon points={f.right} fill={`rgba(${hue},0.55)`} />
                <polygon points={f.top} fill={`rgba(${hue},0.95)`} />
              </g>
            );
          })}
          <polyline points={pts([P(26, 40), P(58, 30), P(90, 52), P(124, 24)])} fill="none" stroke="#22D3EE" strokeWidth="1.6" />
        </g>
      );
    }
  }
}

export function DataGuardStack({ steps, className = "" }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(steps.length - 1);
  const [auto, setAuto] = useState(!reduce);

  // Gentle auto-advance (bottom → top, following data flow) until the user interacts.
  useEffect(() => {
    if (!auto || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [auto, reduce, steps.length]);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };

  const zOf = (i) => i * GAP;
  const spine = [iso(W / 2, W / 2, 0, O), iso(W / 2, W / 2, zOf(steps.length - 1) + T, O)];
  const step = steps[active];

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <svg viewBox="0 0 540 470" className="w-full flex-1" role="group" aria-label="DataGuard AI pipeline layers. Select a layer to see what it does.">
        <defs>
          <linearGradient id="dg-spine" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* data-flow spine behind the slabs */}
        <line x1={spine[0][0]} y1={spine[0][1]} x2={spine[1][0]} y2={spine[1][1]} stroke="url(#dg-spine)" strokeWidth="1.5" strokeDasharray="3 5" className="animate-dash" />

        {steps.map((s, i) => {
          const z = zOf(i);
          const on = i === active;
          const { hue, motif } = STYLE[i] ?? STYLE[0];
          const f = box(0, 0, z, W, W, T, O);
          const anchor = iso(W, 0, z + T / 2, O);
          return (
            <g
              key={s.step}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={`Layer ${s.step}: ${s.name}`}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(i))}
              className="cursor-pointer outline-none [&:focus-visible>polygon:first-child]:stroke-cyan"
              style={{ transform: `translateY(${on ? -8 : 0}px)`, transition: "transform .45s cubic-bezier(.22,1,.36,1)" }}
            >
              <polygon points={f.top} fill={`rgba(${hue},${on ? 0.2 : 0.07})`} stroke={`rgba(${hue},${on ? 0.95 : 0.35})`} strokeWidth="1.2" />
              <polygon points={f.left} fill={`rgba(${hue},${on ? 0.32 : 0.12})`} />
              <polygon points={f.right} fill={`rgba(${hue},${on ? 0.45 : 0.18})`} />
              <Motif kind={motif} z={z} hue={hue} on={on} />
              {/* label with leader line */}
              <line x1={anchor[0] + 4} y1={anchor[1]} x2={398} y2={anchor[1]} stroke={`rgba(255,255,255,${on ? 0.35 : 0.1})`} strokeDasharray="2 3" />
              <text x={404} y={anchor[1] - 2} className="font-mono" fontSize="11" fill={on ? "#F4F4F5" : "#8E8E99"} letterSpacing="0.06em">
                {String(s.step).padStart(2, "0")}
              </text>
              <text x={428} y={anchor[1] - 2} fontSize="13" fontWeight="600" fill={on ? "#F4F4F5" : "#A1A1AA"}>
                {s.name.replace(" Anomaly Storage", "").replace(" Engine", "").replace(" Dashboard", "").replace(" Workflow", "")}
              </text>
              <text x={404} y={anchor[1] + 13} fontSize="10.5" fill="#8E8E99" className="font-mono">
                {["source", "storage", "orchestration", "validation", "anomaly store", "monitoring"][i]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mx-4 mb-4 sm:mx-6 sm:mb-6 min-h-[76px] rounded-2xl border border-line bg-black/30 p-3.5 backdrop-blur" aria-live="polite">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
          Step {step.step} · {step.name}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-300">{step.description}</p>
      </div>
    </div>
  );
}
