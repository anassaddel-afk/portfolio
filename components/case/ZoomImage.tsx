"use client";

import { useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageReveal } from "../ImageReveal";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";
import { Lightbox } from "./Lightbox";

export function ZoomImage({ image }: { image: ProjectImage }) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group relative block w-full transition-transform duration-[1100ms] ease-[var(--ease-out)] hover:scale-[1.01]"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        data-cursor="image"
        data-cursor-label={t.cursor.zoom}
        aria-label={`${t.gallery.open}: ${image.alt}`}
      >
        <ImageReveal className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: toneOf(image) }}>
            <Media image={image} sizes="(min-width: 768px) 70vw, 100vw" />
          </div>
        </ImageReveal>
      </button>
      {image.caption ? <figcaption className="mt-4 text-small text-muted">{image.caption}</figcaption> : null}
      <Lightbox images={[image]} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </figure>
  );
}
