import * as THREE from "three";

/**
 * The journey is a single continuous flight along a curved "spine" through a
 * dark volumetric world. Scroll drives a normalized progress (0..1) that is
 * smoothed every frame; the camera reads from this shared store so motion is
 * decoupled from React re-renders.
 */
export const journey = { progress: 0, target: 0, velocity: 0 };

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const UP = V(0, 1, 0);

// Control points the camera threads through. A gentle S-wave drifting in -Z so
// every chapter is "around the next bend" rather than in a straight tunnel.
const SPINE = [
  V(0, 1.6, 24),
  V(1.8, 0.6, 6),
  V(-2.2, 2.0, -14),
  V(2.6, -0.4, -34),
  V(-2.6, 1.7, -54),
  V(2.2, 0.4, -74),
  V(-2.2, 1.8, -94),
  V(2.6, -0.3, -114),
  V(-1.8, 1.4, -134),
  V(0.3, 0.6, -154),
  V(0, 0.8, -178),
];

export const curve = new THREE.CatmullRomCurve3(SPINE, false, "catmullrom", 0.5);
export const curveLength = curve.getLength();

// How far ahead (in curve param) content sits relative to the camera's dwell
// point, so chapters are framed in front of the lens instead of beside it.
const AHEAD = 7 / curveLength;

// Each station = a camera dwell point (u) + content offset to one side of the
// spine. side: -1 left, +1 right, 0 dead-ahead. lift nudges content vertically.
const STATION_DEFS = [
  { key: "hero", u: 0.05, label: "Intro", side: 0, lift: 1.1 },
  { key: "about", u: 0.165, label: "About", side: 1, lift: 0.6 },
  { key: "p0", u: 0.285, label: "Work / 01", side: -1, lift: 0.3 },
  { key: "p1", u: 0.395, label: "Work / 02", side: 1, lift: 0.3 },
  { key: "p2", u: 0.495, label: "Work / 03", side: -1, lift: 0.3 },
  { key: "p3", u: 0.595, label: "Work / 04", side: 1, lift: 0.3 },
  { key: "p4", u: 0.695, label: "Work / 05", side: -1, lift: 0.3 },
  { key: "stack", u: 0.815, label: "Stack", side: 0, lift: 0.8 },
  { key: "contact", u: 0.94, label: "Contact", side: 0, lift: 0.4 },
];

const LATERAL = 3.4;

export const STATIONS = STATION_DEFS.map((d) => {
  const contentU = Math.min(d.u + AHEAD, 1);
  const point = curve.getPointAt(contentU);
  const tangent = curve.getTangentAt(contentU).normalize();
  const right = new THREE.Vector3().crossVectors(tangent, UP).normalize();
  const position = point
    .clone()
    .addScaledVector(right, d.side * LATERAL)
    .addScaledVector(UP, d.lift);
  // Orientation: face back toward the incoming camera.
  const facing = point.clone().addScaledVector(tangent, -6);
  return {
    ...d,
    position: [position.x, position.y, position.z],
    facing: [facing.x, facing.y, facing.z],
    tangent: [tangent.x, tangent.y, tangent.z],
  };
});

const PROGRESS_KEYS = STATIONS.map((s) => s.u);
// Anchor 0 (start of curve) and 1 (end) book-end the keyframe list.
const KEYS = [0, ...PROGRESS_KEYS, 1];
const VALUES = [0, ...PROGRESS_KEYS, 1];

const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Map raw scroll progress to a curve param with eased transitions between
 * stations. The easing slows the camera as it arrives at — and accelerates as
 * it leaves — every chapter, producing a natural cinematic dwell.
 */
export function uFromProgress(p) {
  const x = clamp01(p);
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (x <= b || i === KEYS.length - 2) {
      const span = b - a || 1;
      const local = clamp01((x - a) / span);
      return THREE.MathUtils.lerp(VALUES[i], VALUES[i + 1], smoother(local));
    }
  }
  return 1;
}

const tmpPos = new THREE.Vector3();
const tmpAhead = new THREE.Vector3();
const tmpStation = new THREE.Vector3();

/**
 * Resolve the camera transform for a given progress. Writes into `out`
 * { position, lookAt } and returns the dominant station influence so callers
 * can frame the active chapter.
 */
export function sampleCamera(p, out) {
  const u = uFromProgress(p);
  curve.getPointAt(u, tmpPos);
  curve.getPointAt(Math.min(u + 0.012, 1), tmpAhead);

  // Find the station whose dwell point we're closest to (in progress space).
  let nearest = STATIONS[0];
  let best = Infinity;
  for (const s of STATIONS) {
    const d = Math.abs(p - s.u);
    if (d < best) {
      best = d;
      nearest = s;
    }
  }
  const influence = clamp01(1 - best / 0.07);

  tmpStation.set(nearest.position[0], nearest.position[1], nearest.position[2]);
  out.position.copy(tmpPos);
  out.lookAt.copy(tmpAhead).lerp(tmpStation, influence * 0.55);
  // Banking: roll into the horizontal component of travel direction.
  out.roll = THREE.MathUtils.clamp((tmpAhead.x - tmpPos.x) * -0.12, -0.18, 0.18);
  out.u = u;
  return { station: nearest, influence };
}

/** Which chapter is active + how far through it (for the HUD). */
export function chapterAt(p) {
  let nearest = STATIONS[0];
  let best = Infinity;
  for (const s of STATIONS) {
    const d = Math.abs(p - s.u);
    if (d < best) {
      best = d;
      nearest = s;
    }
  }
  return { key: nearest.key, label: nearest.label };
}

/** Per-station opacity for content fade-in/out as the camera passes. */
export function stationOpacity(p, u) {
  const d = Math.abs(p - u);
  return clamp01(1 - d / 0.075);
}

// --- Colour grading -------------------------------------------------------
// Cohesive deep palette that warms toward the start/end and cools mid-flight.
const STOPS = [
  { at: 0.0, bg: "#06060c", fog: "#0a0a16", glow: "#ff7a18" },
  { at: 0.16, bg: "#070a12", fog: "#0a0f1c", glow: "#5b8cff" },
  { at: 0.5, bg: "#05080e", fog: "#081320", glow: "#3bd6c6" },
  { at: 0.82, bg: "#070611", fog: "#0d0a1e", glow: "#a06bff" },
  { at: 1.0, bg: "#0a0710", fog: "#150a16", glow: "#ff7a18" },
];
const _stops = STOPS.map((s) => ({
  at: s.at,
  bg: new THREE.Color(s.bg),
  fog: new THREE.Color(s.fog),
  glow: new THREE.Color(s.glow),
}));

const _bg = new THREE.Color();
const _fog = new THREE.Color();
const _glow = new THREE.Color();

export function gradeAt(p) {
  let a = _stops[0];
  let b = _stops[_stops.length - 1];
  for (let i = 0; i < _stops.length - 1; i++) {
    if (p >= _stops[i].at && p <= _stops[i + 1].at) {
      a = _stops[i];
      b = _stops[i + 1];
      break;
    }
  }
  const span = b.at - a.at || 1;
  const t = clamp01((p - a.at) / span);
  _bg.copy(a.bg).lerp(b.bg, t);
  _fog.copy(a.fog).lerp(b.fog, t);
  _glow.copy(a.glow).lerp(b.glow, t);
  return { bg: _bg, fog: _fog, glow: _glow };
}

export const SCROLL_VH = 760;
