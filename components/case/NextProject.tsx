"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useComingSoon } from "../ComingSoon";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";
import { useProjectTransition } from "../ProjectTransition";

export function NextProject({ project }: { project: Project }) {
  const { t } = useI18n();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { start } = useProjectTransition();
  const showComingSoon = useComingSoon();
  const available = project.status === "available";
  const href = `/work/${project.slug}`;
  const { cover } = project;
  const ratio = cover.width / cover.height;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !mediaRef.current) return;
    e.preventDefault();
    const img = mediaRef.current.querySelector("img");
    start({ href, rect: mediaRef.current.getBoundingClientRect(), src: img?.currentSrc || cover.src, ratio, tone: toneOf(cover) });
  };

  const body = (
    <>
      <div className="md:col-span-5">
        <p className="label text-muted">{t.caseStudy.nextProject}</p>
        <h2 className="mt-6 text-h2 font-medium transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-2">
          {project.display.map((line) => (
            <span key={line} aria-hidden className="block">
              {line}
            </span>
          ))}
          <span className="sr-only">{project.title}</span>
        </h2>
        {available ? (
          <span className="label mt-8 inline-flex h-11 items-center gap-3">
            {t.caseStudy.viewCaseStudy}
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="size-4 transition-[translate] duration-500 group-hover:nudge-2.5 rtl:-scale-x-100"
            />
          </span>
        ) : (
          <span className="label mt-8 inline-flex h-11 items-center text-muted transition-colors duration-500 group-hover:text-foreground">
            {t.work.comingSoon}
          </span>
        )}
      </div>
      <div className="md:col-span-7">
        <div
          ref={mediaRef}
          className="relative aspect-(--ratio) transition-transform duration-[1100ms] ease-[var(--ease-out)] group-hover:scale-[1.02]"
          style={{ "--ratio": ratio, background: toneOf(cover) } as CSSProperties}
        >
          <Media image={cover} sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
      </div>
    </>
  );

  const className = "group grid w-full cursor-pointer gap-y-10 text-start md:grid-cols-12 md:items-end md:gap-x-[var(--gutter)]";

  return (
    <section className="section-y border-t border-border" aria-label={t.caseStudy.nextProject}>
      <div className="container-x">
        {available ? (
          <Link href={href} onClick={onClick} className={className} data-cursor="project" data-cursor-label={t.cursor.next}>
            {body}
          </Link>
        ) : (
          <button
            type="button"
            onClick={showComingSoon}
            className={className}
          >
            {body}
          </button>
        )}
      </div>
    </section>
  );
}
