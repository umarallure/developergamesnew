import { SectionHeading } from "@/components/ui/section-heading";

/**
 * 01 / THE IDEA — the editorial manifesto.
 *
 * Server component: all entrances are line-level `data-reveal` blocks
 * animated by the global RevealManager. The statement itself is the
 * section heading; whitespace and asymmetric offsets do the design work.
 */
export function ManifestoSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-reveal-group
      data-core-phase="1"
      className="relative py-28 md:py-44"
    >
      <div className="container-page">
        <div data-reveal aria-hidden="true" className="h-px w-full bg-line" />

        <div className="mt-10 flex items-center justify-between gap-6 md:mt-14">
          <SectionHeading index="01" label="THE IDEA" />
          <span
            data-reveal
            aria-hidden="true"
            className="tech-label hidden shrink-0 sm:inline-block"
          >
            IDX.01 / PRINCIPLE
          </span>
        </div>

        <h2
          id="about-title"
          className="mt-16 max-w-5xl font-display text-[clamp(1.8rem,3.8vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.02em] md:mt-24 lg:ml-[8.333%]"
        >
          <span data-reveal className="block text-muted">
            Your CV tells us where you have been.
          </span>
          <span data-reveal className="block text-foreground">
            The Games show us what you can do.
          </span>
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:mt-12 lg:ml-[16.666%]"
        >
          We believe strong developers should be evaluated through real
          thinking, practical decisions, and the quality of what they
          build&mdash;not only by keywords on a r&eacute;sum&eacute;.
        </p>
      </div>
    </section>
  );
}
