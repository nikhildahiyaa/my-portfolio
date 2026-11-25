// src/components/three/HeroScene.jsx
// Thin React wrapper around the vanilla three.js Data Core (coreScene.js).
// Default export so it can be React.lazy()-loaded — three.js stays off the
// critical path and is fetched only after the page is idle.

import { useEffect, useRef } from "react";
import { createDataCore } from "./coreScene";

export default function HeroScene({ active = true, mobile = false, onReady, onError }) {
  const mount = useRef(null);
  const ctl = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    try {
      ctl.current = createDataCore(mount.current, { mobile, onReady });
      ctl.current.setActive(activeRef.current);
    } catch (err) {
      onError?.(err);
    }
    return () => {
      ctl.current?.dispose();
      ctl.current = null;
    };
  }, [mobile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ctl.current?.setActive(active);
  }, [active]);

  return <div ref={mount} className="absolute inset-0" />;
}
