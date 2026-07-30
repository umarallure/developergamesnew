"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coreState } from "@/components/skill-core/core-state";
import { SkillCoreFallback } from "@/components/skill-core/skill-core-fallback";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SkillCoreCanvas = dynamic(
  () => import("@/components/skill-core/skill-core-canvas"),
  { ssr: false },
);

/**
 * Wraps hero → process. Renders the Skill Core as a sticky full-viewport
 * layer behind the content on desktop (absolute, hero-only on mobile),
 * and drives the scroll story by writing phase progress into `coreState`.
 *
 * Child sections mark themselves with `data-core-phase="0..3"`.
 */
export function SkillCoreStory({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Deferred to a frame callback: keeps the hydration pass clean and
    // satisfies the no-sync-setState-in-effect rule.
    const id = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebglOk(
          Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
        );
      } catch {
        setWebglOk(false);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Fine-pointer tracking for the subtle core tilt / particle attraction.
  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      coreState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      coreState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      coreState.pointerActive = true;
    };
    const onLeave = () => {
      coreState.pointerActive = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      coreState.pointerActive = false;
    };
  }, [reducedMotion]);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const visual = visualRef.current;
      if (!wrap || !visual || reducedMotion) return;

      const writePhase = (index: number) => (self: ScrollTrigger) => {
        if (!self.isActive && self.progress !== 0 && self.progress !== 1) return;
        coreState.phaseIndex = index;
        coreState.phaseProgress = self.progress;
        coreState.storyT = (index + self.progress) / 3;
      };

      const phaseEls = gsap.utils.toArray<HTMLElement>(
        "[data-core-phase]",
        wrap,
      );
      for (const el of phaseEls) {
        const index = Number(el.dataset.corePhase ?? 0);
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onUpdate: (self) => {
            if (!self.isActive) return;
            coreState.phaseIndex = index;
            coreState.phaseProgress = self.progress;
            coreState.storyT = (index + self.progress) / 3;
          },
          onRefresh: writePhase(index),
        });
      }

      // Fade + settle the core away before the sections that follow.
      gsap.fromTo(
        visual,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "bottom 95%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    },
    { scope: wrapRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  const showCanvas = webglOk === true && !reducedMotion;

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={visualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] overflow-hidden opacity-60 md:sticky md:h-screen md:opacity-100"
      >
        {showCanvas ? (
          <SkillCoreCanvas onReady={() => setSceneReady(true)} />
        ) : null}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showCanvas && sceneReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <SkillCoreFallback />
        </div>
      </div>
      <div className="relative z-10 md:-mt-[100vh]">{children}</div>
    </div>
  );
}
