import { ArrowUp } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background-deep">
      <div className="container-page pb-10 pt-16 md:pb-12 md:pt-24">
        {/* Brand row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
          <p className="flex items-baseline gap-3">
            <span className="font-mono text-lg font-semibold leading-none tracking-tight text-foreground">
              DG<span className="text-brand-light">_</span>
            </span>
            <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-foreground/90">
              The Developer Games
            </span>
          </p>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            A skills-first hiring experience.
          </p>
        </div>

        {/* Index + contact */}
        <div className="mt-14 grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-2 md:mt-16">
          <nav aria-label="Footer">
            <p className="tech-label">Index</p>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="tech-label">Contact</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Questions about the games or the process? Write to us.
            </p>
            <a
              href="mailto:contact@accidentpayments.com"
              className="mt-2 inline-block text-sm text-foreground underline decoration-line-active underline-offset-4 transition-colors hover:decoration-brand-light motion-reduce:transition-none"
            >
              contact@accidentpayments.com
            </a>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-20">
          <p className="tech-label">&copy; 2026 The Developer Games</p>
          <p className="tech-label">Season 01</p>
          <a
            href="#home"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground motion-reduce:transition-none"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
