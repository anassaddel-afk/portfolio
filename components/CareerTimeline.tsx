"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const HINT_KEY = "experience-timeline-hint";

export type CareerHighlight = { value: string; label: string };

export type CareerRole = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: CareerHighlight[];
  logo: string;
  logoAlt: string;
  /** Small note beside the date. Present only for freelance projects. */
  freelance?: string;
};

type CareerTimelineProps = {
  roles: CareerRole[];
  /** One-time hint shown the first time this timeline enters the viewport. */
  hint: string;
};

/**
 * Vertical page scroll drives one horizontal career track.
 * The heading lives outside this stage, so the sticky viewport is only the timeline.
 * Logos are keyed marks, themed to foreground monochrome.
 * `roles` is most recent → oldest.
 */
export function CareerTimeline({ roles, hint }: CareerTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const count = roles.length;
  const travelVh = Math.max(count - 1, 1) * 100;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (value) => {
    const index = travel(value, count);
    return `calc(50cqi - var(--station) / 2 - ${index} * var(--station))`;
  });
  const line = useTransform(scrollYProgress, (value) => (count < 2 ? 1 : travel(value, count) / (count - 1)));
  const showHint = useTimelineHint(stickyRef, scrollYProgress);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="career-stage relative"
      style={{ height: `calc(${travelVh}vh + 100svh)` }}
    >
      <div
        ref={stickyRef}
        className="career-sticky sticky top-0 flex h-svh touch-pan-y flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative flex w-full flex-col items-center">
          <div className="career-viewport relative w-full overflow-hidden">
            <motion.div style={{ x }} dir="ltr" className="career-track pointer-events-none absolute bottom-[var(--space-3)] left-0 flex h-0">
              <div className="pointer-events-none absolute top-0 right-[calc(var(--station)/2)] left-[calc(var(--station)/2)] h-px bg-border">
                <motion.div style={{ scaleX: line }} className="h-full origin-left bg-foreground/75" />
              </div>
              {roles.map((role, index) => (
                <Station key={role.company} role={role} index={index} count={count} progress={scrollYProgress} />
              ))}
            </motion.div>
          </div>
          <p
            aria-hidden
            className={`career-hint pointer-events-none flex items-center justify-center gap-1.5 text-small leading-none whitespace-nowrap text-muted transition-opacity duration-700 ease-[var(--ease-out)] ${showHint ? "opacity-100" : "opacity-0"}`}
          >
            <span>{hint}</span>
            <span>↓</span>
          </p>

          <div className="career-captions container-x relative w-full">
            {roles.map((role, index) => (
              <Caption key={role.company} role={role} index={index} count={count} progress={scrollYProgress} />
            ))}
          </div>
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
  const opacity = useTransform(progress, (value) => 0.32 + 0.68 * focus(value, index, count));
  const scale = useTransform(progress, (value) => 0.95 + 0.1 * focus(value, index, count));
  const y = useTransform(progress, (value) => (1 - focus(value, index, count)) * 8);

  return (
    <div className="relative h-0 w-[var(--station)] shrink-0">
      <motion.div
        style={{ opacity, scale, y, x: "-50%" }}
        className="absolute bottom-[var(--space-5)] left-1/2 flex w-[11rem] flex-col items-center md:bottom-[var(--space-7)] md:w-[16rem]"
      >
        <div className="career-logo-slot">
          <div className="career-logo-fit">
            <Image
              src={role.logo}
              alt={role.logoAlt}
              fill
              sizes="(min-width: 768px) 216px, 152px"
              quality={90}
              draggable={false}
              className="career-logo object-contain object-center"
            />
          </div>
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
        <RoleLine role={role.role} period={role.period} freelance={role.freelance} />
        <p className="mt-[var(--space-4)] text-body text-pretty leading-[var(--lh-body)] text-muted">{role.summary}</p>
        {role.highlights.length > 0 ? (
          <ul className="mt-[var(--space-5)] flex flex-col items-center gap-[var(--space-2)]">
            {role.highlights.map((item) => (
              <li key={item.value} className="text-small text-balance text-muted">
                <span className="font-medium text-foreground tabular-nums">{item.value}</span>
                <span> {item.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.div>
  );
}

/** Same hierarchy for every company: role, then a muted metadata line. Freelance only prefixes the date. */
export function RoleLine({ role, period, freelance }: { role: string; period: string; freelance?: string }) {
  return (
    <>
      <p className="text-lead">{role}</p>
      <p className="mt-1 text-small text-muted">
        {freelance ? (
          <>
            {freelance}
            <span> · </span>
          </>
        ) : null}
        <span className="tabular-nums">{period}</span>
      </p>
    </>
  );
}

/**
 * Fades in once, the first time the timeline viewport is reached.
 * Hides after a few seconds, or sooner if the visitor keeps scrolling.
 */
function useTimelineHint(targetRef: RefObject<HTMLElement | null>, progress: MotionValue<number>) {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(HINT_KEY) === "seen") return;
    } catch {
      return;
    }

    let showing = false;
    let armed = false;
    let baseline = 0;
    let timer = 0;
    let armTimer = 0;

    const dismiss = () => {
      if (!showing) return;
      showing = false;
      setVisible(false);
      window.clearTimeout(timer);
      window.clearTimeout(armTimer);
      try {
        sessionStorage.setItem(HINT_KEY, "seen");
      } catch {
        /* Private browsing can reject storage. The hint still hides. */
      }
    };

    const show = () => {
      if (showing) return;
      showing = true;
      baseline = progressRef.current.get();
      setVisible(true);
      armTimer = window.setTimeout(() => {
        armed = true;
        baseline = progressRef.current.get();
      }, 500);
      timer = window.setTimeout(dismiss, 2600);
    };

    const unsub = progressRef.current.on("change", (value) => {
      if (!showing || !armed) return;
      if (Math.abs(value - baseline) > 0.012) dismiss();
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.85 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      unsub();
      window.clearTimeout(timer);
      window.clearTimeout(armTimer);
    };
  }, [targetRef]);

  return visible;
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
