import { AboutSection } from "@/components/AboutSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { WorkSection } from "@/components/WorkSection";

const disciplines = [
  "Product strategy",
  "Fintech",
  "UX research",
  "Loyalty",
  "Interaction design",
  "Marketplaces",
  "Design systems",
  "SaaS",
  "B2B & B2C",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={disciplines} />
      <WorkSection />
      <AboutSection />
      <PrinciplesSection />
      <CapabilitiesSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
