import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { stack } from "../../data/profile";
import { firstName, lastName, HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];
const marqueeItems = [...stack.map((s) => s.name), ...stack.map((s) => s.name)];

export default function HeroMarquee() {
  return (
    <header id="top" className="hero hero--marquee">
      <div className="hero-marquee__bands" aria-hidden="true">
        <div className="hero-marquee__track hero-marquee__track--fwd">
          {marqueeItems.map((name, i) => (
            <span key={`a-${i}`} className="hero-marquee__item">
              {name}
              <span className="hero-marquee__sep">◆</span>
            </span>
          ))}
        </div>
        <div className="hero-marquee__track hero-marquee__track--rev">
          {marqueeItems.map((name, i) => (
            <span key={`b-${i}`} className="hero-marquee__item hero-marquee__item--dim">
              {name}
              <span className="hero-marquee__sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hero-marquee__veil" aria-hidden="true" />

      <motion.div
        className="hero-marquee__card"
        initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <motion.h1
          className="display hero-marquee__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease }}
        >
          {firstName}{" "}
          <span className="accent-text">{lastName}</span>
        </motion.h1>

        <motion.p
          className="hero-marquee__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78, duration: 0.7 }}
        >
          {profile.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease }}
        >
          <HeroCTA />
        </motion.div>
      </motion.div>

      <HeroScroll delay={1.3} />
    </header>
  );
}
