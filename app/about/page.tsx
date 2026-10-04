import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ContactSection } from "@/components/ContactSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { getDictionary } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: t.aboutPage.metaTitle,
    description: t.aboutPage.metaDescription,
    alternates: { canonical: "/about" },
  };
}

export default function AboutPage() {
  return (
    <div className="pt-[var(--nav-h)]">
      <AboutSection />
      <PrinciplesSection />
      <CapabilitiesSection />
      <ContactSection />
    </div>
  );
}
