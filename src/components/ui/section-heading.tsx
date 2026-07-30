import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Section counter, e.g. "01". */
  index: string;
  /** Uppercase eyebrow, e.g. "THE IDEA". */
  label: string;
  title?: ReactNode;
  /** id for the h2, referenced by the section's aria-labelledby. */
  titleId?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  titleId,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div data-reveal className="flex items-center gap-4">
        <span className="tech-label text-brand-light">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-line-active" />
        <span className="tech-label">{label}</span>
      </div>
      {title ? (
        <h2
          id={titleId}
          data-reveal
          className={cn(
            "mt-6 max-w-4xl font-display text-[clamp(2.1rem,4.5vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-foreground",
            titleClassName,
          )}
        >
          {title}
        </h2>
      ) : null}
    </div>
  );
}
