import { SectionHeading } from "@/components/ui/section-heading";
import { CRITERIA } from "@/lib/constants";

const SCALE_SEGMENTS = [0, 1, 2, 3];

export function EvaluationSection() {
  return (
    <section
      id="evaluation"
      aria-labelledby="evaluation-title"
      data-reveal-group
      className="relative border-t border-line bg-background-deep py-24 md:py-36"
    >
      <div className="container-page">
        <SectionHeading
          index="06"
          label="EVALUATION"
          titleId="evaluation-title"
          title="How submissions are read"
        />

        <p data-reveal className="mt-6 max-w-xl leading-relaxed text-muted">
          Every submission is reviewed by engineers against four criteria. No
          keyword filters, no automated rejections.
        </p>

        <ol className="mt-14 list-none md:mt-20">
          {CRITERIA.map((criterion) => (
            <li
              key={criterion.code}
              data-reveal
              className="group grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-12 md:items-baseline md:gap-4 md:py-8"
            >
              <span className="tech-label text-brand-light md:col-span-2">
                {criterion.code}
              </span>
              <h3 className="font-display text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-brand-light md:col-span-3 md:text-2xl">
                {criterion.title}
              </h3>
              <p className="leading-relaxed text-muted md:col-span-5">
                {criterion.question}
              </p>
              <div
                aria-hidden="true"
                className="mt-2 flex items-center gap-1.5 md:col-span-2 md:mt-0 md:justify-end"
              >
                {SCALE_SEGMENTS.map((segment) => (
                  <span key={segment} className="h-px w-6 bg-brand-mid" />
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="tech-label mt-4">
          SCALE / SCHEMATIC — CRITERIA ARE WEIGHTED BY CONTEXT, NOT SHOWN SCORES
        </p>
      </div>
    </section>
  );
}
