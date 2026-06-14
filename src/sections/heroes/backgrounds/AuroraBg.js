import React from "react";
import { motion } from "framer-motion";

const blob = (delay) => ({
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function AuroraBg() {
  return (
    <div className="hero-aurora__blobs" aria-hidden="true">
      <motion.div className="hero-aurora__blob hero-aurora__blob--1" {...blob(0)} />
      <motion.div className="hero-aurora__blob hero-aurora__blob--2" {...blob(0.15)} />
      <motion.div className="hero-aurora__blob hero-aurora__blob--3" {...blob(0.3)} />
    </div>
  );
}
