"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpecularButton } from "@/components/ui/specular-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import {
  setCtaHover,
  triggerCorePulse,
} from "@/components/skill-core/core-state";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Opening section. Owns a bespoke GSAP entrance timeline (no RevealManager):
 * `[data-hero-reveal]` and `[data-hero-line] > span` are pre-hidden by
 * globals.css only when JS is running and motion is allowed, so there is no
 * flash and no hidden-content risk without JS or with reduced motion.
 *
 * Background stays transparent — the Skill Core WebGL layer sits behind on
 * a sticky layer, drifting right of center on lg+ (copy spans 7 of 12 cols,
 * keeping the right ~5 columns visually open).
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const lineInners = gsap.utils.toArray<HTMLElement>(
        "[data-hero-line] > span",
      );
      const reveals = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");

      if (prefersReducedMotion) {
        // Show final states immediately; no loops.
        gsap.set(lineInners, { clearProps: "all" });
        gsap.set(reveals, { opacity: 1, y: 0 });
        gsap.set("[data-cue-line]", { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to('[data-hero-reveal="eyebrow"]', { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          lineInners,
          // y: 0 clears the pixel offset GSAP parses out of the CSS
          // `translateY(112%)` initial state — without it the lines keep
          // a baked-in one-line-height shift and stay behind the mask.
          { yPercent: 112, y: 0 },
          { yPercent: 0, y: 0, duration: 1.0, stagger: 0.12 },
          0.15,
        )
        .to(
          '[data-hero-reveal="copy"]',
          { opacity: 1, y: 0, duration: 0.8 },
          0.7,
        )
        .to(
          '[data-hero-reveal="cta"]',
          { opacity: 1, y: 0, duration: 0.8 },
          0.85,
        )
        .to(
          '[data-hero-reveal="micro"]',
          { opacity: 1, y: 0, duration: 0.7 },
          1.0,
        )
        .to(
          '[data-hero-reveal="cue"]',
          { opacity: 1, y: 0, duration: 0.7 },
          1.1,
        );

      // Quiet scroll-cue pulse: a short segment travelling down the 1px line.
      gsap.fromTo(
        "[data-cue-line]",
        { yPercent: -100 },
        {
          yPercent: 100,
          duration: 1.8,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.5,
          delay: 1.6,
        },
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      data-core-phase="0"
      className="relative flex min-h-[100svh] items-center pb-24 pt-[calc(var(--nav-height)+2rem)]"
    >
      {/* ---------------------------------------------------------- */}
      {/* Atmosphere (decorative, simplified below md)                */}
      {/* ---------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="grid-faint pointer-events-none absolute inset-0 hidden opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_32%_45%,black_25%,transparent_78%)] md:block"
      />
      <span
        aria-hidden="true"
        className="tech-label pointer-events-none absolute right-[7%] top-[calc(var(--nav-height)+3.5rem)] hidden opacity-50 md:block"
      >
        SYS.01 // CORE ACTIVE
      </span>
      <span
        aria-hidden="true"
        className="tech-label pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 opacity-40 [writing-mode:vertical-rl] lg:block"
      >
        GRID 12 / COL 07
      </span>

      {/* ---------------------------------------------------------- */}
      {/* Copy — asymmetric, left of the drifting core                */}
      {/* ---------------------------------------------------------- */}
      <div className="container-page relative z-10 grid w-full lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p
            data-hero-reveal="eyebrow"
            className="tech-label flex items-center gap-3"
          >
            <span aria-hidden="true" className="status-dot shrink-0" />
            SEASON 01 / SKILL-BASED HIRING
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            <span data-hero-line>
              <span className="whitespace-nowrap">BUILD.</span>
            </span>
            <span data-hero-line>
              <span className="whitespace-nowrap">COMPETE.</span>
            </span>
            <span data-hero-line>
              <span className="whitespace-nowrap">
                GET HIRED<span className="text-energy">.</span>
              </span>
            </span>
          </h1>

          <p
            data-hero-reveal="copy"
            className="mt-7 max-w-xl text-base text-muted leading-relaxed"
          >
            The Developer Games is a skills-first hiring experience where
            engineers solve real challenges, demonstrate how they think, and
            earn the opportunity to join our development team.
          </p>

          <div
            data-hero-reveal="cta"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <SpecularButton
              href="#apply"
              size="md"
              onEnergizeStart={() => {
                setCtaHover(true);
                triggerCorePulse();
              }}
              onEnergizeEnd={() => {
                setCtaHover(false);
              }}
            >
              Enter the Games
            </SpecularButton>
            <SecondaryButton href="#process">
              Explore the format
            </SecondaryButton>
          </div>

          <p data-hero-reveal="micro" className="mt-6 text-sm text-muted">
            No generic screening. No cover-letter theatre. Show us what you can
            build.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Scroll cue (decorative)                                     */}
      {/* ---------------------------------------------------------- */}
      <div
        aria-hidden="true"
        data-hero-reveal="cue"
        className="pointer-events-none absolute bottom-8 left-5 z-10 hidden flex-col items-start gap-3 sm:left-10 md:flex lg:left-14 2xl:left-20"
      >
        <span className="tech-label opacity-70">SCROLL</span>
        <span className="relative ml-1 block h-12 w-px overflow-hidden bg-line">
          <span
            data-cue-line
            className="absolute left-0 top-0 h-full w-px bg-brand-light"
          />
        </span>
      </div>

      {/* Gradient handoff into the marquee band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
