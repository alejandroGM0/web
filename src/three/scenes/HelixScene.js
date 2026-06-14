import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const SEGMENTS = 64;
const HEIGHT = 4.5;
const RADIUS = 0.85;

function buildHelix() {
  const strandA = [];
  const strandB = [];
  const rungs = [];

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = (i / SEGMENTS) * Math.PI * 4;
    const y = (i / SEGMENTS - 0.5) * HEIGHT;
    const x1 = Math.cos(t) * RADIUS;
    const z1 = Math.sin(t) * RADIUS;
    const x2 = Math.cos(t + Math.PI) * RADIUS;
    const z2 = Math.sin(t + Math.PI) * RADIUS;

    strandA.push(x1, y, z1);
    strandB.push(x2, y, z2);

    if (i % 3 === 0) {
      rungs.push(x1, y, z1, x2, y, z2);
    }
  }

  return {
    strandA: new Float32Array(strandA),
    strandB: new Float32Array(strandB),
    rungs: new Float32Array(rungs),
    beadCount: SEGMENTS + 1,
  };
}

function HelixRig() {
  const group = useRef();
  const data = useMemo(() => buildHelix(), []);
  const beadsA = useRef();
  const beadsB = useRef();

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const p = lerpPointer(0.04);

    if (group.current) {
      group.current.rotation.y = t * 0.25 + p.x * 0.5;
      group.current.rotation.x = p.y * 0.2;
    }

    const pulse = 1 + Math.sin(t * 2) * 0.12;
    if (beadsA.current) beadsA.current.material.size = 0.1 * pulse;
    if (beadsB.current) beadsB.current.material.size = 0.1 * pulse;
  });

  return (
    <group ref={group}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.strandA.length / 3}
            array={data.strandA}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff7a18" transparent opacity={0.5} />
      </line>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.strandB.length / 3}
            array={data.strandB}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffb56b" transparent opacity={0.5} />
      </line>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.rungs.length / 3}
            array={data.rungs}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </lineSegments>

      <points ref={beadsA}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.beadCount}
            array={data.strandA}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ff7a18"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={beadsB}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.beadCount}
            array={data.strandB}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffb56b"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HelixScene() {
  return (
    <SceneCanvas camera={[0, 0, 5.5]} bloom={{ intensity: 1.05, radius: 0.9 }}>
      <HelixRig />
    </SceneCanvas>
  );
}
