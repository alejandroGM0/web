import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { firstName, lastName, HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease, delay },
});

export default function HeroRefined() {
  return (
    <header id="top" className="hero hero--refined">
      <div className="hero-refined__ambient" aria-hidden="true" />

      <div className="hero-refined__inner">
        <motion.div
          className="hero-refined__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        />

        <motion.p className="hero-refined__meta" {...fade(0.2)}>
          <span>{profile.role}</span>
          <span className="hero-refined__dot" aria-hidden="true" />
          <span>{profile.location}</span>
        </motion.p>

        <div className="hero-refined__titles">
          <motion.h1 className="display hero-refined__name" {...fade(0.32)}>
            {firstName}
          </motion.h1>
          <motion.h1 className="display hero-refined__name accent-text" {...fade(0.44)}>
            {lastName}
          </motion.h1>
        </div>

        <motion.p className="hero-refined__tagline" {...fade(0.58)}>
          {profile.tagline}
        </motion.p>

        <motion.p className="lead hero-refined__sub" {...fade(0.72)}>
          {profile.subline}
        </motion.p>

        <motion.div {...fade(0.86)}>
          <HeroCTA className="hero__cta hero-refined__cta" />
        </motion.div>
      </div>

      <HeroScroll delay={1.2} />
    </header>
  );
}
