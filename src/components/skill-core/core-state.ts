/**
 * Lightweight shared interaction channel between the DOM UI and the
 * Skill Core WebGL scene.
 *
 * This is a plain mutable module singleton on purpose: the scene reads
 * it inside `useFrame` every frame, and DOM-side code (CTA hover, scroll
 * progress, pointer tracking, track-card hover) writes to it without
 * triggering any React renders.
 */

export interface CoreState {
  /** True while the primary CTA is hovered or focused. */
  ctaHover: boolean;
  /** `performance.now()` timestamp of the last CTA pulse. 0 = never. */
  pulseAt: number;
  /** Continuous 0..1 progress across the hero → process scroll story. */
  storyT: number;
  /** 0 hero, 1 manifesto, 2 tracks, 3 process. */
  phaseIndex: number;
  /** 0..1 progress within the current phase. */
  phaseProgress: number;
  /** Hovered/focused track card (0..3), or -1. Maps to orbiting nodes. */
  activeTrack: number;
  /** Normalised pointer position, -1..1, +y up. */
  pointerX: number;
  pointerY: number;
  /** True while a fine pointer is over the page. */
  pointerActive: boolean;
}

export const coreState: CoreState = {
  ctaHover: false,
  pulseAt: 0,
  storyT: 0,
  phaseIndex: 0,
  phaseProgress: 0,
  activeTrack: -1,
  pointerX: 0,
  pointerY: 0,
  pointerActive: false,
};

/** Fired by the primary CTA on hover/focus — the scene plays one energy pulse. */
export function triggerCorePulse(): void {
  coreState.pulseAt =
    typeof performance !== "undefined" ? performance.now() : Date.now();
}

export function setCtaHover(hover: boolean): void {
  coreState.ctaHover = hover;
}

export function setActiveTrack(index: number): void {
  coreState.activeTrack = index;
}
