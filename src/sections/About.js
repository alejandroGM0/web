import React from "react";
import Reveal from "../components/Reveal";
import { about, timeline } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="section about">
      <Reveal>
        <p className="eyebrow">About</p>
      </Reveal>

      <div className="about__grid">
        <div className="about__intro">
          {about.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="about__line display">{line}</p>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <a className="about__cta" href="#contact">
              <span>Let's talk</span>
              <span className="about__cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="about__side">
          <div className="about__timeline">
            {timeline.map((item) => (
              <div key={item.role} className="about__entry">
                <div className="about__entry-rail" aria-hidden="true">
                  <span className="about__entry-dot" />
                </div>
                <div className="about__entry-body">
                  <div className="about__entry-head">
                    <span className="about__entry-period">{item.period}</span>
                    <span className="about__entry-tag">{item.tag}</span>
                  </div>
                  <h3 className="about__entry-role">{item.role}</h3>
                  <p className="about__entry-org">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
