import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { SceneCanvas, RealisticStage, lerpPointer, prefersReducedMotion, mat } from "../shared";
import { useCableMaterial, FlowSparks, buildTube } from "../electricity";

function Cable({ curve, radius, color, pulse, speed }) {
  const geo = useMemo(() => buildTube(curve, radius, 12), [curve, radius]);
  const { ref, uniforms, cableVert, cableFrag } = useCableMaterial(color, pulse, speed);
  return (
    <group>
      <mesh geometry={geo} castShadow>
        <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={cableVert} fragmentShader={cableFrag} />
      </mesh>
      <FlowSparks curve={curve} color={pulse} speed={speed * 0.4} count={4} size={radius * 0.7} />
    </group>
  );
}

function Monitor({ position }) {
  const screen = useRef();
  useFrame((s) => {
    if (!screen.current || prefersReducedMotion) return;
    screen.current.material.emissiveIntensity = 0.25 + Math.sin(s.clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group position={position}>
      <RoundedBox args={[1.35, 0.78, 0.06]} radius={0.012} smoothness={4} castShadow>
        <meshPhysicalMaterial {...mat.plastic} />
      </RoundedBox>
      <mesh ref={screen} position={[0, 0, 0.032]}>
        <planeGeometry args={[1.22, 0.68]} />
        <meshPhysicalMaterial {...mat.screen} emissive="#2244aa" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, -0.52, 0]} castShadow>
        <boxGeometry args={[0.07, 0.28, 0.07]} />
        <meshPhysicalMaterial {...mat.metalDark} />
      </mesh>
      <mesh position={[0, -0.68, 0.04]} castShadow>
        <boxGeometry args={[0.32, 0.025, 0.22]} />
        <meshPhysicalMaterial {...mat.metalMid} />
      </mesh>
    </group>
  );
}

function PCTower({ position }) {
  const fan = useRef();
  useFrame((s, d) => {
    if (fan.current && !prefersReducedMotion) fan.current.rotation.z += d * 3;
  });

  return (
    <group position={position}>
      <RoundedBox args={[0.42, 0.82, 0.38]} radius={0.015} smoothness={3} castShadow>
        <meshPhysicalMaterial {...mat.metalDark} />
      </RoundedBox>
      <mesh position={[0, 0.28, 0.191]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#ff7a18" emissive="#ff7a18" emissiveIntensity={2} />
      </mesh>
      <group ref={fan} position={[-0.191, 0.05, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.1, 0.14, 6]} />
          <meshStandardMaterial color="#333" emissive="#ff9d4d" emissiveIntensity={0.1} wireframe />
        </mesh>
      </group>
    </group>
  );
}

function Desk() {
  return (
    <RoundedBox args={[3.2, 0.06, 1.4]} radius={0.008} smoothness={2} position={[0.3, -0.82, 0]} castShadow receiveShadow>
      <meshPhysicalMaterial color="#1a1510" roughness={0.55} metalness={0.05} clearcoat={0.3} />
    </RoundedBox>
  );
}

function Keyboard({ position }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.55, 0.025, 0.18]} />
      <meshPhysicalMaterial color="#111116" roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

function Rig() {
  const g = useRef();
  const cables = useMemo(() => {
    const o = new THREE.Vector3(0.55, -0.55, 0.1);
    return [
      {
        radius: 0.014,
        color: "#222228",
        pulse: "#ff7a18",
        speed: 1.2,
        curve: new THREE.CatmullRomCurve3([
          o.clone(),
          new THREE.Vector3(0.35, -0.62, 0.25),
          new THREE.Vector3(0.05, -0.58, 0.35),
          new THREE.Vector3(-0.15, -0.45, 0.2),
        ]),
      },
      {
        radius: 0.01,
        color: "#1a1a22",
        pulse: "#60a5fa",
        speed: 1.6,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.55, -0.48, 0.1),
          new THREE.Vector3(0.2, -0.42, 0.3),
          new THREE.Vector3(-0.05, -0.35, 0.15),
        ]),
      },
    ];
  }, []);

  useFrame(() => {
    const p = lerpPointer(0.035);
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, p.x * 0.18 + 0.15, 0.03);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, p.y * 0.08, 0.03);
  });

  return (
    <group ref={g} position={[0.2, 0, 0]}>
      <RealisticStage floorY={-0.88}>
        <Desk />
        <Monitor position={[0.15, -0.35, -0.05]} />
        <PCTower position={[1.05, -0.52, 0.15]} />
        <Keyboard position={[-0.05, -0.79, 0.15]} />
        {cables.map((c, i) => (
          <Cable key={i} {...c} />
        ))}
      </RealisticStage>
    </group>
  );
}

export default function DeskScene() {
  return (
    <SceneCanvas camera={[0.8, 0.15, 2.8]} fov={42} envPreset="apartment" envIntensity={0.55} bloom={{ intensity: 0.35 }}>
      <Rig />
    </SceneCanvas>
  );
}
