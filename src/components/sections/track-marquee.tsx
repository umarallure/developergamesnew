import { Fragment } from "react";
import { MARQUEE_ITEMS, ORBIT_TRACKS } from "@/lib/constants";

/**
 * Thin transition band between the hero and the manifesto. The scrolling
 * strip is purely decorative (aria-hidden); the track list is provided to
 * screen readers as static text. Background stays near-transparent — the
 * Skill Core layer sits behind this band.
 *
 * The `.marquee-track` animation translates to -50%, so the row contains
 * exactly two identical copies of the sequence for a seamless loop.
 */
export function TrackMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-background/30 py-3.5 backdrop-blur-[2px]">
      <div aria-hidden="true" className="marquee-track">
        {([0, 1] as const).map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
            {MARQUEE_ITEMS.map((item) => (
              <Fragment key={item}>
                <span className="whitespace-nowrap font-mono text-[0.8rem] tracking-[0.2em] text-brand-mid">
                  {item}
                </span>
                <span className="text-muted/50">/</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">Tracks: {ORBIT_TRACKS.join(", ")}.</p>
    </div>
  );
}
