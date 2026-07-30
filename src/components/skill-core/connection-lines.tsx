"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CoreFrame } from "@/components/skill-core/skill-core-scene";

/** Fixed connection topology among the six orbiting nodes. */
const NODE_PAIRS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 3],
  [1, 4],
];

/** Node indices tethered to the two shell vertex anchors. */
const ANCHOR_NODES: readonly [number, number] = [2, 5];

const LINE_COUNT = NODE_PAIRS.length + 2;

const LINE_BASE = new THREE.Color("#b0e4cc");
const LINE_ACTIVE = new THREE.Color("#00dfdf");

/** Traveling pulse timing: one connection at a time, cycling. */
const PULSE_CYCLE = 2.4;
const PULSE_TRAVEL = 1.7;

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

interface LineResource {
  geometry: THREE.BufferGeometry;
  attribute: THREE.BufferAttribute;
  material: THREE.LineBasicMaterial;
}

export function ConnectionLines({ frame }: { frame: CoreFrame }) {
  const pulseRef = useRef<THREE.Points>(null);
  const activeBoosts = useRef(new Float32Array(LINE_COUNT));

  const lines = useMemo<LineResource[]>(() => {
    const items: LineResource[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const geometry = new THREE.BufferGeometry();
      const attribute = new THREE.BufferAttribute(new Float32Array(6), 3);
      attribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute("position", attribute);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("#b0e4cc"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      items.push({ geometry, attribute, material });
    }
    return items;
  }, []);

  const pulse = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(3), 3),
    );
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#00dfdf"),
      size: 0.07,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { geometry, material };
  }, []);

  useEffect(() => {
    return () => {
      for (const line of lines) {
        line.geometry.dispose();
        line.material.dispose();
      }
      pulse.geometry.dispose();
      pulse.material.dispose();
    };
  }, [lines, pulse]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const t = frame.time;
    const conn = frame.connectionLevel;
    const boosts = activeBoosts.current;
    const px = frame.pointerLocal.x;
    const py = frame.pointerLocal.y;

    for (let i = 0; i < LINE_COUNT; i++) {
      const line = lines[i];

      // Resolve endpoints from the shared node/anchor positions.
      let start: THREE.Vector3;
      let end: THREE.Vector3;
      let nodeA = -1;
      let nodeB = -1;
      if (i < NODE_PAIRS.length) {
        nodeA = NODE_PAIRS[i][0];
        nodeB = NODE_PAIRS[i][1];
        start = frame.nodePositions[nodeA];
        end = frame.nodePositions[nodeB];
      } else if (i === NODE_PAIRS.length) {
        nodeA = ANCHOR_NODES[0];
        start = frame.nodePositions[nodeA];
        end = frame.shellAnchorA;
      } else {
        nodeA = ANCHOR_NODES[1];
        start = frame.nodePositions[nodeA];
        end = frame.shellAnchorB;
      }

      const arr = line.attribute.array as Float32Array;
      arr[0] = start.x;
      arr[1] = start.y;
      arr[2] = start.z;
      arr[3] = end.x;
      arr[4] = end.y;
      arr[5] = end.z;
      line.attribute.needsUpdate = true;

      // Slow flicker that sits mostly near zero in the hero phase.
      const wave = 0.5 + 0.5 * Math.sin(t * 0.4 + i * 1.93);
      const flicker = wave * wave * wave;

      // Rough screen-space pointer proximity to the line midpoint.
      const mx = (start.x + end.x) * 0.5 - px;
      const my = (start.y + end.y) * 0.5 - py;
      const proximity =
        frame.pointerStrength *
        Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 2.2);

      // Damped brightening while this line touches the active track node.
      const touchesActive =
        frame.activeTrack >= 0 &&
        (nodeA === frame.activeTrack || nodeB === frame.activeTrack);
      boosts[i] = expDamp(boosts[i], touchesActive ? 1 : 0, 6, dt);

      const opacity =
        ((0.04 + 0.5 * flicker) * conn + proximity * 0.12 + boosts[i] * 0.3) *
        frame.presence;
      line.material.opacity = Math.min(opacity, 0.6);
      line.material.color.lerpColors(LINE_BASE, LINE_ACTIVE, boosts[i]);
    }

    // One traveling pulse cycling through the connections — data moving
    // through the network, clearly visible once connectionLevel is high.
    const points = pulseRef.current;
    if (points) {
      const cycleIndex = Math.floor(t / PULSE_CYCLE) % LINE_COUNT;
      const progress = (t % PULSE_CYCLE) / PULSE_TRAVEL;
      if (progress <= 1) {
        const arr = lines[cycleIndex].attribute.array as Float32Array;
        points.position.set(
          arr[0] + (arr[3] - arr[0]) * progress,
          arr[1] + (arr[4] - arr[1]) * progress,
          arr[2] + (arr[5] - arr[2]) * progress,
        );
        pulse.material.opacity =
          Math.sin(progress * Math.PI) * conn * conn * 0.85 * frame.presence;
      } else {
        pulse.material.opacity = 0;
      }
    }
  }, -4);

  return (
    <group>
      {lines.map((line, i) => (
        <lineSegments
          // Static topology — index keys are stable here.
          key={i}
          geometry={line.geometry}
          material={line.material}
          frustumCulled={false}
        />
      ))}
      <points
        ref={pulseRef}
        geometry={pulse.geometry}
        material={pulse.material}
        frustumCulled={false}
      />
    </group>
  );
}
