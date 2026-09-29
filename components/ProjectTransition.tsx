"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lockScroll } from "@/lib/scroll";
import { EASE_IN_OUT } from "@/lib/utils";

type Rect = { top: number; left: number; width: number; height: number };

type StartOptions = { href: string; src: string; rect: DOMRect };

type Transition = { href: string; src: string; from: Rect; to: Rect; phase: "expand" | "out" };

type ContextValue = {
  start: (opts: StartOptions) => void;
  /** Called by the case-study hero once its image has loaded. */
  ready: () => void;
};

const ProjectTransitionContext = createContext<ContextValue>({
  start: () => {},
  ready: () => {},
});

export const useProjectTransition = () => useContext(ProjectTransitionContext);

/** Measures where the case-study hero image sits (see CaseHero), without rendering the page. */
function measureHeroRect(): Rect {
  const outer = document.createElement("div");
  outer.className = "container-x";
  outer.style.cssText = "position:fixed;left:0;right:0;top:var(--nav-h);visibility:hidden;pointer-events:none;";
  const inner = document.createElement("div");
  inner.style.height = "var(--case-hero-h)";
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const r = inner.getBoundingClientRect();
  outer.remove();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/**
 * Shared-element transition between a project thumbnail and its case-study hero.
 * The clicked image is cloned into a fixed overlay, expanded to the hero's position while
 * the route loads underneath, then faded out once the real hero image is ready.
 */
export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [t, setT] = useState<Transition | null>(null);
  const flags = useRef({ expanded: false, ready: false });
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    setT((prev) => (prev && prev.phase !== "out" ? { ...prev, phase: "out" } : prev));
  }, []);

  const maybeFinish = useCallback(() => {
    if (flags.current.expanded && flags.current.ready) finish();
  }, [finish]);

  const start = useCallback(
    ({ href, src, rect }: StartOptions) => {
      if (reduce) {
        router.push(href);
        return;
      }
      flags.current = { expanded: false, ready: false };
      setT({
        href,
        src,
        from: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        to: measureHeroRect(),
        phase: "expand",
      });
      lockScroll(true);
      router.push(href);
      if (safety.current) clearTimeout(safety.current);
      safety.current = setTimeout(finish, 2200);
    },
    [reduce, router, finish],
  );

  const ready = useCallback(() => {
    flags.current.ready = true;
    maybeFinish();
  }, [maybeFinish]);

  useEffect(() => () => {
    if (safety.current) clearTimeout(safety.current);
  }, []);

  return (
    <ProjectTransitionContext.Provider value={{ start, ready }}>
      {children}
      <AnimatePresence>
        {t ? (
          <motion.div
            key="veil"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[69] bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: t.phase === "out" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: t.phase === "out" ? 0.35 : 0.5, ease: "easeOut" }}
          />
        ) : null}
        {t ? (
          <motion.div
            key="shared-image"
            aria-hidden
            className="pointer-events-none fixed z-[70] overflow-hidden"
            initial={{ ...t.from, opacity: 1 }}
            animate={t.phase === "out" ? { ...t.to, opacity: 0 } : { ...t.to, opacity: 1 }}
            transition={
              t.phase === "out"
                ? { duration: 0.4, delay: 0.2, ease: "easeOut" }
                : { duration: 0.9, ease: EASE_IN_OUT }
            }
            onAnimationComplete={() => {
              if (t.phase === "expand") {
                flags.current.expanded = true;
                maybeFinish();
              } else {
                if (safety.current) clearTimeout(safety.current);
                lockScroll(false);
                setT(null);
              }
            }}
          >
            <img src={t.src} alt="" className="size-full object-cover" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ProjectTransitionContext.Provider>
  );
}
