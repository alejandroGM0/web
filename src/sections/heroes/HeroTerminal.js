import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroCTA, HeroScroll } from "./shared";

const PROMPT = "> ";
const LINES = [
  `whoami`,
  profile.tagline,
  profile.subline,
];

export default function HeroTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const full = LINES[lineIndex];
    if (charIndex < full.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28 + Math.random() * 22);
      return () => clearTimeout(t);
    }

    const pause = setTimeout(() => {
      if (lineIndex < LINES.length - 1) {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      } else {
        setDone(true);
      }
    }, 420);
    return () => clearTimeout(pause);
  }, [charIndex, lineIndex, done]);

  const typed = LINES.map((line, i) => {
    if (i < lineIndex) return line;
    if (i === lineIndex) return line.slice(0, charIndex);
    return "";
  });

  return (
    <header id="top" className="hero hero--terminal">
      <div className="hero-terminal__scanlines" aria-hidden="true" />
      <div className="hero-terminal__glow" aria-hidden="true" />

      <motion.div
        className="hero-terminal__window"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-terminal__bar">
          <span className="hero-terminal__dot hero-terminal__dot--r" />
          <span className="hero-terminal__dot hero-terminal__dot--y" />
          <span className="hero-terminal__dot hero-terminal__dot--g" />
          <span className="hero-terminal__bar-title">~/portfolio</span>
        </div>

        <div className="hero-terminal__body">
          <p className="hero-terminal__meta">
            <span className="hero-terminal__prompt">{PROMPT}</span>
            cat profile.json
          </p>

          <div className="hero-terminal__output">
            <p>
              <span className="hero-terminal__key">"name"</span>:{" "}
              <span className="hero-terminal__str">"{profile.name}"</span>
            </p>
            <p>
              <span className="hero-terminal__key">"role"</span>:{" "}
              <span className="hero-terminal__str">"{profile.role}"</span>
            </p>
            <p>
              <span className="hero-terminal__key">"location"</span>:{" "}
              <span className="hero-terminal__str">"{profile.location}"</span>
            </p>
          </div>

          <div className="hero-terminal__typed">
            {typed.map((line, i) =>
              line ? (
                <p key={i} className={i === 0 ? "hero-terminal__cmd" : ""}>
                  {i === 0 && <span className="hero-terminal__prompt">{PROMPT}</span>}
                  {line}
                  {i === lineIndex && !done && (
                    <span className="hero-terminal__cursor" aria-hidden="true" />
                  )}
                </p>
              ) : null
            )}
          </div>

          <motion.div
            className="hero-terminal__cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroCTA />
          </motion.div>
        </div>
      </motion.div>

      <HeroScroll delay={2} />
    </header>
  );
}
