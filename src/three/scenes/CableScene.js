import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, lerpPointer, prefersReducedMotion } from "../shared";
import { useCableMaterial, FlowSparks, buildTube } from "../electricity";

function Cable({ curve, radius, color, pulse, speed }) {
  const geo = useMemo(() => buildTube(curve, radius), [curve, radius]);
  const { ref, uniforms, cableVert, cableFrag } = useCableMaterial(color, pulse, speed);

  return (
    <group>
      <mesh geometry={geo}>
        <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={cableVert} fragmentShader={cableFrag} />
      </mesh>
      <FlowSparks curve={curve} color={pulse} speed={speed * 0.45} count={5} size={radius * 0.9} />
    </group>
  );
}

function ComputerTower() {
  const led = useRef();
  const fan = useRef();

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    if (led.current) {
      led.current.material.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.8;
    }
    if (fan.current) {
      fan.current.rotation.z = t * 2.5;
    }
  });

  return (
    <group position={[-0.6, -0.35, 0]}>
      {/* Chassis */}
      <mesh castShadow>
        <boxGeometry args={[1.1, 1.9, 0.55]} />
        <meshStandardMaterial color="#141418" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Front panel inset */}
      <mesh position={[0, 0, 0.276]}>
        <boxGeometry args={[0.95, 1.75, 0.02]} />
        <meshStandardMaterial color="#0c0c0f" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Power LED */}
      <mesh ref={led} position={[0.38, 0.72, 0.29]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial
          color="#ff7a18"
          emissive="#ff7a18"
          emissiveIntensity={1.5}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Vent slits */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0.29]}>
          <boxGeometry args={[0.7, 0.04, 0.01]} />
          <meshStandardMaterial color="#1e1e24" emissive="#ff7a18" emissiveIntensity={0.08} />
        </mesh>
      ))}

      {/* Internal fan (visible through side) */}
      <group ref={fan} position={[-0.56, 0.1, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.22, 0.32, 6]} />
          <meshStandardMaterial color="#2a2a32" emissive="#ff9d4d" emissiveIntensity={0.15} wireframe />
        </mesh>
      </group>

      {/* IO backplate */}
      <mesh position={[0, 0.5, -0.276]}>
        <boxGeometry args={[0.9, 0.35, 0.02]} />
        <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Monitor() {
  const screen = useRef();

  useFrame((state) => {
    if (!screen.current || prefersReducedMotion) return;
    screen.current.material.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
  });

  return (
    <group position={[1.55, 0.15, 0.2]} rotation={[0, -0.35, 0]}>
      {/* Stand */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#1a1a20" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.35, 0.02, 0.25]} />
        <meshStandardMaterial color="#141418" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* Bezel */}
      <mesh>
        <boxGeometry args={[1.1, 0.72, 0.05]} />
        <meshStandardMaterial color="#121216" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Screen */}
      <mesh ref={screen} position={[0, 0, 0.026]}>
        <boxGeometry args={[0.98, 0.6, 0.01]} />
        <meshStandardMaterial
          color="#0a0a12"
          emissive="#ff7a18"
          emissiveIntensity={0.15}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function CableRig() {
  const group = useRef();

  const cables = useMemo(() => {
    const origin = new THREE.Vector3(-0.6, 0.1, -0.28);
    return [
      {
        radius: 0.055,
        color: "#333338",
        pulse: "#ff7a18",
        speed: 1.4,
        curve: new THREE.CatmullRomCurve3([
          origin.clone(),
          new THREE.Vector3(-0.2, 0.0, -0.5),
          new THREE.Vector3(0.4, -0.15, -0.7),
          new THREE.Vector3(1.1, -0.05, -0.4),
          new THREE.Vector3(1.6, 0.2, 0.2),
        ]),
      },
      {
        radius: 0.038,
        color: "#2a2a35",
        pulse: "#ffb56b",
        speed: 1.8,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.75, 0.35, -0.28),
          new THREE.Vector3(-0.3, 0.55, -0.55),
          new THREE.Vector3(0.3, 0.7, -0.35),
          new THREE.Vector3(0.9, 0.55, 0.0),
          new THREE.Vector3(1.35, 0.35, 0.15),
        ]),
      },
      {
        radius: 0.032,
        color: "#252530",
        pulse: "#4ade80",
        speed: 2.1,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.45, 0.55, -0.28),
          new THREE.Vector3(0.0, 0.75, -0.45),
          new THREE.Vector3(0.6, 0.85, -0.15),
          new THREE.Vector3(1.2, 0.65, 0.35),
        ]),
      },
      {
        radius: 0.028,
        color: "#252530",
        pulse: "#60a5fa",
        speed: 2.4,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.9, -0.1, -0.28),
          new THREE.Vector3(-0.5, -0.45, -0.5),
          new THREE.Vector3(0.1, -0.65, -0.25),
          new THREE.Vector3(0.7, -0.5, 0.15),
          new THREE.Vector3(1.3, -0.35, 0.55),
        ]),
      },
      {
        radius: 0.025,
        color: "#222228",
        pulse: "#ff7a18",
        speed: 2.8,
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.55, -0.45, -0.28),
          new THREE.Vector3(-0.1, -0.75, -0.4),
          new THREE.Vector3(0.5, -0.85, -0.1),
          new THREE.Vector3(1.0, -0.7, 0.4),
        ]),
      },
    ];
  }, []);

  useFrame(() => {
    const p = lerpPointer(0.04);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p.x * 0.35 - 0.25, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p.y * 0.18 + 0.08, 0.04);
  });

  return (
    <group ref={group}>
      <ComputerTower />
      <Monitor />
      {cables.map((c, i) => (
        <Cable key={i} {...c} />
      ))}
      <pointLight position={[0.5, 0.5, 1]} intensity={2} color="#ff9d4d" distance={6} />
      <pointLight position={[-1.5, -0.5, 0.5]} intensity={0.8} color="#4ade80" distance={5} />
      <ambientLight intensity={0.15} />
    </group>
  );
}

export default function CableScene() {
  return (
    <SceneCanvas camera={[0.3, 0.2, 4.2]} fov={48} envPreset="warehouse" envIntensity={0.4} bloom={{ intensity: 0.55, luminanceThreshold: 0.3 }}>
      <CableRig />
    </SceneCanvas>
  );
}
