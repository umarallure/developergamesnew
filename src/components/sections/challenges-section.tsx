import { SectionHeading } from "@/components/ui/section-heading";
import { CHALLENGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Challenge } from "@/types";

const CARD_BASE =
  "rounded-md border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-active md:p-8";

/** Fixed bar heights (percent) — deterministic, no fake metrics. */
const LOAD_BARS = [
  34, 58, 42, 70, 48, 82, 38, 64, 90, 52, 74, 44, 66, 56, 78, 40, 60, 50,
] as const;

/** The single brand-mid accent bar (the peak). */
const LOAD_ACCENT_INDEX = 8;

function ChallengeCardBody({ challenge }: { challenge: Challenge }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <span className="tech-label">{challenge.meta.join(" / ")}</span>
        <span className="rounded-[4px] border border-line px-2 py-[3px] font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted">
          SAMPLE
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-medium text-foreground md:text-2xl">
        {challenge.title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
        {challenge.description}
      </p>
    </>
  );
}

/** Product-UI skeleton: header bar, sidebar, content blocks. */
function WireframeMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 150"
      fill="none"
      className={cn("h-auto w-full max-w-[340px] text-line-active", className)}
    >
      <rect
        x="0.5"
        y="0.5"
        width="259"
        height="149"
        rx="6"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="0.5"
        y1="28.5"
        x2="259.5"
        y2="28.5"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="12"
        y="11"
        width="44"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="214"
        y="10"
        width="34"
        height="9"
        rx="2"
        className="text-brand-mid"
        stroke="currentColor"
        strokeOpacity="0.8"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="68.5"
        y1="28.5"
        x2="68.5"
        y2="149.5"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="12"
        y="44"
        width="40"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="12"
        y="60"
        width="34"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.45"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="12"
        y="76"
        width="44"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.45"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="82"
        y="42"
        width="104"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="82"
        y="60"
        width="164"
        height="30"
        rx="3"
        stroke="currentColor"
        strokeOpacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="82"
        y="100"
        width="78"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeOpacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="168"
        y="100"
        width="78"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeOpacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Request-load suggestion: thin bars on a baseline, no numbers. */
function LoadMotif({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-16 items-end justify-between gap-1 border-b border-line",
        className,
      )}
    >
      {LOAD_BARS.map((height, index) => (
        <span
          key={index}
          className={cn(
            "w-[3px] rounded-t-[1px]",
            index === LOAD_ACCENT_INDEX ? "bg-brand-mid" : "bg-brand-dark",
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

/** System diagram suggestion: five nodes joined by 1px lines. */
function NodeGraphMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 120"
      fill="none"
      className={cn("h-auto w-full text-line-active", className)}
    >
      <line
        x1="140"
        y1="60"
        x2="36"
        y2="28"
        stroke="currentColor"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="140"
        y1="60"
        x2="36"
        y2="90"
        stroke="currentColor"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="140"
        y1="60"
        x2="244"
        y2="32"
        stroke="currentColor"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="140"
        y1="60"
        x2="244"
        y2="88"
        stroke="currentColor"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="132"
        y="52"
        width="16"
        height="16"
        rx="3"
        fill="var(--surface)"
        className="text-brand-mid"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="36"
        cy="28"
        r="7"
        fill="var(--surface)"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="30"
        y="84"
        width="12"
        height="12"
        rx="2"
        fill="var(--surface)"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="244"
        cy="32"
        r="7"
        fill="var(--surface)"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="238"
        y="82"
        width="12"
        height="12"
        rx="2"
        fill="var(--surface)"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * "04 / SAMPLE CHALLENGES" — three illustrative challenge previews.
 * First section outside the story wrapper: solid background, top divider.
 */
export function ChallengesSection() {
  return (
    <section
      id="challenges"
      aria-labelledby="challenges-title"
      data-reveal-group
      className="relative border-t border-line bg-background py-24 md:py-36"
    >
      {/* Restrained grid texture, masked into the top-right corner */}
      <div
        aria-hidden="true"
        className="grid-faint pointer-events-none absolute right-0 top-0 h-[22rem] w-[36rem] max-w-full opacity-70 [mask-image:radial-gradient(closest-side_at_100%_0%,black,transparent)]"
      />

      <div className="container-page relative">
        <SectionHeading
          index="04"
          label="SAMPLE CHALLENGES"
          titleId="challenges-title"
          title="Challenge previews"
        />

        <p
          data-reveal
          className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted"
        >
          <span className="mr-3 inline-block -translate-y-px rounded-[4px] border border-line px-2 py-[3px] font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted">
            ILLUSTRATIVE
          </span>
          Sample briefs that show the level and style of the Games. Live
          challenges are issued after you enter.
        </p>

        <ul role="list" className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-12">
          {CHALLENGES.map((challenge) => {
            if (challenge.variant === "interface") {
              return (
                <li
                  key={challenge.id}
                  data-reveal
                  className={cn(CARD_BASE, "corner-marks lg:col-span-7")}
                >
                  <ChallengeCardBody challenge={challenge} />
                  <WireframeMotif className="mt-8" />
                </li>
              );
            }

            if (challenge.variant === "systems") {
              return (
                <li
                  key={challenge.id}
                  data-reveal
                  className={cn(CARD_BASE, "flex flex-col lg:col-span-5")}
                >
                  <ChallengeCardBody challenge={challenge} />
                  <LoadMotif className="mt-8 lg:mt-auto lg:pt-8" />
                </li>
              );
            }

            return (
              <li
                key={challenge.id}
                data-reveal
                className={cn(CARD_BASE, "lg:col-span-12")}
              >
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
                  <div className="min-w-0 max-w-xl flex-1">
                    <ChallengeCardBody challenge={challenge} />
                  </div>
                  <NodeGraphMotif className="max-w-[300px] shrink-0 md:w-[280px]" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
