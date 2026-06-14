import React from "react";
import { LAYOUT_OPTIONS, BG_OPTIONS, TEXT_OPTIONS } from "./catalog";

export default function HeroPicker({ config, onChange, open, onToggle }) {
  const set = (key, value) => onChange({ ...config, [key]: value });

  const layoutLabel = LAYOUT_OPTIONS.find((o) => o.id === config.layout)?.label;
  const bgLabel = BG_OPTIONS.find((o) => o.id === config.bg)?.label;
  const textLabel = TEXT_OPTIONS.find((o) => o.id === config.text)?.label;

  return (
    <nav
      className={`hero-picker hero-picker--builder${open ? " hero-picker--open" : ""}`}
      aria-label="Constructor de hero"
    >
      <button
        type="button"
        className="hero-picker__toggle"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="hero-picker__toggle-label">Hero builder</span>
        <span className="hero-picker__toggle-current">
          {layoutLabel} · {bgLabel} · {textLabel}
        </span>
        <span className="hero-picker__toggle-icon" aria-hidden="true">{open ? "▾" : "▴"}</span>
      </button>

      {open && (
        <div className="hero-picker__builder">
          <section className="hero-picker__step">
            <p className="hero-picker__step-label">1 · Layout</p>
            <div className="hero-picker__step-list">
              {LAYOUT_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`hero-picker__btn ${config.layout === o.id ? "hero-picker__btn--active" : ""}`}
                  onClick={() => set("layout", o.id)}
                  title={o.desc}
                  aria-pressed={config.layout === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section className="hero-picker__step">
            <p className="hero-picker__step-label">2 · Fondo</p>
            <div className="hero-picker__step-list">
              {BG_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`hero-picker__btn ${config.bg === o.id ? "hero-picker__btn--active" : ""}`}
                  onClick={() => set("bg", o.id)}
                  aria-pressed={config.bg === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section className="hero-picker__step">
            <p className="hero-picker__step-label">3 · Texto</p>
            <div className="hero-picker__step-list">
              {TEXT_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`hero-picker__btn ${config.text === o.id ? "hero-picker__btn--active" : ""}`}
                  onClick={() => set("text", o.id)}
                  title={o.desc}
                  aria-pressed={config.text === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </nav>
  );
}
