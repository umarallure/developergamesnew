"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/section-heading";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { PROCESS_STEPS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "03 / THE FORMAT" — four-step progression.
 *
 * Desktop: horizontal rail behind the step markers with a brand progress
 * line that draws (scaleX) as the section is scrolled; each marker
 * activates as the line tip passes it. Mobile: the same steps on a
 * vertical left rail drawing scaleY. Markup defaults to the fully drawn,
 * all-active state so no-JS and reduced-motion visitors see the complete
 * diagram; GSAP takes over only when motion is allowed.
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineXRef = useRef<HTMLDivElement>(null);
  const lineYRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const lineX = lineXRef.current;
      const lineY = lineYRef.current;
      if (!section || !lineX || !lineY) return;

      const markers = gsap.utils.toArray<HTMLElement>(
        "[data-step-marker]",
        section,
      );

      if (reducedMotion) {
        // Static, complete state: line fully drawn, every step active.
        gsap.set([lineX, lineY], { clearProps: "transform" });
        for (const marker of markers) marker.setAttribute("data-active", "");
        return;
      }

      for (const marker of markers) marker.removeAttribute("data-active");

      const count = markers.length;
      const activate = (progress: number) => {
        markers.forEach((marker, index) => {
          marker.toggleAttribute(
            "data-active",
            progress >= (index + 0.1) / count,
          );
        });
      };

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 75%",
          scrub: 0.5,
          onUpdate: (self) => activate(self.progress),
        },
      });

      timeline
        .fromTo(lineX, { scaleX: 0 }, { scaleX: 1 }, 0)
        .fromTo(lineY, { scaleY: 0 }, { scaleY: 1 }, 0);
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-title"
      data-reveal-group
      data-core-phase="3"
      className="relative py-24 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          label="THE FORMAT"
          titleId="process-title"
          title="How the Games work"
        />

        <div className="relative mt-14 md:mt-20">
          {/* Desktop rail: base line + drawn progress line at marker height */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[1.125rem] hidden h-px bg-line md:block"
          />
          <div
            ref={lineXRef}
            aria-hidden="true"
            className="absolute inset-x-0 top-[1.125rem] hidden h-px origin-left bg-brand-mid md:block"
          />

          {/* Mobile rail: vertical base line + drawn progress line */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[1.125rem] w-px bg-line md:hidden"
          />
          <div
            ref={lineYRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-[1.125rem] w-px origin-top bg-brand-mid md:hidden"
          />

          <ol role="list" className="grid gap-12 md:grid-cols-4 md:gap-6">
            {PROCESS_STEPS.map((step) => (
              <li key={step.id} data-reveal className="relative pl-12 md:pl-0">
                <span
                  data-step-marker
                  data-active=""
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-10 flex size-9 items-center justify-center rounded-[6px] border border-line bg-surface font-mono text-xs text-muted transition-colors duration-500 data-active:border-line-active data-active:text-brand-light md:relative"
                >
                  {step.number}
                </span>
                <div className="pt-1.5 md:mt-6 md:pt-0">
                  <span className="tech-label block">{`ST-${step.number}`}</span>
                  <h3 className="mt-2 font-display text-lg font-medium text-foreground md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
