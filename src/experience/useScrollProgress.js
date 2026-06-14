import { useCallback, useEffect, useRef, useState } from "react";

/** Scroll progress 0–1 for a tall container. Uses rAF — works with Lenis. */
export default function useScrollProgress() {
  const [node, setNode] = useState(null);
  const [progress, setProgress] = useState(0);
  const last = useRef(0);
  const containerRef = useCallback((el) => setNode(el), []);

  useEffect(() => {
    if (!node) return;

    let active = true;
    let rafId;

    const measure = () => {
      if (!active) return;
      const total = node.offsetHeight - window.innerHeight;
      const scrolled = -node.getBoundingClientRect().top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      if (Math.abs(p - last.current) > 0.0005) {
        last.current = p;
        setProgress(p);
      }
      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, [node]);

  return { containerRef, progress };
}
