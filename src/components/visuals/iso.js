// src/components/visuals/iso.js — tiny isometric projection helpers for SVG illustrations.

const COS30 = Math.cos(Math.PI / 6);

/** Project an iso-space point (x right-back, y left-back, z up) to SVG coordinates. */
export function iso(x, y, z, { cx = 0, cy = 0, s = 1 } = {}) {
  return [cx + (x - y) * COS30 * s, cy + (x + y) * 0.5 * s - z * s];
}

export const pts = (arr) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/**
 * Faces of an axis-aligned box at (x,y,z) with size (w,d,h).
 * Returns { top, left, right } polygon point strings.
 */
export function box(x, y, z, w, d, h, o) {
  const P = (a, b, c) => iso(a, b, c, o);
  return {
    top: pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    left: pts([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    right: pts([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)]),
  };
}

/** Deterministic PRNG for reproducible scatter illustrations. */
export function seeded(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Box–Muller normal sample from a uniform PRNG. */
export function gauss(rand) {
  const u = Math.max(rand(), 1e-6);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
