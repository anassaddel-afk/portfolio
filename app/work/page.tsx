import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WorkIndex } from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of products, experiences, and design systems designed by Anas Adel.",
};

export default function WorkPage() {
  return (
    <>
      <PageIntro label="(Index) — Work" title={["Selected work"]}>
        A selection of products, experiences, and design systems I&apos;ve worked on over the years.
      </PageIntro>
      <section className="container-x pb-[var(--section-y)]" aria-label="All projects">
        <WorkIndex />
      </section>
    </>
  );
}
