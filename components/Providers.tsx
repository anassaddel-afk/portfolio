"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ProjectTransitionProvider } from "./ProjectTransition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
    </MotionConfig>
  );
}
