"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Global scroll-reveal system.
 *
 * Server components opt in by adding `data-reveal` to elements. Elements
 * are grouped by their closest `[data-reveal-group]` ancestor (usually the
 * section) and revealed with a small stagger the first time the group
 * enters the viewport. Initial hidden state comes from globals.css and is
 * gated on `.js` + `prefers-reduced-motion: no-preference`, so content is
 * never hidden for no-JS or reduced-motion visitors.
 */
export function RevealManager() {
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (elements.length === 0) return;

      if (reducedMotion) {
        gsap.set(elements, { clearProps: "opacity,transform,visibility" });
        return;
      }

      const groups = new Map<Element, HTMLElement[]>();
      for (const el of elements) {
        const group = el.closest("[data-reveal-group]") ?? el;
        const bucket = groups.get(group);
        if (bucket) {
          bucket.push(el);
        } else {
          groups.set(group, [el]);
        }
      }

      groups.forEach((items, group) => {
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: "auto",
          scrollTrigger: {
            trigger: group as HTMLElement,
            start: "top 78%",
            once: true,
          },
        });
      });

      // Fonts and the WebGL canvas settle sizes shortly after hydration.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return null;
}
