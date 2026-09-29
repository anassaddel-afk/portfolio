"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectImage } from "@/data/projects";
import { EASE_OUT, cn, pad } from "@/lib/utils";
import { Media, parseAspect } from "../Media";

type Step = { title: string; body: string; image: ProjectImage };
type StickyStoryProps = { steps: Step[]; aspect?: string };

/** Text scrolls while the image stays pinned and swaps to match the active step. Stacks on mobile. */
export function StickyStory({ steps, aspect = "3/4" }: StickyStoryProps) {
  const [active, setActive] = useState(0);
  const ratio = parseAspect(aspect);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-y-16 md:grid-cols-2 md:gap-x-[var(--gutter)]">
      <div className="flex flex-col gap-16 md:gap-0">
        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            className={cn(
              "flex flex-col justify-center transition-opacity duration-500 md:min-h-[72svh]",
              active === i ? "md:opacity-100" : "md:opacity-30",
            )}
          >
            <div className="relative mb-8 w-full overflow-hidden bg-surface md:hidden" style={{ aspectRatio: aspect }}>
              <Media image={step.image} aspect={aspect} sizes="160vw" />
            </div>
            <p className="label text-accent">Step {pad(i + 1)}</p>
            <h3 className="mt-4 text-h3 font-medium">{step.title}</h3>
            <p className="mt-4 max-w-[44ch] text-body text-muted">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="sticky top-[calc(var(--nav-h)+2rem)] flex h-[calc(100svh-var(--nav-h)-4rem)] items-center justify-center">
          <div
            className="relative overflow-hidden bg-surface"
            style={{
              aspectRatio: aspect,
              width: `min(100%, ${44 * ratio}rem, calc((100svh - var(--nav-h) - 4rem) * ${ratio}))`,
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                <Media image={steps[active].image} aspect={aspect} sizes="(min-width: 768px) 60vw, 100vw" />
              </motion.div>
            </AnimatePresence>
            <ol aria-hidden className="absolute bottom-4 left-4 flex gap-1.5">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "h-1 rounded-full bg-foreground transition-all duration-500",
                    active === i ? "w-6 opacity-100" : "w-1.5 opacity-30",
                  )}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
