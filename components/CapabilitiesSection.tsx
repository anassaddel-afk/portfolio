import { capabilities, toolbox } from "@/data/experience";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-y border-t border-border">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Capabilities"
          title={["From the problem", "to the pixel."]}
          aside={
            <Reveal>
              <p className="text-lead text-muted">
                End-to-end product design — from early research and strategy to design systems and shipped experiences.
              </p>
            </Reveal>
          }
        />

        <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-y-14 md:grid-cols-3 md:gap-x-[var(--gutter)]">
          {capabilities.map((group, g) => (
            <Reveal key={group.group} delay={g * 0.08}>
              <h3 className="label border-b border-border-strong pb-4 text-foreground">{group.group}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name} className="group border-b border-border py-6">
                    <p className="text-lead font-medium tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
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
          <p className="label text-muted md:col-span-2">Toolbox</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-small md:col-span-10">
            {toolbox.map((tool, i) => (
              <li key={tool} className="flex gap-4">
                <span>{tool}</span>
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
  );
}
