import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, lerpPointer, prefersReducedMotion } from "../shared";
import { TracePulses } from "../electricity";

function Die() {
  const ref = useRef();
  const segments = useMemo(() => {
    const segs = [];
    const grid = 8;
    for (let i = 0; i < grid; i++) {
      const t = (i / grid - 0.5) * 1.6;
      segs.push({
        from: new THREE.Vector3(-0.8, 0.02, t),
        to: new THREE.Vector3(0.8, 0.02, t),
      });
      segs.push({
        from: new THREE.Vector3(t, 0.02, -0.8),
        to: new THREE.Vector3(t, 0.02, 0.8),
      });
    }
    // Diagonal buses
    segs.push({ from: new THREE.Vector3(-0.6, 0.02, -0.6), to: new THREE.Vector3(0.6, 0.02, 0.6) });
    segs.push({ from: new THREE.Vector3(-0.6, 0.02, 0.6), to: new THREE.Vector3(0.6, 0.02, -0.6) });
    return segs;
  }, []);

  const positions = useMemo(() => {
    const arr = [];
    segments.forEach(({ from, to }) => arr.push(from.x, from.y, from.z, to.x, to.y, to.z));
    return new Float32Array(arr);
  }, [segments]);

  useFrame((s) => {
    const p = lerpPointer(0.04);
    if (!ref.current) return;
    ref.current.rotation.x = -Math.PI * 0.38 + p.y * 0.08;
    ref.current.rotation.z = p.x * 0.06;
    if (!prefersReducedMotion) {
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={ref} rotation={[-Math.PI * 0.38, 0, 0]}>
      {/* Silicon die */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.65, 0.04, 1.65]} />
        <meshPhysicalMaterial color="#1a2030" metalness={0.6} roughness={0.25} clearcoat={0.8} />
      </mesh>
      {/* Gold edge */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[1.72, 0.02, 1.72]} />
        <meshPhysicalMaterial color="#c9a227" metalness={0.95} roughness={0.2} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#ff9d4d" transparent opacity={0.7} />
      </lineSegments>
      <TracePulses segments={segments} count={16} speed={0.45} color="#ff7a18" />
      <TracePulses segments={segments} count={10} speed={0.3} color="#ffb56b" />
      {/* Pin grid */}
      {[-0.86, 0.86].map((x) =>
        [-0.86, 0.86].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.04, z]}>
            <boxGeometry args={[0.02, 0.04, 0.02]} />
            <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.3} />
          </mesh>
        ))
      )}
      <spotLight position={[0, 3, 1]} intensity={40} angle={0.35} color="#fff5eb" />
      <spotLight position={[-2, 1, 2]} intensity={15} color="#ff7a18" />
      <ambientLight intensity={0.05} />
    </group>
  );
}

export default function ChipDieScene() {
  return (
    <SceneCanvas camera={[0, 1.8, 2.8]} fov={45} envPreset="studio" bloom={{ intensity: 0.65, luminanceThreshold: 0.3 }}>
      <Die />
    </SceneCanvas>
  );
}
