import { projects } from "@/data/projects";
import { pad } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function WorkSection() {
  return (
    <section id="work" className="section-y">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="Selected work"
          title={["Selected work"]}
          aside={
            <Reveal>
              <p className="text-lead text-muted">
                A selection of products, systems and experiences I&apos;ve designed across B2B, B2C and SaaS.
              </p>
              <p className="label mt-6 text-muted">{pad(projects.length)} Projects</p>
            </Reveal>
          }
        />

        <div className="mt-[clamp(4rem,9vw,8rem)] flex flex-col gap-[clamp(5rem,11vw,10rem)]">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>

        <div className="mt-[clamp(5rem,10vw,8rem)] flex justify-center">
          <MagneticButton href="/work" variant="outline">
            Index of all work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
