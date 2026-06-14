import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

export default function HeroMinimal() {
  return (
    <header id="top" className="hero hero--minimal-clean">
      <motion.div
        className="hero-minimal__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <p className="eyebrow">{profile.role}</p>
        <h1 className="display hero-minimal__name">{profile.name}</h1>
        <p className="hero-minimal__tagline">{profile.tagline}</p>
        <HeroCTA className="hero__cta hero-minimal__cta" />
      </motion.div>
      <HeroScroll delay={1.4} />
    </header>
  );
}
