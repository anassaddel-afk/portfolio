"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Focus, ProjectImage, StoryStep } from "@/data/projects";
import { EASE_OUT, cn, pad } from "@/lib/utils";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";
import { Lightbox } from "./Lightbox";

const WHOLE: Focus = { x: 0, y: 0, w: 1, h: 1 };

const rect = (f: Focus = WHOLE) => ({
  left: `${f.x * 100}%`,
  top: `${f.y * 100}%`,
  width: `${f.w * 100}%`,
  height: `${f.h * 100}%`,
});

/** Dims everything outside the focus area. The image itself is never cropped. */
function Spotlight({ focus, animated }: { focus?: Focus; animated: boolean }) {
  const reduce = useReducedMotion();
  const active = focus && (focus.w < 1 || focus.h < 1);
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute rounded-[var(--radius-md)] ring-1 ring-white/70"
      style={{ boxShadow: "0 0 0 100vmax rgb(10 10 9 / 0.5)" }}
      initial={false}
      animate={{ ...rect(focus), opacity: active ? 1 : 0 }}
      transition={animated && !reduce ? { duration: 0.8, ease: EASE_OUT } : { duration: 0 }}
    />
  );
}

/** Frame at the image's natural ratio, so the whole image always fits. */
function Frame({ image, className, style, children }: { image: ProjectImage; className?: string; style?: CSSProperties; children: React.ReactNode }) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${image.width} / ${image.height}`, background: toneOf(image), ...style }}
    >
      {children}
    </div>
  );
}

/** Text scrolls while the image stays pinned and the spotlight follows the active step. Stacks on mobile. */
export function StickyStory({ steps }: { steps: StoryStep[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const images = steps.reduce<ProjectImage[]>((list, s) => (list.some((i) => i.src === s.image.src) ? list : [...list, s.image]), []);
  const imageIndex = (step: number) => images.findIndex((i) => i.src === steps[step].image.src);
  const current = steps[active];
  const ratio = current.image.width / current.image.height;

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
    <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-[var(--gutter)]">
      <div className="flex flex-col gap-16 md:col-span-5 md:gap-0">
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
            <button
              type="button"
              onClick={() => setOpen(imageIndex(i))}
              className="mb-8 block w-full md:hidden"
              aria-label={`${t.gallery.open}: ${step.image.alt}`}
            >
              <Frame image={step.image}>
                <Media image={step.image} sizes="100vw" />
                <Spotlight focus={step.focus} animated={false} />
              </Frame>
            </button>
            <p className="label text-accent">
              {t.caseStudy.step} <span className="tabular-nums">{pad(i + 1)}</span>
            </p>
            <h3 className="mt-4 text-h3 font-medium">{step.title}</h3>
            <p className="mt-4 max-w-[44ch] text-body text-muted">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:col-span-7 md:block">
        <div className="sticky top-[calc(var(--nav-h)+2rem)] flex h-[calc(100svh-var(--nav-h)-4rem)] items-center justify-center">
          <div className="flex flex-col gap-4" style={{ width: `min(100%, calc((100svh - var(--nav-h) - 8rem) * ${ratio}))` }}>
            <button
              type="button"
              onClick={() => setOpen(imageIndex(active))}
              className="block w-full"
              aria-label={`${t.gallery.open}: ${current.image.alt}`}
              data-cursor="image"
              data-cursor-label={t.cursor.zoom}
            >
              <Frame image={current.image}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.image.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <Media image={current.image} sizes="(min-width: 768px) 55vw, 100vw" />
                  </motion.div>
                </AnimatePresence>
                <Spotlight focus={current.focus} animated />
              </Frame>
            </button>
            <ol aria-hidden className="flex gap-1.5">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn("h-1 rounded-full bg-foreground transition-all duration-500", active === i ? "w-6 opacity-100" : "w-1.5 opacity-30")}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
