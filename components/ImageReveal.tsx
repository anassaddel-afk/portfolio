"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT, cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Clips an image container open as it enters the viewport, settling the image from 1.08 → 1. */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <motion.div
      className={cn("js-reveal overflow-hidden", className ?? "relative")}
      initial={{ clipPath: "inset(10% 6% 10% 6%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      <motion.div
        className="js-reveal absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
