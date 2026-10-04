import { AboutSection } from "@/components/AboutSection";
import { CanvasGuides } from "@/components/CanvasGuides";
import { Collaborators } from "@/components/Collaborators";
import { ContactSection } from "@/components/ContactSection";
import { HomeExperience } from "@/components/HomeExperience";
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
      <HomeExperience />
      <AboutSection showFacts={false} />
      <ContactSection />
    </>
  );
}
