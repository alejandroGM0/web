import React from "react";
import Reveal from "../components/Reveal";
import { stack } from "../data/profile";

export default function Stack() {
  return (
    <section id="stack" className="section stack">
      <Reveal>
        <div className="section__head">
          <p className="eyebrow">Toolbox</p>
          <h2 className="display section__title">
            What I reach for.
          </h2>
        </div>
      </Reveal>

      <div className="stack__grid">
        {stack.map((s, i) => (
          <Reveal key={s.name} delay={(i % 6) * 0.05} className="stack__item glass">
            <i className={`${s.icon} stack__icon`} aria-hidden="true" />
            <span className="stack__name">{s.name}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
