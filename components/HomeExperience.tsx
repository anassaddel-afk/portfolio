import Image from "next/image";
import { getExperience, sortExperienceByDate } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { CareerTimeline } from "./CareerTimeline";
import { MagneticButton } from "./MagneticButton";
import { ScrollRevealText } from "./ScrollRevealText";

const logos: Record<string, string> = {
  "Bypa-ss": "/experience/bypa-ss.webp",
  Dsquares: "/experience/dsquares.webp",
  "Blue Ribbon": "/experience/ribbon.webp",
  Waitery: "/experience/waitery.webp",
  Resal: "/experience/resal.webp",
};

/** Home-only career sequence. The experience page keeps the full record. */
export async function HomeExperience() {
  const { locale, t } = await getDictionary();
  const { roles } = getExperience(locale);
  const copy = t.experience;
  const journey = sortExperienceByDate(roles).map((role) => ({
    company: role.company,
    role: role.role,
    period: role.period,
    summary: role.summary,
    logo: logos[role.company],
    logoAlt: locale === "ar" ? `شعار ${role.company}` : `${role.company} logo`,
  }));

  return (
    <section id="experience" aria-labelledby="career-title" className="border-t border-border">
      <header className="container-x pt-[var(--section-y)] pb-[var(--space-8)]">
        <p className="label text-muted">{copy.label}</p>
        <h2 id="career-title" className="mt-4 text-h1 font-medium">
          {copy.careerTitle}
        </h2>
        <ScrollRevealText as="p" className="mt-6 max-w-[36rem] text-lead text-muted">
          {copy.careerIntro}
        </ScrollRevealText>
      </header>

      <CareerTimeline roles={journey} />

      <div className="career-static sr-only">
        <ol className="container-x">
          {journey.map((role) => (
            <li key={role.company} className="border-t border-border py-10">
              <div className="relative mb-[var(--space-5)] h-16 w-40">
                <Image
                  src={role.logo}
                  alt={role.logoAlt}
                  fill
                  sizes="160px"
                  quality={90}
                  className="career-logo object-contain object-left rtl:object-right"
                />
              </div>
              <h3 dir="ltr" className="text-h2 font-medium">
                {role.company}
              </h3>
              <p className="mt-4 text-lead">{role.role}</p>
              <p className="mt-2 text-small text-muted tabular-nums">{role.period}</p>
              <p className="career-copy mt-[var(--space-5)] text-start text-body text-muted">{role.summary}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-x flex justify-center pt-[var(--space-6)] pb-[var(--section-y)] md:justify-end">
        <MagneticButton href="/experience" variant="text">
          {copy.viewFull}
        </MagneticButton>
      </div>
    </section>
  );
}
