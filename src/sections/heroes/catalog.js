export const LAYOUT_OPTIONS = [
  { id: "center", label: "Center", desc: "Centrado clásico" },
  { id: "split", label: "Split", desc: "Texto izquierda, fondo visible derecha" },
  { id: "editorial", label: "Editorial", desc: "Alineado izq + línea naranja" },
  { id: "refined", label: "Refined", desc: "Editorial pulido con meta dots" },
  { id: "glass", label: "Glass", desc: "Contenido en card cristal" },
  { id: "minimal", label: "Minimal", desc: "Compacto abajo-izquierda" },
  { id: "wide", label: "Wide", desc: "Nombre en palabras gigantes" },
  { id: "brutalist", label: "Brutalist", desc: "Tipografía apilada + footer" },
  { id: "marquee", label: "Marquee Card", desc: "Card centrada estilo marquee" },
];

export const BG_OPTIONS = [
  { id: "none", label: "Ninguno", type: "none" },
  // CSS estático
  { id: "grid", label: "Grid", type: "css", cssBg: "grid" },
  { id: "noise", label: "Noise", type: "css", cssBg: "noise" },
  { id: "marqueeCss", label: "Marquee CSS", type: "css", cssBg: "marquee" },
  { id: "terminalCss", label: "Terminal CSS", type: "css", cssBg: "terminal" },
  // Animados (componentes legacy)
  { id: "auroraAnim", label: "Aurora Anim", type: "bg", bg: "auroraAnim" },
  { id: "marqueeBands", label: "Marquee Full", type: "bg", bg: "marqueeBands" },
  { id: "kineticPlanes", label: "Kinetic Planes", type: "bg", bg: "kineticPlanes" },
  { id: "terminalFx", label: "Terminal FX", type: "bg", bg: "terminalFx" },
  { id: "refinedAmbient", label: "Refined Glow", type: "bg", bg: "refinedAmbient" },
  { id: "brutalistNoise", label: "Brutalist Noise", type: "bg", bg: "brutalistNoise" },
  { id: "ultraMesh", label: "✦ Ultra Mesh", type: "bg", bg: "ultraMesh" },
  // 3D hardware
  { id: "desk", label: "Desk", type: "scene", scene: "desk" },
  { id: "cables", label: "PC Cables", type: "scene", scene: "cables" },
  { id: "macroCable", label: "Cable Macro", type: "scene", scene: "macroCable" },
  { id: "chipDie", label: "CPU Die", type: "scene", scene: "chipDie" },
  { id: "circuit", label: "Circuit", type: "scene", scene: "circuit" },
  { id: "interior", label: "Interior", type: "scene", scene: "interior" },
  { id: "workbench", label: "Workbench", type: "scene", scene: "workbench" },
  { id: "server", label: "Server", type: "scene", scene: "server" },
  // 3D abstracto
  { id: "nebula", label: "Nebula", type: "scene", scene: "nebula" },
  { id: "lattice", label: "Lattice", type: "scene", scene: "lattice" },
  { id: "rings", label: "Rings", type: "scene", scene: "rings" },
  { id: "waves", label: "Waves", type: "scene", scene: "waves" },
  { id: "network", label: "Network", type: "scene", scene: "network" },
  { id: "crystal", label: "Crystal", type: "scene", scene: "crystal" },
  { id: "helix", label: "Helix", type: "scene", scene: "helix" },
  { id: "orb", label: "Orb", type: "scene", scene: "orb" },
];

export const TEXT_OPTIONS = [
  { id: "fade", label: "Fade", desc: "Stagger suave desde abajo" },
  { id: "left", label: "Slide", desc: "Entrada desde la izquierda" },
  { id: "blur", label: "Blur", desc: "Reveal con desenfoque" },
  { id: "refined", label: "Refined", desc: "Fade editorial con regla" },
  { id: "kinetic", label: "Kinetic", desc: "Letras una a una en 3D" },
  { id: "wordBlur", label: "Word Blur", desc: "Palabras del tagline con blur" },
  { id: "letterSpacing", label: "Tracking", desc: "Eyebrow con letter-spacing animado" },
  { id: "clip", label: "Clip", desc: "Wipe horizontal" },
  { id: "scale", label: "Scale", desc: "Card scale-in con rotación" },
  { id: "none", label: "Static", desc: "Fade mínimo" },
  { id: "terminal", label: "Terminal", desc: "Typing effect en ventana" },
  { id: "ultra", label: "✦ Ultra", desc: "Signature — springs, parallax, char reveal" },
];

export const DEFAULT_CONFIG = {
  layout: "center",
  bg: "ultraMesh",
  text: "ultra",
};

export function veilForLayout(layout) {
  if (layout === "wide" || layout === "marquee" || layout === "brutalist") return "center";
  if (layout === "refined") return "editorial";
  return layout;
}
