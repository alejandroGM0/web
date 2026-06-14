import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvas, prefersReducedMotion, lerpPointer } from "../shared";

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  varying float vElev;
  varying vec2  vUv;

  float wave(vec2 p, float t){
    return sin(p.x * 1.8 + t * 0.9) * 0.12
         + sin(p.y * 2.2 - t * 0.7) * 0.1
         + sin((p.x + p.y) * 1.4 + t * 1.1) * 0.08;
  }

  void main(){
    vUv = uv;
    vec3 p = position;
    float t = uTime;
    float elev = wave(p.xz, t);
    elev += wave(p.xz + uMouse * 2.0, t * 1.3) * 0.35;
    p.y += elev;
    vElev = elev;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  varying float vElev;
  varying vec2  vUv;

  void main(){
    float h = vElev * 3.0 + 0.5;
    vec3 deep  = vec3(0.02, 0.02, 0.04);
    vec3 mid   = vec3(0.25, 0.12, 0.05);
    vec3 peak  = vec3(1.0, 0.55, 0.2);
    vec3 col = mix(deep, mid, smoothstep(0.0, 0.5, h));
    col = mix(col, peak, smoothstep(0.55, 1.0, h));
    float grid = smoothstep(0.92, 1.0, fract(vUv.x * 40.0)) + smoothstep(0.92, 1.0, fract(vUv.y * 40.0));
    col += vec3(1.0, 0.6, 0.25) * grid * 0.15;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Terrain() {
  const mat = useRef();
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
    }),
    []
  );

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const p = lerpPointer(0.06);
    if (mat.current) {
      mat.current.uniforms.uTime.value = t;
      mat.current.uniforms.uMouse.value.set(p.x, p.y);
    }
    if (mesh.current) {
      mesh.current.rotation.x = -Math.PI * 0.38 + p.y * 0.12;
      mesh.current.rotation.z = p.x * 0.08;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI * 0.38, 0, 0]} position={[0, -0.8, 0]}>
      <planeGeometry args={[9, 9, 128, 128]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vert} fragmentShader={frag} wireframe={false} />
    </mesh>
  );
}

function WireOverlay() {
  const mat = useRef();
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
    }),
    []
  );

  useFrame((state) => {
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime;
    const p = lerpPointer(0.06);
    if (mat.current) {
      mat.current.uniforms.uTime.value = t;
      mat.current.uniforms.uMouse.value.set(p.x, p.y);
    }
    if (mesh.current) {
      mesh.current.rotation.x = -Math.PI * 0.38 + p.y * 0.12;
      mesh.current.rotation.z = p.x * 0.08;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI * 0.38, 0, 0]} position={[0, -0.79, 0]}>
      <planeGeometry args={[9, 9, 64, 64]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export default function WavesScene() {
  return (
    <SceneCanvas camera={[0, 1.2, 4.5]} fov={50} bloom={{ intensity: 0.7, luminanceThreshold: 0.35 }}>
      <Terrain />
      <WireOverlay />
    </SceneCanvas>
  );
}
