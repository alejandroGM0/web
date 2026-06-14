import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  });
}

export function lerpPointer(speed = 0.05) {
  pointer.x += (pointer.tx - pointer.x) * speed;
  pointer.y += (pointer.ty - pointer.y) * speed;
  return pointer;
}

const DEFAULT_BLOOM = {
  mipmapBlur: true,
  intensity: 0.45,
  luminanceThreshold: 0.55,
  luminanceSmoothing: 0.4,
  radius: 0.65,
};

export function SceneCanvas({
  children,
  camera = [0, 0, 5],
  fov = 42,
  bloom = {},
  bg = "#060607",
  realistic = true,
  envPreset = "city",
  envIntensity = 0.45,
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: camera, fov }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: realistic ? 1.05 : 1,
      }}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    >
      <color attach="background" args={[bg]} />
      {realistic && (
        <>
          <Environment preset={envPreset} environmentIntensity={envIntensity} />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.5}
            scale={18}
            blur={2.8}
            far={5}
            resolution={512}
          />
        </>
      )}
      {children}
      <EffectComposer disableNormalPass>
        <Bloom {...DEFAULT_BLOOM} {...bloom} />
      </EffectComposer>
    </Canvas>
  );
}

/** Shared desk surface + key lighting for indoor scenes */
export function RealisticStage({ children, floorY = -0.85, floorScale = 14 }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]} receiveShadow>
        <planeGeometry args={[floorScale, floorScale]} />
        <meshPhysicalMaterial
          color="#0e0e12"
          roughness={0.85}
          metalness={0.15}
          clearcoat={0.1}
        />
      </mesh>
      <spotLight
        position={[2.5, 4, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={28}
        color="#fff5eb"
        castShadow
      />
      <spotLight position={[-3, 2, 1]} angle={0.5} penumbra={1} intensity={8} color="#ff9d4d" />
      <ambientLight intensity={0.08} />
      {children}
    </>
  );
}

export const mat = {
  metalDark: { color: "#1c1c22", metalness: 0.92, roughness: 0.28 },
  metalMid: { color: "#2a2a32", metalness: 0.85, roughness: 0.35 },
  plastic: { color: "#141418", metalness: 0.2, roughness: 0.65 },
  copper: { color: "#b87333", metalness: 0.95, roughness: 0.25 },
  pcb: { color: "#0d1a12", metalness: 0.25, roughness: 0.75 },
  screen: { color: "#080810", emissive: "#1a1030", emissiveIntensity: 0.35, metalness: 0.1, roughness: 0.05 },
};
