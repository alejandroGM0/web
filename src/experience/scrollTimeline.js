/** Scroll progress ranges (0–1) for each chapter. Overlap = crossfade. */
export const SCROLL_HEIGHT = "550vh";

export const CHAPTERS = {
  intro: { start: 0, end: 0.17, id: "top", label: "Intro" },
  work: { start: 0.14, end: 0.4, id: "work", label: "Work" },
  about: { start: 0.37, end: 0.54, id: "about", label: "About" },
  stack: { start: 0.51, end: 0.72, id: "stack", label: "Stack" },
  contact: { start: 0.68, end: 1, id: "contact", label: "Contact" },
};

export const CHAPTER_LIST = Object.values(CHAPTERS);

export const ANCHORS = {
  top: "0%",
  work: "16%",
  about: "38%",
  stack: "54%",
  contact: "72%",
};

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

/** Opacity for a chapter at global scroll progress p (0–1). */
export function chapterOpacity(p, start, end, pad = 0.035) {
  if (end >= 0.999) {
    if (p < start) return 0;
    if (p < start + pad) return clamp01((p - start) / pad);
    return 1;
  }
  if (start <= 0.001) {
    if (p >= end) return 0;
    if (p > end - pad) return clamp01((end - p) / pad);
    return 1;
  }
  if (p < start) return 0;
  if (p < start + pad) return clamp01((p - start) / pad);
  if (p >= end) return 0;
  if (p > end - pad) return clamp01((end - p) / pad);
  return 1;
}

export function localProgress(global, start, end) {
  if (global <= start) return 0;
  if (global >= end) return 1;
  return (global - start) / (end - start);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}
