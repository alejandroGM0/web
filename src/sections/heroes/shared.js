import { profile } from "../../data/profile";

export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const [firstName, lastName] = profile.name.split(" ");

export function HeroScroll({ delay = 1.2 }) {
  return (
    <button
      className="hero__scroll"
      onClick={() => scrollTo("work")}
      aria-label="Scroll down"
      style={{ animation: `fadeIn 1s ${delay}s both` }}
    >
      <span className="hero__scroll-line" />
      Scroll
    </button>
  );
}

export function HeroCTA({ className = "hero__cta" }) {
  return (
    <div className={className}>
      <button className="btn btn--primary" onClick={() => scrollTo("work")}>
        See the work
      </button>
      <button className="btn btn--ghost" onClick={() => scrollTo("contact")}>
        Get in touch
      </button>
    </div>
  );
}
