"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ORBIT_TRACKS } from "@/lib/constants";
import type { CoreFrame } from "@/components/skill-core/skill-core-scene";

interface Orbit {
  /** Semi-axes of the elliptical orbit. */
  a: number;
  b: number;
  /** Angular speed in rad/s. */
  speed: number;
  phase: number;
  /** Inclination (rotation of the orbit plane about x). */
  incl: number;
  /** Rotation of the orbit plane about y. */
  plane: number;
}

/** One slightly irregular elliptical orbit per ORBIT_TRACKS entry. */
const ORBITS: Orbit[] = [
  { a: 2.15, b: 1.9, speed: 0.072, phase: 0.4, incl: 0.42, plane: 0.2 },
  { a: 2.45, b: 2.05, speed: 0.055, phase: 1.6, incl: -0.55, plane: 1.1 },
  { a: 1.95, b: 2.3, speed: 0.098, phase: 2.9, incl: 0.7, plane: 2.3 },
  { a: 2.6, b: 2.2, speed: 0.05, phase: 4.1, incl: -0.3, plane: 3.4 },
  { a: 2.05, b: 1.95, speed: 0.115, phase: 5.2, incl: 0.95, plane: 4.5 },
  { a: 2.35, b: 2.55, speed: 0.063, phase: 0.9, incl: -0.8, plane: 5.5 },
];

const EMISSIVE_BASE = new THREE.Color("#b0e4cc");
const EMISSIVE_ACTIVE = new THREE.Color("#00dfdf");

/** Frame-rate independent damped interpolation (local copy; keeps the
 * runtime import graph acyclic). */
function expDamp(
  current: number,
  target: number,
  k: number,
  dt: number,
): number {
  return current + (target - current) * (1 - Math.exp(-dt * k));
}

export function OrbitingNodes({ frame }: { frame: CoreFrame }) {
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const highlights = useRef(new Float32Array(ORBIT_TRACKS.length));

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.07, 0), []);

  const materials = useMemo(
    () =>
      ORBIT_TRACKS.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: new THREE.Color("#10241f"),
            roughness: 0.45,
            metalness: 0.2,
            emissive: new THREE.Color("#b0e4cc"),
            emissiveIntensity: 0.3,
          }),
      ),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      for (const material of materials) material.dispose();
    };
  }, [geometry, materials]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const t = frame.time;
    const h = highlights.current;

    for (let i = 0; i < ORBITS.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const o = ORBITS[i];

      // Slightly irregular elliptical orbit, scaled by nodeSpread.
      const angle =
        o.phase + t * o.speed + 0.18 * Math.sin(t * 0.21 + o.phase * 3);
      const wobble = 1 + 0.05 * Math.sin(t * 0.34 + o.phase * 7);
      const spread = frame.nodeSpread * wobble;
      const x0 = Math.cos(angle) * o.a * spread;
      const z0 = Math.sin(angle) * o.b * spread;
      // Tilt about x (inclination), then rotate the plane about y.
      const y1 = -z0 * Math.sin(o.incl);
      const z1 = z0 * Math.cos(o.incl);
      const cp = Math.cos(o.plane);
      const sp = Math.sin(o.plane);
      mesh.position.set(x0 * cp + z1 * sp, y1, -x0 * sp + z1 * cp);

      // Damped highlight when this node's track card is hovered/focused.
      h[i] = expDamp(h[i], frame.activeTrack === i ? 1 : 0, 6, dt);
      mesh.scale.setScalar(1 + 0.5 * h[i]);

      const material = materials[i];
      material.emissive.lerpColors(EMISSIVE_BASE, EMISSIVE_ACTIVE, h[i]);
      material.emissiveIntensity = 0.3 + 0.9 * h[i];

      // Slow individual tumble.
      mesh.rotation.x = t * 0.22 + o.phase * 0.5;
      mesh.rotation.y = t * 0.3 + o.phase;

      // Publish group-local positions for ConnectionLines.
      frame.nodePositions[i].copy(mesh.position);
    }
  }, -6);

  return (
    <group>
      {ORBIT_TRACKS.map((track, i) => (
        <mesh
          key={track}
          ref={(mesh) => {
            meshRefs.current[i] = mesh;
          }}
          geometry={geometry}
          material={materials[i]}
        />
      ))}
    </group>
  );
}
