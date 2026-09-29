import Image from "next/image";
import { site } from "@/data/site";
import { Counter } from "./Counter";
import { ImageReveal } from "./ImageReveal";
import { MagneticButton } from "./MagneticButton";
import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function AboutSection() {
  const { about } = site;

  return (
    <section id="about" className="section-y border-t border-border">
      <div className="container-x">
        <p className="label flex gap-3 text-muted">
          <span className="text-accent">(02)</span>
          <span>About</span>
        </p>

        <div className="mt-8 grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-7">
            <TextReveal as="h2" lines={[...about.greeting]} className="text-display font-medium" />

            <Reveal className="mt-12 flex max-w-[56ch] flex-col gap-6 md:mt-16">
              <p className="text-lead">{about.paragraphs[0]}</p>
              <p className="text-body text-muted">{about.paragraphs[1]}</p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" delay={0.1}>
              <MagneticButton href={site.links.cv} variant="outline" external>
                Download CV
              </MagneticButton>
              <MagneticButton href="/experience" variant="text">
                Full experience
              </MagneticButton>
            </Reveal>
          </div>

          <figure className="md:col-span-4 md:col-start-9 md:pt-4">
            <ImageReveal className="relative aspect-[4/5] w-full bg-surface" delay={0.1}>
              <Parallax amount={32} className="absolute inset-0">
                <div className="relative size-full" data-cursor="image" data-cursor-label="Hello">
                  <Image
                    src={about.portrait.src}
                    alt={about.portrait.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-[50%_35%]"
                  />
                </div>
              </Parallax>
            </ImageReveal>
            <figcaption className="label mt-4 flex justify-between text-muted">
              <span>{site.name}</span>
              <span>{site.role}</span>
            </figcaption>
          </figure>
        </div>

        <dl className="mt-[clamp(5rem,9vw,8rem)] grid grid-cols-2 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-4">
          {about.stats.map((stat) => (
            <Reveal key={stat.label} className="border-t border-border pt-5">
              <dt className="label text-muted">{stat.label}</dt>
              <dd className="mt-6 text-h1 font-medium">
                <Counter value={stat.value} suffix={stat.suffix} pad={"pad" in stat && stat.pad} />
              </dd>
            </Reveal>
          ))}
          <Reveal className="border-t border-border pt-5" delay={0.05}>
            <dt className="label text-muted">Regions</dt>
            <dd className="mt-6 flex h-[var(--fs-h1)] items-end text-h3 font-medium">{about.regions.join(" · ")}</dd>
          </Reveal>
          <Reveal className="border-t border-border pt-5" delay={0.1}>
            <dt className="label text-muted">Products</dt>
            <dd className="mt-6 flex h-[var(--fs-h1)] items-end text-h3 font-medium">{about.audiences.join(" · ")}</dd>
          </Reveal>
        </dl>

        <Reveal className="mt-16 border-t border-border pt-5 md:mt-20">
          <p className="label text-muted">Industries</p>
          <ul className="mt-6 flex flex-wrap items-baseline gap-x-[0.35em] text-h2 font-medium">
            {about.industries.map((industry, i) => (
              <li key={industry} className="flex items-baseline gap-x-[0.35em]">
                <span className="transition-colors duration-300 hover:text-accent">{industry}</span>
                {i < about.industries.length - 1 ? (
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
  );
}
