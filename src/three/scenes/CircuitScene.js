import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, lerpPointer, prefersReducedMotion } from "../shared";
import { TracePulses } from "../electricity";

function buildTraces() {
  const segments = [];
  const add = (x1, z1, x2, z2, y = 0.02) => {
    segments.push({
      from: new THREE.Vector3(x1, y, z1),
      to: new THREE.Vector3(x2, y, z2),
    });
  };

  // Main bus around CPU
  add(-0.8, -0.6, 0.8, -0.6);
  add(-0.8, 0.6, 0.8, 0.6);
  add(-0.8, -0.6, -0.8, 0.6);
  add(0.8, -0.6, 0.8, 0.6);

  // CPU to corners
  add(-0.25, -0.25, -0.8, -0.6);
  add(0.25, -0.25, 0.8, -0.6);
  add(-0.25, 0.25, -0.8, 0.6);
  add(0.25, 0.25, 0.8, 0.6);

  // Branch traces
  add(-0.8, -0.6, -1.3, -0.9);
  add(0.8, -0.6, 1.3, -0.9);
  add(-0.8, 0.6, -1.3, 0.9);
  add(0.8, 0.6, 1.3, 0.9);
  add(0, -0.6, 0, -1.1);
  add(0, 0.6, 0, 1.1);
  add(-0.8, 0, -1.2, 0);
  add(0.8, 0, 1.2, 0);

  // Inner grid
  add(-0.25, -0.25, -0.25, 0.25);
  add(0.25, -0.25, 0.25, 0.25);
  add(-0.25, -0.25, 0.25, -0.25);
  add(-0.25, 0.25, 0.25, 0.25);
  add(-0.5, -0.3, 0.5, -0.3);
  add(-0.5, 0.3, 0.5, 0.3);
  add(-0.3, -0.5, -0.3, 0.5);
  add(0.3, -0.5, 0.3, 0.5);

  return segments;
}

function TraceLines({ segments }) {
  const positions = useMemo(() => {
    const arr = [];
    segments.forEach(({ from, to }) => {
      arr.push(from.x, from.y, from.z, to.x, to.y, to.z);
    });
    return new Float32Array(arr);
  }, [segments]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#b87333" transparent opacity={0.55} />
    </lineSegments>
  );
}

function Chip({ position, size }) {
  const led = useRef();

  useFrame((state) => {
    if (!led.current || prefersReducedMotion) return;
    led.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 4 + position[0]) * 0.25;
  });

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#1a1a22" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Pins */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}-${sz}`} position={[sx * (size[0] * 0.55), -size[1] * 0.55, sz * (size[2] * 0.55)]}>
            <boxGeometry args={[0.02, 0.04, 0.02]} />
            <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.3} />
          </mesh>
        ))
      )}
      <mesh ref={led} position={[0, size[1] * 0.51, 0]}>
        <boxGeometry args={[size[0] * 0.6, 0.01, size[2] * 0.4]} />
        <meshStandardMaterial color="#111" emissive="#ff7a18" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Components() {
  const parts = [
    { pos: [-0.55, 0.06, -0.35], size: [0.12, 0.04, 0.06] },
    { pos: [0.55, 0.06, -0.35], size: [0.12, 0.04, 0.06] },
    { pos: [-0.55, 0.06, 0.35], size: [0.08, 0.05, 0.08] },
    { pos: [0.55, 0.06, 0.35], size: [0.08, 0.05, 0.08] },
    { pos: [-0.9, 0.05, 0], size: [0.15, 0.03, 0.05] },
    { pos: [0.9, 0.05, 0], size: [0.15, 0.03, 0.05] },
  ];

  return (
    <>
      {parts.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <boxGeometry args={p.size} />
          <meshStandardMaterial color={i % 2 ? "#2a2018" : "#1a2030"} metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
    </>
  );
}

function Board() {
  const group = useRef();
  const segments = useMemo(() => buildTraces(), []);

  useFrame(() => {
    const p = lerpPointer(0.04);
    if (!group.current) return;
    group.current.rotation.x = -Math.PI * 0.42 + p.y * 0.12;
    group.current.rotation.z = p.x * 0.1;
  });

  return (
    <group ref={group} rotation={[-Math.PI * 0.42, 0, 0]}>
      {/* PCB substrate */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 3.2, 1, 1]} />
        <meshStandardMaterial color="#0a1510" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Solder mask tint */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial color="#0d1f14" transparent opacity={0.85} metalness={0.2} roughness={0.7} />
      </mesh>

      <TraceLines segments={segments} />
      <TracePulses segments={segments} count={12} speed={0.55} color="#ff9d4d" />
      <TracePulses segments={segments} count={8} speed={0.35} color="#ffb56b" />

      <Chip position={[0, 0.08, 0]} size={[0.5, 0.06, 0.5]} />
      <Components />

      <pointLight position={[0, 1.5, 0]} intensity={1.5} color="#ff7a18" distance={5} />
      <ambientLight intensity={0.12} />
    </group>
  );
}

export default function CircuitScene() {
  return (
    <SceneCanvas camera={[0, 2.5, 3.5]} fov={50} envPreset="studio" envIntensity={0.4} bloom={{ intensity: 0.55, luminanceThreshold: 0.25 }}>
      <Board />
    </SceneCanvas>
  );
}
