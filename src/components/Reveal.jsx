import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "../styles/tokens";

/** Scroll reveal: short rise + fade, once. Plain wrapper for reduced motion. */
export function Reveal({ children, delay = 0, y = 18, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  const M = motion[as] ?? motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </M>
  );
}
