"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;
const MOBILE_PANEL_ID = "dg-mobile-nav";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolledRef = useRef(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  /* Scrolled state — passive listener, setState only on threshold cross. */
  useEffect(() => {
    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Active section — the band around the viewport middle decides. */
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.sectionId),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        let next: string | null = null;
        for (const link of NAV_LINKS) {
          if (intersecting.has(link.sectionId)) next = link.sectionId;
        }
        setActiveSection(next);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Collapse the mobile panel if the viewport grows past md. */
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mql.matches) setMenuOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  /* Open menu: scroll lock, initial focus, Escape, Tab containment. */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const root = rootRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      } else if (
        !(current instanceof HTMLElement) ||
        !focusables.includes(current)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-40">
      {/* Top bar */}
      <div
        className={cn(
          "relative z-10 h-[var(--nav-height)] border-b transition-colors duration-300 motion-reduce:transition-none",
          scrolled
            ? "border-line bg-background/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-5">
          <a
            href="#home"
            aria-label="The Developer Games — home"
            onClick={closeMenu}
            className="flex shrink-0 items-baseline gap-3"
          >
            <span className="font-mono text-lg font-semibold leading-none tracking-tight text-foreground">
              DG<span className="text-energy">_</span>
            </span>
            <span className="hidden font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-foreground/90 lg:inline">
              The Developer Games
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.sectionId}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-block py-1 text-sm transition-colors motion-reduce:transition-none",
                        isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-energy transition-[transform,opacity] duration-300 motion-reduce:transition-none",
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4 xl:gap-6">
            <span className="hidden items-center gap-2.5 xl:flex">
              <span className="status-dot" aria-hidden="true" />
              <span className="tech-label">Season 01</span>
            </span>

            <a
              href="#apply"
              className="hidden rounded-[8px] border border-line-active bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-energy/40 hover:text-energy-text motion-reduce:transition-none md:inline-block"
            >
              Enter the Games
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_PANEL_ID}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="inline-flex size-10 items-center justify-center rounded-md border border-line text-foreground transition-colors hover:border-line-active motion-reduce:transition-none md:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id={MOBILE_PANEL_ID}
        className={cn(
          "fixed inset-0 z-0 overflow-y-auto bg-background-deep/95 backdrop-blur md:hidden",
          prefersReducedMotion
            ? "transition-none"
            : "transition-[opacity,visibility] duration-300 ease-out",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-[calc(var(--nav-height)+2.5rem)]">
          <nav aria-label="Primary">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, index) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.sectionId}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="font-mono text-xs text-brand-light">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[clamp(2rem,9vw,2.9rem)] font-medium leading-none tracking-[-0.02em] transition-colors motion-reduce:transition-none",
                          isActive
                            ? "text-foreground"
                            : "text-muted group-hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </span>
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 self-center rounded-full bg-energy"
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-6 border-t border-line pt-8">
            <p className="flex items-center gap-2.5">
              <span className="status-dot" aria-hidden="true" />
              <span className="tech-label">Season 01</span>
            </p>
            <a
              href="#apply"
              onClick={closeMenu}
              className="inline-block w-fit rounded-[8px] border border-line-active bg-surface-elevated px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-energy/40 hover:text-energy-text motion-reduce:transition-none"
            >
              Enter the Games
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
