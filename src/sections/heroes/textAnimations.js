const ease = [0.22, 1, 0.36, 1];

export const TEXT_ANIMS = {
  fade: {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    },
    item: {
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    },
    rule: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.1 } },
    },
  },
  left: {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    },
    item: {
      hidden: { opacity: 0, x: -28 },
      show: { opacity: 1, x: 0, transition: { duration: 0.85, ease } },
    },
    rule: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.1 } },
    },
  },
  blur: {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
    },
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
    },
    rule: {
      hidden: { scaleX: 0, opacity: 0 },
      show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease } },
    },
  },
  none: {
    container: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.9, ease } },
    },
    item: {},
    rule: {},
  },
  clip: {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
    },
    item: {
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    },
    rule: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 0.8, ease } },
    },
  },
  refined: {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.01, delayChildren: 0.2 } },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
    },
    rule: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.1 } },
    },
  },
  scale: {
    container: {
      hidden: { opacity: 0, scale: 0.88, rotate: -2 },
      show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 1, ease, staggerChildren: 0.1, delayChildren: 0.35 },
      },
    },
    item: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.7, ease } },
    },
    rule: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 0.8, ease } },
    },
  },
};

export { ease };
