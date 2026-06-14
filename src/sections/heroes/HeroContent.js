import React from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { firstName, lastName, HeroCTA } from "./shared";
import { TEXT_ANIMS, ease } from "./textAnimations";
import TerminalText from "./TerminalText";
import UltraContent from "./UltraContent";

function KineticChars({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="hero-kinetic__char"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.55, ease, delay: delay + i * 0.035 }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function ClipWord({ word, accent, delay }) {
  return (
    <motion.h1
      className={`display hero__wide-word ${accent ? "accent-text" : ""}`}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {word}
    </motion.h1>
  );
}

function WordBlurTagline({ className }) {
  const words = profile.tagline.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="hero-kinetic__word"
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.12 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function Tagline({ anim, className, variants }) {
  if (anim === "wordBlur") return <WordBlurTagline className={className} />;
  return (
    <Mp anim={anim} className={className} variants={variants}>
      {profile.tagline}
    </Mp>
  );
}

function M({ anim, text, className, variants, children, ...rest }) {
  if (anim === "none") {
    return (
      <div className={className} {...rest}>
        {children ?? text}
      </div>
    );
  }
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children ?? text}
    </motion.div>
  );
}

function Mp({ anim, className, variants, children, ...rest }) {
  if (anim === "none") {
    return (
      <p className={className} {...rest}>
        {children}
      </p>
    );
  }
  return (
    <motion.p className={className} variants={variants} {...rest}>
      {children}
    </motion.p>
  );
}

function Mh({ anim, className, variants, children, ...rest }) {
  if (anim === "none") {
    return (
      <h1 className={className} {...rest}>
        {children}
      </h1>
    );
  }
  return (
    <motion.h1 className={className} variants={variants} {...rest}>
      {children}
    </motion.h1>
  );
}

export default function HeroContent({ layout, text }) {
  if (text === "terminal") {
    return <TerminalText layout={layout} />;
  }

  if (text === "ultra") {
    return <UltraContent layout={layout} />;
  }

  const motionAnim = text === "wordBlur" ? "fade" : text;
  const cfg = TEXT_ANIMS[motionAnim] || TEXT_ANIMS.fade;
  const v = cfg.item;
  const ctaClass =
    layout === "center" || layout === "glass" || layout === "wide" || layout === "marquee"
      ? "hero__cta"
      : "hero__cta hero__cta--left";

  const meta = `${profile.role} · ${profile.location}`;

  // ── CENTER ──
  if (layout === "center") {
    return (
      <motion.div
        className="hero__content"
        variants={cfg.container}
        initial="hidden"
        animate="show"
      >
        {text === "letterSpacing" ? (
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.32em" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
          >
            {meta}
          </motion.p>
        ) : (
          <Mp anim={motionAnim} className="eyebrow" variants={v}>{meta}</Mp>
        )}
        {text === "kinetic" ? (
          <h1 className="display hero__title hero-kinetic__title">
            <KineticChars text={firstName} delay={0.35} />
            {" "}
            <KineticChars text={lastName} className="accent-text" delay={0.55} />
          </h1>
        ) : (
          <Mh anim={motionAnim} className="display hero__title" variants={v}>
            {firstName} <span className="accent-text">{lastName}</span>
          </Mh>
        )}
        <Tagline anim={text} className="hero__tagline" variants={v} />
        <Mp anim={motionAnim} className="lead hero__subline" variants={v}>{profile.subline}</Mp>
        <M anim={motionAnim} variants={v}><HeroCTA /></M>
      </motion.div>
    );
  }

  // ── REFINED ──
  if (layout === "refined") {
    const fd = (delay) => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.75, ease, delay },
    });
    return (
      <div className="hero-refined__inner">
        <motion.div
          className="hero-refined__rule"
          variants={cfg.rule}
          initial="hidden"
          animate="show"
        />
        <motion.p className="hero-refined__meta" {...fd(0.2)}>
          <span>{profile.role}</span>
          <span className="hero-refined__dot" aria-hidden="true" />
          <span>{profile.location}</span>
        </motion.p>
        <div className="hero-refined__titles">
          <motion.h1 className="display hero-refined__name" {...fd(0.32)}>{firstName}</motion.h1>
          <motion.h1 className="display hero-refined__name accent-text" {...fd(0.44)}>{lastName}</motion.h1>
        </div>
        <motion.p className="hero-refined__tagline" {...fd(0.58)}>{profile.tagline}</motion.p>
        <motion.p className="lead hero-refined__sub" {...fd(0.72)}>{profile.subline}</motion.p>
        <motion.div {...fd(0.86)}>
          <HeroCTA className="hero__cta hero-refined__cta" />
        </motion.div>
      </div>
    );
  }

  // ── BRUTALIST ──
  if (layout === "brutalist") {
    const words = profile.name.split(" ");
    return (
      <>
        <div className="hero-brutalist__stack">
          {words.map((word, i) => (
            <div key={word} className="hero-brutalist__row" style={{ "--i": i }}>
              <motion.h1
                className={`display hero-brutalist__word ${i === 1 ? "accent-text" : ""}`}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.85, ease, delay: 0.2 + i * 0.18 }}
              >
                {word}
              </motion.h1>
              <motion.span
                className="hero-brutalist__index"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.18, duration: 0.4 }}
              >
                0{i + 1}
              </motion.span>
            </div>
          ))}
        </div>
        <motion.div
          className="hero-brutalist__footer"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.75 }}
        >
          <div className="hero-brutalist__meta">
            <p className="eyebrow">{profile.role}</p>
            <p className="hero-brutalist__tagline">{profile.tagline}</p>
            <p className="lead hero-brutalist__sub">{profile.subline}</p>
          </div>
          <HeroCTA className="hero__cta hero-brutalist__cta" />
        </motion.div>
      </>
    );
  }

  // ── MARQUEE CARD ──
  if (layout === "marquee") {
    const animKey = text === "scale" ? "scale" : text;
    const mc = TEXT_ANIMS[animKey] || TEXT_ANIMS.scale;
    const mv = mc.item;
    return (
      <motion.div
        className="hero-marquee__card"
        variants={mc.container}
        initial="hidden"
        animate="show"
      >
        <Mp anim={animKey} className="eyebrow" variants={mv}>{meta}</Mp>
        <Mh anim={animKey} className="display hero-marquee__title" variants={mv}>
          {firstName} <span className="accent-text">{lastName}</span>
        </Mh>
        <Mp anim={animKey} className="hero-marquee__tagline" variants={mv}>{profile.tagline}</Mp>
        <Mp anim={animKey} className="lead" variants={mv}>{profile.subline}</Mp>
        <M anim={animKey} variants={mv}><HeroCTA /></M>
      </motion.div>
    );
  }

  // ── SPLIT ──
  if (layout === "split") {
    return (
      <motion.div className="hero__split" variants={cfg.container} initial="hidden" animate="show">
        <div className="hero__split-copy">
          <Mp anim={text} className="eyebrow" variants={v}>{meta}</Mp>
          {text === "kinetic" ? (
            <h1 className="display hero__title hero__title--split">
              <KineticChars text={firstName} delay={0.3} />
              <br />
              <KineticChars text={lastName} className="accent-text" delay={0.5} />
            </h1>
          ) : (
            <Mh anim={text} className="display hero__title hero__title--split" variants={v}>
              {firstName}
              <br />
              <span className="accent-text">{lastName}</span>
            </Mh>
          )}
          <Tagline anim={text} className="hero__tagline" variants={v} />
          <Mp anim={text} className="lead hero__subline" variants={v}>{profile.subline}</Mp>
          <M anim={text} variants={v}><HeroCTA className={ctaClass} /></M>
        </div>
        <div className="hero__split-gap" aria-hidden="true" />
      </motion.div>
    );
  }

  // ── EDITORIAL ──
  if (layout === "editorial") {
    return (
      <motion.div className="hero__editorial" variants={cfg.container} initial="hidden" animate="show">
        <motion.div className="hero__editorial-rule" variants={cfg.rule} />
        <Mp anim={text} className="eyebrow" variants={v}>{meta}</Mp>
        {text === "clip" ? (
          <>
            <ClipWord word={firstName} delay={0.2} />
            <ClipWord word={lastName} accent delay={0.38} />
          </>
        ) : text === "kinetic" ? (
          <>
            <h1 className="display hero__title hero__title--editorial">
              <KineticChars text={firstName} delay={0.35} />
            </h1>
            <h1 className="display hero__title hero__title--editorial accent-text">
              <KineticChars text={lastName} delay={0.5} />
            </h1>
          </>
        ) : (
          <>
            <Mh anim={text} className="display hero__title hero__title--editorial" variants={v}>{firstName}</Mh>
            <Mh anim={text} className="display hero__title hero__title--editorial accent-text" variants={v}>{lastName}</Mh>
          </>
        )}
        <Mp anim={text} className="hero__tagline hero__tagline--editorial" variants={v}>{profile.tagline}</Mp>
        <Mp anim={text} className="lead hero__subline hero__subline--editorial" variants={v}>{profile.subline}</Mp>
        <M anim={text} variants={v}><HeroCTA className={ctaClass} /></M>
      </motion.div>
    );
  }

  // ── GLASS ──
  if (layout === "glass") {
    return (
      <motion.div
        className="hero__glass-card glass"
        variants={cfg.container}
        initial="hidden"
        animate="show"
      >
        <Mp anim={text} className="eyebrow" variants={v}>{meta}</Mp>
        <Mh anim={text} className="display hero__title hero__title--glass" variants={v}>
          {firstName} <span className="accent-text">{lastName}</span>
        </Mh>
        <Tagline anim={text} className="hero__tagline" variants={v} />
        <Mp anim={motionAnim} className="lead hero__subline" variants={v}>{profile.subline}</Mp>
        <M anim={motionAnim} variants={v}><HeroCTA /></M>
      </motion.div>
    );
  }

  // ── MINIMAL ──
  if (layout === "minimal") {
    return (
      <motion.div className="hero__minimal" variants={cfg.container} initial="hidden" animate="show">
        <Mp anim={text} className="eyebrow" variants={v}>{profile.role}</Mp>
        <Mh anim={text} className="display hero__title hero__title--minimal" variants={v}>{profile.name}</Mh>
        <Mp anim={text} className="hero__tagline hero__tagline--minimal" variants={v}>{profile.tagline}</Mp>
        <M anim={text} variants={v}><HeroCTA className={ctaClass} /></M>
      </motion.div>
    );
  }

  // ── WIDE ──
  if (layout === "wide") {
    const words = profile.name.split(" ");
    return (
      <motion.div className="hero__wide" variants={cfg.container} initial="hidden" animate="show">
        <Mp anim={text} className="eyebrow hero__wide-eyebrow" variants={v}>{meta}</Mp>
        <div className="hero__wide-names">
          {text === "clip" ? (
            words.map((w, i) => <ClipWord key={w} word={w} accent={i === 1} delay={0.2 + i * 0.18} />)
          ) : text === "kinetic" ? (
            words.map((w, i) => (
              <h1 key={w} className={`display hero__wide-word ${i === 1 ? "accent-text" : ""}`}>
                <KineticChars text={w} delay={0.3 + i * 0.2} />
              </h1>
            ))
          ) : (
            words.map((w, i) => (
              <Mh
                key={w}
                anim={text}
                className={`display hero__wide-word ${i === 1 ? "accent-text" : ""}`}
                variants={v}
              >
                {w}
              </Mh>
            ))
          )}
        </div>
        <Mp anim={text} className="hero__tagline hero__wide-tag" variants={v}>{profile.tagline}</Mp>
        <Mp anim={motionAnim} className="lead hero__subline" variants={v}>{profile.subline}</Mp>
        <M anim={motionAnim} variants={v}><HeroCTA /></M>
      </motion.div>
    );
  }

  return null;
}
