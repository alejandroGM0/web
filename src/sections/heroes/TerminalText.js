import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroCTA } from "./shared";
import { ease } from "./textAnimations";

const PROMPT = "> ";
const LINES = [`whoami`, profile.tagline, profile.subline];

export default function TerminalText({ layout }) {
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

  const wrapClass =
    layout === "glass"
      ? "hero__glass-card glass hero-terminal__wrap"
      : "hero-terminal__wrap hero-terminal__wrap--" + layout;

  return (
    <motion.div
      className={wrapClass}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="hero-terminal__window hero-terminal__window--inline">
        <div className="hero-terminal__bar">
          <span className="hero-terminal__dot hero-terminal__dot--r" />
          <span className="hero-terminal__dot hero-terminal__dot--y" />
          <span className="hero-terminal__dot hero-terminal__dot--g" />
          <span className="hero-terminal__bar-title">~/portfolio</span>
        </div>
        <div className="hero-terminal__body">
          <p className="hero-terminal__meta">
            <span className="hero-terminal__prompt">{PROMPT}</span>cat profile.json
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
          >
            <HeroCTA className={layout === "center" || layout === "glass" ? "hero__cta" : "hero__cta hero__cta--left"} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
