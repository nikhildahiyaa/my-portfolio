// src/components/three/StaticCore.jsx
// Static SVG rendering of the Data Core. Used:
//   • as the instant placeholder while the WebGL scene lazy-loads (no layout shift)
//   • for prefers-reduced-motion users
//   • when WebGL is unavailable
// Built from the same geometry module as the 3D scene, projected in JS.

import { memo, useMemo } from "react";
import { CORE, fibonacciSphere, nearestEdges } from "./coreGeometry";

const SIZE = 600;
const C = SIZE / 2;
const SCALE = 104;

function rotate([x, y, z], [rx, ry, rz]) {
  // three.js Euler 'XYZ': v' = Rx · Ry · Rz · v
  let cz = Math.cos(rz), sz = Math.sin(rz);
  [x, y] = [x * cz - y * sz, x * sz + y * cz];
  let cy = Math.cos(ry), sy = Math.sin(ry);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  let cx = Math.cos(rx), sx = Math.sin(rx);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return [x, y, z];
}

const VIEW = [0.18, -0.55, 0]; // root tilt for a pleasing static composition

function project(p) {
  const [x, y, z] = rotate(p, VIEW);
  return { x: C + x * SCALE, y: C - y * SCALE, z };
}

function StaticCoreImpl({ className = "" }) {
  const data = useMemo(() => {
    const pts = fibonacciSphere(170, CORE.radius);
    const edges = nearestEdges(pts, CORE.k);
    const proj = pts.map(project);
    const depth = (z) => Math.max(0.12, Math.min(1, (z + CORE.radius) / (2 * CORE.radius)));

    const rings = CORE.rings.map((r) => {
      const seg = 140;
      const pts2 = [];
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const local = rotate([Math.cos(a) * r.radius, Math.sin(a) * r.radius, 0], r.rot);
        pts2.push(project(local));
      }
      const d = pts2.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
      return { d, color: r.color, head: pts2[Math.floor(seg * 0.18)] };
    });

    return {
      nodes: proj.map((p, i) => ({ ...p, o: depth(p.z), r: i % 9 === 0 ? 3.2 : 1.9 })),
      edges: edges.map(([a, b]) => ({ a: proj[a], b: proj[b], o: depth((proj[a].z + proj[b].z) / 2) })),
      rings,
    };
  }, []);

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} role="img" aria-label="Data Core: an illustration of a neural data network sphere with orbital rings">
      <defs>
        <radialGradient id="sc-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="12%" stopColor="#C4B5FD" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#6366F1" stopOpacity="0.12" />
          <stop offset="78%" stopColor="#22D3EE" stopOpacity="0.08" />
          <stop offset="96%" stopColor="#8B5CF6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-node" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <filter id="sc-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* rear halves of rings are drawn first at low opacity */}
      {data.rings.map((r, i) => (
        <path key={`rb${i}`} d={r.d} fill="none" stroke="#9a9ab5" strokeOpacity="0.16" strokeWidth="1" />
      ))}

      <circle cx={C} cy={C} r={0.95 * SCALE} fill="url(#sc-core)" />

      <g stroke="url(#sc-node)" strokeWidth="0.8">
        {data.edges.map((e, i) => (
          <line key={i} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} strokeOpacity={e.o * 0.32} />
        ))}
      </g>
      <g fill="url(#sc-node)">
        {data.nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r * (0.6 + n.o * 0.5)} opacity={0.25 + n.o * 0.75} />
        ))}
      </g>

      {data.rings.map((r, i) => (
        <g key={`rf${i}`}>
          <path d={r.d} fill="none" stroke={r.color} strokeOpacity="0.35" strokeWidth="1.2" />
          <circle cx={r.head.x} cy={r.head.y} r="7" fill={r.color} opacity="0.55" filter="url(#sc-blur)" />
          <circle cx={r.head.x} cy={r.head.y} r="2.6" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

export const StaticCore = memo(StaticCoreImpl);
