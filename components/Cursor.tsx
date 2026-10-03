"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";

type CursorKind = "default" | "link" | "project" | "image" | "drag" | "hidden";

const SIZES: Record<CursorKind, number> = {
  default: 8,
  link: 40,
  project: 96,
  image: 76,
  drag: 76,
  hidden: 0,
};

/**
 * Desktop-only cursor. Elements opt into states with
 *   data-cursor="project | image | drag | link | hidden"  and optional  data-cursor-label="…"
 * Links and buttons get the "link" state automatically.
 */
export function Cursor() {
  const { t } = useI18n();
  const [enabled, setEnabled] = useState(false);
  const [kind, setKind] = useState<CursorKind>("default");
  const [label, setLabel] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const tagged = target.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setKind((tagged.dataset.cursor as CursorKind) ?? "default");
        setLabel(tagged.dataset.cursorLabel);
        return;
      }
      if (target.closest("a, button, [role='button'], [role='slider'], summary, label")) {
        setKind("link");
        setLabel(undefined);
        return;
      }
      setKind("default");
      setLabel(undefined);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = SIZES[kind];
  const defaults: Partial<Record<CursorKind, string>> = { project: t.cursor.view, image: t.cursor.open, drag: t.cursor.drag };
  const text = label ?? defaults[kind];
  const filled = kind === "project" || kind === "image" || kind === "drag" || kind === "default";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-200",
          filled ? "border-transparent bg-foreground" : "border-foreground bg-transparent",
        )}
        initial={false}
        animate={{
          width: size,
          height: size,
          opacity: visible && kind !== "hidden" ? 1 : 0,
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {text && size > 40 ? (
            <motion.span
              key={text}
              className="label px-1 text-center text-(length:--fs-cursor) leading-tight text-background"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
            >
              {text}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
