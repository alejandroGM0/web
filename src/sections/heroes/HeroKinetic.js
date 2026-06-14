import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="hero-kinetic__char"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.55,
            ease,
            delay: delay + i * 0.035,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroKinetic() {
  const words = profile.tagline.split(" ");

  return (
    <header id="top" className="hero hero--kinetic">
      <div className="hero-kinetic__perspective" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-kinetic__plane"
            initial={{ opacity: 0, rotateX: 72, y: 80 }}
            animate={{ opacity: 0.12, rotateX: 68, y: 0 }}
            transition={{ duration: 1.4, ease, delay: i * 0.08 }}
            style={{ "--i": i }}
          />
        ))}
      </div>

      <div className="hero-kinetic__content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="display hero-kinetic__title">
          <SplitText text={profile.name.split(" ")[0]} delay={0.35} />
          <br />
          <SplitText
            text={profile.name.split(" ")[1]}
            className="accent-text"
            delay={0.55}
          />
        </h1>

        <p className="hero-kinetic__tagline">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="hero-kinetic__word"
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.12 }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.p
          className="lead hero-kinetic__sub"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.35 }}
        >
          {profile.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.5 }}
        >
          <HeroCTA />
        </motion.div>
      </div>

      <HeroScroll delay={1.8} />
    </header>
  );
}
