"use client";

import Image from "next/image";
import { useCallback } from "react";
import type { Project } from "@/data/projects";
import { useProjectTransition } from "../ProjectTransition";

/** Geometry must match measureHeroRect() in ProjectTransition: top = --nav-h, height = --case-hero-h. */
export function CaseHero({ project }: { project: Project }) {
  const { ready } = useProjectTransition();

  const imgRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (img?.complete) ready();
    },
    [ready],
  );

  return (
    <div className="container-x pt-[var(--nav-h)]">
      <div className="relative h-[var(--case-hero-h)] overflow-hidden bg-surface">
        <Image
          ref={imgRef}
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          onLoad={ready}
          className="object-cover"
        />
      </div>
    </div>
  );
}
