import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const CRYSTALS = [
  { pos: [0, 0, 0], scale: 1.1, rot: [0.4, 0.2, 0], speed: 0.3 },
  { pos: [1.1, 0.5, -0.4], scale: 0.55, rot: [0.8, 1.2, 0.3], speed: -0.45 },
  { pos: [-0.9, -0.3, 0.5], scale: 0.65, rot: [1.1, 0.5, 0.8], speed: 0.38 },
  { pos: [0.3, -0.7, 0.8], scale: 0.45, rot: [0.2, 1.5, 0.1], speed: -0.52 },
  { pos: [-0.5, 0.8, -0.6], scale: 0.5, rot: [0.6, 0.9, 1.1], speed: 0.42 },
];

function Crystal({ position, scale, rotation, speed }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.6;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed * 2 + position[0]) * 0.08;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} rotation={rotation}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshPhysicalMaterial
        color="#1a1206"
        emissive="#ff7a18"
        emissiveIntensity={0.4}
        metalness={0.95}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

function OrbitLight({ radius, speed, color, intensity }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * 0.8, Math.sin(t) * radius);
  });

  return <pointLight ref={ref} color={color} intensity={intensity} distance={10} />;
}

function Rig() {
  const group = useRef();

  useFrame(() => {
    const p = lerpPointer(0.05);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.55, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.3, 0.04);
  });

  return (
    <group ref={group}>
      {CRYSTALS.map((c, i) => (
        <Crystal key={i} position={c.pos} scale={c.scale} rotation={c.rot} speed={c.speed} />
      ))}
      <OrbitLight radius={3} speed={0.5} color="#ff7a18" intensity={5} />
      <OrbitLight radius={2.5} speed={-0.35} color="#ffb56b" intensity={3} />
      <OrbitLight radius={3.5} speed={0.25} color="#ffffff" intensity={1.5} />
      <ambientLight intensity={0.12} />
    </group>
  );
}

export default function CrystalScene() {
  return (
    <SceneCanvas camera={[0, 0, 4.2]} bloom={{ intensity: 1.0, luminanceThreshold: 0.3 }}>
      <Rig />
    </SceneCanvas>
  );
}
