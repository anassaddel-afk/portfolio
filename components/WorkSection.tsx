import { getProjects } from "@/data/projects";
import { getDictionary } from "@/lib/locale";
import { MagneticButton } from "./MagneticButton";
import { ProjectCard } from "./ProjectCard";
import { TextReveal } from "./TextReveal";

export async function WorkSection() {
  const { locale, t } = await getDictionary();
  const projects = getProjects(locale);

  return (
    <section id="work" className="pb-[var(--section-y)] pt-12 md:pt-16 lg:pt-20">
      <div className="container-x">
        <div>
          <TextReveal as="h2" lines={t.work.title} className="text-h1 font-medium" />
        </div>

        <div data-safe className="mt-10 grid grid-cols-1 gap-x-[var(--gutter)] gap-y-10 md:mt-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticButton href="/work" variant="outline">
            {t.work.indexCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
