import { getExperience } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

type ExperienceSectionProps = { index?: string; showLink?: boolean; id?: string; limit?: number };

export async function ExperienceSection({ index, showLink = true, id = "experience", limit }: ExperienceSectionProps) {
  const { locale, t } = await getDictionary();
  const { roles: all } = getExperience(locale);
  const roles = limit ? all.slice(0, limit) : all;

  return (
    <section id={id} className="section-y border-t border-border">
      <div className="container-x">
        <SectionHeader
          index={index}
          label={t.experience.label}
          title={t.experience.title}
          aside={
            <Reveal>
              <p className="text-lead text-muted">{t.experience.intro}</p>
            </Reveal>
          }
        />

        <ExperienceTimeline roles={roles} opensNewTab={t.experience.opensNewTab} showRole={limit == null} />

        {showLink ? (
          <div className="mt-12 flex justify-end">
            <MagneticButton href="/experience" variant="text">
              {t.experience.fullLink}
            </MagneticButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
