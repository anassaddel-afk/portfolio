"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ComingSoonProvider } from "./ComingSoon";
import { NavExtensionProvider } from "./NavExtension";
import { ProjectTransitionProvider } from "./ProjectTransition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <NavExtensionProvider>
        <ComingSoonProvider>
          <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
        </ComingSoonProvider>
      </NavExtensionProvider>
    </MotionConfig>
  );
}
