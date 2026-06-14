import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Scene from "./Scene";
import Hud from "./Hud";
import { journey, chapterAt, SCROLL_VH } from "./journey";
import "../styles/world.css";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Experience() {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState(chapterAt(0).label);
  const lenisRef = useRef(null);
  const lastPublished = useRef(0);

  useEffect(() => {
    let lenis;
    if (!reduceMotion) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, touchMultiplier: 1.4 });
      lenisRef.current = lenis;
    }

    let rafId;
    const loop = (time) => {
      if (lenis) lenis.raf(time);

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      journey.target = ratio;

      // Publish the smoothed camera progress to React (throttled).
      const p = journey.progress;
      if (Math.abs(p - lastPublished.current) > 0.004) {
        lastPublished.current = p;
        setProgress(p);
        const next = chapterAt(p).label;
        setLabel((prev) => (prev === next ? prev : next));
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const seek = (u) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = u * max;
    if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.6 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="experience">
      <div className="experience__stage">
        <Scene progress={progress} />
      </div>
      <Hud progress={progress} label={label} onSeek={seek} />
      <div className="experience__scroll" style={{ height: `${SCROLL_VH}vh` }} />
    </div>
  );
}
