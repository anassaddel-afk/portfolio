import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = { items: readonly string[]; duration?: number; className?: string };

/** CSS-only marquee. Pauses on hover and stops under reduced motion. */
export function Marquee({ items, duration = 45, className }: MarqueeProps) {
  return (
    <div className={cn("marquee overflow-hidden border-y border-border", className)}>
      <div
        className="marquee-track flex w-max"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap py-5 text-[clamp(1.25rem,2.2vw,2rem)] font-medium tracking-[-0.03em] md:py-6"
              >
                <span className="px-6 md:px-10">{item}</span>
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
