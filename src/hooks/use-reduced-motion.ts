"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** True when the user prefers reduced motion. False during SSR. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
