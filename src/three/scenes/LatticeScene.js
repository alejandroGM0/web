import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const SHELLS = [
  { r: 1.2, detail: 1, speed: 0.22, color: "#ff7a18" },
  { r: 1.65, detail: 1, speed: -0.16, color: "#ffb56b" },
  { r: 2.15, detail: 2, speed: 0.1, color: "#ff5e3a" },
  { r: 2.7, detail: 2, speed: -0.08, color: "#ffffff" },
];

function Shell({ radius, detail, speed, color }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.35;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[radius, detail]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function Core() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial
        color="#ff9d4d"
        emissive="#ff7a18"
        emissiveIntensity={2.5}
        metalness={0.9}
        roughness={0.15}
      />
    </mesh>
  );
}

function Rig() {
  const group = useRef();

  useFrame(() => {
    const p = lerpPointer(0.05);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.45, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.3, 0.04);
  });

  return (
    <group ref={group}>
      {SHELLS.map((s) => (
        <Shell key={s.r} {...s} />
      ))}
      <Core />
      <pointLight intensity={3} color="#ff7a18" distance={8} />
      <pointLight intensity={1.2} color="#ffb56b" position={[-3, 2, 2]} />
    </group>
  );
}

export default function LatticeScene() {
  return (
    <SceneCanvas camera={[0, 0, 6]} bloom={{ intensity: 0.9, luminanceThreshold: 0.25 }}>
      <ambientLight intensity={0.15} />
      <Rig />
    </SceneCanvas>
  );
}
