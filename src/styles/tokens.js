// src/styles/tokens.js
// Shared motion presets so every section animates with the same language.

export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.18,
  base: 0.35,
  slow: 0.6,
};

/** Default scroll-reveal: short rise, no long delays. */
export const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent that staggers its children's `reveal` variants. */
export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const VIEWPORT = { once: true, margin: "-60px" };

export const ACCENTS = {
  violet: { hex: "#8B5CF6", soft: "#A78BFA", rgb: "139,92,246" },
  indigo: { hex: "#6366F1", soft: "#818CF8", rgb: "99,102,241" },
  cyan: { hex: "#22D3EE", soft: "#67E8F9", rgb: "34,211,238" },
};
