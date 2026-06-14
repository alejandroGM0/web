import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const COUNT = 4200;

const vert = /* glsl */ `
  uniform float uTime;
  attribute float aSize;
  attribute float aPhase;
  varying float vAlpha;

  void main(){
    vec3 p = position;
    float t = uTime * 0.15 + aPhase;
    p.x += sin(t * 1.3 + aPhase * 6.0) * 0.08;
    p.y += cos(t * 1.1 + aPhase * 4.0) * 0.06;
    p.z += sin(t * 0.9 + aPhase * 3.0) * 0.05;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (420.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vAlpha = 0.35 + 0.65 * sin(aPhase * 12.0 + uTime * 0.8);
  }
`;

const frag = /* glsl */ `
  varying float vAlpha;

  void main(){
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 1.6);
    vec3 col = mix(vec3(0.4, 0.25, 0.12), vec3(1.0, 0.72, 0.4), glow);
    gl_FragColor = vec4(col, glow * vAlpha * 1.2);
  }
`;

function Nebula() {
  const ref = useRef();
  const mat = useRef();

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.55) * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 1.5 + Math.random() * 4.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, []);

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const p = lerpPointer(0.04);

    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (ref.current) {
      ref.current.rotation.y = t * 0.04 + p.x * 0.35;
      ref.current.rotation.x = p.y * 0.18;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={COUNT} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={COUNT} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </points>
  );
}

export default function NebulaScene() {
  return (
    <SceneCanvas camera={[0, 0, 4.5]} bloom={{ intensity: 0.85, radius: 0.9 }}>
      <Nebula />
    </SceneCanvas>
  );
}
