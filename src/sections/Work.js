import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "../components/Reveal";
import { projects } from "../data/profile";

const MotionLink = motion(Link);

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const wide = index === 0;

  return (
    <Reveal delay={(index % 2) * 0.1} className={wide ? "work__cell work__cell--wide" : "work__cell"}>
      <MotionLink
        ref={ref}
        to={`/project/${project.slug}`}
        className="card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="card__glow"
          style={{ background: project.accent }}
          aria-hidden="true"
        />
        <div className="card__media">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className={project.imageInvert ? "img-invert" : undefined}
            />
          ) : (
            <div
              className="card__media-gradient"
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${project.accent}40, transparent 60%), linear-gradient(160deg, #111 0%, #060607 100%)`,
              }}
            />
          )}
          <span className="card__kind">{project.kind}</span>
        </div>

        <div className="card__body">
          <div className="card__head">
            <h3 className="card__title">{project.title}</h3>
            <span className="card__period">{project.period}</span>
          </div>
          <p className="lead card__blurb">{project.blurb}</p>
          <div className="card__tags">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <span className="card__arrow" style={{ color: project.accent }}>
          →
        </span>
      </MotionLink>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <Reveal>
        <div className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2 className="display section__title">Selected projects.</h2>
        </div>
      </Reveal>

      <div className="work__grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
