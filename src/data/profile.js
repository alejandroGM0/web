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
// Each project has a small blog page at /project/{slug}, with one
// "build notes" post written in markdown.
export const projects = [
  {
    id: "blockchain",
    slug: "besu",
    title: "Open Source @ Linux Foundation",
    kind: "Open source contributor",
    period: "02.2026 – Present",
    blurb:
      "Open-source contributions to Hyperledger Besu and Hedera, including concurrency work in the transaction engine.",
    tags: ["Java", "Python", "Distributed Systems"],
    accent: "#7c8cff",
    href: "https://github.com/alejandroGM0/besu",
    linkLabel: "View on GitHub",
    image: "/images/blockchain-site.png",
    post: {
      title: "Debugging concurrency in someone else's engine",
      date: "02.2026 – Present",
      body: `Contributing to [Hyperledger Besu](https://github.com/hyperledger/besu) is a different kind of engineering than building something of my own. Besu is an Ethereum execution client maintained under the Linux Foundation, and the part I work on — the transaction engine — is exactly the part where bugs are hardest to see.

## Why concurrency bugs are the interesting ones

A concurrency issue in a transaction pipeline almost never shows up in a unit test. It shows up as a node that occasionally does something slightly wrong under real load, and the distance between the symptom and the cause can be enormous. Most of my time goes into reading code, building a mental model of which threads touch which state, and only then writing the fix — which is usually small once you understand the problem.

## What working in a large codebase teaches you

- **Reading is the job.** The ratio of code read to code written is easily 100:1. Being comfortable navigating a codebase you didn't write is the core skill.
- **Reproduce first.** A fix without a reliable reproduction is a guess. Getting a race condition to happen on demand is often harder than fixing it.
- **Process matters.** Open-source work under the Linux Foundation comes with review culture, CI gates, and maintainers with strong opinions. Learning to write changes that are easy to review is its own discipline.

This is ongoing work — I'll keep notes here as contributions land.`,
    },
  },
  {
    id: "belfort",
    slug: "belfort",
    title: "Investment Platform",
    kind: "Full stack",
    period: "05.2026 – 06.2026",
    blurb:
      "Investment platform for backtesting strategies and querying market history. FastAPI, DuckDB, and Next.js.",
    tags: ["FastAPI", "DuckDB", "Next.js", "TA-Lib"],
    accent: "#4ade80",
    href: "https://github.com/alejandroGM0/investments_belfort",
    linkLabel: "View on GitHub",
    image: "/images/belfort-chart.png",
    post: {
      title: "Why DuckDB is the right database for backtesting",
      date: "05.2026 – 06.2026",
      body: `Belfort is a platform for backtesting trading strategies and querying market history. The stack is FastAPI on the backend, Next.js on the frontend, and DuckDB as the analytical store — with TA-Lib doing the heavy lifting for technical indicators.

## The core insight

Backtesting is an analytical workload, not a transactional one. You scan large ranges of historical price data, aggregate, window, and compare — and you almost never update a row. That's exactly the shape of problem DuckDB is built for: columnar storage, vectorized execution, and no server to run. Queries that would need careful indexing in a row-oriented database just work.

## How the pieces fit

- **FastAPI** exposes the strategy and query endpoints. Async handlers keep the API responsive while a backtest runs.
- **DuckDB** holds market history and answers the range scans backtests generate.
- **TA-Lib** computes the indicators (moving averages, RSI, and friends) so I don't reimplement — and mis-implement — the math.
- **Next.js** renders the results: equity curves, trade lists, and strategy comparisons.

## What I'd tell someone building the same thing

Don't reach for a "real" database or a data warehouse first. An embedded analytical engine keeps the whole system on one machine, makes local development trivial, and removes an entire class of infrastructure work. You can always graduate later; most backtesting workloads never need to.`,
    },
  },
  {
    id: "engine",
    slug: "game-engine",
    title: "Game Engine",
    kind: "Computer graphics",
    period: "06.2025 – Present",
    blurb:
      "A 2.5D game engine in Java with LibGDX and OpenGL — ECS, instanced rendering, built from scratch.",
    tags: ["Java", "LibGDX", "OpenGL"],
    accent: "#ff7a18",
    href: "https://github.com/alejandroGM0/project-top-down",
    linkLabel: "View on GitHub",
    image: "/images/entity-swarm.png",
    post: {
      title: "Building an engine instead of a game",
      date: "06.2025 – Present",
      body: `Everyone tells you to build a game, not an engine. I built the engine anyway, because the engine *was* the thing I wanted to understand: how entities, rendering, and simulation actually fit together when nobody has abstracted it away for you.

## ECS as the backbone

The engine is organized around an entity-component-system architecture. Entities are just IDs, components are plain data, and systems iterate over the components they care about. The payoff is twofold: game logic stays decoupled (the render system knows nothing about AI), and iteration is cache-friendly, which matters a lot once you push the entity count up.

## Instanced rendering

The renderer sits on LibGDX and OpenGL. The single biggest performance win was instanced rendering: instead of issuing a draw call per sprite, geometry that shares a texture is drawn in one call with per-instance data. That's the difference between a scene that struggles with hundreds of entities and one that handles swarms of them — which is where the screenshot of the entity swarm comes from.

## The 2.5D part

"2.5D" here means top-down 2D gameplay with depth cues: draw order derived from world position, and lighting that fakes volume. It keeps the asset pipeline simple while making the world read as more than a flat grid.

## What building from scratch actually buys you

Not a better engine than the ones you can download — a better mental model. After writing the update loop, the batching, and the component storage yourself, engines like Unity stop being magic. That understanding was the goal, and it transfers to every performance-sensitive system I touch.`,
    },
  },
  {
    id: "musicsync",
    slug: "musicsync",
    title: "MusicSync",
    kind: "Full stack",
    period: "2022 – 2025",
    blurb:
      "Listen to the same track in sync with friends over the web. React, Django, and WebSockets.",
    tags: ["React", "Django", "WebSockets"],
    accent: "#f472b6",
    href: "https://github.com/alejandroGM0/groomusic",
    linkLabel: "View on GitHub",
    image: "/images/musicsync-room.png",
    post: {
      title: "Keeping a room of listeners in sync",
      date: "2022 – 2025",
      body: `MusicSync lets a group of friends listen to the same track at the same moment, each from their own browser. It sounds simple — press play together — but "together" over the internet is a genuinely fun distributed-systems problem.

## The synchronization problem

Every listener has different network latency, and every browser starts audio playback with its own small delay. If you just broadcast "play now", the room drifts apart within seconds. The approach that works is to make the server the source of truth for the timeline: it tracks the canonical playback position, and clients continuously reconcile against it — seeking or nudging their local playback when they drift past a threshold.

## Why WebSockets

Room state changes constantly: someone pauses, someone skips, someone joins mid-song. Polling would be both laggy and wasteful. A WebSocket connection per client (Django Channels on the backend) means the server can push state changes to the whole room the instant they happen, and joining listeners get the current position immediately instead of waiting for the next poll.

## The social part is the point

The technical sync is in service of a social feeling — hearing the same beat drop at the same time as someone in another city. Rooms, shared queues, and presence ("who's listening") turned a synchronization demo into something people actually wanted to hang out in.`,
    },
  },
  {
    id: "charlacar",
    slug: "charlacar",
    title: "Ride-Sharing Platform",
    kind: "Full stack",
    period: "02.2025 – 05.2025",
    blurb:
      "Carpooling platform with Stripe payments. Matches drivers and passengers on the same route.",
    tags: ["Python", "Stripe", "JavaScript"],
    accent: "#2dd4bf",
    href: "https://github.com/alejandroGM0/proyecto_software",
    linkLabel: "View on GitHub",
    image: "/images/charlacar-app.png",
    // Light-mode screenshot — invert to a dark look so it matches the site.
    imageInvert: true,
    post: {
      title: "A carpooling platform, end to end",
      date: "02.2025 – 05.2025",
      body: `Charlacar is a carpooling platform: drivers publish a trip with a route and available seats, passengers find trips going their way, and payment happens through Stripe. It was the first project where I had to think about a product end to end — matching, money, and trust — rather than a single technical trick.

## Matching riders to routes

The core feature is matching passengers to drivers heading the same way. A naive exact-match on origin and destination filters out most useful trips, so the search had to be tolerant: trips are matched on route compatibility, so a passenger going somewhere along a driver's path still finds the ride.

## Taking payments seriously

Integrating Stripe taught me the difference between "it charges a card" and a payment flow you can trust. The lessons that stuck:

- Never store card data yourself — let Stripe's elements and tokens handle it.
- Model the payment lifecycle explicitly: a booking isn't confirmed until the payment is, and failure paths (declines, cancellations) need real handling, not error toasts.
- Test-mode webhooks are your best friend for simulating the messy cases.

## What an early full-stack project teaches

This was Python and JavaScript glued into a working product: accounts, listings, search, checkout. The individual pieces were simple, but making them cohere — so a stranger could publish a trip and another stranger could pay to join it — is where most of the learning was.`,
    },
  },
];

export const experience = [
  {
    role: "Software Developer · Freelance",
    org: "Remote",
    period: "2021 — 2023",
    note: "Bridge management system in Django for 3,000+ assets. Maintained and extended the existing codebase.",
  },
];

// Unified journey — current education first, then freelance work.
export const timeline = [
  {
    tag: "Education",
    role: "B.Sc. Computer Science Engineering",
    org: "University of Zaragoza",
    period: "2022 – 12.2026",
    note: "8.5/10 GPA. Final year.",
  },
  {
    tag: "Work",
    role: "Software Developer · Freelance",
    org: "Remote",
    period: "2021 — 2023",
    note: "Bridge management system in Django for 3,000+ assets. Maintained and extended the existing codebase.",
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
