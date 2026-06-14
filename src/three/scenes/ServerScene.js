import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, RealisticStage, lerpPointer, prefersReducedMotion } from "../shared";

function LED({ position, color, speed = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.material.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * speed * 3 + position[0] * 5) * 0.5;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

function RackUnit({ y, index }) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.32, 0.85]} />
        <meshPhysicalMaterial color="#141418" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Vent */}
      <mesh position={[0, 0, 0.426]}>
        <planeGeometry args={[1.4, 0.22]} />
        <meshStandardMaterial color="#0a0a0e" />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <LED
          key={i}
          position={[-0.55 + i * 0.22, 0.05, 0.44]}
          color={i % 3 === 0 ? "#4ade80" : i % 3 === 1 ? "#ff7a18" : "#60a5fa"}
          speed={0.8 + index * 0.1 + i * 0.05}
        />
      ))}
    </group>
  );
}

function ServerRack() {
  const g = useRef();
  useFrame(() => {
    const p = lerpPointer(0.03);
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, p.x * 0.2 + 0.1, 0.03);
  });

  return (
    <group ref={g}>
      <RealisticStage floorY={-1.2}>
        {/* Rack frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.75, 2.2, 0.92]} />
          <meshPhysicalMaterial color="#0c0c10" metalness={0.9} roughness={0.35} transparent opacity={0.15} />
        </mesh>
        {[-0.75, -0.35, 0.05, 0.45, 0.85].map((y, i) => (
          <RackUnit key={i} y={y} index={i} />
        ))}
      </RealisticStage>
    </group>
  );
}

export default function ServerScene() {
  return (
    <SceneCanvas camera={[0, 0.2, 3.5]} fov={40} envPreset="warehouse" envIntensity={0.35} bloom={{ intensity: 0.5, luminanceThreshold: 0.4 }}>
      <ServerRack />
    </SceneCanvas>
  );
}
