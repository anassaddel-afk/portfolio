import { getExperience } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { pad } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export async function PrinciplesSection() {
  const { locale, t } = await getDictionary();
  const { principles } = getExperience(locale);

  return (
    <section id="how-i-think" className="section-y border-t border-border">
      <div className="container-x grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--gutter)]">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--nav-h)+3rem)]">
            <p className="label text-muted">{t.principles.label}</p>
            <TextReveal as="h2" lines={t.principles.title} className="mt-8 text-h1 font-medium" />
            <p className="mt-6 max-w-[32ch] text-body text-muted">{t.principles.intro}</p>
          </div>
        </div>

        <ol className="md:col-span-8">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} className="group border-t border-border last:border-b">
              <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-8 md:grid-cols-[5rem_1fr] md:py-10">
                <span className="label pt-[0.55em] tabular-nums text-muted transition-colors duration-500 group-hover:text-accent">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="text-h3 font-medium transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-2">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-body text-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
