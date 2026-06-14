import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../../data/profile";
import { lastName, HeroCTA } from "./shared";
import { pointer, lerpPointer } from "../../three/shared";

const spring = { type: "spring", stiffness: 110, damping: 18, mass: 0.8 };
const ease = [0.22, 1, 0.36, 1];

function UltraChar({ char, i, accent }) {
  return (
    <motion.span
      className={`hero-ultra__char${accent ? " hero-ultra__char--accent" : ""}`}
      initial={{ opacity: 0, y: 72, rotateX: -52, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ ...spring, delay: 0.38 + i * 0.038 }}
      aria-hidden={char === " "}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function UltraWord({ word, i }) {
  return (
    <motion.span
      className="hero-ultra__word"
      initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease, delay: 1.05 + i * 0.11 }}
    >
      {word}
    </motion.span>
  );
}

const WRAPPER = {
  center: "hero__content hero-ultra__wrap",
  split: "hero__split hero-ultra__wrap hero-ultra__wrap--split",
  editorial: "hero__editorial hero-ultra__wrap hero-ultra__wrap--editorial",
  refined: "hero-refined__inner hero-ultra__wrap hero-ultra__wrap--editorial",
  glass: "hero__glass-card glass hero-ultra__wrap",
  minimal: "hero__minimal hero-ultra__wrap hero-ultra__wrap--editorial",
  wide: "hero__wide hero-ultra__wrap",
  brutalist: "hero-ultra__wrap hero-ultra__wrap--center",
  marquee: "hero-marquee__card hero-ultra__wrap",
};

export default function UltraContent({ layout }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 50, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-6, 6]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    let raf;
    const tick = () => {
      lerpPointer(0.05);
      mx.set(pointer.x);
      my.set(pointer.y);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my]);

  const wrap = WRAPPER[layout] || WRAPPER.center;
  const ctaClass =
    layout === "center" || layout === "glass" || layout === "wide" || layout === "marquee"
      ? "hero__cta"
      : "hero__cta hero__cta--left";

  const taglineWords = profile.tagline.split(" ");
  const fullName = profile.name;

  const inner = (
    <>
      <motion.div
        className="hero-ultra__rule"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
      />
      <motion.div
        className="hero-ultra__rule-glow"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
      />

      <motion.p
        className="eyebrow hero-ultra__eyebrow"
        initial={{ opacity: 0, letterSpacing: "0.55em", y: 8 }}
        animate={{ opacity: 1, letterSpacing: "0.28em", y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.25 }}
      >
        {profile.role} · {profile.location}
      </motion.p>

      <h1 className="display hero-ultra__title" style={{ perspective: 900 }}>
        {fullName.split("").map((char, i) => {
          const accentStart = profile.name.indexOf(lastName);
          const isAccent = i >= accentStart && accentStart >= 0;
          return <UltraChar key={`${char}-${i}`} char={char} i={i} accent={isAccent && char !== " "} />;
        })}
      </h1>

      <p className="hero-ultra__tagline">
        {taglineWords.map((w, i) => (
          <UltraWord key={w} word={w} i={i} />
        ))}
      </p>

      <motion.p
        className="lead hero-ultra__sub"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.45 }}
      >
        {profile.subline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring, delay: 1.62 }}
      >
        <HeroCTA className={ctaClass} />
      </motion.div>
    </>
  );

  if (layout === "split") {
    return (
      <motion.div className={wrap} style={{ x: px, y: py }}>
        <div className="hero__split-copy">{inner}</div>
        <div className="hero__split-gap" aria-hidden="true" />
      </motion.div>
    );
  }

  return (
    <motion.div className={wrap} style={{ x: px, y: py }}>
      {inner}
    </motion.div>
  );
}
