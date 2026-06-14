import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Icosahedron,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shared, smoothly-lerped pointer in normalized device coords (-1..1).
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  });
}

/* The hero centerpiece: a single, calm chunk of glass. */
function GlassCore() {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Smooth the pointer so motion feels weighted, not twitchy
    pointer.x = THREE.MathUtils.lerp(pointer.x, pointer.tx, 0.06);
    pointer.y = THREE.MathUtils.lerp(pointer.y, pointer.ty, 0.06);

    if (mesh.current) {
      // Very slow self-rotation — elegant, not busy
      mesh.current.rotation.y += delta * 0.08;
      mesh.current.rotation.x += delta * 0.04;
    }
    if (group.current) {
      // Pronounced parallax toward the cursor
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.5,
        0.08
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.7,
        0.08
      );
      // Subtle drift so it leans toward the cursor
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        pointer.x * 0.35,
        0.06
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        pointer.y * 0.25,
        0.06
      );
      const s = 1 + Math.sin(t * 0.5) * 0.01;
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={prefersReducedMotion ? 0 : 0.9}
        rotationIntensity={prefersReducedMotion ? 0 : 0.25}
        floatIntensity={prefersReducedMotion ? 0 : 0.6}
      >
        <Icosahedron ref={mesh} args={[1.45, 0]}>
          <MeshTransmissionMaterial
            samples={8}
            resolution={512}
            thickness={2.2}
            roughness={0.12}
            transmission={1}
            ior={1.35}
            chromaticAberration={0.18}
            anisotropy={0.15}
            distortion={0.12}
            distortionScale={0.25}
            temporalDistortion={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationDistance={3}
            attenuationColor="#ffe2c2"
            color="#fff6ec"
            background={new THREE.Color("#060607")}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

/* A light that tracks the cursor so the glass lights up where you point. */
function CursorLight() {
  const light = useRef();
  useFrame(() => {
    if (light.current) {
      light.current.position.x = THREE.MathUtils.lerp(
        light.current.position.x,
        pointer.x * 5,
        0.1
      );
      light.current.position.y = THREE.MathUtils.lerp(
        light.current.position.y,
        pointer.y * 4,
        0.1
      );
    }
  });
  return (
    <pointLight
      ref={light}
      position={[0, 0, 3]}
      intensity={28}
      distance={12}
      color="#ffb877"
    />
  );
}

/* A couple of faint accent shards — kept dim so text stays readable. */
function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          -1.5 - Math.random() * 2,
        ],
        scale: 0.06 + Math.random() * 0.1,
        speed: 0.25 + Math.random() * 0.4,
        accent: i % 2 === 0,
      })),
    []
  );

  return (
    <>
      {shards.map((s, i) => (
        <Float
          key={i}
          speed={prefersReducedMotion ? 0 : s.speed}
          rotationIntensity={1}
          floatIntensity={1.5}
        >
          <Icosahedron args={[1, 0]} position={s.position} scale={s.scale}>
            <meshStandardMaterial
              color={s.accent ? "#ff7a18" : "#ffffff"}
              emissive={s.accent ? "#ff5e1a" : "#333"}
              emissiveIntensity={s.accent ? 1.4 : 0.15}
              roughness={0.3}
              metalness={0.5}
            />
          </Icosahedron>
        </Float>
      ))}
    </>
  );
}

/* Studio-style lighting built locally so reflections work offline. */
function Studio() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, 0, 1]}>
        <Lightformer
          intensity={2}
          color="#ffffff"
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          intensity={2.6}
          color="#ff8a3d"
          position={[-5, 1, -1]}
          scale={[3, 8, 1]}
        />
        <Lightformer
          intensity={1.6}
          color="#7c8cff"
          position={[5, -1, -1]}
          scale={[3, 8, 1]}
        />
        <Lightformer
          intensity={1}
          color="#ffffff"
          position={[0, -6, -2]}
          scale={[10, 4, 1]}
        />
      </group>
    </Environment>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#060607"]} />
      <ambientLight intensity={0.35} />
      <Suspense fallback={null}>
        <CursorLight />
        <GlassCore />
        <Shards />
        <Studio />
        <EffectComposer disableNormalPass>
          <Bloom
            mipmapBlur
            intensity={0.7}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.3}
            radius={0.6}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
