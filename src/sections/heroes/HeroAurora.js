import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { firstName, lastName, HeroCTA, HeroScroll } from "./shared";

const ease = [0.22, 1, 0.36, 1];

const blob = (delay) => ({
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.6, ease, delay },
});

export default function HeroAurora() {
  return (
    <header id="top" className="hero hero--aurora">
      <div className="hero-aurora__blobs" aria-hidden="true">
        <motion.div className="hero-aurora__blob hero-aurora__blob--1" {...blob(0)} />
        <motion.div className="hero-aurora__blob hero-aurora__blob--2" {...blob(0.15)} />
        <motion.div className="hero-aurora__blob hero-aurora__blob--3" {...blob(0.3)} />
      </div>

      <motion.div
        className="hero-aurora__content"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
        }}
      >
        <motion.p
          className="eyebrow"
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)" },
            show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease } },
          }}
        >
          {profile.role} · {profile.location}
        </motion.p>

        <motion.h1
          className="display hero-aurora__title"
          variants={{
            hidden: { opacity: 0, y: 32, filter: "blur(16px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
          }}
        >
          {firstName}{" "}
          <span className="accent-text">{lastName}</span>
        </motion.h1>

        <motion.p
          className="hero-aurora__tagline"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="lead hero-aurora__sub"
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
        >
          {profile.subline}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
          }}
        >
          <HeroCTA />
        </motion.div>
      </motion.div>

      <HeroScroll delay={1.4} />
    </header>
  );
}
