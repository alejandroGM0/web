import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { pointer, lerpPointer } from "../../../three/shared";

export default function UltraBg() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 38, damping: 22 });
  const sy = useSpring(my, { stiffness: 38, damping: 22 });

  const g1x = useTransform(sx, [-1, 1], [-36, 36]);
  const g1y = useTransform(sy, [-1, 1], [-24, 24]);
  const g2x = useTransform(sx, [-1, 1], [44, -44]);
  const g2y = useTransform(sy, [-1, 1], [28, -28]);

  useEffect(() => {
    let raf;
    const tick = () => {
      lerpPointer(0.06);
      mx.set(pointer.x);
      my.set(pointer.y);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my]);

  return (
    <div className="hero-ultra__bg" aria-hidden="true">
      <motion.div className="hero-ultra__orb hero-ultra__orb--1" style={{ x: g1x, y: g1y }} />
      <motion.div className="hero-ultra__orb hero-ultra__orb--2" style={{ x: g2x, y: g2y }} />
      <div className="hero-ultra__mesh" />
      <div className="hero-ultra__grain" />
      <motion.div
        className="hero-ultra__shimmer"
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 4 }}
      />
    </div>
  );
}
