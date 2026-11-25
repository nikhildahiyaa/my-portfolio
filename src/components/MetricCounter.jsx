import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animated numeric counter that increments from 0 to `to` when it enters
 * the viewport. `format` receives the current numeric value and returns
 * the display string. Respects prefers-reduced-motion.
 */
export function MetricCounter({ to, format, duration = 1300 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setCurrent(to);
      return;
    }

    let startTime = null;
    let rafId;

    function step(ts) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(to * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCurrent(to);
      }
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, to, duration, shouldReduce]);

  return <span ref={ref}>{format(current)}</span>;
}
