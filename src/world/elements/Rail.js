import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { curve, gradeAt, journey } from "../journey";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    // base glow brighter at the tube core (v around 0.5)
    float core = smoothstep(1.0, 0.0, abs(vUv.y - 0.5) * 2.0);
    // pulses travelling along the length
    float flow = sin(vUv.x * 220.0 - uTime * 3.0);
    flow = smoothstep(0.6, 1.0, flow);
    float energy = 0.18 + flow * 0.9;
    vec3 col = uColor * energy * (0.4 + core * 0.8);
    gl_FragColor = vec4(col, (0.25 + core * 0.6));
  }
`;

export default function Rail() {
  const matRef = useRef();
  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 600, 0.045, 8, false),
    []
  );
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color("#ff7a18") } }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = reduceMotion ? 0 : state.clock.elapsedTime;
    const grade = gradeAt(journey.progress);
    matRef.current.uniforms.uColor.value.lerp(grade.glow, 0.05);
  });

  return (
    <mesh geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
