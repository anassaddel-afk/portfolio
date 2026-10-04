import { getExperience } from "@/data/experience";
import { getDictionary } from "@/lib/locale";
import { PrincipleColumn } from "./PrincipleColumn";

/** Title stays put on desktop. Principles scroll beside it. Mobile stacks. */
export async function PrinciplesSection() {
  const { locale, t } = await getDictionary();
  const { principles } = getExperience(locale);
  const copy = t.principles;

  return (
    <section id="how-i-think" aria-labelledby="how-i-think-title" className="section-y border-t border-border">
      <div className="container-x">
        <div className="think-layout">
          <div className="think-title">
            <h2 id="how-i-think-title" className="text-h1 font-medium">
              {copy.title.join(" ")}
            </h2>
          </div>
          <PrincipleColumn intro={copy.intro} close={copy.close} principles={principles} />
        </div>
      </div>
    </section>
  );
}
