import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MagneticButton } from "@/components/MagneticButton";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { products, toolbox } from "@/data/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "A professional timeline and selected products designed by Anas Adel.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro label="(Timeline) — Experience" title={["Experience"]}>
        I&apos;ve spent my career turning complex product problems into simple, useful experiences across loyalty,
        payments and growth — for consumer and B2B products.
        <div className="mt-8">
          <MagneticButton href={site.links.cv} variant="outline" external>
            Download CV
          </MagneticButton>
        </div>
      </PageIntro>

      <ExperienceSection index="01" showLink={false} id="timeline" />

      <section className="section-y border-t border-border" aria-label="Shipped products">
        <div className="container-x">
          <SectionHeader index="02" label="Products" title={["Shipped products"]} />
          <ul className="mt-[clamp(3rem,6vw,5rem)] grid md:grid-cols-2 md:gap-x-[var(--gutter)]">
            {products.map((p) => {
              const inner = (
                <>
                  <span>
                    <span className="block text-h3 font-medium transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-1.5">
                      {p.name}
                    </span>
                    <span className="label mt-2 block text-muted">
                      {p.context} · {p.year}
                    </span>
                  </span>
                  {p.href ? (
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  ) : null}
                </>
              );
              return (
                <Reveal as="li" key={p.name} className="border-t border-border">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-6 py-6"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-start justify-between gap-6 py-6">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-y border-t border-border" aria-label="Toolbox">
        <div className="container-x">
          <SectionHeader index="03" label="Toolbox" title={["My toolbox"]} />
          <Reveal>
            <p className="mt-6 max-w-[40ch] text-lead text-muted">
              Tools and systems I use to turn ideas into shipped products.
            </p>
            <ul className="mt-12 flex flex-wrap gap-x-[0.4em] gap-y-2 text-h3 font-medium">
              {toolbox.map((tool, i) => (
                <li key={tool} className="flex gap-x-[0.4em]">
                  <span className="transition-colors duration-300 hover:text-accent">{tool}</span>
                  {i < toolbox.length - 1 ? (
                    <span aria-hidden className="text-subtle">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
