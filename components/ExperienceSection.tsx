import { getExperience } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { MagneticButton } from "./MagneticButton";
import { SectionHeader } from "./SectionHeader";

type ExperienceSectionProps = { index?: string; showLink?: boolean; id?: string; limit?: number };

export async function ExperienceSection({ index, showLink = true, id = "experience", limit }: ExperienceSectionProps) {
  const { locale, t } = await getDictionary();
  const { roles: all } = getExperience(locale);
  const roles = limit ? all.slice(0, limit) : all;

  return (
    <section id={id} className="section-y border-t border-border">
      <div className="container-x">
        <SectionHeader index={index} label={t.experience.label} title={t.experience.title} />

        <ExperienceTimeline
          roles={roles}
          opensNewTab={t.experience.opensNewTab}
          showRole={limit == null}
          freelanceLabel={t.experience.freelance}
        />

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
