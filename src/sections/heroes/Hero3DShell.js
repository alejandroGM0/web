import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { firstName, lastName, HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

export default function Hero3DShell({ Scene, veil = "default" }) {
  return (
    <header id="top" className={`hero hero--3d hero--3d-${veil}`}>
      <div className="hero__scene" aria-hidden="true">
        <Suspense fallback={<div className="hero__scene-fallback" />}>
          <Scene />
        </Suspense>
      </div>

      <div className="hero__veil hero__veil--3d" aria-hidden="true" />

      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="eyebrow" variants={item}>
          {profile.role} · {profile.location}
        </motion.p>

        <motion.h1 className="display hero__title" variants={item}>
          {firstName}{" "}
          <span className="accent-text">{lastName}</span>
        </motion.h1>

        <motion.p className="hero__tagline" variants={item}>
          {profile.tagline}
        </motion.p>

        <motion.p className="lead hero__subline" variants={item}>
          {profile.subline}
        </motion.p>

        <motion.div variants={item}>
          <HeroCTA />
        </motion.div>
      </motion.div>

      <HeroScroll delay={1.5} />
    </header>
  );
}
