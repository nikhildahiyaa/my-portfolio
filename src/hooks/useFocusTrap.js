import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Trap Tab focus inside `ref` while `active`, close on Escape and restore
 * focus to the previously focused element on deactivate. Focusable elements
 * are queried on every Tab press so dynamic content is handled.
 */
export function useFocusTrap(ref, active, onEscape) {
  const escRef = useRef(onEscape);
  escRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement;
    const el = ref.current;

    const raf = requestAnimationFrame(() => {
      const first = el?.querySelector("[data-autofocus]") || el?.querySelector(FOCUSABLE);
      first?.focus({ preventScroll: true });
    });

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        escRef.current?.();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const nodes = [...el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!nodes.length) { e.preventDefault(); return; }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      if (previous && typeof previous.focus === "function") previous.focus({ preventScroll: true });
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
}
