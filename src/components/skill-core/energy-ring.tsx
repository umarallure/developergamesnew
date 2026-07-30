"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CoreFrame } from "@/components/skill-core/skill-core-scene";

const PULSE_DURATION = 0.9;

/**
 * A single restrained energy ring that expands once per CTA pulse.
 * Driven purely from `frame.pulseTime` inside useFrame — no GSAP.
 */
export function EnergyRing({ frame }: { frame: CoreFrame }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.RingGeometry(0.96, 1, 64), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00dfdf"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = frame.pulseTime;
    if (t >= PULSE_DURATION) {
      if (mesh.visible) {
        mesh.visible = false;
        material.opacity = 0;
      }
      return;
    }

    mesh.visible = true;
    const p = t / PULSE_DURATION;
    // power3.out-style expansion, linear fade.
    const eased = 1 - (1 - p) * (1 - p) * (1 - p);
    mesh.scale.setScalar(0.6 + 2 * eased);
    material.opacity = 0.32 * (1 - p) * frame.presence;
  });

  return (
    <mesh
      ref={meshRef}
      visible={false}
      geometry={geometry}
      material={material}
    />
  );
}
