import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonStudy } from "@/components/ComingSoonStudy";
import { ProjectPage } from "@/components/ProjectPage";
import { getNextProject, getProject, projectCount, projectIndex, projectSlugs } from "@/data/projects";
import { getDictionary } from "@/lib/locale";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getDictionary();
  const project = getProject(slug, locale);
  if (!project) return {};
  if (project.status !== "available") {
    return { title: project.title, description: t.work.comingSoonNote };
  }
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [{ url: project.cover.src, alt: project.cover.alt }] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { locale } = await getDictionary();
  const project = getProject(slug, locale);
  if (!project) notFound();
  if (project.status !== "available") return <ComingSoonStudy project={project} />;

  return (
    <ProjectPage
      project={project}
      next={getNextProject(slug, locale)}
      index={projectIndex(slug)}
      total={projectCount}
    />
  );
}
