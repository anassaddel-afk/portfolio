"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, pad } from "@/lib/utils";
import { ImageReveal } from "./ImageReveal";
import { Media } from "./Media";
import { useProjectTransition } from "./ProjectTransition";

type ProjectCardProps = { project: Project; index: number };

const frame = {
  right: "aspect-[4/3]",
  left: "aspect-[4/3]",
  full: "aspect-[4/3] md:aspect-[16/8]",
  split: "aspect-[4/3] md:aspect-[4/5]",
} as const;

const sizes = {
  right: "(min-width: 768px) 58vw, 100vw",
  left: "(min-width: 768px) 58vw, 100vw",
  full: "100vw",
  split: "(min-width: 768px) 50vw, 100vw",
} as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { start } = useProjectTransition();
  const href = `/work/${project.slug}`;
  const { layout } = project;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = mediaRef.current;
    if (!el) return;
    e.preventDefault();
    const img = el.querySelector("img");
    start({ href, rect: el.getBoundingClientRect(), src: img?.currentSrc || project.cover.src });
  };

  const media = (
    <div ref={mediaRef} className={cn("relative w-full overflow-hidden", frame[layout])}>
      <ImageReveal className="absolute inset-0">
        <div className="absolute inset-0 bg-surface transition-transform duration-[1100ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
          <Media image={project.cover} sizes={sizes[layout]} />
        </div>
      </ImageReveal>
    </div>
  );

  const meta = (
    <p className="label flex items-baseline justify-between gap-4 text-muted">
      <span className={cn("transition-colors duration-500 group-hover:text-accent", layout === "split" && "md:invisible")}>
        {pad(index)}
      </span>
      <span className="truncate">
        {project.client}
        {project.year ? ` · ${project.year}` : ""}
      </span>
    </p>
  );

  const title = (
    <h3
      className={cn(
        "font-medium transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-1.5",
        layout === "full" ? "text-h2" : "text-h3",
      )}
    >
      {project.display.map((line) => (
        <span key={line} aria-hidden className="block">
          {line}
        </span>
      ))}
      <span className="sr-only">{project.title}</span>
    </h3>
  );

  const tags = (
    <ul className="label flex flex-wrap gap-x-2 gap-y-1 text-muted opacity-70 transition-opacity duration-500 group-hover:opacity-100">
      {project.tags.map((tag, i) => (
        <li key={tag}>
          {tag}
          {i < project.tags.length - 1 ? <span className="pl-2 text-subtle">·</span> : null}
        </li>
      ))}
    </ul>
  );

  const cta = (
    <span className="label inline-flex h-11 items-center gap-3">
      <span className="link-draw group-hover:bg-[length:100%_1px]">View case study</span>
      <ArrowRight
        aria-hidden
        strokeWidth={1.5}
        className="size-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2.5"
      />
    </span>
  );

  const summary = <p className="max-w-[40ch] text-body text-muted">{project.summary}</p>;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative block"
      data-cursor="project"
      data-cursor-label="View project"
    >
      <span aria-hidden className="relative mb-6 block h-px bg-border md:mb-8">
        <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-x-100" />
      </span>

      {layout === "right" || layout === "left" ? (
        <article className="grid gap-y-8 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className={cn("md:col-span-7", layout === "right" ? "md:order-2" : "md:order-1")}>{media}</div>
          <div
            className={cn(
              "flex flex-col gap-6 md:col-span-5 md:justify-between",
              layout === "right" ? "md:order-1" : "md:order-2 md:pl-[calc(var(--gutter)/2)]",
            )}
          >
            {meta}
            <div className="flex flex-col gap-6 md:gap-7">
              {title}
              {summary}
              {tags}
              {cta}
            </div>
          </div>
        </article>
      ) : null}

      {layout === "full" ? (
        <article className="flex flex-col gap-8">
          {media}
          <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-[var(--gutter)]">
            <div className="md:col-span-2">{meta}</div>
            <div className="md:col-span-6">{title}</div>
            <div className="flex flex-col gap-6 md:col-span-4">
              {summary}
              {tags}
              {cta}
            </div>
          </div>
        </article>
      ) : null}

      {layout === "split" ? (
        <article className="grid gap-y-8 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-6">{media}</div>
          <div className="flex flex-col justify-between gap-8 md:col-span-5 md:col-start-8">
            <div className="flex flex-col gap-6">
              {meta}
              <span
                aria-hidden
                className="text-display font-medium text-subtle/60 transition-colors duration-700 group-hover:text-accent"
              >
                {pad(index)}
              </span>
            </div>
            <div className="flex flex-col gap-6 md:gap-7">
              {title}
              {summary}
              {tags}
              {cta}
            </div>
          </div>
        </article>
      ) : null}
    </Link>
  );
}
