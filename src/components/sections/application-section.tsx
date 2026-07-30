import { ApplicationForm } from "@/components/forms/application-form";
import { SectionHeading } from "@/components/ui/section-heading";

const META_LINES = [
  "REVIEW / HUMAN",
  "FORMAT / PRACTICAL",
  "RESPONSE / EMAIL",
];

export function ApplicationSection() {
  return (
    <section
      id="apply"
      aria-labelledby="apply-title"
      data-reveal-group
      className="relative border-t border-line bg-background py-24 md:py-36"
    >
      <div
        aria-hidden="true"
        className="grid-faint pointer-events-none absolute right-0 top-0 h-80 w-full max-w-md opacity-35 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              index="07"
              label="ENTRY"
              titleId="apply-title"
              title="Ready to enter?"
            />

            <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">
              Choose your track, share your experience, and take the first step
              into The Developer Games.
            </p>

            <ul data-reveal className="mt-10 space-y-2.5">
              {META_LINES.map((line) => (
                <li key={line} className="tech-label">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
