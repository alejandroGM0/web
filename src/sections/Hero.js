import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const HeroScene = lazy(() => import("../three/HeroScene"));

const ease = [0.22, 1, 0.36, 1];

/** Each character fades in from blur — the hero signature entrance. */
function BlurChars({ text, className, delay = 0, charDelay = 0.038 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, filter: "blur(16px)", y: 14 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * charDelay,
            ease,
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/** Whole line blur reveal (eyebrow, tagline, etc.) */
const blurLine = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.85, delay, ease },
  }),
};

const blurBlock = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 16 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function Hero() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [firstName, lastName] = profile.name.split(" ");
  const lastNameDelay = 0.45 + firstName.length * 0.038 + 0.12;

  return (
    <header id="top" className="hero">
      <div className="hero__scene" aria-hidden="true">
        <Suspense fallback={<div className="hero__scene-fallback" />}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">

        <h1 className="display hero__title">
          <BlurChars text={firstName} delay={0.35} />
          <br />
          <span className="accent-text">
            <BlurChars text={lastName} delay={lastNameDelay} />
          </span>
        </h1>

        <motion.p
          className="hero__tagline"
          variants={blurLine}
          initial="hidden"
          animate="show"
          custom={lastNameDelay + lastName.length * 0.038 + 0.15}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="hero__cta"
          variants={blurBlock}
          initial="hidden"
          animate="show"
          transition={{ delay: lastNameDelay + lastName.length * 0.038 + 0.28 }}
        >
          <button className="btn btn--primary" onClick={() => go("work")}>
            See the work
          </button>
          <button className="btn btn--ghost" onClick={() => go("contact")}>
            Get in touch
          </button>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={() => go("work")}
        aria-label="Scroll down"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 1.5, duration: 1, ease }}
      >
        <span className="hero__scroll-line" />
        Scroll
      </motion.button>
    </header>
  );
}
