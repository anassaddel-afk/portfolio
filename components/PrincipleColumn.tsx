"use client";

import { useEffect, useRef, useState } from "react";
import { pad } from "@/lib/utils";
import { ScrollRevealText } from "./ScrollRevealText";

type Principle = { title: string; body: string };

/** Scrolling principle column. The title beside it stays sticky in CSS. */
export function PrincipleColumn({
  intro,
  close,
  principles,
}: {
  intro: string;
  close: string;
  principles: Principle[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.querySelectorAll<HTMLLIElement>(":scope > li")];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = items.indexOf(visible.target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [principles]);

  return (
    <div>
      <ScrollRevealText as="p" className="text-lead text-pretty text-muted">
        {intro}
      </ScrollRevealText>
      <ol
        ref={listRef}
        className="mt-[var(--space-10)] flex flex-col gap-[var(--space-10)] md:mt-[var(--space-11)] md:gap-[var(--space-11)]"
      >
        {principles.map((principle, index) => (
          <li key={principle.title} className={index === active ? "think-principle is-active" : "think-principle"}>
            <p className="label tabular-nums text-muted">{pad(index + 1)}</p>
            <h3 className="mt-[var(--space-3)] text-h3 font-medium">{principle.title}</h3>
            <ScrollRevealText as="p" className="mt-[var(--space-4)] text-body text-pretty text-muted">
              {principle.body}
            </ScrollRevealText>
          </li>
        ))}
      </ol>
      <ScrollRevealText as="p" className="mt-[var(--space-10)] text-body text-pretty text-muted md:mt-[var(--space-11)]">
        {close}
      </ScrollRevealText>
    </div>
  );
}
