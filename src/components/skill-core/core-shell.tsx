"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CoreFrame } from "@/components/skill-core/skill-core-scene";

const SHELL_RADIUS = 1.55;
/** Displacement noise shared by the shell surface and its edge passes. */
function noiseAmount(x: number, y: number, z: number, t: number): number {
  return (
    Math.sin(x * 1.7 + t * 0.6) * 0.4 +
    Math.sin(y * 2.1 - t * 0.5) * 0.35 +
    Math.sin(z * 1.9 + t * 0.4) * 0.25
  );
}

/**
 * Scales each vertex radially by the same position-based noise, so the
 * shell surface and its (separately built) edge geometry stay in sync.
 */
function displace(
  attr: THREE.BufferAttribute,
  base: Float32Array,
  t: number,
): void {
  const arr = attr.array as Float32Array;
  for (let i = 0; i < base.length; i += 3) {
    const x = base[i];
    const y = base[i + 1];
    const z = base[i + 2];
    const s = 1 + 0.045 * noiseAmount(x, y, z, t);
    arr[i] = x * s;
    arr[i + 1] = y * s;
    arr[i + 2] = z * s;
  }
  attr.needsUpdate = true;
}

interface ShellResources {
  geometry: THREE.IcosahedronGeometry;
  basePositions: Float32Array;
  edgeGeometry: THREE.EdgesGeometry;
  edgeBasePositions: Float32Array;
  anchorA: THREE.Vector3;
  anchorB: THREE.Vector3;
}

export function CoreShell({ frame }: { frame: CoreFrame }) {
  const shellGroupRef = useRef<THREE.Group>(null);
  const spinRef = useRef(0);
  const scratchA = useRef(new THREE.Vector3());
  const scratchB = useRef(new THREE.Vector3());

  const resources = useMemo<ShellResources>(() => {
    const geometry = new THREE.IcosahedronGeometry(SHELL_RADIUS, 1);
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const basePositions = new Float32Array(posAttr.array as Float32Array);

    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeAttr = edgeGeometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const edgeBasePositions = new Float32Array(edgeAttr.array as Float32Array);

    // Two well-separated shell vertices used as connection anchor points.
    const anchorA = new THREE.Vector3(
      basePositions[0],
      basePositions[1],
      basePositions[2],
    );
    const anchorB = new THREE.Vector3();
    let best = -1;
    for (let i = 0; i < basePositions.length; i += 3) {
      const dx = basePositions[i] - anchorA.x;
      const dy = basePositions[i + 1] - anchorA.y;
      const dz = basePositions[i + 2] - anchorA.z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d > best) {
        best = d;
        anchorB.set(basePositions[i], basePositions[i + 1], basePositions[i + 2]);
      }
    }

    return {
      geometry,
      basePositions,
      edgeGeometry,
      edgeBasePositions,
      anchorA,
      anchorB,
    };
  }, []);

  const surfaceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0d1b18"),
        roughness: 0.35,
        metalness: 0.05,
        transmission: 0.55,
        thickness: 0.5,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    [],
  );

  const cyanEdgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#00dfdf"),
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const mintEdgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#b0e4cc"),
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      resources.geometry.dispose();
      resources.edgeGeometry.dispose();
    };
  }, [resources]);

  useEffect(() => {
    return () => {
      surfaceMaterial.dispose();
      cyanEdgeMaterial.dispose();
      mintEdgeMaterial.dispose();
    };
  }, [surfaceMaterial, cyanEdgeMaterial, mintEdgeMaterial]);

  useFrame((_, rawDelta) => {
    const shell = shellGroupRef.current;
    if (!shell) return;
    const dt = Math.min(rawDelta, 0.05);

    // Slow rotation, opposite to the particle field, plus the damped
    // facet turn requested by the tracks phase.
    spinRef.current -= dt * 0.05;
    shell.rotation.y = spinRef.current + frame.yawOffset;

    // Organic surface movement (shared by surface and edge passes).
    const t = frame.time;
    displace(
      resources.geometry.getAttribute("position") as THREE.BufferAttribute,
      resources.basePositions,
      t,
    );
    resources.geometry.computeVertexNormals();
    displace(
      resources.edgeGeometry.getAttribute("position") as THREE.BufferAttribute,
      resources.edgeBasePositions,
      t,
    );

    // Edge illumination: rest 0.10, rising toward 0.45 on CTA hover and
    // briefly on each pulse.
    const flash = Math.exp(-frame.pulseTime * 4);
    const glow = Math.min(1, frame.hover + flash);
    cyanEdgeMaterial.opacity = (0.1 + 0.35 * glow) * frame.presence;
    mintEdgeMaterial.opacity = 0.05 * frame.presence;
    surfaceMaterial.opacity = 0.35 * frame.presence;

    // Publish rotated anchor points for ConnectionLines (group-local).
    frame.shellAnchorA.copy(
      scratchA.current.copy(resources.anchorA).applyQuaternion(shell.quaternion),
    );
    frame.shellAnchorB.copy(
      scratchB.current.copy(resources.anchorB).applyQuaternion(shell.quaternion),
    );
  }, -6);

  return (
    <group ref={shellGroupRef} rotation={[0.28, 0, 0.08]}>
      <mesh geometry={resources.geometry} material={surfaceMaterial} />
      <lineSegments
        geometry={resources.edgeGeometry}
        material={cyanEdgeMaterial}
      />
      <lineSegments
        geometry={resources.edgeGeometry}
        material={mintEdgeMaterial}
        scale={1.012}
      />
    </group>
  );
}
