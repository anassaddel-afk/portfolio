"use client";

import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { clamp } from "@/lib/utils";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";

/**
 * Comparison slider. It stays left-to-right in both languages: "before" on the left, like the screens themselves.
 * Both images are contained in a frame at the "after" image's ratio.
 */
export function BeforeAfter({ before, after }: { before: ProjectImage; after: ProjectImage }) {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(clamp(((clientX - r.left) / r.width) * 100, 0, 100));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, PageDown: -20, PageUp: 20 };
    if (e.key in map) {
      e.preventDefault();
      setPos((p) => clamp(p + map[e.key], 0, 100));
    } else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
  };

  return (
    <figure>
      <div
        ref={ref}
        dir="ltr"
        className="relative w-full touch-pan-y select-none overflow-hidden"
        style={{ aspectRatio: `${after.width} / ${after.height}`, background: toneOf(after) }}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        data-cursor="drag"
      >
        <Media image={after} sizes="(min-width: 768px) 70vw, 100vw" />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, background: toneOf(before) }}>
          <Media image={before} sizes="(min-width: 768px) 70vw, 100vw" />
        </div>

        <span className="label absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">{t.beforeAfter.before}</span>
        <span className="label absolute right-4 top-4 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">{t.beforeAfter.after}</span>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <span className="absolute inset-y-0 -left-px w-0.5 bg-background shadow-[0_0_0_1px_var(--border)]" />
          <span
            role="slider"
            tabIndex={0}
            aria-label={t.beforeAfter.compare}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}${t.beforeAfter.valueText}`}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-0 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-lg"
          >
            <ChevronsLeftRight aria-hidden className="size-5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
      <figcaption className="label mt-4 text-muted">{t.beforeAfter.drag}</figcaption>
    </figure>
  );
}
