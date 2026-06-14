import React from "react";
import { motion } from "framer-motion";
import { stack } from "../../../data/profile";

const items = [...stack.map((s) => s.name), ...stack.map((s) => s.name)];

export default function MarqueeBg() {
  return (
    <>
      <div className="hero-marquee__bands" aria-hidden="true">
        <div className="hero-marquee__track hero-marquee__track--fwd">
          {items.map((name, i) => (
            <span key={`a-${i}`} className="hero-marquee__item">
              {name}
              <span className="hero-marquee__sep">◆</span>
            </span>
          ))}
        </div>
        <div className="hero-marquee__track hero-marquee__track--rev">
          {items.map((name, i) => (
            <span key={`b-${i}`} className="hero-marquee__item hero-marquee__item--dim">
              {name}
              <span className="hero-marquee__sep">◆</span>
            </span>
          ))}
        </div>
      </div>
      <div className="hero-marquee__veil" aria-hidden="true" />
    </>
  );
}
