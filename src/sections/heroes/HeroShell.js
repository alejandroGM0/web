import React, { Suspense } from "react";
import { HeroScroll } from "./shared";
import { LAYOUTS } from "./layouts";

export default function HeroShell({ Scene, layout = "center", veil = "default", cssBg = null }) {
  const Layout = LAYOUTS[layout] || LAYOUTS.center;

  return (
    <header
      id="top"
      className={`hero hero--shell hero--layout-${layout} hero--veil-${veil}${cssBg ? ` hero--bg-${cssBg}` : ""}`}
    >
      {cssBg && <div className={`hero__css-bg hero__css-bg--${cssBg}`} aria-hidden="true" />}

      {Scene && (
        <div className="hero__scene" aria-hidden="true">
          <Suspense fallback={<div className="hero__scene-fallback" />}>
            <Scene />
          </Suspense>
        </div>
      )}

      <div className="hero__veil" aria-hidden="true" />
      <Layout />
      <HeroScroll delay={1.4} />
    </header>
  );
}
