"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { EASE_OUT, cn, pad } from "@/lib/utils";
import { useComingSoon } from "./ComingSoon";
import { useI18n } from "./LanguageProvider";
import { toneOf } from "./Media";

/** Editorial index of all projects. On fine pointers, a preview image follows the cursor. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const { t } = useI18n();
  const showComingSoon = useComingSoon();
  const [hovered, setHovered] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 34, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 34, mass: 0.6 });

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const preview = hovered !== null ? projects[hovered]?.cover : undefined;

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ol className="border-b border-border">
        {projects.map((p, i) => {
          const available = p.status === "available";
          const meta = p.client;
          const className = cn(
            "group grid w-full cursor-pointer grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 py-6 text-start transition-opacity duration-500 md:grid-cols-12 md:gap-x-[var(--gutter)] md:py-9",
            hovered !== null && hovered !== i && "md:opacity-35",
          );
          const body = (
            <>
              <div className="relative row-span-2 aspect-square overflow-hidden md:hidden" style={{ background: toneOf(p.cover) }}>
                <Image src={p.cover.src} alt="" fill sizes="72px" className="object-contain" />
              </div>
              <span className="label hidden tabular-nums text-muted transition-colors group-hover:text-accent md:col-span-1 md:block">
                {pad(i + 1)}
              </span>
              <h2 className="text-[clamp(1.25rem,2.6vw,2.5rem)] font-medium leading-(--lh-h3) tracking-(--tracking-heading) transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-2 md:col-span-4">
                {p.title}
                <span className="label mt-2 block font-normal text-muted">{p.card.domain}</span>
                {available ? null : <span className="label mt-2 block font-normal text-muted md:hidden">{t.work.comingSoon}</span>}
              </h2>
              <p className="max-w-[36ch] text-body text-muted md:col-span-5">{p.card.line}</p>
              <span className="label hidden items-center justify-end gap-3 text-muted md:col-span-2 md:flex">
                <span className="truncate">{meta}</span>
                {available ? (
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-4 -nudge-2 opacity-0 transition-[translate,opacity] duration-500 group-hover:nudge-0 group-hover:opacity-100 rtl:-scale-x-100"
                  />
                ) : (
                  <span>{t.work.comingSoon}</span>
                )}
              </span>
            </>
          );
          const hover = {
            onPointerEnter: () => setHovered(i),
            onFocus: () => setHovered(i),
            onBlur: () => setHovered(null),
          };

          return (
            <li key={p.slug} className="border-t border-border">
              {available ? (
                <Link href={`/work/${p.slug}`} className={className} data-cursor="project" data-cursor-label={t.cursor.view} {...hover}>
                  {body}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={showComingSoon}
                  className={className}
                  {...hover}
                >
                  {body}
                </button>
              )}
            </li>
          );
        })}
      </ol>

      {fine ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {preview ? (
              <motion.div
                key={hovered}
                className="absolute start-6 top-0 w-[22rem] -translate-y-1/2 overflow-hidden shadow-2xl"
                style={{ aspectRatio: `${preview.width} / ${preview.height}`, background: toneOf(preview) }}
                initial={{ opacity: 0, scale: 0.9, clipPath: "inset(12% 12% 12% 12%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Image src={preview.src} alt="" fill sizes="352px" className="object-contain" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
