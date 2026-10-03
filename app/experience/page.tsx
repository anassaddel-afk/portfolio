import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { CuriousAsk } from "@/components/CuriousAsk";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MagneticButton } from "@/components/MagneticButton";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ToolboxList } from "@/components/Toolbox";
import { getExperience } from "@/data/experience";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.experiencePage.metaTitle, description: t.experiencePage.metaDescription };
}

export default async function ExperiencePage() {
  const { locale, t } = await getDictionary();
  const { products, toolbox } = getExperience(locale);
  const page = t.experiencePage;

  return (
    <>
      <PageIntro label={page.label} title={page.title}>
        {t.experience.intro}
        <div className="mt-8">
          <MagneticButton href={site.links.cv} variant="outline" external>
            {t.about.downloadCv}
          </MagneticButton>
        </div>
      </PageIntro>

      <ExperienceSection index="01" showLink={false} id="timeline" />

      <section className="section-y border-t border-border" aria-label={page.productsTitle.join(" ")}>
        <div className="container-x">
          <SectionHeader index="02" label={page.productsLabel} title={page.productsTitle} />
          <ul className="mt-12 grid md:mt-16 md:grid-cols-2 md:gap-x-[var(--gutter)]">
            {products.map((p) => {
              const inner = (
                <>
                  <span>
                    <span className="block text-h3 font-medium transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-1.5">
                      {p.name}
                    </span>
                    <span className="label mt-2 block text-muted">
                      {p.context} · <span className="tabular-nums">{p.year}</span>
                    </span>
                  </span>
                  {p.href ? (
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-5 shrink-0 transition-[translate] group-hover:-translate-y-0.5 group-hover:nudge-0.5 rtl:-scale-x-100"
                    />
                  ) : null}
                </>
              );
              return (
                <Reveal as="li" key={p.name} className="border-t border-border">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-6">
                      {inner}
                      <span className="sr-only">{t.experience.opensNewTab}</span>
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

      <section className="section-y border-t border-border" aria-label={page.toolboxLabel}>
        <div className="container-x">
          <SectionHeader index="03" label={page.toolboxLabel} title={page.toolboxTitle} />
          <Reveal>
            <p className="mt-6 max-w-[40ch] text-lead text-muted">{page.toolboxIntro}</p>
            <ToolboxList tools={toolbox} />
          </Reveal>
        </div>
      </section>

      <CuriousAsk />

      <ContactSection />
    </>
  );
}
