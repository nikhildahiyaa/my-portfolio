/** @type {import('tailwindcss').Config} */
// Portfolio V3 design system — colour, type, radius, shadow and motion tokens.
// CSS variable equivalents live in src/index.css; JS motion presets in src/styles/tokens.js.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        shell: "#050509",
        surface: "#11111B",
        elevated: "#181824",
        ink: "#F4F4F5",
        muted: "#A1A1AA",
        subtle: "#8E8E99", // ≥5.5:1 on shell — used for tertiary mono labels
        line: { DEFAULT: "rgba(255,255,255,0.08)", strong: "rgba(255,255,255,0.14)" },
        violet: { DEFAULT: "#8B5CF6", soft: "#A78BFA" },
        indigo: { DEFAULT: "#6366F1" },
        cyan: { DEFAULT: "#22D3EE", soft: "#67E8F9" },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        display: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 3.6vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.5rem, 2.4vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        shell: "1360px",
      },
      borderRadius: {
        card: "20px",
        panel: "28px",
      },
      boxShadow: {
        // inner top highlight + soft ambient drop
        surface: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.4), 0 12px 32px -12px rgba(0,0,0,0.6)",
        raised: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.4), 0 24px 56px -16px rgba(0,0,0,0.75)",
        glow: "0 0 0 1px rgba(139,92,246,0.35), 0 8px 32px -8px rgba(139,92,246,0.45)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "none" } },
        dash: { to: { strokeDashoffset: "-24" } },
        orbit: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        dash: "dash 1.6s linear infinite",
        orbit: "orbit 60s linear infinite",
      },
    },
  },
  plugins: [],
};
