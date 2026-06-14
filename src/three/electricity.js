import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "./shared";

/* Shader: electric pulses traveling along cable length (vUv.y = along tube) */
export const cableVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main(){
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const cableFrag = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3  uColor;
  uniform vec3  uPulse;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main(){
    vec3 base = mix(vec3(0.06, 0.06, 0.08), uColor * 0.25, 0.5);
    float pulse = 0.0;
    for (float i = 0.0; i < 4.0; i++) {
      float p = fract(vUv.y * 5.0 - uTime * uSpeed + i * 0.27);
      pulse += exp(-abs(p - 0.08) * 28.0) * 0.9;
      pulse += exp(-abs(p - 0.55) * 18.0) * 0.35;
    }
    vec3 col = mix(base, uPulse, clamp(pulse, 0.0, 1.0));
    float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
    col += uColor * rim * 0.15;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function useCableMaterial(color, pulseColor, speed = 1.2) {
  const ref = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uColor: { value: new THREE.Color(color) },
      uPulse: { value: new THREE.Color(pulseColor) },
    }),
    [color, pulseColor, speed]
  );

  useFrame((state) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = prefersReducedMotion
        ? 0
        : state.clock.elapsedTime;
    }
  });

  return { ref, uniforms, cableVert, cableFrag };
}

/** Sparks / electrons flowing along a curve */
export function FlowSparks({ curve, count = 6, color = "#ff9d4d", speed = 0.35, size = 0.035 }) {
  const refs = useRef([]);
  const offsets = useMemo(() => {
    return Array.from({ length: count }, (_, i) => i / count);
  }, [count]);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.elapsedTime;
    offsets.forEach((off, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const u = (t * speed + off) % 1;
      const p = curve.getPoint(u);
      const tangent = curve.getTangent(u).normalize();
      mesh.position.copy(p);
      mesh.lookAt(p.clone().add(tangent));
      const flicker = 0.7 + Math.sin(t * 12 + i * 2.1) * 0.3;
      mesh.scale.setScalar(flicker);
    });
  });

  return (
    <group>
      {offsets.map((off, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/** Pulses traveling along straight trace segments */
export function TracePulses({ segments, color = "#ff7a18", count = 3, speed = 0.5 }) {
  const refs = useRef([]);
  const data = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      seg: Math.floor(Math.random() * segments.length),
      offset: i / count,
    }));
  }, [segments, count]);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const { from, to } = segments[d.seg];
      const u = (t * speed + d.offset) % 1;
      mesh.position.lerpVectors(from, to, u);
    });
  });

  return (
    <group>
      {data.map((d, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

export function buildTube(curve, radius, radialSegments = 8) {
  return new THREE.TubeGeometry(curve, 64, radius, radialSegments, false);
}
