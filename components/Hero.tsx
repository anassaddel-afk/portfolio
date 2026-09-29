"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { scrollToTarget } from "@/lib/scroll";
import { EASE_OUT, pad } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { TextReveal } from "./TextReveal";

function InlinePortrait() {
  return (
    <span
      aria-hidden
      className="relative inline-block h-[0.74em] w-[1.3em] -translate-y-[0.04em] overflow-hidden rounded-full bg-surface align-middle transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:w-[1.9em]"
    >
      <Image
        src={site.about.portrait.src}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 240px, 120px"
        className="object-cover object-[50%_30%] grayscale"
      />
    </span>
  );
}

function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg
        aria-hidden
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-[92%] overflow-visible text-accent"
      >
        <motion.path
          d="M2 14 C 60 4, 140 4, 200 10 S 280 16, 298 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: "max(2px, 0.05em)" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.1 }}
        />
      </motion.svg>
    </span>
  );
}

function Ticker() {
  const words = site.hero.ticker;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className="inline-flex h-11 items-center gap-2">
      <span className="text-muted">Curious by default —</span>
      <span className="relative block h-[1.3em] min-w-[11em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[i]}
            className="absolute left-0 top-0 whitespace-nowrap leading-[1.3em]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Hero() {
  const { hero } = site;

  const toWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget("#work");
  };

  return (
    <section
      aria-label="Introduction"
      className="container-x relative flex min-h-[100svh] flex-col pb-8 pt-[calc(var(--nav-h)+2.5rem)] md:pb-10"
    >
      <motion.div
        className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span>
          {site.role} <span className="text-subtle">/</span> 7+ years
        </span>
        <a
          href={hero.currently.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex h-11 items-center gap-2"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          <span>
            Currently designing at <span className="text-foreground link-draw">{hero.currently.company}</span>
          </span>
          <ArrowUpRight aria-hidden className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.15}
          stagger={0.1}
          ariaLabel={hero.lines.join(" ")}
          className="text-display font-medium"
          lines={[
            <>
              I <InlinePortrait /> turn complex
            </>,
            <>
              products into <Underlined>simple,</Underlined>
            </>,
            <>useful experiences.</>,
          ]}
        />
      </div>

      <motion.div
        className="grid gap-y-8 md:grid-cols-12 md:items-end"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.65 }}
      >
        <p className="max-w-[44ch] text-lead text-muted md:col-span-6 lg:col-span-5">{hero.supporting}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-6 md:justify-end lg:col-span-5 lg:col-start-8">
          <MagneticButton href="/#work" onClick={toWork}>
            View work
          </MagneticButton>
          <MagneticButton href="/#contact" variant="text" onClick={(e) => (e.preventDefault(), scrollToTarget("#contact"))}>
            Let&apos;s talk
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        className="label mt-12 flex items-center justify-between gap-6 border-t border-border pt-4 text-[0.68rem] md:mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Ticker />
        <button
          type="button"
          onClick={() => scrollToTarget("#work")}
          className="group hidden h-11 items-center gap-2 uppercase text-muted hover:text-foreground sm:inline-flex"
        >
          Scroll
          <ArrowDown aria-hidden className="size-3 transition-transform duration-500 group-hover:translate-y-0.5" />
        </button>
        <span className="hidden text-muted md:inline">({pad(projects.length)}) Selected projects</span>
      </motion.div>
    </section>
  );
}
