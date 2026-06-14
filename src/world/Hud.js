import { profile } from "../data/profile";
import { STATIONS } from "./journey";

export default function Hud({ progress, label, onSeek }) {
  const pct = Math.round(progress * 100);
  const started = progress > 0.015;

  return (
    <div className="hud" aria-hidden="false">
      <div className="hud__brand">
        <span className="hud__dot" />
        <span className="hud__brand-text">
          <strong>{profile.name}</strong>
          <em>{profile.role}</em>
        </span>
      </div>

      <nav className="hud__links">
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </nav>

      <div className={`hud__hint ${started ? "is-hidden" : ""}`}>
        <span className="hud__hint-text">Scroll to travel</span>
        <span className="hud__hint-arrow" />
      </div>

      <div className="hud__dock">
        <div className="hud__readout">
          <span className="hud__chapter">{label}</span>
          <span className="hud__pct">{String(pct).padStart(2, "0")}%</span>
        </div>
        <div className="hud__rail">
          <div className="hud__fill" style={{ transform: `scaleX(${progress})` }} />
          {STATIONS.map((s) => {
            const active = label === s.label;
            return (
              <button
                key={s.key}
                className={`hud__tick ${active ? "is-active" : ""}`}
                style={{ left: `${s.u * 100}%` }}
                onClick={() => onSeek(s.u)}
                aria-label={`Go to ${s.label}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
