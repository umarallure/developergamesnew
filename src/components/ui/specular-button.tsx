"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { cn } from "@/lib/utils";

/**
 * Primary CTA. Adapted from the React Bits Specular Button (OGL shader
 * drawing a specular highlight that travels around the button edge),
 * re-tuned for The Developer Games palette and extended with:
 *
 * - anchor (`href`) and button rendering
 * - reduced-motion support (static single-frame highlight, no RAF loop)
 * - paused rendering when offscreen or when the tab is hidden
 * - `onEnergizeStart` / `onEnergizeEnd` hooks so the hero can drive the
 *   Skill Core reaction
 * - graceful degradation to a plain bordered button if WebGL fails
 */

type ButtonSize = "sm" | "md" | "lg";

export interface SpecularButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Fired on pointer-enter and keyboard focus. */
  onEnergizeStart?: () => void;
  /** Fired on pointer-leave and blur. */
  onEnergizeEnd?: () => void;
}

const PAD = 20;
const RADIUS = 10;
const LINE_COLOR = "#00dfdf";
const BASE_COLOR = "#408a71";
const INTENSITY = 1.15;
const SHINE_SIZE = 11;
const SHINE_FADE = 44;
const THICKNESS = 1.1;
const IDLE_SPEED = 0.3;
const PROXIMITY = 240;

const SIZES: Record<ButtonSize, string> = {
  sm: "text-[0.85rem] px-[22px] py-[11px]",
  md: "text-[0.95rem] px-[30px] py-[15px]",
  lg: "text-[1.05rem] px-10 py-[18px]",
};

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular streak on the edges facing toward/away from the
  // light, measured with an elliptical normal so it varies continuously
  // along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

export function SpecularButton({
  children,
  href,
  type = "button",
  size = "md",
  className,
  disabled = false,
  onClick,
  onEnergizeStart,
  onEnergizeEnd,
}: SpecularButtonProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const fxRef = useRef<HTMLSpanElement | null>(null);
  const [fxFailed, setFxFailed] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    const fx = fxRef.current;
    if (!el || !fx) return;

    const reducedMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Deferred so the rare WebGL-failure path never sets state
    // synchronously inside the effect body.
    const failFx = () => requestAnimationFrame(() => setFxFailed(true));

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr,
      });
    } catch {
      failFx();
      return;
    }
    const gl = renderer.gl;
    if (!gl) {
      failFx();
      return;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const lineC = new Color(LINE_COLOR);
    const baseC = new Color(BASE_COLOR);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: RADIUS * dpr },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [lineC.r, lineC.g, lineC.b] },
        uBaseColor: { value: [baseC.r, baseC.g, baseC.b] },
        uIntensity: { value: 0 },
        uShineSize: { value: (SHINE_SIZE * Math.PI) / 180 },
        uShineFade: { value: (SHINE_FADE * Math.PI) / 180 },
        uThickness: { value: THICKNESS * dpr },
        uBaseWidth: { value: dpr },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const sizeRef = { w: 1, h: 1 };
    const resize = () => {
      const rect = el.getBoundingClientRect();
      sizeRef.w = rect.width;
      sizeRef.h = rect.height;
      renderer.setSize(rect.width + PAD * 2, rect.height + PAD * 2);
      program.uniforms.uCenter.value = [
        (PAD + rect.width / 2) * dpr,
        (PAD + rect.height / 2) * dpr,
      ];
      program.uniforms.uHalfSize.value = [
        (rect.width / 2) * dpr,
        (rect.height / 2) * dpr,
      ];
      program.uniforms.uRadius.value =
        Math.min(RADIUS, Math.min(rect.width, rect.height) / 2) * dpr;
    };

    let pointerAngle: number | null = null;
    let proximityT = 0;
    let focused = false;
    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;
    let rafActive = false;
    let inView = true;
    let pageVisible = !document.hidden;

    const renderStatic = () => {
      program.uniforms.uAngle.value = 2.4;
      program.uniforms.uIntensity.value = INTENSITY * 0.55;
      renderer.render({ scene: mesh });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      idleAngle += IDLE_SPEED * dt;
      const steer = pointerAngle != null && proximityT > 0;
      const target = steer ? (pointerAngle as number) : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));

      const brightTarget = Math.max(proximityT, focused ? 0.9 : 0);
      bright += (brightTarget - bright) * (1 - Math.exp(-dt * 8));

      program.uniforms.uAngle.value = angle;
      program.uniforms.uIntensity.value = INTENSITY * bright;
      renderer.render({ scene: mesh });
    };

    const setRunning = () => {
      const shouldRun = inView && pageVisible && !reducedMql.matches;
      if (shouldRun && !rafActive) {
        rafActive = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && rafActive) {
        rafActive = false;
        cancelAnimationFrame(raf);
      }
      if (!rafActive && reducedMql.matches) renderStatic();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (reducedMql.matches) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle =
          Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / PROXIMITY);
      proximityT = t * t * (3 - 2 * t);
    };

    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      setRunning();
    };
    const onReducedChange = () => {
      setRunning();
    };
    const onResize = () => {
      resize();
      if (!rafActive) renderStatic();
    };

    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      setRunning();
    });
    io.observe(el);

    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    resize();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMql.addEventListener("change", onReducedChange);

    setRunning();
    if (reducedMql.matches) renderStatic();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMql.removeEventListener("change", onReducedChange);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const classes = cn(
    "relative m-0 inline-flex cursor-pointer select-none items-center justify-center rounded-[10px] border-none font-medium leading-none tracking-[0.01em] text-foreground no-underline",
    "bg-[linear-gradient(180deg,rgba(16,36,31,0.94),rgba(9,20,19,0.94))]",
    "shadow-[inset_0_1px_0_rgba(176,228,204,0.08),0_10px_30px_rgba(2,9,9,0.45)]",
    "transition-[transform,color] duration-150 hover:text-energy-text active:scale-[0.98]",
    fxFailed && "border border-solid border-line-active",
    disabled && "cursor-not-allowed opacity-55 active:scale-100",
    SIZES[size],
    className,
  );

  const fxLayer = (
    <span
      ref={fxRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-5 z-[1] [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
    />
  );
  const label = <span className="relative z-[2]">{children}</span>;

  const interactionProps = {
    onPointerEnter: () => onEnergizeStart?.(),
    onPointerLeave: () => onEnergizeEnd?.(),
    onFocus: () => onEnergizeStart?.(),
    onBlur: () => onEnergizeEnd?.(),
    onClick,
  };

  if (href) {
    return (
      <a
        ref={(node: HTMLElement | null) => {
          elRef.current = node;
        }}
        href={href}
        className={classes}
        {...interactionProps}
      >
        {fxLayer}
        {label}
      </a>
    );
  }

  return (
    <button
      ref={(node: HTMLElement | null) => {
        elRef.current = node;
      }}
      type={type}
      disabled={disabled}
      className={classes}
      {...interactionProps}
    >
      {fxLayer}
      {label}
    </button>
  );
}
