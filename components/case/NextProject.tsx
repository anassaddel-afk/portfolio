"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Media } from "../Media";
import { useProjectTransition } from "../ProjectTransition";

export function NextProject({ project }: { project: Project }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { start } = useProjectTransition();
  const href = `/work/${project.slug}`;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !mediaRef.current) return;
    e.preventDefault();
    const img = mediaRef.current.querySelector("img");
    start({ href, rect: mediaRef.current.getBoundingClientRect(), src: img?.currentSrc || project.cover.src });
  };

  return (
    <section className="section-y border-t border-border" aria-label="Next project">
      <div className="container-x">
        <Link
          href={href}
          onClick={onClick}
          className="group grid gap-y-10 md:grid-cols-12 md:items-end md:gap-x-[var(--gutter)]"
          data-cursor="project"
          data-cursor-label="Next"
        >
          <div className="md:col-span-5">
            <p className="label text-muted">Next project</p>
            <h2 className="mt-6 text-h2 font-medium transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-2">
              {project.display.map((line) => (
                <span key={line} aria-hidden className="block">
                  {line}
                </span>
              ))}
              <span className="sr-only">{project.title}</span>
            </h2>
            <span className="label mt-8 inline-flex h-11 items-center gap-3">
              View case study
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="size-4 transition-transform duration-500 group-hover:translate-x-2.5"
              />
            </span>
          </div>
          <div className="md:col-span-7">
            <div ref={mediaRef} className="relative aspect-[16/10] overflow-hidden bg-surface">
              <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
                <Media image={project.cover} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
