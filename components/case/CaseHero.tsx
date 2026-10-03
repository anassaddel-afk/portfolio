"use client";

import Image from "next/image";
import { useCallback } from "react";
import type { Project } from "@/data/projects";
import { caseHeroHeight } from "@/lib/hero";
import { toneOf } from "../Media";
import { useProjectTransition } from "../ProjectTransition";

/** The cover, whole, on a matte in its own edge colour. Geometry is shared with the project transition. */
export function CaseHero({ project }: { project: Project }) {
  const { ready } = useProjectTransition();
  const { cover } = project;

  const imgRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (img?.complete) ready();
    },
    [ready],
  );

  return (
    <div className="container-x pt-[var(--nav-h)]">
      <div
        className="relative overflow-hidden"
        style={{ height: caseHeroHeight(cover.width / cover.height), background: toneOf(cover) }}
      >
        <div className="absolute inset-(--case-hero-pad)">
          <Image
            ref={imgRef}
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="(min-width: 1600px) 1500px, 90vw"
            onLoad={ready}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
