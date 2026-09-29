"use client";

import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { clamp } from "@/lib/utils";
import { Media } from "../Media";

type BeforeAfterProps = {
  before?: ProjectImage;
  after: ProjectImage;
  aspect?: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfter({ before, after, aspect = "16/10", beforeLabel = "Before", afterLabel = "After" }: BeforeAfterProps) {
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
        className="relative w-full touch-pan-y select-none overflow-hidden bg-surface"
        style={{ aspectRatio: aspect }}
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
        <Media image={after} aspect={aspect} sizes="(min-width: 768px) 70vw, 100vw" />

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before ? (
            <Media image={before} aspect={aspect} sizes="(min-width: 768px) 70vw, 100vw" />
          ) : (
            <div className="absolute inset-0 flex items-center bg-surface-strong bg-[repeating-linear-gradient(135deg,transparent_0_14px,var(--border)_14px_15px)] p-6 md:p-10">
              <div className="max-w-[26ch]">
                <p className="label text-accent">[Content needed]</p>
                <p className="mt-3 text-lead">Add a screenshot of the previous experience to compare.</p>
              </div>
            </div>
          )}
        </div>

        <span className="label absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">{beforeLabel}</span>
        <span className="label absolute right-4 top-4 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">{afterLabel}</span>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <span className="absolute inset-y-0 -left-px w-0.5 bg-background shadow-[0_0_0_1px_var(--border)]" />
          <span
            role="slider"
            tabIndex={0}
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before`}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-0 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-foreground shadow-lg"
          >
            <ChevronsLeftRight aria-hidden className="size-5" strokeWidth={1.5} />
          </span>
        </div>
      </div>
      <figcaption className="label mt-4 text-muted">Drag to compare</figcaption>
    </figure>
  );
}
