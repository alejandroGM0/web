import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, lerpPointer, mat } from "../shared";
import { useCableMaterial, FlowSparks, buildTube } from "../electricity";

function MacroCable() {
  const group = useRef();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 0.3, 0),
        new THREE.Vector3(-0.8, 0.1, 0.2),
        new THREE.Vector3(0.5, -0.05, -0.1),
        new THREE.Vector3(1.8, 0.15, 0.05),
      ]),
    []
  );
  const geo = useMemo(() => buildTube(curve, 0.12, 16), [curve]);
  const { ref, uniforms, cableVert, cableFrag } = useCableMaterial("#1a1a20", "#ff9d4d", 0.9);

  useFrame(() => {
    const p = lerpPointer(0.03);
    if (!group.current) return;
    group.current.rotation.y = p.x * 0.15;
    group.current.rotation.x = p.y * 0.1;
  });

  return (
    <group ref={group}>
      <mesh geometry={geo} castShadow>
        <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={cableVert} fragmentShader={cableFrag} />
      </mesh>
      <FlowSparks curve={curve} count={8} color="#ffb56b" speed={0.28} size={0.055} />
      {/* Connector A */}
      <mesh position={[-2, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.14]} />
        <meshPhysicalMaterial {...mat.metalMid} />
      </mesh>
      {/* Connector B — USB-ish */}
      <mesh position={[1.85, 0.15, 0.05]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.08]} />
        <meshPhysicalMaterial color="#c0c0c8" metalness={0.95} roughness={0.2} />
      </mesh>
      <spotLight position={[1, 2, 2]} intensity={35} angle={0.4} penumbra={0.7} color="#fff8f0" />
      <spotLight position={[-2, 1, 1]} intensity={12} color="#ff7a18" />
      <ambientLight intensity={0.06} />
    </group>
  );
}

export default function MacroCableScene() {
  return (
    <SceneCanvas camera={[0, 0, 3.2]} fov={38} envPreset="studio" envIntensity={0.6} bloom={{ intensity: 0.55, luminanceThreshold: 0.35 }}>
      <MacroCable />
    </SceneCanvas>
  );
}
