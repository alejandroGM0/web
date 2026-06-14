import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey, sampleCamera } from "./journey";

const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  });
}

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CameraRig() {
  const { camera } = useThree();
  const sample = useRef({
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
    roll: 0,
    u: 0,
  });
  const lookTarget = useRef(new THREE.Vector3());
  const ready = useRef(false);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);

    // Smooth raw scroll target into a buttery progress value.
    const prev = journey.progress;
    journey.progress = THREE.MathUtils.damp(
      journey.progress,
      journey.target,
      reduceMotion ? 999 : 6,
      d
    );
    journey.velocity = (journey.progress - prev) / (d || 0.016);

    const s = sample.current;
    sampleCamera(journey.progress, s);

    pointer.x = THREE.MathUtils.damp(pointer.x, pointer.tx, 4, d);
    pointer.y = THREE.MathUtils.damp(pointer.y, pointer.ty, 4, d);

    // Subtle parallax breathing so the lens feels handheld, not on rails.
    const sway = reduceMotion ? 0 : 1;
    const px = pointer.x * 0.5 * sway;
    const py = pointer.y * 0.4 * sway;

    if (!ready.current) {
      camera.position.copy(s.position);
      ready.current = true;
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, s.position.x + px, 8, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, s.position.y + py, 8, d);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, s.position.z, 10, d);

    lookTarget.current.lerp(s.lookAt, 1 - Math.pow(0.0001, d));
    camera.lookAt(lookTarget.current);
    // Banking roll on top of the look orientation.
    camera.rotation.z += s.roll + px * 0.03;
  });

  return null;
}
