import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { firstName, lastName, HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

export default function HeroEditorial() {
  return (
    <header id="top" className="hero hero--editorial">
      <div className="hero-editorial__grid" aria-hidden="true" />

      <div className="hero-editorial__inner">
        <motion.div
          className="hero-editorial__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
        />

        <motion.p
          className="eyebrow hero-editorial__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <div className="hero-editorial__title-block">
          <motion.h1
            className="display hero-editorial__name"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            {firstName}
          </motion.h1>
          <motion.h1
            className="display hero-editorial__name hero-editorial__name--accent"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.52 }}
          >
            {lastName}
          </motion.h1>
        </div>

        <motion.p
          className="hero-editorial__tagline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.68 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="lead hero-editorial__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.82 }}
        >
          {profile.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.95 }}
        >
          <HeroCTA className="hero__cta hero-editorial__cta" />
        </motion.div>
      </div>

      <HeroScroll delay={1.3} />
    </header>
  );
}
