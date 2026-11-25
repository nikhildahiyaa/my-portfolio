import { memo } from "react";
import { gauss, seeded } from "./iso";

// Decorative: noisy observations with a smooth fitted signal — "data → insight".
const rand = seeded(42);
const W = 260, H = 128;
const f = (x) => 64 - 34 * Math.sin((x / W) * Math.PI * 1.25 + 0.4) * (0.6 + x / W * 0.5);
const DOTS = Array.from({ length: 46 }, (_, i) => {
  const x = 8 + (i / 45) * (W - 16);
  return [x, f(x) + gauss(rand) * 9];
});
const CURVE = Array.from({ length: 60 }, (_, i) => {
  const x = 8 + (i / 59) * (W - 16);
  return `${i ? "L" : "M"}${x.toFixed(1)} ${f(x).toFixed(1)}`;
}).join(" ");

function SignalPlotImpl({ className = "" }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sp-line" x1="0" x2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="sp-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[32, 64, 96].map((y) => (
        <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
      ))}
      <path d={`${CURVE} L${W - 8} ${H} L8 ${H} Z`} fill="url(#sp-fill)" />
      {DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#A1A1AA" opacity="0.55" />
      ))}
      <path d={CURVE} fill="none" stroke="url(#sp-line)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={W - 8} cy={f(W - 8)} r="4" fill="#22D3EE" />
      <circle cx={W - 8} cy={f(W - 8)} r="9" fill="#22D3EE" opacity="0.18" />
    </svg>
  );
}

export const SignalPlot = memo(SignalPlotImpl);
