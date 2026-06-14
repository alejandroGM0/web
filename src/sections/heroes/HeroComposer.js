import React, { Suspense } from "react";
import { HeroScroll } from "./shared";
import HeroContent from "./HeroContent";
import { veilForLayout } from "./catalog";

const LAYOUT_CLASS = {
  refined: "hero--refined",
  brutalist: "hero--brutalist",
  marquee: "hero--marquee",
};

export default function HeroComposer({ layout, text, Scene, cssBg, BgComponent }) {
  const veil = veilForLayout(layout);
  const extraClass = LAYOUT_CLASS[layout] || "";
  const isUltra = text === "ultra" || BgComponent?.name === "UltraBg";

  return (
    <header
      id="top"
      className={`hero hero--shell hero--layout-${layout} hero--veil-${veil}${extraClass ? ` ${extraClass}` : ""}${cssBg ? ` hero--bg-${cssBg}` : ""}${text === "terminal" ? " hero--has-terminal" : ""}${BgComponent ? " hero--has-bg-extra" : ""}${text === "ultra" ? " hero--has-ultra" : ""}`}
    >
      {cssBg && <div className={`hero__css-bg hero__css-bg--${cssBg}`} aria-hidden="true" />}

      {BgComponent && (
        <div className="hero__bg-extra" aria-hidden="true">
          <Suspense fallback={null}>
            <BgComponent />
          </Suspense>
        </div>
      )}

      {Scene && (
        <div className="hero__scene" aria-hidden="true">
          <Suspense fallback={<div className="hero__scene-fallback" />}>
            <Scene />
          </Suspense>
        </div>
      )}

      <div className="hero__veil" aria-hidden="true" />
      <HeroContent layout={layout} text={text} />
      <HeroScroll delay={1.4} />
    </header>
  );
}
