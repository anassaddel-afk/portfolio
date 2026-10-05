import Image from "next/image";
import { getExperience, sortExperienceByDate } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { CareerTimeline, RoleLine } from "./CareerTimeline";
import { MagneticButton } from "./MagneticButton";

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
    highlights: role.highlights,
    freelance: role.freelance ? copy.freelance : undefined,
    logo: logos[role.company],
    logoAlt: locale === "ar" ? `شعار ${role.company}` : `${role.company} logo`,
  }));

  return (
    <section id="experience" aria-labelledby="career-title" className="border-t border-border">
      <div className="container-x pt-[var(--section-y)] pb-[var(--space-10)]">
        <h2 id="career-title" className="text-h1 font-medium text-balance">
          {copy.careerTitle}
        </h2>
        <p className="mt-[var(--space-6)] max-w-[36rem] text-lead text-pretty text-muted">{copy.careerIntro}</p>
      </div>

      <div className="career-scroll relative">
      <CareerTimeline roles={journey} hint={copy.keepScrolling} />

      <div className="career-static sr-only">
        <ol className="container-x">
          {journey.map((role) => (
            <li key={role.company} className="border-t border-border py-10">
              <div className="career-logo-slot mx-auto w-[11rem] md:w-[16rem]">
                <div className="career-logo-fit">
                  <Image
                    src={role.logo}
                    alt={role.logoAlt}
                    fill
                    sizes="(min-width: 768px) 216px, 152px"
                    quality={90}
                    className="career-logo object-contain object-center"
                  />
                </div>
              </div>
              <h3
                dir="ltr"
                className="mt-[var(--space-4)] text-center text-[clamp(1.25rem,2vw,1.75rem)] leading-none font-medium tracking-[var(--tracking-tight)]"
              >
                {role.company}
              </h3>
              <div className="mt-[var(--space-4)] text-center">
                <RoleLine role={role.role} period={role.period} freelance={role.freelance} />
              </div>
              <p className="career-copy mt-[var(--space-4)] text-center text-body text-muted">{role.summary}</p>
              {role.highlights.length > 0 ? (
                <ul className="career-copy mt-[var(--space-4)] text-center text-small text-muted">
                  {role.highlights.map((item) => (
                    <li key={item.value}>
                      <span className="font-medium text-foreground tabular-nums">{item.value}</span> {item.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="career-cta pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 flex h-svh items-end">
          <div className="pointer-events-auto container-x flex w-full justify-center pb-[var(--space-6)]">
            <MagneticButton href="/experience" variant="text">
              {copy.viewFull}
            </MagneticButton>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
