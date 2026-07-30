"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceCapability } from "@/hooks/use-device-capability";
import type { CoreFrame } from "@/components/skill-core/skill-core-scene";

/** Deterministic PRNG so the cloud is identical on every mount. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uOrganization;
uniform float uContract;
uniform vec3 uPointer;
uniform float uPointerStrength;
uniform float uSize;

attribute vec3 aScatter;
attribute float aSeed;
attribute float aMix;

varying float vMix;

void main() {
  vMix = aMix;

  // Organisation pulls each particle from its loose scattered position
  // toward its tight sphere position.
  vec3 p = mix(aScatter, position, uOrganization);

  // Slow breathing; CTA hover contracts the whole cloud slightly.
  float breathe = 1.0 + 0.05 * sin(uTime * 0.9 + aSeed * 6.28318);
  p *= breathe * (1.0 - 0.12 * uContract);

  // Cheap curl-ish turbulence from layered trig noise. Looser cloud
  // states wobble more; the organised sphere is calm.
  float amp = mix(0.16, 0.05, uOrganization);
  p.x += amp * sin(uTime * 0.55 + p.y * 2.3 + aSeed * 11.0);
  p.y += amp * sin(uTime * 0.47 + p.z * 2.1 + aSeed * 17.0);
  p.z += amp * sin(uTime * 0.61 + p.x * 1.9 + aSeed * 23.0);

  // Small attraction toward the pointer.
  vec3 toPointer = uPointer - p;
  float pd = max(length(toPointer), 0.001);
  p += (toPointer / pd) * (uPointerStrength * 0.2 * exp(-pd * 0.9));

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * (1.0 / max(-mvPosition.z, 0.1));
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform float uContract;
uniform float uPresence;

varying float vMix;

void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;

  float edge = smoothstep(0.5, 0.12, d);
  // mix(#00dfdf, #b0e4cc, vMix)
  vec3 color = mix(vec3(0.0, 0.875, 0.875), vec3(0.69, 0.894, 0.8), vMix);
  float intensity = 0.55 + 0.3 * uContract;
  float alpha = edge * (0.5 + 0.25 * uContract) * uPresence;

  gl_FragColor = vec4(color * intensity, alpha);
}
`;

export function ParticleCore({ frame }: { frame: CoreFrame }) {
  const { tier } = useDeviceCapability();
  const count = tier === "high" ? 2000 : 600;

  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const rand = mulberry32(0x51c0 + count);
    const positions = new Float32Array(count * 3);
    const scatter = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const mixes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Tight position: jittered sphere r ~ 1.05, denser toward centre.
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const sq = Math.sqrt(Math.max(0, 1 - u * u));
      const r = 1.05 * Math.pow(rand(), 0.6);
      positions[i * 3] = sq * Math.cos(phi) * r;
      positions[i * 3 + 1] = sq * Math.sin(phi) * r;
      positions[i * 3 + 2] = u * r;

      // Scattered position: independent direction, looser radius.
      const u2 = rand() * 2 - 1;
      const phi2 = rand() * Math.PI * 2;
      const sq2 = Math.sqrt(Math.max(0, 1 - u2 * u2));
      const r2 = 0.6 + 1.3 * Math.sqrt(rand());
      scatter[i * 3] = sq2 * Math.cos(phi2) * r2;
      scatter[i * 3 + 1] = sq2 * Math.sin(phi2) * r2;
      scatter[i * 3 + 2] = u2 * r2;

      seeds[i] = rand();
      // Bias toward the soft mint end; a minority stays near pure cyan.
      mixes[i] = Math.sqrt(rand());
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOrganization: { value: 0.25 },
      uContract: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uPointerStrength: { value: 0 },
      uSize: { value: 26 },
      uPresence: { value: 1 },
    }),
    [],
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const points = pointsRef.current;

    // Accumulate phase on the CPU so speed changes never cause jumps.
    timeRef.current += dt * frame.speed;

    uniforms.uTime.value = timeRef.current;
    uniforms.uOrganization.value = frame.organization;
    uniforms.uContract.value = frame.hover;
    uniforms.uPointerStrength.value = frame.pointerStrength;
    uniforms.uPresence.value = frame.presence;
    uniforms.uSize.value = 26 * state.viewport.dpr;

    if (points) {
      // Slow drift of the whole field (the shell counter-rotates).
      points.rotation.y += dt * 0.05 * frame.speed;

      // Express the pointer in the rotating points-local frame.
      const theta = points.rotation.y;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      const p = frame.pointerLocal;
      uniforms.uPointer.value.set(
        p.x * cos - p.z * sin,
        p.y,
        p.x * sin + p.z * cos,
      );
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}
