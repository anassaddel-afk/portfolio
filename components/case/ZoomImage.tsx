"use client";

import { useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageReveal } from "../ImageReveal";
import { Media } from "../Media";
import { Lightbox } from "./Lightbox";

type ZoomImageProps = { image: ProjectImage; aspect?: string };

export function ZoomImage({ image, aspect }: ZoomImageProps) {
  const [open, setOpen] = useState<number | null>(null);
  const frame = aspect ?? `${image.width}/${image.height}`;

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group relative block w-full overflow-hidden"
        style={{ aspectRatio: frame }}
        data-cursor="image"
        aria-label={`Open image: ${image.alt}`}
      >
        <ImageReveal className="absolute inset-0 bg-surface">
          <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out)] group-hover:scale-[1.02]">
            <Media image={image} aspect={frame} sizes="(min-width: 768px) 70vw, 100vw" />
          </div>
        </ImageReveal>
      </button>
      {image.caption ? <figcaption className="mt-4 text-small text-muted">{image.caption}</figcaption> : null}
      <Lightbox images={[image]} index={open} aspect={frame} onClose={() => setOpen(null)} onIndex={setOpen} />
    </figure>
  );
}
