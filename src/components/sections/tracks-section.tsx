"use client";

import type { ReactElement } from "react";
import { setActiveTrack } from "@/components/skill-core/core-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { TRACKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Original geometric marks per track — no tech logos. Stroke inherits
 * `currentColor` from the brand-light wrapper.
 */
const TRACK_ICONS: Record<string, ReactElement> = {
  frontend: (
    // Three offset outlined squares — layered interface planes.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="12" height="12" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
      <rect x="8" y="8" width="12" height="12" stroke="currentColor" strokeWidth="1.25" opacity="0.7" />
      <rect x="12.5" y="12.5" width="12" height="12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  backend: (
    // Three stacked bars with a node dot — service layers.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 7h20" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 14h20" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4 21h20" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="20.5" cy="14" r="2" fill="currentColor" />
    </svg>
  ),
  fullstack: (
    // Two nodes bridged by a path — interface to infrastructure.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="21.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="21.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 19v-5h15V9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  "ai-data": (
    // 3x3 dot matrix with one traced path — signal through data.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="14" cy="5" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="23" cy="5" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="5" cy="14" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="14" cy="14" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="23" cy="14" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="5" cy="23" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="14" cy="23" r="1.3" fill="currentColor" opacity="0.55" />
      <circle cx="23" cy="23" r="1.3" fill="currentColor" opacity="0.55" />
      <path d="M5 23l9-9h9V5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
};

/**
 * 02 / THE TRACKS — four disciplines wired to the Skill Core.
 *
 * Client component only for the hover/focus channel: cards write the
 * hovered/focused track's node index into `coreState` (no React renders).
 * Entrances still come from `data-reveal` + the global RevealManager.
 */
export function TracksSection() {
  return (
    <section
      id="tracks"
      aria-labelledby="tracks-title"
      data-reveal-group
      data-core-phase="2"
      className="relative py-24 md:py-36"
    >
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8 lg:col-start-5">
            <SectionHeading
              index="02"
              label="THE TRACKS"
              titleId="tracks-title"
              title="Choose your discipline"
            />

            <p data-reveal className="mt-6 max-w-xl leading-relaxed text-muted">
              Four primary tracks. One practical standard.
            </p>

            <div className="mt-12 grid grid-cols-1 items-start gap-5 md:mt-16 md:grid-cols-2">
              {TRACKS.map((track, i) => (
                <article
                  key={track.id}
                  data-reveal
                  tabIndex={0}
                  onPointerEnter={() => setActiveTrack(track.nodeIndex)}
                  onPointerLeave={() => setActiveTrack(-1)}
                  onFocus={() => setActiveTrack(track.nodeIndex)}
                  onBlur={() => setActiveTrack(-1)}
                  className={cn(
                    "corner-marks relative rounded-md border border-line bg-surface/75 p-6 md:p-8",
                    "transition-[translate,border-color,background-color] duration-300",
                    "after:opacity-0 after:transition-opacity after:duration-300",
                    "hover:border-line-active hover:bg-surface-elevated/80 hover:after:opacity-100",
                    "focus-visible:border-line-active focus-visible:bg-surface-elevated/80 focus-visible:after:opacity-100",
                    "motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1",
                    // Right column drifts down on md+ — margins, not transforms.
                    i % 2 === 1 && "md:mt-14",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tech-label text-brand-light">
                      {track.index}
                    </span>
                    <span className="tech-label">{track.code}</span>
                  </div>

                  <div className="mt-7 text-brand-light">
                    {TRACK_ICONS[track.id] ?? null}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-medium text-foreground md:text-2xl">
                    {track.title}
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {track.description}
                  </p>

                  <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-muted">
                    {track.tags.join(" / ")}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
