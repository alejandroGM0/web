import React from "react";
import { motion } from "framer-motion";

export default function KineticPlanesBg() {
  return (
    <div className="hero-kinetic__perspective" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="hero-kinetic__plane"
          initial={{ opacity: 0, rotateX: 72, y: 80 }}
          animate={{ opacity: 0.12, rotateX: 68, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          style={{ "--i": i }}
        />
      ))}
    </div>
  );
}
