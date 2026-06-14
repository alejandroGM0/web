import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "../journey";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(0.5, "rgba(200,215,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Layer({ count, spread, depth, size, color, speed }) {
  const ref = useRef();
  const sprite = useMemo(makeSprite, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = 40 - Math.random() * depth;
    }
    return arr;
  }, [count, spread, depth]);

  useFrame((state, delta) => {
    if (!ref.current || reduceMotion) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = t * 0.005 * speed;
    const m = ref.current.material;
    // Subtle warp pulse with scroll velocity.
    const v = Math.min(Math.abs(journey.velocity) * 6, 1.6);
    m.size = THREE.MathUtils.damp(m.size, size * (1 + v), 6, Math.min(delta, 0.05));
    m.opacity = 0.55 + Math.sin(t * 0.6) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <group>
      <Layer count={1400} spread={120} depth={260} size={0.5} color="#aab4ff" speed={1} />
      <Layer count={900} spread={80} depth={240} size={0.32} color="#ffffff" speed={-0.6} />
      <Layer count={500} spread={50} depth={230} size={0.8} color="#ff9d4d" speed={0.4} />
    </group>
  );
}
