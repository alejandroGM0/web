import React from "react";
import {
  profile,
  projects,
  about,
  experience,
  stack,
} from "../data/profile";
import ScrollScene from "./ScrollScene";
import ScrollRail from "./ScrollRail";
import useScrollProgress from "./useScrollProgress";
import {
  SCROLL_HEIGHT,
  CHAPTERS,
  ANCHORS,
  chapterOpacity,
  localProgress,
} from "./scrollTimeline";

const lastName = profile.name.split(" ").slice(-1)[0];

function Chapter({ progress, range, className, children }) {
  const opacity = chapterOpacity(progress, range.start, range.end);
  const visible = opacity > 0.02;

  return (
    <div
      className={`scroll-chapter ${className || ""}`}
      style={{
        opacity,
        zIndex: Math.round(opacity * 100),
        transform: `translateY(${(1 - opacity) * 12}px)`,
        visibility: visible ? "visible" : "hidden",
      }}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

function IntroChapter({ progress }) {
  const lp = localProgress(progress, CHAPTERS.intro.start, CHAPTERS.intro.end);
  const first = profile.name.split(" ")[0];
  const spread = lp > 0.6 ? (lp - 0.6) * 35 : 0;

  return (
    <Chapter progress={progress} range={CHAPTERS.intro} className="scroll-chapter--intro">
      <div className="scroll-chapter__rule" style={{ transform: `scaleX(${Math.min(lp / 0.2, 1)})` }} />
      <p className="eyebrow scroll-chapter__eyebrow">
        {profile.role} · {profile.location}
      </p>
      <h1 className="display scroll-chapter__name">
        <span className="scroll-chapter__name-part" style={{ transform: `translateX(${-spread}px)` }}>
          {first}
        </span>
        <span className="scroll-chapter__name-part accent-text" style={{ transform: `translateX(${spread}px)` }}>
          {lastName}
        </span>
      </h1>
      <p className="scroll-chapter__tagline">{profile.tagline}</p>
      <p className="lead scroll-chapter__hint">Scroll to explore ↓</p>
    </Chapter>
  );
}

function WorkChapter({ progress }) {
  const lp = localProgress(progress, CHAPTERS.work.start, CHAPTERS.work.end);
  const count = projects.length;
  const activeIndex = Math.min(count - 1, Math.floor(lp * count));

  return (
    <Chapter progress={progress} range={CHAPTERS.work} className="scroll-chapter--work">
      <div className="scroll-chapter__meta">
        <span className="scroll-chapter__index">01</span>
        <span className="scroll-chapter__divider" />
        <span className="eyebrow">Selected work</span>
      </div>

      <div className="scroll-work">
        {projects.map((project, i) => {
          const slot = 1 / count;
          const center = (i + 0.5) * slot;
          const dist = Math.abs(lp - center) / slot;
          const slideOpacity = Math.max(0, 1 - dist * 1.35);
          const x = Math.max(-40, Math.min(40, (lp - center) * 120));

          return (
            <article
              key={project.id}
              className="scroll-work__slide glass"
              style={{
                opacity: slideOpacity,
                transform: `translateX(${x}%)`,
                filter: `blur(${(1 - slideOpacity) * 6}px)`,
                zIndex: Math.round(slideOpacity * 10),
              }}
            >
              {project.image && (
                <div className="scroll-work__media">
                  <img src={project.image} alt="" loading="lazy" />
                </div>
              )}
              <div className="scroll-work__body">
                <span className="scroll-work__kind" style={{ color: project.accent }}>
                  {project.kind}
                </span>
                <h2 className="display scroll-work__title">{project.title}</h2>
                <p className="lead scroll-work__blurb">{project.blurb}</p>
                <div className="scroll-work__tags">
                  {project.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scroll-work__link"
                  style={{ color: project.accent }}
                >
                  View project ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="scroll-work__dots" aria-hidden="true">
        {projects.map((p, i) => (
          <span
            key={p.id}
            className="scroll-work__dot"
            style={{
              opacity: i === activeIndex ? 1 : 0.35,
              transform: i === activeIndex ? "scale(1.35)" : "scale(1)",
              background: i === activeIndex ? p.accent : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </Chapter>
  );
}

function AboutChapter({ progress }) {
  const lp = localProgress(progress, CHAPTERS.about.start, CHAPTERS.about.end);
  const total = about.lines.length;

  return (
    <Chapter progress={progress} range={CHAPTERS.about} className="scroll-chapter--about">
      <div className="scroll-chapter__meta">
        <span className="scroll-chapter__index">02</span>
        <span className="scroll-chapter__divider" />
        <span className="eyebrow">About</span>
      </div>

      <div className="scroll-about">
        <div className="scroll-about__lines">
          {about.lines.map((line, i) => {
            const threshold = (i + 0.3) / (total + 0.5);
            const t = Math.max(0, Math.min(1, (lp - (threshold - 0.08)) / 0.13));
            return (
              <p
                key={line}
                className="display scroll-about__line"
                style={{ opacity: t, transform: `translateX(${(1 - t) * -20}px)` }}
              >
                {line}
              </p>
            );
          })}
        </div>

        <div
          className="glass scroll-about__exp"
          style={{
            opacity: lp < 0.45 ? 0 : lp < 0.65 ? (lp - 0.45) / 0.2 : 1,
            transform: `translateY(${lp < 0.65 ? (1 - Math.max(0, (lp - 0.45) / 0.2)) * 16 : 0}px)`,
          }}
        >
          <p className="eyebrow">Experience</p>
          {experience.map((e) => (
            <div key={e.org} className="scroll-about__exp-item">
              <div className="scroll-about__exp-head">
                <strong>{e.role}</strong>
                <span>{e.period}</span>
              </div>
              <p className="accent-text scroll-about__exp-org">{e.org}</p>
              <p className="lead">{e.note}</p>
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

function StackChapter({ progress }) {
  const lp = localProgress(progress, CHAPTERS.stack.start, CHAPTERS.stack.end);

  return (
    <Chapter progress={progress} range={CHAPTERS.stack} className="scroll-chapter--stack">
      <div className="scroll-chapter__meta scroll-chapter__meta--center">
        <span className="scroll-chapter__index">03</span>
        <span className="scroll-chapter__divider" />
        <span className="eyebrow">Toolbox</span>
      </div>

      <h2 className="display scroll-chapter__stack-title">What I reach for.</h2>

      <div className="scroll-stack">
        {stack.map((item, i) => {
          const angle = (i / stack.length) * Math.PI * 1.35 - Math.PI * 0.675;
          const cx = 50 + Math.cos(angle) * 17;
          const cy = 50 + Math.sin(angle) * 13;
          const threshold = 0.08 + (i / stack.length) * 0.75;
          const t = Math.max(0, Math.min(1, (lp - (threshold - 0.06)) / 0.1));

          return (
            <div
              key={item.name}
              className="scroll-stack__orb glass"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                opacity: t,
                transform: `translate(-50%, -50%) scale(${0.5 + t * 0.5}) translateY(${(1 - t) * 20}px)`,
              }}
            >
              <i className={`${item.icon} scroll-stack__icon`} aria-hidden="true" />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </Chapter>
  );
}

function ContactChapter({ progress }) {
  const lp = localProgress(progress, CHAPTERS.contact.start, CHAPTERS.contact.end);
  const cta = lp < 0.05 ? 0 : lp < 0.25 ? (lp - 0.05) / 0.2 : 1;
  const links = lp < 0.3 ? 0 : lp < 0.5 ? (lp - 0.3) / 0.2 : 1;

  return (
    <Chapter progress={progress} range={CHAPTERS.contact} className="scroll-chapter--contact">
      <div className="scroll-contact">
        <p className="eyebrow">Contact</p>
        <a href={`mailto:${profile.email}`} className="scroll-contact__big" style={{ opacity: cta }}>
          <span>Let's build</span>
          <span className="accent-text">something together.</span>
        </a>
        <p className="lead scroll-contact__sub" style={{ opacity: cta }}>
          Internships, collaborations, or a good technical argument — my inbox is open.
        </p>
        <a href={`mailto:${profile.email}`} className="scroll-contact__email" style={{ opacity: links }}>
          {profile.email}
        </a>
        <div className="scroll-contact__links" style={{ opacity: links }}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact__chip">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact__chip">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="contact__chip">
            Email
          </a>
        </div>
        <footer className="scroll-contact__footer" style={{ opacity: lp > 0.55 ? Math.min((lp - 0.55) / 0.2, 1) : 0 }}>
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </Chapter>
  );
}

export default function ScrollExperience() {
  const { containerRef, progress } = useScrollProgress();

  return (
    <div ref={containerRef} className="scroll-xp" style={{ height: SCROLL_HEIGHT }}>
      {Object.entries(ANCHORS).map(([id, top]) => (
        <div key={id} id={id} className="scroll-xp__anchor" style={{ top }} aria-hidden="true" />
      ))}

      <div className="scroll-xp__sticky">
        <ScrollScene progress={progress} />
        <div className="scroll-xp__veil" aria-hidden="true" />

        <div className="scroll-xp__stage">
          <IntroChapter progress={progress} />
          <WorkChapter progress={progress} />
          <AboutChapter progress={progress} />
          <StackChapter progress={progress} />
          <ContactChapter progress={progress} />
        </div>

        <ScrollRail progress={progress} />
      </div>
    </div>
  );
}
