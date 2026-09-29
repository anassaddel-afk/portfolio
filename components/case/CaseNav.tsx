"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Section } from "@/data/projects";
import { scrollToTarget } from "@/lib/scroll";
import { cn, pad } from "@/lib/utils";

type CaseNavProps = { sections: Section[] };

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const go = (e: React.MouseEvent, id: string, offset: number) => {
  e.preventDefault();
  scrollToTarget(`#${id}`, offset);
  history.replaceState(null, "", `#${id}`);
};

export function CaseNav({ sections }: CaseNavProps) {
  const ids = useRef(sections.map((s) => s.id)).current;
  const active = useActiveSection(ids);

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--nav-h)+2.5rem)] hidden md:block">
      <p className="label mb-6 text-muted">Contents</p>
      <ol className="flex flex-col">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id, -96)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "label relative flex h-10 items-center gap-4 transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                <span className={cn("w-5 tabular-nums", isActive && "text-accent")}>{pad(i + 1)}</span>
                <span>{s.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="case-nav-indicator"
                    className="absolute -left-4 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CaseNavMobile({ sections }: CaseNavProps) {
  const ids = useRef(sections.map((s) => s.id)).current;
  const active = useActiveSection(ids);
  const bar = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (el && bar.current) {
      bar.current.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[4.25rem] z-30 -mx-[var(--gutter)] border-b border-border bg-background/85 backdrop-blur-xl md:hidden"
    >
      <ol ref={bar} className="no-scrollbar flex gap-1 overflow-x-auto px-[var(--gutter)] py-2">
        {sections.map((s, i) => (
          <li key={s.id} data-id={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id, -136)}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "label flex h-11 items-center gap-2 rounded-full px-4 transition-colors",
                active === s.id ? "bg-foreground text-background" : "text-muted",
              )}
            >
              <span className="tabular-nums">{pad(i + 1)}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
