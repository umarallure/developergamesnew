"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SkillCoreScene } from "@/components/skill-core/skill-core-scene";

/**
 * The R3F canvas for the Skill Core. Assumes the parent has already
 * handled WebGL detection, reduced motion, the fallback visual,
 * `aria-hidden` and `pointer-events-none`.
 *
 * Pauses the frameloop entirely while the canvas is scrolled out of the
 * viewport or the tab is hidden.
 */
export default function SkillCoreCanvas({
  onReady,
}: {
  onReady?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const notifiedRef = useRef(false);
  const onReadyRef = useRef<(() => void) | undefined>(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { rootMargin: "12% 0px 12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        flat
        dpr={[1, 1.5]}
        frameloop={inView && pageVisible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 42, position: [0, 0, 8] }}
        onCreated={() => {
          // Signal readiness after the first real frame has been drawn so
          // the parent can crossfade away the static fallback.
          requestAnimationFrame(() => {
            if (notifiedRef.current) return;
            notifiedRef.current = true;
            onReadyRef.current?.();
          });
        }}
      >
        <SkillCoreScene />
      </Canvas>
    </div>
  );
}
