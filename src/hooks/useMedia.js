import { useEffect, useState } from "react";

/** Subscribe to a CSS media query. SSR-safe. */
export function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True for mouse / trackpad users — used to disable tilt on touch devices. */
export const usePointerFine = () => useMedia("(hover: hover) and (pointer: fine)");

/** Detect WebGL availability once. */
let webglCache;
export function hasWebGL() {
  if (webglCache !== undefined) return webglCache;
  try {
    const c = document.createElement("canvas");
    webglCache = !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    webglCache = false;
  }
  return webglCache;
}
