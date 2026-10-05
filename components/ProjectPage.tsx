import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/data/projects";
import { getDictionary } from "@/lib/locale";
import { cn, pad } from "@/lib/utils";
import { BlockRenderer } from "./case/Blocks";
import { CaseHero } from "./case/CaseHero";
import { CaseNav, CaseNavMobile } from "./case/CaseNav";
import { NextProject } from "./case/NextProject";
import { MagneticButton } from "./MagneticButton";
import { ScrollRevealText } from "./ScrollRevealText";
import { TextReveal } from "./TextReveal";

type ProjectPageProps = { project: Project; next: Project; index: number; total: number };

export async function ProjectPage({ project, next, index, total }: ProjectPageProps) {
  const { t } = await getDictionary();
  const labels = t.caseStudy.meta;
  const titleLines = project.title.split(/(?<= —) /);
  const meta = [
    { label: labels.client, value: project.client },
    project.company ? { label: labels.company, value: project.company } : null,
    project.role ? { label: labels.role, value: project.role } : null,
    project.platform ? { label: labels.platform, value: project.platform } : null,
    project.focus ? { label: labels.focus, value: project.focus } : null,
  ].filter((m): m is { label: string; value: string } => m !== null && m.value.trim() !== "");

  return (
    <article>
      <CaseHero project={project} />

      <header className="container-x pb-[var(--space-10)] pt-8 md:pt-10">
        <div className="label flex items-center justify-between text-muted">
          <Link href="/work" className="group inline-flex h-11 items-center gap-2 hover:text-foreground">
            <ArrowLeft aria-hidden strokeWidth={1.5} className="size-3.5 transition-[translate] group-hover:-nudge-1 rtl:-scale-x-100" />
            {t.caseStudy.allWork}
          </Link>
          <span>
            {t.caseStudy.caseStudy}{" "}
            <span className="tabular-nums">
              {pad(index)} / {pad(total)}
            </span>
          </span>
        </div>

        {project.kicker ? <p className="label mt-8 text-muted">{project.kicker}</p> : null}
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.35}
          ariaLabel={project.title}
          lines={titleLines}
          className={cn(
            "max-w-[18ch] text-[clamp(2.25rem,5.4vw,5.75rem)] font-medium leading-(--lh-h1) tracking-(--tracking-display)",
            project.kicker ? "mt-4" : "mt-8",
          )}
        />

        <div className="mt-8 grid gap-y-10 md:mt-12 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-6">
            <ScrollRevealText as="p" className="max-w-[36ch] text-lead">
              {project.summary}
            </ScrollRevealText>
            <ul className="label mt-6 flex flex-wrap gap-x-3 gap-y-1 text-muted">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {project.liveUrl ? (
              <div className="mt-8">
                <MagneticButton href={project.liveUrl} variant="outline" external>
                  {t.caseStudy.viewLive}
                </MagneticButton>
              </div>
            ) : null}
          </div>
          <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6 md:col-span-5 md:col-start-8">
            {meta.map((m) => (
              <div key={m.label} className="border-t border-border pt-3">
                <dt className="label text-muted">{m.label}</dt>
                <dd className="mt-2 text-body">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-x grid grid-cols-1 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <CaseNavMobile sections={project.sections} />
        <aside className="md:col-span-3">
          <CaseNav sections={project.sections} />
        </aside>
        <div className="flex min-w-0 flex-col gap-[var(--space-10)] pb-[var(--section-y)] pt-10 md:col-span-9 md:gap-[var(--space-11)] md:pt-0">
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="border-t border-border pt-8 md:pt-10"
            >
              <p className="label flex gap-3 text-muted">
                <span className="tabular-nums text-accent">{pad(i + 1)}</span>
                <span>{section.label}</span>
              </p>
              <ScrollRevealText
                as="h2"
                id={`${section.id}-title`}
                className="mt-6 max-w-[22ch] text-h2 font-medium"
              >
                {section.title ?? section.label}
              </ScrollRevealText>
              <div className="mt-10 flex flex-col gap-12 md:mt-14 md:gap-16">
                {section.blocks.map((block, b) => (
                  <BlockRenderer key={b} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <NextProject project={next} />
    </article>
  );
}
