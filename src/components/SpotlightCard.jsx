import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { usePointerFine } from "../hooks/useMedia";

/**
 * Surface with a pointer-following spotlight and illuminated border.
 * `tilt` adds a restrained perspective tilt (max ±`maxTilt`°) for mouse users only;
 * touch devices and reduced-motion users get a flat card.
 */
export function SpotlightCard({
  as: Tag = "div",
  className = "",
  tone = "139,92,246",
  tilt = false,
  maxTilt = 4,
  children,
  ...props
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const canTilt = tilt && fine && !reduce;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 220, damping: 24 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 220, damping: 24 });

  function onPointerMove(e) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (canTilt) {
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    }
  }
  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        "--spot": tone,
        ...(canTilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1100 } : {}),
      }}
      className={`spotlight ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
