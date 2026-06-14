import React from "react";
import { CHAPTERS, lerp } from "./scrollTimeline";

export default function ScrollScene({ progress: p }) {
  const orb1x = lerp(-12, 18, p < 0.4 ? p / 0.4 : 1);
  const orb1y = lerp(-18, 12, Math.min(p / 0.35, 1));
  const orb2x = lerp(88, 62, Math.min(p / 0.45, 1));
  const gridRotate = lerp(0, 12, p);
  const lineWidth = p < 0.12 ? (p / 0.12) * 100 : p > 0.85 ? lerp(100, 40, (p - 0.85) / 0.15) : 100;

  return (
    <div className="scroll-scene" aria-hidden="true">
      <div className="scroll-scene__base" style={{ opacity: lerp(0.55, 0.35, Math.min(p / 0.2, 1)) }} />
      <div
        className="scroll-scene__orb scroll-scene__orb--1"
        style={{ transform: `translate(${orb1x}%, ${orb1y}%)` }}
      />
      <div
        className="scroll-scene__orb scroll-scene__orb--2"
        style={{ transform: `translate(${orb2x}%, ${lerp(72, 38, Math.min(p / 0.5, 1))}%)` }}
      />
      <div
        className="scroll-scene__grid"
        style={{
          transform: `rotate(${gridRotate}deg) scale(${lerp(1, 1.06, p)})`,
          opacity: p < 0.08 ? (p / 0.08) * 0.35 : 0.35,
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="scrollGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#scrollGrid)" />
        </svg>
      </div>
      <div
        className="scroll-scene__horizon"
        style={{
          top: `${lerp(42, 38, Math.min(p / CHAPTERS.work.start, 1))}%`,
          transform: `translateX(-50%) scaleX(${lineWidth / 100})`,
        }}
      />
      <div className="scroll-scene__grain" />
    </div>
  );
}
