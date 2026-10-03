import { getExperience } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { Reveal } from "./Reveal";
import { ScrollRevealText } from "./ScrollRevealText";
import { SectionHeader } from "./SectionHeader";
import { ToolboxList } from "./Toolbox";

export async function CapabilitiesSection() {
  const { locale, t } = await getDictionary();
  const { capabilities, toolbox } = getExperience(locale);

  return (
    <section id="capabilities" className="section-y border-t border-border">
      <div className="container-x">
        <SectionHeader
          label={t.capabilities.label}
          title={t.capabilities.title}
          aside={
            <ScrollRevealText as="p" className="text-lead text-muted">
              {t.capabilities.intro}
            </ScrollRevealText>
          }
        />

        <div className="mt-12 grid gap-y-12 md:mt-16 md:grid-cols-3 md:gap-x-[var(--gutter)]">
          {capabilities.map((group, g) => (
            <Reveal key={group.group} delay={g * 0.08}>
              <h3 className="label border-b border-border-strong pb-4 text-foreground">{group.group}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className="group border-b border-border py-6">
                    <p className="text-lead font-medium tracking-(--tracking-tight) transition-[translate] duration-500 ease-[var(--ease-out)] group-hover:nudge-1">
                      {item.name}
                    </p>
                    <p className="mt-2 text-small text-muted">{item.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-y-4 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <p className="label text-muted md:col-span-2">{t.capabilities.toolbox}</p>
          <div className="md:col-span-10">
            <ToolboxList tools={toolbox} size="compact" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
