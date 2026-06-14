/**
 * Todas las variantes de hero disponibles.
 * type: "shell" → layout + escena 3D o fondo CSS
 * type: "standalone" → componente hero completo con animaciones propias
 */

export const HERO_CATEGORIES = [
  {
    id: "hardware",
    label: "PC / Hardware 3D",
    presets: [
      { id: "desk-split", label: "Desk · Split", type: "shell", layout: "split", scene: "desk", veil: "split", desc: "Escritorio realista — texto izquierda" },
      { id: "desk-center", label: "Desk · Center", type: "shell", layout: "center", scene: "desk", veil: "center", desc: "Escritorio dev centrado" },
      { id: "desk-minimal", label: "Desk · Minimal", type: "shell", layout: "minimal", scene: "desk", veil: "minimal", desc: "Setup + texto mínimo" },
      { id: "cable-macro", label: "Cable Macro", type: "shell", layout: "split", scene: "macroCable", veil: "split", desc: "Close-up cable + electricidad" },
      { id: "cables-center", label: "PC Cables", type: "shell", layout: "center", scene: "cables", veil: "center", desc: "Torre + monitor + cables eléctricos" },
      { id: "chip-glass", label: "CPU Die", type: "shell", layout: "glass", scene: "chipDie", veil: "glass", desc: "Die de procesador macro" },
      { id: "chip-editorial", label: "CPU · Editorial", type: "shell", layout: "editorial", scene: "chipDie", veil: "editorial", desc: "Chip + tipografía editorial" },
      { id: "circuit-glass", label: "Circuit PCB", type: "shell", layout: "glass", scene: "circuit", veil: "glass", desc: "Placa base + pulsos en trazas" },
      { id: "interior-split", label: "PC Interior", type: "shell", layout: "split", scene: "interior", veil: "split", desc: "PSU, GPU, harness de cables" },
      { id: "interior-minimal", label: "Interior · Min", type: "shell", layout: "minimal", scene: "interior", veil: "minimal", desc: "Dentro del PC" },
      { id: "bench-split", label: "Workbench", type: "shell", layout: "split", scene: "workbench", veil: "split", desc: "Mesa de electrónica" },
      { id: "server-wide", label: "Server Rack", type: "shell", layout: "wide", scene: "server", veil: "center", desc: "Rack con LEDs parpadeando" },
      { id: "server-glass", label: "Server · Glass", type: "shell", layout: "glass", scene: "server", veil: "glass", desc: "Datacenter + card glass" },
    ],
  },
  {
    id: "fx3d",
    label: "3D Abstracto",
    presets: [
      { id: "nebula-center", label: "Nebula", type: "shell", layout: "center", scene: "nebula", veil: "center", desc: "4200 partículas con glow" },
      { id: "lattice-center", label: "Lattice", type: "shell", layout: "center", scene: "lattice", veil: "center", desc: "Geodésicas wireframe anidadas" },
      { id: "rings-center", label: "Rings", type: "shell", layout: "center", scene: "rings", veil: "center", desc: "Anillos orbitales + núcleo" },
      { id: "waves-split", label: "Waves", type: "shell", layout: "split", scene: "waves", veil: "split", desc: "Terreno shader reactivo al mouse" },
      { id: "network-glass", label: "Network", type: "shell", layout: "glass", scene: "network", veil: "glass", desc: "Grafo 3D de nodos conectados" },
      { id: "crystal-minimal", label: "Crystal", type: "shell", layout: "minimal", scene: "crystal", veil: "minimal", desc: "Cristales metálicos + luces" },
      { id: "helix-wide", label: "Helix", type: "shell", layout: "wide", scene: "helix", veil: "center", desc: "Doble hélice ADN luminosa" },
      { id: "orb-center", label: "Orb", type: "shell", layout: "center", scene: "orb", veil: "center", desc: "Esfera shader original con bloom" },
    ],
  },
  {
    id: "motion",
    label: "Animaciones texto",
    presets: [
      { id: "refined", label: "Refined", type: "standalone", component: "refined", desc: "Tipografía editorial, motion sutil" },
      { id: "minimal-clean", label: "Minimal", type: "standalone", component: "minimal", desc: "Casi sin animación, muy limpio" },
      { id: "kinetic", label: "Kinetic", type: "standalone", component: "kinetic", desc: "Letras 3D una a una + blur por palabra" },
      { id: "terminal-full", label: "Terminal", type: "standalone", component: "terminal", desc: "Typing effect letra a letra" },
      { id: "editorial-full", label: "Editorial", type: "standalone", component: "editorial", desc: "Línea que se dibuja + fade izquierda" },
      { id: "brutalist-full", label: "Brutalist", type: "standalone", component: "brutalist", desc: "Tipografía masiva clip reveal" },
      { id: "marquee-full", label: "Marquee", type: "standalone", component: "marquee", desc: "Stack scroll infinito de fondo" },
      { id: "aurora-full", label: "Aurora", type: "standalone", component: "aurora", desc: "Gradientes CSS + blur reveal" },
    ],
  },
  {
    id: "css",
    label: "Layouts CSS (sin 3D)",
    presets: [
      { id: "aurora-css", label: "Aurora · CSS", type: "shell", layout: "center", cssBg: "aurora", veil: "center", desc: "Solo gradientes CSS" },
      { id: "editorial-css", label: "Editorial · CSS", type: "shell", layout: "editorial", cssBg: "grid", veil: "editorial", desc: "Tipografía + grid de puntos" },
      { id: "terminal-css", label: "Terminal · CSS", type: "shell", layout: "glass", cssBg: "terminal", veil: "glass", desc: "Fondo terminal sin typing" },
      { id: "brutalist-css", label: "Brutalist · CSS", type: "shell", layout: "wide", cssBg: "noise", veil: "center", desc: "Tipografía wide + ruido" },
      { id: "marquee-css", label: "Marquee · CSS", type: "shell", layout: "minimal", cssBg: "marquee", veil: "minimal", desc: "Marquee CSS simple" },
    ],
  },
];

/** Lista plana — usada por el picker */
export const HERO_PRESETS = HERO_CATEGORIES.flatMap((c) =>
  c.presets.map((p) => ({ ...p, category: c.id, categoryLabel: c.label }))
);

export const PRESET_COUNT = HERO_PRESETS.length;
