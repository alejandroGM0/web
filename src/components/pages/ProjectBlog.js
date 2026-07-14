import React, { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ReactMarkdown from "react-markdown";
import Reveal from "../Reveal";
import { projects } from "../../data/profile";

const ease = [0.22, 1, 0.36, 1];

// Same mouse-follow tilt as the work cards, applied to the cover image.
function TiltFigure({ src, alt, invert }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
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

  return (
    <motion.figure
      ref={ref}
      className="blog__figure glass"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <img src={src} alt={alt} className={invert ? "img-invert" : undefined} />
    </motion.figure>
  );
}

export default function ProjectBlog() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const { post } = project;

  return (
    <>
      <motion.nav
        className="nav nav--scrolled blog-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      >
        <Link to="/" className="nav__link blog-nav__back">
          <span aria-hidden="true">←</span> Back to work
        </Link>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link blog-nav__ext"
        >
          {project.linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </motion.nav>

      <main className="blog">
        <div
          className="blog__glow"
          style={{
            background: `radial-gradient(60% 50% at 50% 0%, ${project.accent}2e, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <header className="section blog__header">
          <Reveal>
            <p className="eyebrow">
              {project.kind} · {project.period}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display blog__title">{project.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead blog__blurb">{project.blurb}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="blog__meta">
              <div className="card__tags">
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
                className="btn btn--ghost blog__cta"
              >
                {project.linkLabel} ↗
              </a>
            </div>
          </Reveal>
        </header>

        {project.image && (
          <Reveal className="section blog__figure-wrap">
            <TiltFigure
              src={project.image}
              alt={project.title}
              invert={project.imageInvert}
            />
          </Reveal>
        )}

        <article className="section blog__article">
          <Reveal>
            <div className="blog__post-head">
              <p className="eyebrow">Build notes</p>
              <h2 className="display blog__post-title">{post.title}</h2>
              <p className="blog__post-date">{post.date}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="blog__body">
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <footer className="blog__footer">
              <Link to="/" className="about__cta">
                <span className="about__cta-arrow">←</span> Back to all projects
              </Link>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about__cta"
                style={{ color: project.accent }}
              >
                {project.linkLabel}
                <span className="about__cta-arrow">↗</span>
              </a>
            </footer>
          </Reveal>
        </article>
      </main>
    </>
  );
}
