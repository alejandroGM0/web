import React from "react";
import { CHAPTER_LIST } from "./scrollTimeline";

export default function ScrollRail({ progress }) {
  const pct = `${Math.round(progress * 100)}%`;

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail__track">
        <div className="scroll-rail__fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
      <div className="scroll-rail__chapters">
        {CHAPTER_LIST.map((ch) => {
          const active = progress >= ch.start && progress <= ch.end;
          return (
            <span
              key={ch.id}
              className="scroll-rail__dot"
              style={{
                opacity: active ? 1 : 0.35,
                transform: active ? "scale(1.4)" : "scale(1)",
              }}
              title={ch.label}
            />
          );
        })}
      </div>
      <span className="scroll-rail__pct">{pct}</span>
    </div>
  );
}
