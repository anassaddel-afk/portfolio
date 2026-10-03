"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { pad } from "@/lib/utils";
import { useComingSoon } from "./ComingSoon";
import { ImageReveal } from "./ImageReveal";
import { useI18n } from "./LanguageProvider";
import { Media, toneOf } from "./Media";
import { useProjectTransition } from "./ProjectTransition";

type ProjectCardProps = { project: Project; index: number };

const sizes = "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useI18n();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { start } = useProjectTransition();
  const showComingSoon = useComingSoon();
  const available = project.status === "available";
  const href = `/work/${project.slug}`;
  const { cover } = project;
  const ratio = cover.width / cover.height;
  const meta = project.client;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = mediaRef.current;
    if (!el) return;
    e.preventDefault();
    const img = el.querySelector("img");
    start({ href, rect: el.getBoundingClientRect(), src: img?.currentSrc || cover.src, ratio, tone: toneOf(cover) });
  };

  const body = (
    <>
      <div ref={mediaRef} className="relative aspect-[3/2] w-full overflow-hidden" style={{ background: toneOf(cover) }}>
        <ImageReveal className="absolute inset-0">
          <Media image={cover} sizes={sizes} />
        </ImageReveal>
      </div>

      <p className="label mt-5 flex items-baseline justify-between gap-4 text-muted">
        <span className="tabular-nums transition-colors duration-500 group-hover:text-accent">{pad(index)}</span>
        <span className="truncate">{meta}</span>
      </p>

      <h3 className="mt-3 text-h3 font-medium text-pretty transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-1.5">
        {project.display.map((line) => (
          <span key={line} aria-hidden className="block">
            {line}
          </span>
        ))}
        <span className="sr-only">{project.title}</span>
      </h3>
      <p className="label mt-2 text-muted">{project.card.domain}</p>
      <p className="mt-3 max-w-[36ch] text-body text-muted">{project.card.line}</p>

      {available ? (
        <span className="label mt-5 inline-flex h-11 items-center gap-3">
          <span className="link-draw group-hover:bg-[length:100%_1px]">{t.work.viewCaseStudy}</span>
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="size-4 transition-[translate] duration-500 ease-[var(--ease-out)] group-hover:nudge-2.5 rtl:-scale-x-100"
          />
        </span>
      ) : (
        <span className="label mt-5 inline-flex h-11 items-center text-muted transition-colors duration-500 group-hover:text-foreground">
          {t.work.comingSoon}
        </span>
      )}
    </>
  );

  if (!available) {
    return (
      <button
        type="button"
        onClick={showComingSoon}
        className="group relative flex w-full cursor-pointer flex-col text-start"
      >
        {body}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex flex-col"
      data-cursor="project"
      data-cursor-label={t.cursor.viewProject}
    >
      {body}
    </Link>
  );
}
