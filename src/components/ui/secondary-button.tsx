import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Deliberately simpler counterpart to the primary Specular Button:
 * a quiet bordered anchor with a directional arrow. No shaders, CSS only.
 */
export function SecondaryButton({
  href,
  children,
  className,
}: SecondaryButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-[10px] border border-line bg-transparent px-[30px] py-[15px] text-[0.95rem] font-medium leading-none text-foreground no-underline",
        "transition-colors duration-300 hover:border-line-active hover:bg-surface-elevated/60",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 text-brand-light transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  );
}
