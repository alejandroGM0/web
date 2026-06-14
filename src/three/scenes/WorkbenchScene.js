import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, RealisticStage, lerpPointer, prefersReducedMotion } from "../shared";
import { TracePulses } from "../electricity";

function buildTraces() {
  const segs = [];
  const add = (x1, z1, x2, z2) =>
    segs.push({ from: new THREE.Vector3(x1, 0.03, z1), to: new THREE.Vector3(x2, 0.03, z2) });
  add(-0.6, -0.4, 0.6, -0.4);
  add(-0.6, 0.4, 0.6, 0.4);
  add(-0.6, -0.4, -0.6, 0.4);
  add(0.6, -0.4, 0.6, 0.4);
  add(-0.2, -0.2, 0.2, 0.2);
  add(0.2, -0.2, -0.2, 0.2);
  add(-0.6, 0, -0.9, 0);
  add(0.6, 0, 0.9, 0);
  return segs;
}

function Workbench() {
  const g = useRef();
  const segments = useMemo(() => buildTraces(), []);
  const positions = useMemo(() => {
    const a = [];
    segments.forEach(({ from, to }) => a.push(from.x, from.y, from.z, to.x, to.y, to.z));
    return new Float32Array(a);
  }, [segments]);

  useFrame((s) => {
    const p = lerpPointer(0.035);
    if (!g.current) return;
    g.current.rotation.y = p.x * 0.12 + 0.2;
    if (!prefersReducedMotion) g.current.position.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.015;
  });

  return (
    <group ref={g} position={[0, -0.2, 0]}>
      <RealisticStage floorY={-0.75}>
        {/* Bench */}
        <mesh position={[0, -0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.08, 1.2]} />
          <meshPhysicalMaterial color="#1a1510" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* PCB on bench */}
        <group position={[0, -0.65, 0]} rotation={[-Math.PI * 0.08, 0.15, 0]}>
          <mesh>
            <boxGeometry args={[1.1, 0.025, 0.85]} />
            <meshPhysicalMaterial color="#0d1a12" roughness={0.7} metalness={0.2} />
          </mesh>
          <lineSegments position={[0, 0.02, 0]}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#b87333" transparent opacity={0.65} />
          </lineSegments>
          <TracePulses segments={segments} count={8} speed={0.5} color="#ff9d4d" />
          {/* Chip */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.22, 0.04, 0.22]} />
            <meshPhysicalMaterial color="#111820" metalness={0.7} roughness={0.35} />
          </mesh>
        </group>
        {/* Soldering iron */}
        <mesh position={[0.85, -0.62, 0.2]} rotation={[0, -0.5, -0.3]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.35, 8]} />
          <meshPhysicalMaterial color="#2a2a32" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[1.0, -0.58, 0.28]}>
          <coneGeometry args={[0.025, 0.06, 8]} />
          <meshStandardMaterial color="#888" emissive="#ff7a18" emissiveIntensity={0.8} metalness={0.9} />
        </mesh>
        {/* Multimeter */}
        <mesh position={[-0.75, -0.66, 0.15]} castShadow>
          <boxGeometry args={[0.18, 0.06, 0.12]} />
          <meshPhysicalMaterial color="#1a1a22" roughness={0.5} metalness={0.4} />
        </mesh>
      </RealisticStage>
    </group>
  );
}

export default function WorkbenchScene() {
  return (
    <SceneCanvas camera={[0.5, 0.3, 2.6]} fov={44} envPreset="apartment" envIntensity={0.5} bloom={{ intensity: 0.4 }}>
      <Workbench />
    </SceneCanvas>
  );
}
