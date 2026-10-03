"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT, cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

type TextRevealProps = {
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates on load (hero), "view" when scrolled into view. */
  trigger?: "mount" | "view";
  ariaLabel?: string;
  /** Names the element from another node while keeping its content (e.g. interactive parts) accessible. */
  labelledBy?: string;
};

const line: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export function TextReveal({
  lines,
  as = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
  ariaLabel,
  labelledBy,
}: TextRevealProps) {
  const Comp = motion[as];
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Comp
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      variants={container}
      initial="hidden"
      animate={trigger === "mount" ? "show" : undefined}
      whileInView={trigger === "view" ? "show" : undefined}
      viewport={{ once: true, amount: 0.5 }}
    >
      {lines.map((content, i) => (
        <motion.span
          key={i}
          variants={line}
          aria-hidden={ariaLabel || labelledBy ? true : undefined}
          className={cn("js-reveal block will-change-[transform,filter]", lineClassName)}
        >
          {content}
        </motion.span>
      ))}
    </Comp>
  );
}
