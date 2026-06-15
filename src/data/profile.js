// Single source of truth for site content.
// Kept short on purpose — this is not LinkedIn.

export const profile = {
  name: "Alejandro Gasca",
  role: "Computer Engineer",
  // Hero one-liner — very brief.
  tagline: "Computer Science",
  location: "Zaragoza, Spain",
  email: "alejandro3gps@gmail.com",
  github: "https://github.com/alejandroGM0",
  linkedin: "https://linkedin.com/in/alejandro-gasca-mediel/",
};

export const about = {
  lines: [
    "Final-year CS student at Unizar.",
    "Most of my time goes into building things.",
  ],
};

// Featured work — fewer projects, bigger statements.
export const projects = [
  {
    id: "blockchain",
    title: "Open Source @ Linux Foundation",
    kind: "Blockchain core",
    period: "2026 — Present",
    blurb:
      "Open-source work on Hyperledger Besu — fixing concurrency issues in the transaction engine.",
    tags: ["Java", "Python", "Distributed Systems"],
    accent: "#7c8cff",
    href: "https://github.com/alejandroGM0/besu",
    image: null,
  },
  {
    id: "belfort",
    title: "Investment Platform",
    kind: "Analytics platform",
    period: "2026",
    blurb:
      "Investment platform for backtesting strategies and querying market history. FastAPI, DuckDB, and Next.js.",
    tags: ["FastAPI", "DuckDB", "Next.js", "TA-Lib"],
    accent: "#4ade80",
    href: "https://github.com/alejandroGM0/investments_belfort",
    image: null,
  },
  {
    id: "engine",
    title: "2.5D Game Engine",
    kind: "From scratch",
    period: "2025 — Present",
    blurb:
      "A 2.5D game engine in Java with LibGDX and OpenGL — ECS, instanced rendering, built from scratch.",
    tags: ["Java", "LibGDX", "OpenGL"],
    accent: "#ff7a18",
    href: "https://github.com/alejandroGM0/project-top-down",
    image: "/images/entity-swarm.png",
  },
  {
    id: "musicsync",
    title: "MusicSync",
    kind: "Social audio",
    period: "2024",
    blurb:
      "Listen to the same track in sync with friends over the web. React, Django, and WebSockets.",
    tags: ["React", "Django", "WebSockets"],
    accent: "#f472b6",
    href: "https://alejandrogm.tech",
    image: "/images/musicsync-room.png",
  },
  {
    id: "charlacar",
    title: "Charlacar",
    kind: "Ride-sharing",
    period: "2022",
    blurb:
      "Carpooling platform with Stripe payments. Matches drivers and passengers on the same route.",
    tags: ["Python", "Stripe", "JavaScript"],
    accent: "#2dd4bf",
    href: "https://github.com/alejandroGM0/proyecto_software",
    image: null,
  },
];

export const experience = [
  {
    role: "Software Developer · Fixed contract",
    org: "Highways England · Remote",
    period: "2023",
    note: "Bridge management system in Django for 3,000+ assets. Maintained and extended the existing codebase.",
  },
];

// Unified journey — work first, then education.
export const timeline = [
  {
    tag: "Work",
    role: "Software Developer · Fixed contract",
    org: "Highways England · Remote",
    period: "2023",
    note: "Bridge management system in Django for 3,000+ assets. Maintained and extended the existing codebase.",
  },
  {
    tag: "Education",
    role: "B.Sc. Computer Science Engineering",
    org: "University of Zaragoza",
    period: "2023 — 2027",
    note: "8.5/10 GPA. Final year.",
  },
];

// Tech stack — grouped, minimal. Icons via devicon classes.
export const stack = [
  { name: "Python", icon: "devicon-python-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C++", icon: "devicon-cplusplus-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "Django", icon: "devicon-django-plain" },
  { name: "FastAPI", icon: "devicon-fastapi-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "Git", icon: "devicon-git-plain" },
];
