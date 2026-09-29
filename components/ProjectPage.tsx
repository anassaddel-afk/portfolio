import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { pad } from "@/lib/utils";
import { BlockRenderer } from "./case/Blocks";
import { CaseHero } from "./case/CaseHero";
import { CaseNav, CaseNavMobile } from "./case/CaseNav";
import { NextProject } from "./case/NextProject";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

type ProjectPageProps = { project: Project; next: Project; index: number };

export function ProjectPage({ project, next, index }: ProjectPageProps) {
  const titleLines = project.title.split(/(?<= —) /);
  const meta = [
    { label: "Client", value: project.client },
    project.company ? { label: "Company", value: project.company } : null,
    project.role ? { label: "Role", value: project.role } : null,
    project.year ? { label: "Year", value: project.year } : null,
    project.platform ? { label: "Platform", value: project.platform } : null,
  ].filter((m): m is { label: string; value: string } => m !== null);

  return (
    <article>
      <CaseHero project={project} />

      <header className="container-x pb-[clamp(4rem,8vw,7rem)] pt-8 md:pt-10">
        <div className="label flex items-center justify-between text-muted">
          <Link href="/#work" className="group inline-flex h-11 items-center gap-2 hover:text-foreground">
            <ArrowLeft aria-hidden strokeWidth={1.5} className="size-3.5 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
          <span>
            Case study {pad(index)} / {pad(projects.length)}
          </span>
        </div>

        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.35}
          ariaLabel={project.title}
          lines={titleLines}
          className="mt-8 max-w-[22ch] text-[clamp(2.25rem,5.4vw,5.75rem)] font-medium leading-[0.98] tracking-[var(--tracking-display)] md:mt-12"
        />

        <Reveal className="mt-12 grid gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-[var(--gutter)]" delay={0.5}>
          <div className="md:col-span-6">
            <p className="max-w-[36ch] text-lead">{project.summary}</p>
            <ul className="label mt-6 flex flex-wrap gap-x-3 gap-y-1 text-muted">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {project.liveUrl ? (
              <div className="mt-8">
                <MagneticButton href={project.liveUrl} variant="outline" external>
                  View live product
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
        </Reveal>
      </header>

      <div className="container-x grid grid-cols-1 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <CaseNavMobile sections={project.sections} />
        <aside className="md:col-span-3">
          <CaseNav sections={project.sections} />
        </aside>
        <div className="flex min-w-0 flex-col gap-[clamp(5rem,9vw,8rem)] pb-[var(--section-y)] pt-10 md:col-span-9 md:pt-0">
          {project.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="border-t border-border pt-8 md:pt-10"
            >
              <p className="label flex gap-3 text-muted">
                <span className="text-accent">{pad(i + 1)}</span>
                <span>{section.label}</span>
              </p>
              <h2 id={`${section.id}-title`} className="mt-6 max-w-[22ch] text-h2 font-medium">
                {section.title ?? section.label}
              </h2>
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
