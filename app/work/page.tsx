import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WorkIndex } from "@/components/WorkIndex";
import { getProjects } from "@/data/projects";
import { getDictionary } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.workPage.metaTitle, description: t.workPage.metaDescription };
}

export default async function WorkPage() {
  const { locale, t } = await getDictionary();

  return (
    <>
      <PageIntro label={t.workPage.label} title={t.workPage.title}>
        {t.workPage.intro}
      </PageIntro>
      <section className="container-x pb-[var(--section-y)]" aria-label={t.workPage.listLabel}>
        <WorkIndex projects={getProjects(locale)} />
      </section>
    </>
  );
}
