import React, { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: an instant dot + a lagging glow ring.
 * Grows over interactive elements. Disabled on touch / coarse pointers.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const interactive = (e) =>
      e.target.closest(
        "a, button, input, textarea, .card, .stack__item, .nav__link, .blog__shot--clickable, .lightbox__close, .lightbox__nav"
      );
    const onOver = (e) => {
      if (interactive(e)) ringRef.current?.classList.add("cursor-ring--hover");
    };
    const onOut = (e) => {
      if (interactive(e))
        ringRef.current?.classList.remove("cursor-ring--hover");
    };
    const onDown = () => ringRef.current?.classList.add("cursor-ring--down");
    const onUp = () => ringRef.current?.classList.remove("cursor-ring--down");

    let raf;
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
