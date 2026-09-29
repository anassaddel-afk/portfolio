"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { lockScroll } from "@/lib/scroll";
import { EASE_OUT, pad } from "@/lib/utils";
import { Media } from "../Media";

type LightboxProps = {
  images: ProjectImage[];
  index: number | null;
  /** Frame aspect used for cropped images. */
  aspect?: string;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function Lightbox({ images, index, aspect, onClose, onIndex }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = images.length;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) onIndex((index + 1) % count);
      else if (e.key === "ArrowLeft" && count > 1) onIndex((index - 1 + count) % count);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndex]);

  if (!mounted) return null;

  const image = index !== null ? images[index] : null;
  const frameAspect = image?.crop && aspect ? aspect : image ? `${image.width}/${image.height}` : "4/3";
  const [aw, ah] = frameAspect.split("/").map(Number);

  return createPortal(
    <AnimatePresence>
      {image && index !== null ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          data-cursor="image"
          data-cursor-label="Close"
        >
          <div className="container-x label flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <span className="text-muted">
              {pad(index + 1)} / {pad(count)}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center gap-2 uppercase"
            >
              Close <X aria-hidden className="size-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="container-x flex min-h-0 flex-1 items-center justify-center pb-6">
            <motion.figure
              key={index}
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
              data-cursor="default"
            >
              <div
                className="relative w-full overflow-hidden bg-surface"
                style={{
                  aspectRatio: frameAspect,
                  maxWidth: `min(100%, calc((100svh - var(--nav-h) - 7rem) * ${aw / ah}))`,
                }}
              >
                <Media image={image} aspect={frameAspect} sizes="92vw" />
              </div>
              {image.caption ? (
                <figcaption className="mt-4 max-w-[60ch] text-center text-small text-muted">{image.caption}</figcaption>
              ) : null}
            </motion.figure>
          </div>

          {count > 1 ? (
            <div className="container-x flex shrink-0 justify-between pb-6" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onIndex((index - 1 + count) % count)}
                className="label inline-flex h-11 items-center gap-2 uppercase"
                aria-label="Previous image"
              >
                <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} /> Prev
              </button>
              <button
                type="button"
                onClick={() => onIndex((index + 1) % count)}
                className="label inline-flex h-11 items-center gap-2 uppercase"
                aria-label="Next image"
              >
                Next <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
