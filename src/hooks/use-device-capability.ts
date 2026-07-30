"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export interface DeviceCapability {
  /** "low" on coarse-pointer or narrow devices — reduce WebGL cost. */
  tier: "high" | "low";
  coarsePointer: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 767px)");

  return {
    tier: coarsePointer || narrow ? "low" : "high",
    coarsePointer,
  };
}
