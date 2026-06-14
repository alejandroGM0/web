import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STATIONS, stationOpacity } from "./journey";
import { profile, about, experience, projects, stack } from "../data/profile";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const byKey = Object.fromEntries(STATIONS.map((s) => [s.key, s]));

/* ---------- 3D anchors that mount each chapter into the world ---------- */

function GlowCore({ position }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current || reduceMotion) return;
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x += delta * 0.05;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <pointLight color="#ff9d4d" intensity={6} distance={18} />
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#1a1408"
          emissive="#ff7a18"
          emissiveIntensity={1.6}
          roughness={0.4}
          metalness={0.3}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial color="#0a0a0e" emissive="#ff7a18" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Monolith({ position, accent }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current || reduceMotion) return;
    ref.current.position.y =
      position[1] - 2.4 + Math.sin(state.clock.elapsedTime * 0.6 + position[2]) * 0.12;
  });
  return (
    <group position={[position[0], 0, position[2] - 1.2]}>
      <pointLight color={accent} intensity={5} distance={16} position={[0, position[1], 1]} />
      <mesh ref={ref} position={[0, position[1] - 2.4, 0]}>
        <boxGeometry args={[0.18, 5.4, 0.18]} />
        <meshStandardMaterial
          color="#050507"
          emissive={accent}
          emissiveIntensity={2.2}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, position[1] - 4.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.6, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Constellation({ position }) {
  const ref = useRef();
  const nodes = useMemo(() => {
    const rng = mulberry32(7);
    return stack.map(() => {
      const r = 2.2 + rng() * 2.6;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      return [
        Math.sin(phi) * Math.cos(theta) * r,
        Math.cos(phi) * r * 0.7,
        Math.sin(phi) * Math.sin(theta) * r * 0.6,
      ];
    });
  }, []);

  useFrame((state, delta) => {
    if (!ref.current || reduceMotion) return;
    ref.current.rotation.y += delta * 0.06;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={ref} position={position}>
      <pointLight color="#a06bff" intensity={4} distance={20} />
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.085, 12, 12]} />
          <meshStandardMaterial
            color="#0a0a12"
            emissive="#9fb8ff"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Gate({ position }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current || reduceMotion) return;
    ref.current.rotation.z += delta * 0.08;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.03;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={[position[0], position[1], position[2] - 2]}>
      <pointLight color="#ff7a18" intensity={6} distance={22} />
      <mesh ref={ref}>
        <torusGeometry args={[3.4, 0.06, 16, 96]} />
        <meshStandardMaterial color="#1a1408" emissive="#ff7a18" emissiveIntensity={2.4} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.6, 0.03, 16, 96]} />
        <meshStandardMaterial color="#1a1408" emissive="#ffb56b" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

/* ---------- HTML content placed inside the world ---------- */

function StationHtml({ station, progress, distanceFactor = 6, width, children }) {
  const opacity = stationOpacity(progress, station.u);
  const visible = opacity > 0.012;
  return (
    <Html
      position={station.position}
      center
      distanceFactor={distanceFactor}
      zIndexRange={[30, 0]}
      occlude={false}
      style={{ pointerEvents: "none", width }}
      wrapperClass="station-wrapper"
    >
      <div
        className="station"
        style={{
          opacity,
          visibility: visible ? "visible" : "hidden",
          transform: `translateY(${(1 - opacity) * 18}px) scale(${0.95 + opacity * 0.05})`,
          pointerEvents: opacity > 0.55 ? "auto" : "none",
        }}
        aria-hidden={!visible}
      >
        {children}
      </div>
    </Html>
  );
}

const lastName = profile.name.split(" ").slice(-1)[0];
const firstName = profile.name.split(" ")[0];

function HeroPanel({ progress }) {
  return (
    <StationHtml station={byKey.hero} progress={progress} distanceFactor={5.5} width={560}>
      <div className="panel panel--hero">
        <p className="panel__eyebrow">
          {profile.role} · {profile.location}
        </p>
        <h1 className="panel__name">
          {firstName} <span className="accent">{lastName}</span>
        </h1>
        <p className="panel__tagline">{profile.tagline}</p>
        <p className="panel__sub">{profile.subline}</p>
        <span className="panel__hint">Scroll to travel</span>
      </div>
    </StationHtml>
  );
}

function AboutPanel({ progress }) {
  return (
    <StationHtml station={byKey.about} progress={progress} width={460}>
      <div className="panel panel--about">
        <span className="panel__tag">About</span>
        {about.lines.map((l) => (
          <p key={l} className="panel__line">
            {l}
          </p>
        ))}
        <div className="panel__exp">
          <span className="panel__exp-label">Experience</span>
          {experience.map((e) => (
            <div key={e.org} className="panel__exp-item">
              <div className="panel__exp-head">
                <strong>{e.role}</strong>
                <span>{e.period}</span>
              </div>
              <span className="panel__exp-org">{e.org}</span>
              <p>{e.note}</p>
            </div>
          ))}
        </div>
      </div>
    </StationHtml>
  );
}

function ProjectPanel({ stationKey, project, progress }) {
  return (
    <StationHtml
      station={byKey[stationKey]}
      progress={progress}
      width={420}
      distanceFactor={6.2}
    >
      <article className="card" style={{ "--accent": project.accent }}>
        {project.image && (
          <div className="card__media">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = "none";
              }}
            />
          </div>
        )}
        <div className="card__head">
          <span className="card__kind">{project.kind}</span>
          <span className="card__period">{project.period}</span>
        </div>
        <h2 className="card__title">{project.title}</h2>
        <p className="card__blurb">{project.blurb}</p>
        <div className="card__tags">
          {project.tags.map((t) => (
            <span key={t} className="tagchip">
              {t}
            </span>
          ))}
        </div>
        <a
          className="card__link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          View project ↗
        </a>
      </article>
    </StationHtml>
  );
}

function StackPanel({ progress }) {
  return (
    <StationHtml station={byKey.stack} progress={progress} width={520} distanceFactor={6}>
      <div className="panel panel--stack">
        <span className="panel__tag">Stack</span>
        <h2 className="panel__h2">What I reach for</h2>
        <div className="chips">
          {stack.map((s) => (
            <span key={s.name} className="chip">
              <i className={s.icon} aria-hidden="true" />
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </StationHtml>
  );
}

function ContactPanel({ progress }) {
  return (
    <StationHtml station={byKey.contact} progress={progress} width={560} distanceFactor={5.5}>
      <div className="panel panel--contact">
        <span className="panel__tag">Contact</span>
        <a className="panel__cta" href={`mailto:${profile.email}`}>
          Let's build <span className="accent">something together.</span>
        </a>
        <p className="panel__sub">
          Internships, collaborations, or a good technical argument — my inbox is open.
        </p>
        <a className="panel__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="panel__links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <footer className="panel__footer">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </StationHtml>
  );
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PROJECT_KEYS = ["p0", "p1", "p2", "p3", "p4"];

export default function Stations({ progress }) {
  return (
    <>
      {/* world anchors */}
      <GlowCore position={byKey.hero.position} />
      {PROJECT_KEYS.map((k, i) =>
        projects[i] ? (
          <Monolith key={k} position={byKey[k].position} accent={projects[i].accent} />
        ) : null
      )}
      <Constellation position={byKey.stack.position} />
      <Gate position={byKey.contact.position} />

      {/* content */}
      <HeroPanel progress={progress} />
      <AboutPanel progress={progress} />
      {PROJECT_KEYS.map((k, i) =>
        projects[i] ? (
          <ProjectPanel key={k} stationKey={k} project={projects[i]} progress={progress} />
        ) : null
      )}
      <StackPanel progress={progress} />
      <ContactPanel progress={progress} />
    </>
  );
}
