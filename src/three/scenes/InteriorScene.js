import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, lerpPointer, prefersReducedMotion } from "../shared";
import { useCableMaterial, FlowSparks, buildTube } from "../electricity";

/** Interior view: PSU, motherboard edge, cable harness with power flowing */
function PowerSupply() {
  const glow = useRef();

  useFrame((state) => {
    if (!glow.current || prefersReducedMotion) return;
    glow.current.material.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 5) * 0.4;
  });

  return (
    <group position={[-1.1, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.7, 1.0, 0.5]} />
        <meshStandardMaterial color="#18181c" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* Grille */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0.351, -0.35 + i * 0.1, 0]}>
          <boxGeometry args={[0.01, 0.04, 0.4]} />
          <meshStandardMaterial color="#252530" emissive="#ff7a18" emissiveIntensity={0.05} />
        </mesh>
      ))}
      {/* Status LED strip */}
      <mesh ref={glow} position={[0.36, 0.35, 0]}>
        <boxGeometry args={[0.01, 0.25, 0.06]} />
        <meshStandardMaterial color="#111" emissive="#ff7a18" emissiveIntensity={0.8} />
      </mesh>
      {/* 24-pin connector */}
      <mesh position={[0.36, 0, 0.15]}>
        <boxGeometry args={[0.04, 0.18, 0.12]} />
        <meshStandardMaterial color="#1a1a20" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function HarnessCable({ curve, radius, color, pulse, speed }) {
  const geo = useMemo(() => buildTube(curve, radius, 6), [curve, radius]);
  const { ref, uniforms, cableVert, cableFrag } = useCableMaterial(color, pulse, speed);

  return (
    <group>
      <mesh geometry={geo}>
        <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={cableVert} fragmentShader={cableFrag} />
      </mesh>
      <FlowSparks curve={curve} color={pulse} speed={speed * 0.5} count={4} size={radius * 0.85} />
    </group>
  );
}

function InteriorRig() {
  const group = useRef();

  const harness = useMemo(() => {
    const psuOut = new THREE.Vector3(-0.76, 0, 0.15);
    return [
      {
        radius: 0.022,
        color: "#1a1a22",
        pulse: "#ff7a18",
        speed: 1.6,
        curve: new THREE.CatmullRomCurve3([
          psuOut.clone(),
          new THREE.Vector3(-0.4, 0.1, 0.3),
          new THREE.Vector3(0.0, 0.15, 0.35),
          new THREE.Vector3(0.4, 0.05, 0.2),
          new THREE.Vector3(0.55, -0.1, 0),
        ]),
      },
      {
        radius: 0.018,
        color: "#1a1a22",
        pulse: "#ffb56b",
        speed: 2.0,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.76, -0.05, 0.15),
          new THREE.Vector3(-0.35, -0.15, 0.35),
          new THREE.Vector3(0.1, -0.2, 0.4),
          new THREE.Vector3(0.5, -0.15, 0.15),
        ]),
      },
      {
        radius: 0.015,
        color: "#15151a",
        pulse: "#ff7a18",
        speed: 2.3,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.76, 0.08, 0.15),
          new THREE.Vector3(-0.2, 0.35, 0.45),
          new THREE.Vector3(0.35, 0.4, 0.25),
          new THREE.Vector3(0.6, 0.25, -0.1),
        ]),
      },
      {
        radius: 0.015,
        color: "#15151a",
        pulse: "#60a5fa",
        speed: 2.6,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.76, -0.1, 0.15),
          new THREE.Vector3(-0.15, -0.35, 0.4),
          new THREE.Vector3(0.4, -0.35, 0.2),
          new THREE.Vector3(0.65, -0.2, -0.05),
        ]),
      },
    ];
  }, []);

  useFrame(() => {
    const p = lerpPointer(0.04);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.3, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.15, 0.04);
  });

  return (
    <group ref={group}>
      <PowerSupply />

      {/* Motherboard edge */}
      <mesh position={[0.2, -0.15, 0]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[1.4, 0.04, 1.0]} />
        <meshStandardMaterial color="#0d1a12" metalness={0.4} roughness={0.7} />
      </mesh>

      {/* GPU block */}
      <mesh position={[0.35, 0.05, 0]}>
        <boxGeometry args={[0.7, 0.12, 0.35]} />
        <meshStandardMaterial color="#141418" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* RAM sticks */}
      {[-0.15, 0.05, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0.12, -0.15]}>
          <boxGeometry args={[0.06, 0.35, 0.02]} />
          <meshStandardMaterial color="#1a2030" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {harness.map((c, i) => (
        <HarnessCable key={i} {...c} />
      ))}

      <pointLight position={[-0.5, 0.5, 1]} intensity={2.5} color="#ff9d4d" distance={5} />
      <pointLight position={[1, -0.3, 0.5]} intensity={0.6} color="#60a5fa" distance={4} />
      <ambientLight intensity={0.1} />
    </group>
  );
}

export default function InteriorScene() {
  return (
    <SceneCanvas camera={[0.5, 0.15, 3.8]} fov={50} envPreset="warehouse" envIntensity={0.35} bloom={{ intensity: 0.5, luminanceThreshold: 0.28 }}>
      <InteriorRig />
    </SceneCanvas>
  );
}
