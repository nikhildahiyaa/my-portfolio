// src/components/three/DataCoreStage.jsx
// Hosts the Data Core: shows the static SVG immediately, lazy-loads the WebGL
// scene on idle, cross-fades once the first frame renders, and pauses
// rendering when offscreen or when the tab is hidden.

import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { StaticCore } from "./StaticCore";
import { hasWebGL, useMedia } from "../../hooks/useMedia";

const HeroScene = lazy(() => import("./HeroScene"));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* fall back silently to the static SVG */ }
  render() { return this.state.failed ? null : this.props.children; }
}

export function DataCoreStage({ className = "relative" }) {
  const reduce = useReducedMotion();
  const mobile = useMedia("(max-width: 767px)");
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Load three.js only after the page is idle, and never for reduced motion / no WebGL.
  useEffect(() => {
    if (reduce || !hasWebGL()) return;
    const start = () => setLoad(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* atmospheric light pools behind the sculpture */}
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(139,92,246,0.32),transparent_62%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-[18%] translate-x-[14%] translate-y-[10%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)] blur-2xl" />

      <StaticCore
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-premium ${ready ? "opacity-0" : "opacity-100"}`}
      />

      {load && !failed && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-premium ${ready ? "opacity-100" : "opacity-0"}`}>
              <HeroScene active={inView && tabVisible} mobile={mobile} onReady={() => setReady(true)} onError={() => { setReady(false); setFailed(true); }} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
