import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gradeAt, journey } from "../journey";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const bgVertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  varying vec3 vPos;
  void main() {
    float h = normalize(vPos).y * 0.5 + 0.5;
    float band = smoothstep(0.0, 0.55, h);
    vec3 col = mix(uHorizon, uTop, band);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Backdrop() {
  const matRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color("#05060c") },
      uHorizon: { value: new THREE.Color("#0a0a16") },
    }),
    []
  );

  useFrame(() => {
    if (!matRef.current) return;
    const grade = gradeAt(journey.progress);
    matRef.current.uniforms.uTop.value.lerp(grade.bg, 0.06);
    // a faint wash of the chapter glow on the horizon
    _tmp.copy(grade.fog).lerp(grade.glow, 0.18);
    matRef.current.uniforms.uHorizon.value.lerp(_tmp, 0.06);
  });

  return (
    <mesh scale={[1, 1, 1]} renderOrder={-1}>
      <sphereGeometry args={[320, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={bgVertex}
        fragmentShader={bgFragment}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

const _tmp = new THREE.Color();

function FarForms() {
  const ref = useRef();
  const forms = useMemo(() => {
    const out = [];
    const rng = mulberry32(20260615);
    for (let i = 0; i < 7; i++) {
      const z = 10 - i * 26 - rng() * 12;
      const side = i % 2 === 0 ? 1 : -1;
      out.push({
        position: [side * (16 + rng() * 14), (rng() - 0.5) * 22, z],
        scale: 4 + rng() * 7,
        speed: 0.02 + rng() * 0.04,
        kind: i % 3,
        seed: rng() * Math.PI * 2,
      });
    }
    return out;
  }, []);

  useFrame((state) => {
    if (!ref.current || reduceMotion) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((m, i) => {
      m.rotation.x = t * forms[i].speed + forms[i].seed;
      m.rotation.y = t * forms[i].speed * 0.7;
    });
  });

  return (
    <group ref={ref}>
      {forms.map((f, i) => (
        <mesh key={i} position={f.position} scale={f.scale}>
          {f.kind === 0 ? (
            <icosahedronGeometry args={[1, 0]} />
          ) : f.kind === 1 ? (
            <torusGeometry args={[1, 0.32, 8, 24]} />
          ) : (
            <octahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial
            color="#2a3350"
            wireframe
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
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

export default function Ambient() {
  return (
    <>
      <Backdrop />
      <FarForms />
    </>
  );
}
