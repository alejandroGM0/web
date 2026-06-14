import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const RINGS = [
  { r: 1.4, tube: 0.018, tilt: [0.6, 0.2, 0], speed: 0.35, color: "#ff7a18" },
  { r: 1.85, tube: 0.014, tilt: [1.1, 0.5, 0.3], speed: -0.28, color: "#ffb56b" },
  { r: 2.35, tube: 0.012, tilt: [0.3, 0.9, -0.2], speed: 0.2, color: "#ff5e3a" },
  { r: 2.9, tube: 0.01, tilt: [0.8, -0.4, 0.5], speed: -0.15, color: "#ffffff" },
];

function Ring({ radius, tube, tilt, speed, color }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, tube, 16, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        metalness={0.85}
        roughness={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function CoreGlow() {
  const ref = useRef();
  const light = useRef();

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2) * 0.15;
    if (ref.current) ref.current.scale.setScalar(pulse);
    if (light.current) light.current.intensity = 4 + Math.sin(t * 2) * 1.5;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#fff5eb"
          emissive="#ff7a18"
          emissiveIntensity={4}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>
      <pointLight ref={light} color="#ff9d4d" intensity={4} distance={12} />
    </group>
  );
}

function Rig() {
  const group = useRef();

  useFrame(() => {
    const p = lerpPointer(0.04);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.5 + 0.3, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.35, 0.03);
  });

  return (
    <group ref={group}>
      {RINGS.map((r) => (
        <Ring key={r.r} {...r} />
      ))}
      <CoreGlow />
    </group>
  );
}

export default function RingsScene() {
  return (
    <SceneCanvas camera={[0, 0, 5.5]} bloom={{ intensity: 1.1, radius: 0.85 }}>
      <ambientLight intensity={0.08} />
      <Rig />
    </SceneCanvas>
  );
}
