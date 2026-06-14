import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { firstName, lastName, HeroCTA } from "../shared";
import { stagger, fadeLeft } from "./motion";

export default function SplitLayout() {
  return (
    <motion.div className="hero__split" variants={stagger} initial="hidden" animate="show">
      <div className="hero__split-copy">
        <motion.p className="eyebrow" variants={fadeLeft}>
          {profile.role} · {profile.location}
        </motion.p>
        <motion.h1 className="display hero__title hero__title--split" variants={fadeLeft}>
          {firstName}
          <br />
          <span className="accent-text">{lastName}</span>
        </motion.h1>
        <motion.p className="hero__tagline" variants={fadeLeft}>
          {profile.tagline}
        </motion.p>
        <motion.p className="lead hero__subline" variants={fadeLeft}>
          {profile.subline}
        </motion.p>
        <motion.div variants={fadeLeft}>
          <HeroCTA className="hero__cta hero__cta--left" />
        </motion.div>
      </div>
      <div className="hero__split-gap" aria-hidden="true" />
    </motion.div>
  );
}
