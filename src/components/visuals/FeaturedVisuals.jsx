// Original, conceptual illustrations for featured projects.
// None of these depict real model output; any numbers shown are the verified
// headline results already stated in projects.js.

import { memo } from "react";
import { box, gauss, iso, pts, seeded } from "./iso";

const svgProps = (vb, label) => ({
  viewBox: vb,
  className: "h-full w-full",
  role: "img",
  "aria-label": label,
  preserveAspectRatio: "xMidYMid meet",
});

/* ─────────────── BCMEA — maritime logistics ─────────────── */
const CONTAINER_TONES = ["139,92,246", "99,102,241", "34,211,238", "113,113,122", "167,139,250"];

function PortLogisticsImpl() {
  const O = { cx: 214, cy: 128, s: 1 };
  const rand = seeded(9);
  const containers = [];
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 4; col++) {
      const height = 1 + Math.floor(rand() * 3);
      for (let lv = 0; lv < height; lv++) containers.push({ x: col * 46, y: row * 22, z: lv * 15, tone: CONTAINER_TONES[Math.floor(rand() * CONTAINER_TONES.length)] });
    }
  containers.sort((a, b) => a.x + a.y - (b.x + b.y) || a.z - b.z);
  const quay = box(-20, -20, -10, 230, 110, 10, O);
  const g = (x, y, z) => iso(x, y, z, O);
  const crane = [g(-10, 100, 0), g(-10, 100, 110), g(200, 100, 110), g(200, 100, 0)];
  return (
    <svg {...svgProps("0 0 560 300", "Illustration: container terminal with stacked containers, a gantry crane, a vessel and a forecasting panel")}>
      <defs>
        <linearGradient id="pl-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.10" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pl-band" x1="0" x2="1">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* water */}
      <rect x="0" y="230" width="560" height="70" fill="url(#pl-water)" />
      {[242, 256, 272].map((y, i) => (
        <line key={y} x1={20 + i * 30} x2={540 - i * 40} y1={y} y2={y} stroke="#22D3EE" strokeOpacity={0.12 - i * 0.03} strokeDasharray="14 10" />
      ))}
      {/* vessel */}
      <polygon points="18,214 150,214 136,240 34,240" fill="#181824" stroke="rgba(255,255,255,0.18)" />
      <rect x="44" y="196" width="22" height="18" fill="rgba(139,92,246,0.35)" />
      <rect x="68" y="200" width="22" height="14" fill="rgba(34,211,238,0.3)" />
      <rect x="92" y="190" width="22" height="24" fill="rgba(99,102,241,0.35)" />
      <rect x="118" y="186" width="6" height="28" fill="rgba(255,255,255,0.25)" />
      {/* quay */}
      <polygon points={quay.left} fill="#11111b" />
      <polygon points={quay.right} fill="#181824" />
      <polygon points={quay.top} fill="#14141f" stroke="rgba(255,255,255,0.08)" />
      {/* containers */}
      {containers.map((c, i) => {
        const f = box(c.x, c.y, c.z, 40, 18, 14, O);
        return (
          <g key={i}>
            <polygon points={f.left} fill={`rgba(${c.tone},0.28)`} />
            <polygon points={f.right} fill={`rgba(${c.tone},0.45)`} />
            <polygon points={f.top} fill={`rgba(${c.tone},0.75)`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </g>
        );
      })}
      {/* gantry crane */}
      <polyline points={pts(crane)} fill="none" stroke="#A1A1AA" strokeOpacity="0.7" strokeWidth="2" />
      <line x1={crane[1][0]} y1={crane[1][1]} x2={crane[1][0] - 40} y2={crane[1][1] + 20} stroke="#A1A1AA" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1={g(120, 100, 110)[0]} y1={g(120, 100, 110)[1]} x2={g(120, 100, 60)[0]} y2={g(120, 100, 60)[1]} stroke="#22D3EE" strokeOpacity="0.7" strokeDasharray="2 3" />
      {/* forecast panel (schematic) */}
      <g transform="translate(372 26)">
        <rect width="168" height="112" rx="12" fill="rgba(10,10,18,0.85)" stroke="rgba(255,255,255,0.1)" />
        <text x="14" y="22" fontSize="9" fill="#8E8E99" className="font-mono" letterSpacing="0.08em">LABOUR DEMAND</text>
        <path d="M14 82 C 40 60, 60 72, 84 56 S 130 40, 154 46 L154 66 C 130 62, 110 78, 84 74 S 40 86, 14 96 Z" fill="url(#pl-band)" />
        <path d="M14 89 C 40 70, 60 80, 84 65 S 130 50, 154 56" fill="none" stroke="#F4F4F5" strokeWidth="1.5" />
        <text x="14" y="104" fontSize="9" fill="#A1A1AA" className="font-mono">MAPE</text>
        <text x="48" y="104" fontSize="11" fontWeight="600" fill="#F4F4F5">7.45%</text>
      </g>
    </svg>
  );
}

/* ─────────────── Customer segmentation — clusters ─────────────── */
const CLUSTERS = [
  { cx: 140, cy: 160, sx: 32, sy: 24, n: 60, color: "#8B5CF6", label: "Segment A" },
  { cx: 270, cy: 96, sx: 30, sy: 20, n: 46, color: "#22D3EE", label: "Segment B" },
  { cx: 360, cy: 196, sx: 26, sy: 20, n: 36, color: "#818CF8", label: "Segment C" },
];
const CLUSTER_POINTS = (() => {
  const r = seeded(5);
  return CLUSTERS.map((c) => Array.from({ length: c.n }, () => [c.cx + gauss(r) * c.sx, c.cy + gauss(r) * c.sy]));
})();

function ClusterFieldImpl() {
  return (
    <svg {...svgProps("0 0 480 300", "Illustration: three stylised customer clusters with centroids on recency and frequency axes")}>
      <line x1="40" y1="270" x2="450" y2="270" stroke="rgba(255,255,255,0.15)" />
      <line x1="40" y1="270" x2="40" y2="30" stroke="rgba(255,255,255,0.15)" />
      <text x="44" y="288" fontSize="9" fill="#8E8E99" className="font-mono" letterSpacing="0.08em">RECENCY →</text>
      <text x="30" y="34" textAnchor="end" fontSize="9" fill="#8E8E99" className="font-mono" transform="rotate(-90 30 34)" letterSpacing="0.08em">FREQUENCY →</text>
      {CLUSTERS.map((c, i) => (
        <g key={c.label}>
          <ellipse cx={c.cx} cy={c.cy} rx={c.sx * 2.3} ry={c.sy * 2.3} fill={c.color} fillOpacity="0.06" stroke={c.color} strokeOpacity="0.35" strokeDasharray="3 4" />
          {CLUSTER_POINTS[i].map(([x, y], j) => (
            <circle key={j} cx={x} cy={y} r="2.6" fill={c.color} opacity="0.85" />
          ))}
          <g stroke="#F4F4F5" strokeWidth="1.4">
            <line x1={c.cx - 7} x2={c.cx + 7} y1={c.cy} y2={c.cy} />
            <line x1={c.cx} x2={c.cx} y1={c.cy - 7} y2={c.cy + 7} />
          </g>
          <circle cx={c.cx} cy={c.cy} r="10" fill="none" stroke="#F4F4F5" strokeOpacity="0.5" />
          <text x={c.cx} y={c.cy + c.sy * 2.3 + 13} textAnchor="middle" fontSize="10" fill={c.color} className="font-mono">{c.label}</text>
        </g>
      ))}
      <text x="440" y="40" textAnchor="end" fontSize="9" fill="#8E8E99" className="font-mono">k-means · RFM features</text>
    </svg>
  );
}

/* ─────────────── Airbnb — booking analytics ─────────────── */
function BookingFlowImpl() {
  return (
    <svg {...svgProps("0 0 480 300", "Illustration: booking interface mock-up beside a schematic ROC curve labelled AUC 0.735")}>
      {/* booking UI */}
      <g transform="translate(26 30)">
        <rect width="230" height="240" rx="14" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
        <circle cx="16" cy="16" r="3" fill="#3f3f46" />
        <circle cx="27" cy="16" r="3" fill="#3f3f46" />
        <circle cx="38" cy="16" r="3" fill="#3f3f46" />
        <rect x="14" y="32" width="202" height="26" rx="13" fill="#181824" stroke="rgba(255,255,255,0.08)" />
        <rect x="28" y="42" width="70" height="6" rx="3" fill="#3f3f46" />
        <circle cx="200" cy="45" r="8" fill="#8B5CF6" />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <g key={`${r}${c}`} transform={`translate(${14 + c * 104} ${70 + r * 78})`}>
              <rect width="98" height="50" rx="8" fill={`url(#bf-tile-${(r + c) % 2})`} />
              <rect y="56" width="64" height="5" rx="2.5" fill="#52525b" />
              <rect y="65" width="40" height="5" rx="2.5" fill="#3f3f46" />
            </g>
          ))
        )}
        <rect x="14" y="212" width="202" height="18" rx="9" fill="#8B5CF6" />
        <text x="115" y="224.5" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">Reserve</text>
      </g>
      <defs>
        <linearGradient id="bf-tile-0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6366F1" stopOpacity="0.55" /><stop offset="1" stopColor="#22D3EE" stopOpacity="0.25" /></linearGradient>
        <linearGradient id="bf-tile-1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8B5CF6" stopOpacity="0.5" /><stop offset="1" stopColor="#181824" /></linearGradient>
        <linearGradient id="bf-roc" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#8B5CF6" stopOpacity="0.28" /><stop offset="1" stopColor="#22D3EE" stopOpacity="0.05" /></linearGradient>
      </defs>
      {/* ROC panel (schematic shape) */}
      <g transform="translate(282 30)">
        <rect width="172" height="150" rx="14" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
        <text x="14" y="22" fontSize="9" fill="#8E8E99" className="font-mono" letterSpacing="0.08em">ROC · SCHEMATIC</text>
        <path d="M18 134 L154 34" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
        <path d="M18 134 C 40 76, 80 52, 154 34 L154 134 Z" fill="url(#bf-roc)" />
        <path d="M18 134 C 40 76, 80 52, 154 34" fill="none" stroke="#A78BFA" strokeWidth="2" />
        <text x="154" y="120" textAnchor="end" fontSize="13" fontWeight="600" fill="#F4F4F5">AUC 0.735</text>
      </g>
      {/* device insight */}
      <g transform="translate(282 196)">
        <rect width="172" height="74" rx="14" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
        <rect x="16" y="18" width="34" height="22" rx="3" fill="none" stroke="#22D3EE" strokeWidth="1.5" />
        <line x1="26" x2="40" y1="46" y2="46" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="62" y="32" fontSize="9" fill="#8E8E99" className="font-mono">DESKTOP USERS</text>
        <text x="62" y="50" fontSize="12.5" fontWeight="600" fill="#F4F4F5">30% more likely</text>
        <text x="62" y="63" fontSize="9" fill="#A1A1AA">to book</text>
      </g>
    </svg>
  );
}

/* ─────────────── Image redaction — synthetic document ─────────────── */
function RedactionDocImpl() {
  const lines = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg {...svgProps("0 0 480 300", "Illustration: synthetic document with OCR detection boxes and redacted fields")}>
      <defs>
        <linearGradient id="rd-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.35" />
        </linearGradient>
        <clipPath id="rd-clip"><rect x="40" y="22" width="250" height="258" rx="10" /></clipPath>
      </defs>
      <g>
        <rect x="40" y="22" width="250" height="258" rx="10" fill="#e9e9ef" fillOpacity="0.07" stroke="rgba(255,255,255,0.14)" />
        <rect x="60" y="42" width="110" height="8" rx="4" fill="#a1a1aa" fillOpacity="0.55" />
        <rect x="60" y="56" width="70" height="6" rx="3" fill="#a1a1aa" fillOpacity="0.3" />
        {/* ID block */}
        <rect x="60" y="78" width="210" height="70" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
        <rect x="70" y="88" width="40" height="50" rx="4" fill="#3f3f46" />
        <rect x="120" y="92" width="60" height="6" rx="3" fill="#71717a" />
        <rect x="120" y="108" width="128" height="12" rx="2" fill="#050509" />
        <text x="126" y="117.5" fontSize="8" fill="#a1a1aa" className="font-mono" letterSpacing="0.1em">REDACTED</text>
        <rect x="116" y="104" width="136" height="20" rx="3" fill="none" stroke="#22D3EE" strokeDasharray="3 2" />
        <rect x="120" y="128" width="90" height="6" rx="3" fill="#71717a" />
        {/* body text lines */}
        {lines.map((i) => (
          <rect key={i} x="60" y={164 + i * 15} width={i % 3 === 2 ? 150 : 210} height="6" rx="3" fill="#a1a1aa" fillOpacity="0.28" />
        ))}
        <rect x="140" y="192" width="80" height="11" rx="2" fill="#050509" />
        <rect x="136" y="188" width="88" height="19" rx="3" fill="none" stroke="#22D3EE" strokeDasharray="3 2" />
        <rect x="92" y="237" width="96" height="11" rx="2" fill="#050509" />
        <rect x="88" y="233" width="104" height="19" rx="3" fill="none" stroke="#8B5CF6" strokeDasharray="3 2" />
        {/* scanning beam */}
        <g clipPath="url(#rd-clip)">
          <rect x="40" y="0" width="250" height="40" fill="url(#rd-scan)" className="animate-[scan_4.5s_ease-in-out_infinite]" />
        </g>
      </g>
      {/* pipeline */}
      <g transform="translate(318 50)" className="font-mono" fontSize="10">
        {["preprocess", "detect text", "match patterns", "redact"].map((s, i) => (
          <g key={s} transform={`translate(0 ${i * 52})`}>
            <rect width="134" height="32" rx="16" fill="#11111b" stroke={i === 3 ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)"} />
            <circle cx="16" cy="16" r="4" fill={i === 3 ? "#8B5CF6" : "#22D3EE"} />
            <text x="28" y="19.5" fill="#d4d4d8">{s}</text>
            {i < 3 && <line x1="16" x2="16" y1="34" y2="50" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 3" />}
          </g>
        ))}
      </g>
    </svg>
  );
}

export const PortLogistics = memo(PortLogisticsImpl);
export const ClusterField = memo(ClusterFieldImpl);
export const BookingFlow = memo(BookingFlowImpl);
export const RedactionDoc = memo(RedactionDocImpl);
