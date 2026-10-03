import Image from "next/image";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/locale";
import { ImageReveal } from "./ImageReveal";
import { MagneticButton } from "./MagneticButton";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";
import { ScrollRevealText } from "./ScrollRevealText";
import { TextReveal } from "./TextReveal";

type AboutSectionProps = {
  /** Home hides stats and industries; the About page keeps them. */
  showFacts?: boolean;
};

export async function AboutSection({ showFacts = true }: AboutSectionProps) {
  const { t } = await getDictionary();
  const { about } = t;

  return (
    <section id="about" className="section-y border-t border-border">
      <div className="container-x">
        <p className="label text-muted">{about.label}</p>

        <div className="mt-8 grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-7">
            <TextReveal as="h2" lines={about.greeting} className="text-display font-medium" />

            <div className="mt-8 flex max-w-[42rem] flex-col gap-6 md:mt-10">
              <ScrollRevealText as="p" className="text-lead">
                {about.paragraphs[0]}
              </ScrollRevealText>
              <Reveal>
                <p className="text-body text-muted">{about.paragraphs[1]}</p>
              </Reveal>
            </div>

            <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" delay={0.1}>
              <MagneticButton href={site.links.cv} variant="outline" external>
                {about.downloadCv}
              </MagneticButton>
              <MagneticButton href="/experience" variant="text">
                {about.fullExperience}
              </MagneticButton>
            </Reveal>
          </div>

          <figure className="md:col-span-4 md:col-start-9 md:pt-4">
            <ImageReveal className="relative aspect-[4/5] w-full bg-surface" delay={0.1}>
              <Parallax amount={32} className="absolute inset-0">
                <div className="relative size-full" data-cursor="image" data-cursor-label={t.cursor.hello}>
                  <Image
                    src={site.portrait.src}
                    alt={about.portraitAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-[50%_35%]"
                  />
                </div>
              </Parallax>
            </ImageReveal>
            <figcaption className="label mt-4 flex justify-between text-muted">
              <span>{t.name}</span>
              {showFacts ? <span>{t.role}</span> : null}
            </figcaption>
          </figure>
        </div>

        {showFacts ? (
          <dl className="mt-16 grid gap-8 border-t border-border pt-8 md:mt-20 md:grid-cols-3">
            <div>
              <dt className="label text-muted">{about.regionsLabel}</dt>
              <dd className="mt-3 text-lead">{about.regions.join(" · ")}</dd>
            </div>
            <div>
              <dt className="label text-muted">{about.productsLabel}</dt>
              <dd className="mt-3 text-lead">{about.audiences.join(" · ")}</dd>
            </div>
            <div>
              <dt className="label text-muted">{about.industriesLabel}</dt>
              <dd className="mt-3 text-lead">{about.industries.join(" · ")}</dd>
            </div>
          </dl>
        ) : null}
      </div>
    </section>
  );
}
