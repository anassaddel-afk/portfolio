"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { pad } from "@/lib/utils";
import { Media, parseAspect } from "../Media";
import { Lightbox } from "./Lightbox";

type DragGalleryProps = { images: ProjectImage[]; aspect?: string };

/** Horizontal gallery: drag with a mouse, swipe on touch, arrow buttons for keyboard. Click opens the lightbox. */
export function DragGallery({ images, aspect = "4/3" }: DragGalleryProps) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(true);
  const ratio = parseAspect(aspect);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
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

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-item]");
    el.scrollBy({ left: dir * ((item?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onScroll={measure}
        className="no-scrollbar -mr-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto pr-[var(--gutter)] md:snap-none"
        data-cursor={scrollable ? "drag" : "image"}
        role="region"
        aria-label="Image gallery"
      >
        {images.map((image, i) => (
          <figure key={i} data-item className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              draggable={false}
              className="group relative block w-[80vw] overflow-hidden bg-surface md:w-[calc(min(60vh,34rem)*var(--r))]"
              style={{ aspectRatio: aspect, "--r": ratio } as React.CSSProperties}
              aria-label={`Open image ${i + 1}: ${image.alt}`}
            >
              <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out)] group-hover:scale-[1.02]">
                <Media image={image} aspect={aspect} sizes="(min-width: 768px) 60vw, 160vw" />
              </div>
            </button>
            {image.caption ? (
              <figcaption className="mt-4 flex max-w-[44ch] gap-3 text-small text-muted">
                <span className="label pt-[0.2em] text-subtle">{pad(i + 1)}</span>
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
              className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, 8)}%` }}
            />
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-full border border-border hover:border-foreground" aria-label="Previous images">
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-full border border-border hover:border-foreground" aria-label="Next images">
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ) : null}

      <Lightbox images={images} index={open} aspect={aspect} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
