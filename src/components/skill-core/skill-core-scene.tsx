"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { coreState } from "@/components/skill-core/core-state";
import { ParticleCore } from "@/components/skill-core/particle-core";
import { CoreShell } from "@/components/skill-core/core-shell";
import { OrbitingNodes } from "@/components/skill-core/orbiting-nodes";
import { ConnectionLines } from "@/components/skill-core/connection-lines";
import { EnergyRing } from "@/components/skill-core/energy-ring";

/**
 * Mutable per-frame contract owned by the scene and shared with every
 * sub-component via prop. Written once per frame (scene runs at the
 * highest useFrame priority), read by children afterwards. Never touches
 * React state — all values live on this one preallocated object.
 */
export interface CoreFrame {
  /** Accumulated clamped time in seconds. */
  time: number;
  /** 0 loose cloud → 1 tightly organised sphere. */
  organization: number;
  /** 0 dormant network → 1 fully connected (process phase). */
  connectionLevel: number;
  /** Multiplier on orbit radii for the six nodes. */
  nodeSpread: number;
  /** Damped 0..1 CTA hover energy (drives contraction/brightening). */
  hover: number;
  /** Particle speed multiplier (1 at rest, ~1.6 while CTA hovered). */
  speed: number;
  /** Global dimmer as the scroll story ends. */
  presence: number;
  /** Damped extra y-rotation for the shell (tracks phase facet turn). */
  yawOffset: number;
  /** Seconds since the last CTA pulse (very large when never pulsed). */
  pulseTime: number;
  /** Raw hovered track index (0..3) or -1. */
  activeTrack: number;
  /** Pointer position mapped into the core group's local space. */
  pointerLocal: THREE.Vector3;
  /** Damped 0..1 pointer influence. */
  pointerStrength: number;
  /** Group-local positions of the six orbiting nodes (written by OrbitingNodes). */
  nodePositions: THREE.Vector3[];
  /** Group-local shell vertex anchors (written by CoreShell). */
  shellAnchorA: THREE.Vector3;
  shellAnchorB: THREE.Vector3;
}

/** Frame-rate independent damped interpolation. */
function expDamp(
  current: number,
  target: number,
  k: number,
  dt: number,
): number {
  return current + (target - current) * (1 - Math.exp(-dt * k));
}

/**
 * Story keyframes at t = 0 (hero), 1/3 (manifesto), 2/3 (tracks),
 * 1 (process). x values are fractions of the half viewport width.
 */
const STORY_X = [0.32, 0.18, -0.22, -0.05];
const STORY_Y = [0, 0.15, 0.1, 0];
const STORY_SCALE = [1, 0.92, 0.85, 0.8];
const STORY_ORG = [0.25, 0.6, 0.75, 0.9];
const STORY_CONN = [0.15, 0.35, 0.55, 1];
const STORY_SPREAD = [1, 1, 1.45, 1.25];
const STORY_YAW = [0, 0, 1.15, 0.85];

function sampleStory(values: number[], seg: number, s: number): number {
  const a = values[seg];
  const b = values[seg + 1];
  return a + (b - a) * s;
}

interface SceneSim {
  initialized: boolean;
  x: number;
  y: number;
  scale: number;
  tiltX: number;
  tiltY: number;
  lastPulseAt: number;
}

export function SkillCoreScene() {
  const groupRef = useRef<THREE.Group>(null);

  const frame = useMemo<CoreFrame>(
    () => ({
      time: 0,
      organization: 0.25,
      connectionLevel: 0.15,
      nodeSpread: 1,
      hover: 0,
      speed: 1,
      presence: 1,
      yawOffset: 0,
      pulseTime: 1e6,
      activeTrack: -1,
      pointerLocal: new THREE.Vector3(0, 0, 0),
      pointerStrength: 0,
      nodePositions: [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ],
      shellAnchorA: new THREE.Vector3(0, 1.55, 0),
      shellAnchorB: new THREE.Vector3(0, -1.55, 0),
    }),
    [],
  );

  const sim = useRef<SceneSim>({
    initialized: false,
    x: 0,
    y: 0,
    scale: 1,
    tiltX: 0,
    tiltY: 0,
    lastPulseAt: 0,
  });

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;

    const dt = Math.min(rawDelta, 0.05);
    frame.time += dt;

    const s = sim.current;

    // CTA pulse clock — restart on every new pulseAt timestamp.
    if (coreState.pulseAt > 0 && coreState.pulseAt !== s.lastPulseAt) {
      s.lastPulseAt = coreState.pulseAt;
      frame.pulseTime = 0;
    } else {
      frame.pulseTime += dt;
    }

    // Piecewise story sampling with smoothstep between keyframes.
    const t = THREE.MathUtils.clamp(coreState.storyT, 0, 1);
    const seg = Math.min(2, Math.floor(t * 3));
    const local = t * 3 - seg;
    const eased = local * local * (3 - 2 * local);

    const vw = state.viewport.width;
    const hw = vw / 2;
    const narrow = vw < 5;

    let targetX = sampleStory(STORY_X, seg, eased) * hw;
    let targetY = sampleStory(STORY_Y, seg, eased);
    let targetScale = sampleStory(STORY_SCALE, seg, eased);

    if (narrow) {
      // Narrow viewports: keep the core centred and slightly raised.
      targetX = 0;
      targetY = 0.4;
      targetScale = 0.75;
    } else {
      // Never let the object leave the frame.
      const limit = Math.max(0, hw - 1.7);
      targetX = THREE.MathUtils.clamp(targetX, -limit, limit);
    }

    const targetOrg = sampleStory(STORY_ORG, seg, eased);
    const targetConn = sampleStory(STORY_CONN, seg, eased);
    const targetSpread = sampleStory(STORY_SPREAD, seg, eased);
    const targetYaw = sampleStory(STORY_YAW, seg, eased);

    if (!s.initialized) {
      // First frame: snap to the story targets so the fade-in reveals a
      // settled object rather than one swooping into place.
      s.initialized = true;
      s.x = targetX;
      s.y = targetY;
      s.scale = targetScale;
      frame.organization = targetOrg;
      frame.connectionLevel = targetConn;
      frame.nodeSpread = targetSpread;
      frame.yawOffset = targetYaw;
    }

    s.x = expDamp(s.x, targetX, 4, dt);
    s.y = expDamp(s.y, targetY, 4, dt);
    s.scale = expDamp(s.scale, targetScale, 4, dt);
    frame.organization = expDamp(frame.organization, targetOrg, 3, dt);
    frame.connectionLevel = expDamp(frame.connectionLevel, targetConn, 3, dt);
    frame.nodeSpread = expDamp(frame.nodeSpread, targetSpread, 3, dt);
    frame.yawOffset = expDamp(frame.yawOffset, targetYaw, 3, dt);

    // CTA hover energy.
    frame.hover = expDamp(frame.hover, coreState.ctaHover ? 1 : 0, 6, dt);
    frame.speed = 1 + frame.hover * 0.6;

    // Dim gently as the scroll story hands over to the static sections.
    frame.presence = 1 - 0.35 * THREE.MathUtils.smoothstep(t, 0.9, 1);

    // Subtle pointer tilt of the whole group (never bind the camera).
    const tiltTargetX = coreState.pointerActive ? -coreState.pointerY * 0.09 : 0;
    const tiltTargetY = coreState.pointerActive ? coreState.pointerX * 0.09 : 0;
    s.tiltX = expDamp(s.tiltX, tiltTargetX, 5, dt);
    s.tiltY = expDamp(s.tiltY, tiltTargetY, 5, dt);

    frame.activeTrack = coreState.activeTrack;
    frame.pointerStrength = expDamp(
      frame.pointerStrength,
      coreState.pointerActive ? 1 : 0,
      5,
      dt,
    );
    // Rough pointer position in group-local space (z = 0 plane).
    frame.pointerLocal.set(
      (coreState.pointerX * hw - s.x) / s.scale,
      (coreState.pointerY * (state.viewport.height / 2) - s.y) / s.scale,
      0,
    );

    group.position.set(s.x, s.y, 0);
    group.scale.setScalar(s.scale);
    group.rotation.x = s.tiltX;
    group.rotation.y = s.tiltY;
  }, -8);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight
        color="#00dfdf"
        intensity={6}
        decay={2}
        position={[-3.5, -2, 2.5]}
      />
      <pointLight
        color="#408a71"
        intensity={18}
        decay={2}
        position={[3, 2.5, 3.5]}
      />
      <ParticleCore frame={frame} />
      <CoreShell frame={frame} />
      <OrbitingNodes frame={frame} />
      <ConnectionLines frame={frame} />
      <EnergyRing frame={frame} />
    </group>
  );
}
