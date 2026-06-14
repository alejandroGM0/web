import { Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import CameraRig from "./CameraRig";
import Starfield from "./elements/Starfield";
import Rail from "./elements/Rail";
import Ambient from "./elements/Ambient";
import Stations from "./Stations";
import { gradeAt, journey } from "./journey";

function Grade() {
  const { scene } = useThree();
  useFrame(() => {
    const g = gradeAt(journey.progress);
    if (!scene.background) scene.background = new THREE.Color();
    scene.background.lerp(g.bg, 0.08);
    if (scene.fog) scene.fog.color.lerp(g.fog, 0.08);
  });
  return null;
}

export default function Scene({ progress }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.6, 24], fov: 52, near: 0.1, far: 400 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
    >
      <fog attach="fog" args={["#0a0a16", 26, 250]} />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#9fb8ff", "#1a1208", 0.4]} />

      <Grade />
      <CameraRig />

      <Starfield />
      <Ambient />
      <Rail />

      <Suspense fallback={null}>
        <Stations progress={progress} />
      </Suspense>

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={0.85}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          radius={0.75}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={caOffset}
        />
        <Vignette eskil={false} offset={0.32} darkness={0.92} />
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.045} />
      </EffectComposer>
    </Canvas>
  );
}
