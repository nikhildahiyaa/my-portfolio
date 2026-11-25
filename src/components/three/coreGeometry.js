// src/components/three/coreGeometry.js
// Pure-math geometry for the Data Core sculpture. No three.js import, so the
// static SVG fallback can share the exact same structure without loading WebGL code.

/** Deterministic PRNG so the sculpture looks identical on every load. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Evenly distributed points on a sphere (golden-angle spiral) with slight radial jitter. */
export function fibonacciSphere(count, radius, seed = 7) {
  const rand = mulberry32(seed);
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = radius * (1 + (rand() - 0.5) * 0.06);
    pts.push([Math.cos(theta) * r * jitter, y * jitter, Math.sin(theta) * r * jitter]);
  }
  return pts;
}

/** Connect each point to its k nearest neighbours (deduplicated). */
export function nearestEdges(points, k = 3) {
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const [ax, ay, az] = points[i];
    const dists = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const dx = ax - points[j][0];
      const dy = ay - points[j][1];
      const dz = az - points[j][2];
      dists.push([dx * dx + dy * dy + dz * dz, j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    for (let n = 0; n < k; n++) {
      const j = dists[n][1];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

/** Adjacency list for random-walk data packets. */
export function adjacency(count, edges) {
  const adj = Array.from({ length: count }, () => []);
  edges.forEach(([a, b], idx) => {
    adj[a].push({ to: b, edge: idx });
    adj[b].push({ to: a, edge: idx });
  });
  return adj;
}

// Shared configuration — consumed by both the WebGL scene and the SVG fallback.
export const CORE = {
  radius: 1.6,
  nodes: { desktop: 220, mobile: 130 },
  k: 3,
  rings: [
    { radius: 2.05, rot: [1.25, 0.0, 0.25], speed: 0.55, color: "#8B5CF6" },
    { radius: 2.3, rot: [1.05, 0.7, -0.2], speed: -0.4, color: "#22D3EE" },
    { radius: 2.52, rot: [1.85, -0.5, 0.6], speed: 0.3, color: "#A78BFA" },
  ],
};
