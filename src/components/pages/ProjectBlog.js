import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ReactMarkdown from "react-markdown";
import Reveal from "../Reveal";
import { projects } from "../../data/profile";

const ease = [0.22, 1, 0.36, 1];

// Same mouse-follow tilt as the work cards, applied to cover + gallery.
function TiltFigure({
  src,
  alt,
  invert,
  caption,
  className = "blog__figure",
  onOpen,
}) {
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
      className={`${className} glass${onOpen ? " blog__shot--clickable" : ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={
        onOpen
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen();
            }
          : undefined
      }
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `View details: ${alt}` : undefined}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <img
        src={src}
        alt={alt}
        className={invert ? "img-invert" : undefined}
        draggable={false}
      />
      {caption && (
        <figcaption className="blog__gallery-caption">{caption}</figcaption>
      )}
    </motion.figure>
  );
}

function Lightbox({ shots, index, onClose, onPrev, onNext }) {
  const shot = shots[index];
  if (!shot) return null;

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption || shot.alt || "Image details"}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        ×
      </button>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <motion.div
        className="lightbox__panel glass"
        key={shot.src}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={shot.src}
          alt={shot.alt || shot.caption || ""}
          className={shot.invert ? "img-invert" : undefined}
          draggable={false}
        />
        <div className="lightbox__meta">
          {shot.caption && <p className="lightbox__caption">{shot.caption}</p>}
          <p className="lightbox__count">
            {index + 1} / {shots.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectBlog() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [active, setActive] = useState(null);

  const shots = useMemo(() => {
    if (!project) return [];
    const list = [];
    if (project.image) {
      list.push({
        src: project.image,
        alt: project.title,
        caption: project.title,
        invert: project.imageInvert,
      });
    }
    (project.gallery || []).forEach((shot) => {
      list.push({
        src: shot.src,
        alt: shot.caption || project.title,
        caption: shot.caption,
      });
    });
    return list;
  }, [project]);

  useEffect(() => {
    if (active === null) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") {
        setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
      }
      if (e.key === "ArrowRight") {
        setActive((i) => (i === null ? i : (i + 1) % shots.length));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, shots.length]);

  if (!project) return <Navigate to="/" replace />;

  const { post } = project;
  const openShot = (src) => {
    const i = shots.findIndex((s) => s.src === src);
    if (i < 0) return;
    // Defer so the opening click can't hit the freshly mounted backdrop.
    window.setTimeout(() => setActive(i), 0);
  };

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
              onOpen={() => openShot(project.image)}
            />
          </Reveal>
        )}

        {project.gallery?.length > 0 && (
          <section className="section blog__gallery" aria-label="Project captures">
            <Reveal>
              <div className="section__head blog__gallery-head">
                <p className="eyebrow">Captures</p>
                <h2 className="display blog__gallery-title">From the engine.</h2>
              </div>
            </Reveal>
            <div className="blog__gallery-grid">
              {project.gallery.map((shot, i) => (
                <Reveal
                  key={shot.src}
                  delay={(i % 2) * 0.08}
                  className="blog__gallery-item"
                >
                  <TiltFigure
                    className="blog__gallery-figure"
                    src={shot.src}
                    alt={shot.caption || project.title}
                    caption={shot.caption}
                    onOpen={() => openShot(shot.src)}
                  />
                </Reveal>
              ))}
            </div>
          </section>
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

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            shots={shots}
            index={active}
            onClose={() => setActive(null)}
            onPrev={() =>
              setActive((i) => (i - 1 + shots.length) % shots.length)
            }
            onNext={() => setActive((i) => (i + 1) % shots.length)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
