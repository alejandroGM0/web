import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../../data/profile";
import { HeroCTA } from "../shared";
import { stagger, fadeUp } from "./motion";

export default function WideLayout() {
  const words = profile.name.split(" ");
  return (
    <motion.div className="hero__wide" variants={stagger} initial="hidden" animate="show">
      <motion.p className="eyebrow hero__wide-eyebrow" variants={fadeUp}>
        {profile.role} · {profile.location}
      </motion.p>
      <div className="hero__wide-names">
        {words.map((w, i) => (
          <motion.h1
            key={w}
            className={`display hero__wide-word ${i === 1 ? "accent-text" : ""}`}
            variants={fadeUp}
          >
            {w}
          </motion.h1>
        ))}
      </div>
      <motion.p className="hero__tagline hero__wide-tag" variants={fadeUp}>
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
