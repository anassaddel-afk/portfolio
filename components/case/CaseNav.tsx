"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Section } from "@/data/projects";
import { scrollToTarget } from "@/lib/scroll";
import { cn, pad } from "@/lib/utils";
import { useI18n } from "../LanguageProvider";
import { useNavExtension } from "../NavExtension";

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
  const { t } = useI18n();
  const ids = useRef(sections.map((s) => s.id)).current;
  const active = useActiveSection(ids);

  return (
    <nav aria-label={t.caseStudy.sectionsLabel} className="sticky top-[calc(var(--nav-h)+2.5rem)] hidden md:block">
      <p className="label mb-6 text-muted">{t.caseStudy.contents}</p>
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
                    className="absolute -start-4 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent"
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

/**
 * Mobile section pills. They render inside the main navigation shell (see Navbar), so the two read as
 * one connected shape: the row drops out of the bar while the case-study body is on screen.
 */
export function CaseNavMobile({ sections }: CaseNavProps) {
  const { t } = useI18n();
  const ids = useRef(sections.map((s) => s.id)).current;
  const active = useActiveSection(ids);
  const { slot, setActive } = useNavExtension();
  const sentinel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const body = sentinel.current?.parentElement;
    if (!body) return;
    const mobile = window.matchMedia("(max-width: 767.98px)");
    let frame = 0;
    const check = () => {
      frame = 0;
      const r = body.getBoundingClientRect();
      setVisible(mobile.matches && r.top < 90 && r.bottom > 140);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
    };
  }, []);

  useEffect(() => setActive(visible), [visible, setActive]);
  useEffect(() => () => setActive(false), [setActive]);

  useEffect(() => {
    const list = bar.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    list.scrollBy({ left: er.left + er.width / 2 - (lr.left + lr.width / 2), behavior: "smooth" });
  }, [active]);

  const onPill = (e: React.MouseEvent, id: string) => {
    const bottom = document.getElementById("site-header")?.getBoundingClientRect().bottom ?? 120;
    go(e, id, -(bottom + 16));
  };

  const row = (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
        visible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      inert={!visible}
    >
      <div className="min-h-0 overflow-hidden">
        <nav aria-label={t.caseStudy.sectionsLabel} className="border-t border-border">
          <ol ref={bar} className="no-scrollbar flex gap-1 overflow-x-auto p-1.5">
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} data-id={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => onPill(e, s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "label flex h-9 items-center gap-2 rounded-[var(--radius-sm)] px-3 transition-colors duration-300",
                      isActive ? "bg-foreground text-background" : "text-muted",
                    )}
                  >
                    <span className="tabular-nums">{pad(i + 1)}</span>
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <div ref={sentinel} aria-hidden className="hidden" />
      {slot ? createPortal(row, slot) : null}
    </>
  );
}
