"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { pad } from "@/lib/utils";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";
import { Lightbox } from "./Lightbox";

/** Horizontal gallery: drag with a mouse, swipe on touch, arrow buttons for keyboard. Click opens the lightbox. */
export function DragGallery({ images }: { images: ProjectImage[] }) {
  const { t, dir } = useI18n();
  const rtl = dir === "rtl";
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    // scrollLeft runs from 0 to a negative value in RTL.
    setProgress(max > 0 ? Math.abs(el.scrollLeft) / max : 0);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, startX: e.clientX, scroll: track.current.scrollLeft, moved: false };

    const onMove = (ev: PointerEvent) => {
      if (!drag.current.active || !track.current) return;
      const dx = ev.clientX - drag.current.startX;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      track.current.scrollLeft = drag.current.scroll - dx;
    };
    const onUp = () => {
      drag.current.active = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  /** Moves one item forward (1) or back (-1) in reading direction. */
  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-item]");
    el.scrollBy({ left: direction * (rtl ? -1 : 1) * ((item?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onScroll={measure}
        className="no-scrollbar -me-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto pe-[var(--gutter)] md:snap-none"
        data-cursor={scrollable ? "drag" : "image"}
        role="region"
        aria-label={t.gallery.label}
      >
        {images.map((image, i) => (
          <figure key={i} data-item className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              draggable={false}
              className="group relative block w-[80vw] overflow-hidden md:w-[calc(min(60vh,34rem)*var(--r))]"
              style={{ aspectRatio: `${image.width} / ${image.height}`, "--r": image.width / image.height, background: toneOf(image) } as CSSProperties}
              aria-label={`${t.gallery.open} ${i + 1}: ${image.alt}`}
            >
              <Media image={image} sizes="(min-width: 768px) 60vw, 100vw" />
            </button>
            {image.caption ? (
              <figcaption className="mt-4 flex max-w-[44ch] gap-3 text-small text-muted">
                <span className="label pt-[0.2em] tabular-nums text-subtle">{pad(i + 1)}</span>
                <span>{image.caption}</span>
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {scrollable ? (
        <div className="mt-8 flex items-center gap-6">
          <div aria-hidden className="relative h-px flex-1 bg-border">
            <span
              className="absolute inset-y-0 start-0 bg-foreground transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, 8)}%` }}
            />
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => step(-1)}
              className="grid size-11 place-items-center rounded-full border border-border hover:border-foreground"
              aria-label={t.gallery.previous}
            >
              <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="grid size-11 place-items-center rounded-full border border-border hover:border-foreground"
              aria-label={t.gallery.next}
            >
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ) : null}

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
