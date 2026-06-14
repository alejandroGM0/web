import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { firstName, lastName, HeroCTA } from "../shared";
import { stagger, fadeUp } from "./motion";

export default function CenterLayout() {
  return (
    <motion.div className="hero__content" variants={stagger} initial="hidden" animate="show">
      <motion.p className="eyebrow" variants={fadeUp}>
        {profile.role} · {profile.location}
      </motion.p>
      <motion.h1 className="display hero__title" variants={fadeUp}>
        {firstName} <span className="accent-text">{lastName}</span>
      </motion.h1>
      <motion.p className="hero__tagline" variants={fadeUp}>
        {profile.tagline}
      </motion.p>
      <motion.p className="lead hero__subline" variants={fadeUp}>
        {profile.subline}
      </motion.p>
      <motion.div variants={fadeUp}>
        <HeroCTA />
      </motion.div>
    </motion.div>
  );
}
