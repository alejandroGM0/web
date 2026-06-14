import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const N = 48;
const LINK_DIST = 1.35;

function buildNetwork() {
  const nodes = [];
  for (let i = 0; i < N; i++) {
    const r = 1.2 + Math.random() * 1.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      )
    );
  }

  const linePositions = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }

  const nodePositions = new Float32Array(N * 3);
  nodes.forEach((v, i) => v.toArray(nodePositions, i * 3));

  return { nodePositions, linePositions: new Float32Array(linePositions), count: N };
}

function Network() {
  const group = useRef();
  const nodesRef = useRef();
  const linesRef = useRef();
  const data = useMemo(() => buildNetwork(), []);

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const p = lerpPointer(0.04);

    if (group.current) {
      group.current.rotation.y = t * 0.06 + p.x * 0.4;
      group.current.rotation.x = p.y * 0.25;
    }

    if (nodesRef.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.04;
      nodesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.linePositions.length / 3}
            array={data.linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff7a18" transparent opacity={0.35} />
      </lineSegments>

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={data.count}
            array={data.nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
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

export default function NetworkScene() {
  return (
    <SceneCanvas camera={[0, 0, 5]} bloom={{ intensity: 0.95, radius: 0.8 }}>
      <Network />
    </SceneCanvas>
  );
}
