import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data/projects";
import { getDictionary } from "@/lib/locale";
import { Media, toneOf } from "./Media";

/** Direct visits to an unpublished case study. The write-up stays in the project data. */
export async function ComingSoonStudy({ project }: { project: Project }) {
  const { t } = await getDictionary();
  const { cover } = project;

  return (
    <article>
      <header className="container-x pb-[var(--space-8)] pt-[calc(var(--nav-h)+var(--space-8))] md:pb-[var(--space-10)] md:pt-[calc(var(--nav-h)+var(--space-10))]">
        <Link href="/#work" className="group inline-flex h-11 items-center gap-2 text-muted hover:text-foreground">
          <ArrowLeft aria-hidden strokeWidth={1.5} className="size-3.5 transition-[translate] group-hover:-nudge-1 rtl:-scale-x-100" />
          {t.caseStudy.allWork}
        </Link>
        <p className="label mt-10 text-muted">{t.work.comingSoon}</p>
        <h1 className="mt-4 max-w-[18ch] text-h1 font-medium text-pretty">{project.title}</h1>
        <p className="mt-6 max-w-[36ch] text-lead text-muted">{t.work.comingSoonNote}</p>
      </header>
      <div className="container-x pb-[var(--section-y)]">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${cover.width} / ${cover.height}`, background: toneOf(cover) }}
        >
          <Media image={cover} sizes="(min-width: 1024px) 80rem, 100vw" priority />
        </div>
      </div>
    </article>
  );
}
