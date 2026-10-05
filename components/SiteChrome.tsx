"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AskAnas } from "./AskAnas";
import { Atmosphere } from "./Atmosphere";
import { Cursor } from "./Cursor";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

/** Site chrome stays off the recording scene so /mockup is only the laptop. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/mockup") return children;

  return (
    <>
      <Atmosphere />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
      <AskAnas />
      <Cursor />
    </>
  );
}
