"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

export type CareerRole = {
  company: string;
  role: string;
  period: string;
  summary: string;
  logo: string;
  logoAlt: string;
};

type CareerTimelineProps = {
  roles: CareerRole[];
};

/**
 * Vertical page scroll drives one horizontal career track.
 * Logos are keyed marks, themed to foreground monochrome.
 * `roles` is most recent → oldest.
 */
export function CareerTimeline({ roles }: CareerTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const count = roles.length;
  const x = useTransform(scrollYProgress, (value) => {
    const index = travel(value, count);
    return `calc(50cqi - var(--station) / 2 - ${index} * var(--station))`;
  });
  const line = useTransform(scrollYProgress, (value) => (count < 2 ? 1 : travel(value, count) / (count - 1)));

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="career-stage relative"
      style={{ height: `calc(${Math.max(count - 1, 1)} * 100vh + 100svh)` }}
    >
      <div className="sticky top-0 flex h-svh touch-pan-y flex-col items-center justify-center overflow-hidden pt-[var(--nav-h)]">
        <div className="career-viewport relative h-[18rem] w-full overflow-hidden md:h-[22rem]">
          <motion.div style={{ x }} dir="ltr" className="career-track pointer-events-none absolute bottom-[var(--space-3)] left-0 flex h-0">
            <div className="pointer-events-none absolute top-0 right-[calc(var(--station)/2)] left-[calc(var(--station)/2)] h-px bg-border">
              <motion.div style={{ scaleX: line }} className="h-full origin-left bg-foreground/75" />
            </div>
            {roles.map((role, index) => (
              <Station key={role.company} role={role} index={index} count={count} progress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        <div className="container-x relative mt-[var(--space-8)] h-[14rem] w-full md:h-[13rem]">
          {roles.map((role, index) => (
            <Caption key={role.company} role={role} index={index} count={count} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Station({
  role,
  index,
  count,
  progress,
}: {
  role: CareerRole;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (value) => 0.3 + 0.7 * focus(value, index, count));
  const scale = useTransform(progress, (value) => 0.95 + 0.1 * focus(value, index, count));
  const y = useTransform(progress, (value) => (1 - focus(value, index, count)) * 8);

  return (
    <div className="relative h-0 w-[var(--station)] shrink-0">
      <motion.div
        style={{ opacity, scale, y, x: "-50%" }}
        className="absolute bottom-[var(--space-8)] left-1/2 flex w-[11rem] flex-col items-center md:w-[16rem]"
      >
        <div className="relative h-[6.5rem] w-full md:h-[9rem]">
          <Image
            src={role.logo}
            alt={role.logoAlt}
            fill
            sizes="(min-width: 768px) 256px, 176px"
            quality={90}
            draggable={false}
            className="career-logo object-contain"
          />
        </div>
        <h3
          dir="ltr"
          className="mt-[var(--space-4)] text-center text-[clamp(1.25rem,2vw,1.75rem)] leading-none font-medium tracking-[var(--tracking-tight)] whitespace-nowrap"
        >
          {role.company}
        </h3>
      </motion.div>
      <Marker index={index} count={count} progress={progress} />
    </div>
  );
}

function Marker({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, (value) => 1 + 0.65 * focus(value, index, count));
  const opacity = useTransform(progress, (value) => 0.35 + 0.65 * focus(value, index, count));

  return (
    <motion.span
      style={{ scale, opacity, x: "-50%", y: "-50%" }}
      className="absolute top-0 left-1/2 block size-2 rounded-full bg-foreground"
    />
  );
}

function Caption({
  role,
  index,
  count,
  progress,
}: {
  role: CareerRole;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (value) => focus(value, index, count));
  const y = useTransform(progress, (value) => (1 - focus(value, index, count)) * 8);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0 flex justify-center">
      <div className="career-copy text-center">
        <p className="text-lead">{role.role}</p>
        <p className="mt-[var(--space-2)] text-small text-muted tabular-nums">{role.period}</p>
        <p className="mt-[var(--space-5)] text-body text-pretty leading-[var(--lh-body)] text-muted">{role.summary}</p>
      </div>
    </motion.div>
  );
}

/** Eased position along the stations, 0 → count-1. */
function travel(progress: number, count: number) {
  if (count < 2) return 0;
  const scaled = Math.min(Math.max(progress, 0), 1) * (count - 1);
  const index = Math.min(Math.floor(scaled), count - 2);
  const local = scaled - index;
  return index + local * local * (3 - 2 * local);
}

function focus(progress: number, index: number, count: number) {
  const dist = Math.abs(travel(progress, count) - index);
  return smoothstep(1, 0, dist);
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0 || 1)));
  return t * t * (3 - 2 * t);
}
