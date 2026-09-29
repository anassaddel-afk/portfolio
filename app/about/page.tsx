import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ContactSection } from "@/components/ContactSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";

export const metadata: Metadata = {
  title: "About",
  description: "Anas Adel is a Senior Product Designer focused on turning complex products into simple, useful experiences.",
};

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
