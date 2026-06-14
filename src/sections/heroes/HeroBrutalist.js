import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];
const words = profile.name.split(" ");

export default function HeroBrutalist() {
  return (
    <header id="top" className="hero hero--brutalist">
      <div className="hero-brutalist__noise" aria-hidden="true" />

      <div className="hero-brutalist__stack">
        {words.map((word, i) => (
          <div key={word} className="hero-brutalist__row" style={{ "--i": i }}>
            <motion.h1
              className={`display hero-brutalist__word ${i === 1 ? "accent-text" : ""}`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.85, ease, delay: 0.2 + i * 0.18 }}
            >
              {word}
            </motion.h1>
            <motion.span
              className="hero-brutalist__index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.18, duration: 0.4 }}
            >
              0{i + 1}
            </motion.span>
          </div>
        ))}
      </div>

      <motion.div
        className="hero-brutalist__footer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.75 }}
      >
        <div className="hero-brutalist__meta">
          <p className="eyebrow">{profile.role}</p>
          <p className="hero-brutalist__tagline">{profile.tagline}</p>
          <p className="lead hero-brutalist__sub">{profile.subline}</p>
        </div>
        <HeroCTA className="hero__cta hero-brutalist__cta" />
      </motion.div>

      <HeroScroll delay={1.2} />
    </header>
  );
}
