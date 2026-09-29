"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { EASE_OUT, cn, pad } from "@/lib/utils";

/** Editorial index of all projects. On fine pointers, a preview image follows the cursor. */
export function WorkIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 34, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 34, mass: 0.6 });

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ol className="border-b border-border">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-border">
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={cn(
                "group grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 py-6 transition-opacity duration-500 md:grid-cols-12 md:gap-x-[var(--gutter)] md:py-9",
                hovered !== null && hovered !== i && "md:opacity-35",
              )}
              data-cursor="project"
              data-cursor-label="View"
            >
              <div className="relative row-span-2 aspect-square overflow-hidden bg-surface md:hidden">
                <Image src={p.cover.src} alt="" fill sizes="72px" className="object-cover" />
              </div>
              <span className="label hidden text-muted transition-colors group-hover:text-accent md:col-span-1 md:block">
                {pad(i + 1)}
              </span>
              <h2 className="text-[clamp(1.25rem,2.6vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-2 md:col-span-6">
                {p.title}
              </h2>
              <p className="label text-muted md:col-span-3">{p.tags.join(" · ")}</p>
              <span className="label hidden items-center justify-end gap-3 text-muted md:col-span-2 md:flex">
                {p.client}
                {p.year ? ` · ${p.year}` : ""}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {fine ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hovered !== null ? (
              <motion.div
                key={hovered}
                className="absolute left-6 top-0 aspect-[4/3] w-[22rem] -translate-y-1/2 overflow-hidden bg-surface shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, clipPath: "inset(12% 12% 12% 12%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Image src={projects[hovered].cover.src} alt="" fill sizes="352px" className="object-cover" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
