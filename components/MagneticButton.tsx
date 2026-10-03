"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "hero" | "outline" | "text";
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const styles = {
  solid: "h-12 px-6 rounded-full bg-accent-fill text-accent-foreground hover:bg-accent-hover",
  hero: "cta-hero h-12 px-6 rounded-full",
  outline: "h-12 px-6 rounded-full border border-border-strong hover:border-accent hover:text-accent",
  text: "h-11 px-1",
};

export function MagneticButton({ href, children, variant = "solid", external, className, onClick }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const isExternal = external || href.startsWith("mailto:") || href.startsWith("http");

  const content = (
    <>
      <span className="label text-(length:--fs-button)">{children}</span>
      <Icon
        aria-hidden
        className={cn(
          "size-4 transition-[translate] duration-[var(--duration-medium)] ease-[var(--ease-out)] rtl:-scale-x-100",
          external ? "group-hover:-translate-y-0.5 group-hover:nudge-0.5" : "group-hover:nudge-1.5",
        )}
        strokeWidth={1.5}
      />
    </>
  );

  const cls = cn(
    "group inline-flex items-center gap-3 whitespace-nowrap transition-colors duration-[var(--duration-medium)] ease-[var(--ease-out)]",
    styles[variant],
    variant === "text" && "link-draw",
    className,
  );

  return (
    <Magnetic>
      {isExternal ? (
        <a
          href={href}
          className={cls}
          onClick={onClick}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={cls} onClick={onClick}>
          {content}
        </Link>
      )}
    </Magnetic>
  );
}
