import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { firstName, lastName, HeroCTA } from "../shared";
import { stagger, fadeLeft } from "./motion";

export default function EditorialLayout() {
  return (
    <motion.div className="hero__editorial" variants={stagger} initial="hidden" animate="show">
      <motion.div className="hero__editorial-rule" variants={fadeLeft} />
      <motion.p className="eyebrow" variants={fadeLeft}>
        {profile.role} · {profile.location}
      </motion.p>
      <motion.h1 className="display hero__title hero__title--editorial" variants={fadeLeft}>
        {firstName}
      </motion.h1>
      <motion.h1 className="display hero__title hero__title--editorial accent-text" variants={fadeLeft}>
        {lastName}
      </motion.h1>
      <motion.p className="hero__tagline hero__tagline--editorial" variants={fadeLeft}>
        {profile.tagline}
      </motion.p>
      <motion.p className="lead hero__subline hero__subline--editorial" variants={fadeLeft}>
        {profile.subline}
      </motion.p>
      <motion.div variants={fadeLeft}>
        <HeroCTA className="hero__cta hero__cta--left" />
      </motion.div>
    </motion.div>
  );
}
