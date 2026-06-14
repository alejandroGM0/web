import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { firstName, lastName, HeroCTA } from "../shared";
import { stagger, scaleIn } from "./motion";

export default function GlassLayout() {
  return (
    <motion.div
      className="hero__glass-card glass"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.p className="eyebrow" variants={scaleIn}>
        {profile.role} · {profile.location}
      </motion.p>
      <motion.h1 className="display hero__title hero__title--glass" variants={scaleIn}>
        {firstName} <span className="accent-text">{lastName}</span>
      </motion.h1>
      <motion.p className="hero__tagline" variants={scaleIn}>
        {profile.tagline}
      </motion.p>
      <motion.p className="lead hero__subline" variants={scaleIn}>
        {profile.subline}
      </motion.p>
      <motion.div variants={scaleIn}>
        <HeroCTA />
      </motion.div>
    </motion.div>
  );
}
