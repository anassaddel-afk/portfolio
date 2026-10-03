import { AboutSection } from "@/components/AboutSection";
import { CanvasGuides } from "@/components/CanvasGuides";
import { Collaborators } from "@/components/Collaborators";
import { ContactSection } from "@/components/ContactSection";
import { CuriousAsk } from "@/components/CuriousAsk";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { WorkSection } from "@/components/WorkSection";

export default function HomePage() {
  return (
    <>
      <CanvasGuides />
      <Collaborators />
      <Hero />
      <WorkSection />
      <PrinciplesSection />
      <ExperienceSection limit={3} />
      <AboutSection showFacts={false} />
      <CuriousAsk />
      <ContactSection />
    </>
  );
}
