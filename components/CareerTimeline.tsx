"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

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
  previousLabel: string;
  nextLabel: string;
};

/**
 * One company at a time. Arrows and horizontal trackpad/touch swipes move between companies.
 * Vertical page scroll is free — visitors can leave without browsing every station.
 * `roles` is most recent → oldest.
 */
export function CareerTimeline({ roles, hint, previousLabel, nextLabel }: CareerTimelineProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const count = roles.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const progress = useMotionValue(0);
  const [showHint, dismissHint] = useTimelineHint(panelRef);

  const x = useTransform(progress, (value) => {
    const index = travel(value, count);
    return `calc(50cqi - var(--station) / 2 - ${index} * var(--station))`;
  });
  const line = useTransform(progress, (value) => (count < 2 ? 1 : travel(value, count) / (count - 1)));

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const target = count < 2 ? 0 : active / (count - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(progress, target, {
      duration: reduce ? 0 : 0.7,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [active, count, progress]);

  const goTo = useCallback(
    (index: number) => {
      if (count < 2) return;
      const next = Math.max(0, Math.min(count - 1, index));
      activeRef.current = next;
      setActive(next);
      dismissHint();
    },
    [count, dismissHint],
  );

  const step = useCallback(
    (direction: -1 | 1) => {
      goTo(activeRef.current + direction);
    },
    [goTo],
  );

  useTimelineSwipe(panelRef, step, count > 1);

  return (
    <div ref={panelRef} className="career-stage relative touch-pan-y">
      <div className="career-panel relative flex flex-col items-center overflow-hidden">
        <div className="relative flex w-full flex-col items-center">
          <div aria-hidden className="career-viewport relative w-full overflow-hidden">
            <motion.div style={{ x }} dir="ltr" className="career-track pointer-events-none absolute bottom-[var(--space-3)] left-0 flex h-0">
              <div className="pointer-events-none absolute top-0 right-[calc(var(--station)/2)] left-[calc(var(--station)/2)] h-px bg-border">
                <motion.div style={{ scaleX: line }} className="h-full origin-left bg-foreground/75" />
              </div>
              {roles.map((role, index) => (
                <Station key={role.company} role={role} index={index} count={count} progress={progress} />
              ))}
            </motion.div>
          </div>
          <p
            aria-hidden
            className={`career-hint pointer-events-none flex items-center justify-center gap-1.5 text-small leading-none whitespace-nowrap text-muted transition-opacity duration-700 ease-[var(--ease-out)] ${showHint ? "opacity-100" : "opacity-0"}`}
          >
            <span>←</span>
            <span>{hint}</span>
            <span>→</span>
          </p>

          <div aria-hidden className="career-captions container-x relative w-full">
            {roles.map((role, index) => (
              <Caption key={role.company} role={role} index={index} count={count} progress={progress} />
            ))}
          </div>
        </div>

        {count > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 top-[var(--space-3)] bottom-[var(--space-3)] z-20 flex items-center justify-between px-[var(--space-3)] md:px-[var(--space-5)]">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active <= 0}
              aria-label={previousLabel}
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-[opacity,border-color] duration-300 hover:border-foreground disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active >= count - 1}
              aria-label={nextLabel}
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-[opacity,border-color] duration-300 hover:border-foreground disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
            </button>
          </div>
        ) : null}
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
 * Horizontal trackpad wheel and touch swipes step one company at a time.
 * Vertical gestures are left alone so the page can keep scrolling.
 */
function useTimelineSwipe(
  targetRef: RefObject<HTMLElement | null>,
  step: (direction: -1 | 1) => void,
  enabled: boolean,
) {
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) return;

    let lockedUntil = 0;
    let wheelCarry = 0;
    let touchX = 0;
    let touchY = 0;
    let tracking = false;

    const lock = () => {
      lockedUntil = performance.now() + 520;
      wheelCarry = 0;
    };

    const tryStep = (direction: -1 | 1) => {
      if (performance.now() < lockedUntil) return;
      lock();
      stepRef.current(direction);
    };

    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15;
      if (!horizontal || Math.abs(event.deltaX) < 2) {
        wheelCarry = 0;
        return;
      }

      event.preventDefault();
      if (performance.now() < lockedUntil) return;

      wheelCarry += event.deltaX;
      if (Math.abs(wheelCarry) < 36) return;

      // Positive deltaX = swipe left on a trackpad → next company.
      tryStep(wheelCarry > 0 ? 1 : -1);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      tracking = true;
      touchX = event.touches[0].clientX;
      touchY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      const dx = event.touches[0].clientX - touchX;
      const dy = event.touches[0].clientY - touchY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) <= Math.abs(dy) * 1.1) {
        tracking = false;
        return;
      }
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchX;
      const dy = touch.clientY - touchY;
      if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy) * 1.1) return;
      // Finger moves left → next company.
      tryStep(dx < 0 ? 1 : -1);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    node.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      node.removeEventListener("touchend", onTouchEnd);
    };
  }, [targetRef, enabled]);
}

/**
 * Fades in once when the timeline enters view.
 * Hides after a few seconds, or when the visitor starts browsing with the arrows.
 */
function useTimelineHint(targetRef: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  const dismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
    try {
      sessionStorage.setItem(HINT_KEY, "seen");
    } catch {
      /* Private browsing can reject storage. The hint still hides. */
    }
  }, []);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(HINT_KEY) === "seen") return;
    } catch {
      return;
    }

    let timer = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || dismissed.current) return;
        setVisible(true);
        timer = window.setTimeout(dismiss, 2800);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [targetRef, dismiss]);

  return [visible, dismiss] as const;
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
