import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { firstName, lastName, HeroCTA } from "../shared";
import { stagger, fadeUp } from "./motion";

export default function MinimalLayout() {
  return (
    <motion.div className="hero__minimal" variants={stagger} initial="hidden" animate="show">
      <motion.p className="eyebrow" variants={fadeUp}>
        {profile.role}
      </motion.p>
      <motion.h1 className="display hero__title hero__title--minimal" variants={fadeUp}>
        {firstName} {lastName}
      </motion.h1>
      <motion.p className="hero__tagline hero__tagline--minimal" variants={fadeUp}>
        {profile.tagline}
      </motion.p>
      <motion.div variants={fadeUp}>
        <HeroCTA className="hero__cta hero__cta--left" />
      </motion.div>
    </motion.div>
  );
}
