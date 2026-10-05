import type { Metadata } from "next";
import { MockupScene } from "@/components/MockupScene";

export const metadata: Metadata = {
  title: "Mockup",
  robots: { index: false, follow: false },
};

export default function MockupPage() {
  return <MockupScene />;
}
