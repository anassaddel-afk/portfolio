"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxProps = { children: ReactNode; amount?: number; className?: string };

/** Moves its content slightly slower than the page. The content is oversized by `amount` to avoid gaps. */
export function Parallax({ children, amount = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className ?? "relative")}>
      <motion.div className="absolute inset-x-0" style={{ y, top: -amount, bottom: -amount }}>
        {children}
      </motion.div>
    </div>
  );
}
