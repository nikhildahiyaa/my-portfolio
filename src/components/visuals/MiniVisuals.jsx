// Compact original covers for secondary projects (conceptual illustrations).
import { memo } from "react";
import { seeded } from "./iso";

const S = (label) => ({
  viewBox: "0 0 320 180",
  className: "h-full w-full",
  role: "img",
  "aria-label": label,
  preserveAspectRatio: "xMidYMid meet",
});
const MONO = { className: "font-mono", fontSize: 8.5, fill: "#8E8E99", letterSpacing: "0.08em" };

/* Box office — film strip + weekly bars with early-week ad markers */
function BoxOfficeImpl() {
  const bars = [22, 26, 24, 30, 48, 62, 54];
  return (
    <svg {...S("Illustration: film strip above a weekly sales bar pattern with early-week advertising markers")}>
      <rect x="20" y="18" width="280" height="26" rx="4" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={26 + i * 20} y="22" width="10" height="4" rx="1" fill="#3f3f46" />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={`b${i}`} x={26 + i * 20} y="36" width="10" height="4" rx="1" fill="#3f3f46" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={46 + i * 34} y={150 - h * 1.5} width="20" height={h * 1.5} rx="3" fill={i >= 4 ? "url(#bo-hot)" : "rgba(161,161,170,0.25)"} />
      ))}
      {[1, 2].map((i) => (
        <polygon key={i} points={`${56 + i * 34},${150 - bars[i] * 1.5 - 10} ${51 + i * 34},${150 - bars[i] * 1.5 - 18} ${61 + i * 34},${150 - bars[i] * 1.5 - 18}`} fill="#22D3EE" />
      ))}
      <line x1="36" x2="290" y1="151" y2="151" stroke="rgba(255,255,255,0.15)" />
      <text x="36" y="166" {...MONO}>MON</text>
      <text x="266" y="166" textAnchor="end" {...MONO}>WEEKEND</text>
      <defs>
        <linearGradient id="bo-hot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#6366F1" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
      </defs>
    </svg>
  );
}

/* YAIP — pixel grid before/after a transform */
function YaipImpl() {
  const r = seeded(3);
  const grid = Array.from({ length: 64 }, () => r());
  const cell = (v, i, ox, gray) => {
    const x = ox + (i % 8) * 11;
    const y = 30 + Math.floor(i / 8) * 11;
    const fill = gray ? `rgba(244,244,245,${0.1 + v * 0.75})` : v > 0.66 ? "#8B5CF6" : v > 0.33 ? "#22D3EE" : "#6366F1";
    return <rect key={`${ox}${i}`} x={x} y={y} width="10" height="10" rx="1.5" fill={fill} opacity={gray ? 1 : 0.35 + v * 0.6} />;
  };
  return (
    <svg {...S("Illustration: a colour pixel grid transformed into a greyscale grid by a command-line tool")}>
      {grid.map((v, i) => cell(v, i, 32, false))}
      <path d="M134 74 H178 M170 66 L178 74 L170 82" stroke="#A1A1AA" strokeWidth="1.5" fill="none" />
      {grid.map((v, i) => cell(v, i, 200, true))}
      <rect x="32" y="130" width="256" height="26" rx="6" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
      <text x="44" y="147" className="font-mono" fontSize="10" fill="#22D3EE">$</text>
      <text x="56" y="147" className="font-mono" fontSize="10" fill="#d4d4d8">yaip</text>
      <rect x="86" y="139" width="6" height="11" fill="#d4d4d8" opacity="0.7" />
    </svg>
  );
}

/* Data compression — original vs compressed blocks */
function CompressionImpl() {
  const rows = [
    { label: "RAW", w: 230, c: "rgba(161,161,170,0.35)" },
    { label: "CODEC A", w: 150, c: "#6366F1" },
    { label: "CODEC B", w: 104, c: "#8B5CF6" },
    { label: "CODEC C", w: 128, c: "#22D3EE" },
  ];
  return (
    <svg {...S("Illustration: schematic comparison of original and compressed data block sizes")}>
      {rows.map((r, i) => (
        <g key={r.label} transform={`translate(0 ${28 + i * 34})`}>
          <text x="24" y="14" {...MONO}>{r.label}</text>
          {Array.from({ length: Math.round(r.w / 14) }, (_, k) => (
            <rect key={k} x={78 + k * 14} y="2" width="11" height="16" rx="2" fill={r.c} opacity={i === 0 ? 1 : 0.85} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* TSP — synthetic cities with a real nearest-neighbour + 2-opt tour */
const TSP = (() => {
  const r = seeded(11);
  const P = Array.from({ length: 20 }, () => [30 + r() * 260, 24 + r() * 132]);
  const d = (a, b) => Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]);
  const tour = [0];
  const left = new Set(P.map((_, i) => i).slice(1));
  while (left.size) {
    const last = tour[tour.length - 1];
    let best = null;
    for (const j of left) if (best === null || d(last, j) < d(last, best)) best = j;
    tour.push(best);
    left.delete(best);
  }
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < tour.length - 1; i++)
      for (let k = i + 1; k < tour.length; k++) {
        const a = tour[i - 1], b = tour[i], c = tour[k], e = tour[(k + 1) % tour.length];
        if (d(a, c) + d(b, e) < d(a, b) + d(c, e) - 1e-9) {
          tour.splice(i, k - i + 1, ...tour.slice(i, k + 1).reverse());
          improved = true;
        }
      }
  }
  return { P, tour };
})();

function TspImpl() {
  const path = TSP.tour.map((i, k) => `${k ? "L" : "M"}${TSP.P[i][0].toFixed(1)} ${TSP.P[i][1].toFixed(1)}`).join(" ") + " Z";
  return (
    <svg {...S("Illustration: a closed travelling-salesperson tour through synthetic points")}>
      <path d={path} fill="rgba(139,92,246,0.06)" stroke="url(#tsp-g)" strokeWidth="1.6" strokeLinejoin="round" />
      {TSP.P.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 4.5 : 3} fill={i === 0 ? "#22D3EE" : "#F4F4F5"} />
      ))}
      <defs>
        <linearGradient id="tsp-g" x1="0" x2="1"><stop offset="0" stopColor="#8B5CF6" /><stop offset="1" stopColor="#22D3EE" /></linearGradient>
      </defs>
    </svg>
  );
}

/* Fifteen puzzle — near-solved board with one sliding tile */
function FifteenImpl() {
  const order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15];
  return (
    <svg {...S("Illustration: a fifteen-puzzle board one move from solved")}>
      <g transform="translate(96 14)">
        <rect width="128" height="128" rx="10" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
        {order.map((n, i) =>
          n ? (
            <g key={n} transform={`translate(${6 + (i % 4) * 30} ${6 + Math.floor(i / 4) * 30})`}>
              <rect width="26" height="26" rx="5" fill={n === 15 ? "rgba(139,92,246,0.35)" : "#181824"} stroke={n === 15 ? "#8B5CF6" : "rgba(255,255,255,0.1)"} />
              <text x="13" y="17" textAnchor="middle" fontSize="10" fontWeight="600" fill="#F4F4F5">{n}</text>
            </g>
          ) : null
        )}
        <path d="M100 126 h-14 m5 -5 l-5 5 l5 5" stroke="#22D3EE" strokeWidth="1.5" fill="none" transform="translate(0 20)" />
      </g>
      <text x="160" y="172" textAnchor="middle" {...MONO}>A* · MANHATTAN HEURISTIC</text>
    </svg>
  );
}

/* Web scraping with R — page wireframe to tidy table */
function ScrapeImpl() {
  return (
    <svg {...S("Illustration: a web page wireframe converted into a tidy data table")}>
      <g transform="translate(24 24)">
        <rect width="112" height="132" rx="8" fill="#11111b" stroke="rgba(255,255,255,0.1)" />
        <rect x="10" y="10" width="60" height="7" rx="3.5" fill="#52525b" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(10 ${28 + i * 25})`}>
            <rect width="20" height="18" rx="3" fill="rgba(99,102,241,0.35)" />
            <rect x="26" y="2" width="64" height="5" rx="2.5" fill="#52525b" />
            <rect x="26" y="11" width="40" height="5" rx="2.5" fill="#3f3f46" />
          </g>
        ))}
      </g>
      <path d="M146 90 H178 M170 82 L178 90 L170 98" stroke="#A1A1AA" strokeWidth="1.5" fill="none" />
      <g transform="translate(188 36)">
        <rect width="110" height="108" rx="8" fill="#11111b" stroke="rgba(34,211,238,0.35)" />
        <rect width="110" height="20" rx="8" fill="rgba(34,211,238,0.15)" />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <line x1="0" x2="110" y1={20 + (r + 1) * 22} y2={20 + (r + 1) * 22} stroke="rgba(255,255,255,0.08)" />
            {[0, 1, 2].map((c) => (
              <rect key={c} x={10 + c * 34} y={28 + r * 22} width={c === 0 ? 26 : 18} height="5" rx="2.5" fill="#71717a" />
            ))}
          </g>
        ))}
        {[0, 1, 2].map((c) => (
          <rect key={c} x={10 + c * 34} y="8" width="20" height="5" rx="2.5" fill="#22D3EE" />
        ))}
      </g>
    </svg>
  );
}

export const BoxOffice = memo(BoxOfficeImpl);
export const Yaip = memo(YaipImpl);
export const Compression = memo(CompressionImpl);
export const Tsp = memo(TspImpl);
export const Fifteen = memo(FifteenImpl);
export const Scrape = memo(ScrapeImpl);
