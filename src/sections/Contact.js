import React from "react";
import Reveal from "../components/Reveal";
import { profile } from "../data/profile";

const LINKS = [
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="eyebrow">Contact</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display contact__title">
          Let's <span className="accent-text">talk</span>.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lead contact__sub">
          Open to internships and collaborations.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="contact__links">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="contact__link"
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </section>
  );
}
