import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECTS } from "@/lib/constants";

/**
 * "05 / PROJECTS" — an editorial index of shipped platforms.
 * Sits between the challenge cards (04) and the evaluation matrix (06):
 * full-width ruled rows with large display titles, no cards, no motifs.
 * Outside the story wrapper — solid background, top divider.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      data-reveal-group
      className="relative border-t border-line bg-background py-24 md:py-36"
    >
      {/* Restrained grid texture, masked into the bottom-left corner —
          mirroring (not repeating) the challenges section's top-right patch */}
      <div
        aria-hidden="true"
        className="grid-faint pointer-events-none absolute bottom-0 left-0 h-[22rem] w-[36rem] max-w-full opacity-70 [mask-image:radial-gradient(closest-side_at_0%_100%,black,transparent)]"
      />

      <div className="container-page relative">
        <SectionHeading
          index="05"
          label="PROJECTS"
          titleId="projects-title"
          title="What we build"
        />

        <p
          data-reveal
          className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted"
        >
          A sample of platforms our team has shipped &mdash; the kind of work
          you would step into.
        </p>

        <ol className="mt-14 list-none md:mt-20">
          {PROJECTS.map((project) => (
            <li
              key={project.id}
              data-reveal
              className="group grid grid-cols-1 gap-x-6 gap-y-4 border-t border-line py-8 transition-colors duration-300 last:border-b hover:bg-surface/40 md:grid-cols-12 md:items-baseline md:py-12"
            >
              <div className="flex items-baseline gap-4 md:col-span-2 md:flex-col md:gap-2">
                <span className="tech-label text-brand-light">
                  {project.index}
                </span>
                <span className="tech-label">{project.domain}</span>
              </div>

              <div className="md:col-span-6">
                <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-tight tracking-[-0.02em] text-foreground transition-[color,translate] duration-300 group-hover:text-brand-light motion-safe:group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">
                  {project.goal}
                </p>
              </div>

              <ul
                role="list"
                className="flex flex-wrap gap-2 md:col-span-4 md:justify-end md:justify-self-end md:text-right"
              >
                {project.stack.map((tag) => (
                  <li key={tag}>
                    <span className="inline-block rounded-[6px] border border-line px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-line-active">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
