"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, Minimize2, X, ZoomIn, ZoomOut } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { lockScroll } from "@/lib/scroll";
import { clamp, cn, pad } from "@/lib/utils";
import { useI18n } from "../LanguageProvider";
import { toneOf } from "../Media";

type LightboxProps = {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/** Full-screen viewer: the whole image first, then zoom and pan. */
export function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {index !== null && images[index] ? (
        <Viewer key="viewer" images={images} index={index} onClose={onClose} onIndex={onIndex} />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

type Point = { x: number; y: number };
type Geometry = { w: number; h: number; fitW: number; fitH: number; maxScale: number };
type Gesture = {
  type: string;
  start: Point;
  x0: number;
  y0: number;
  moved: boolean;
  last: { p: Point; t: number };
  v: Point;
  pinch?: { d0: number; s0: number; m0: Point; x0: number; y0: number };
};

/** Space kept around the fitted image, in px. */
const PAD = 24;
const ZOOM_STEP = 1.6;
const TAP_ZOOM = 2.5;
const SWIPE = 60;

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const mid = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** How far the image may move from centre at a given scale before an edge leaves the stage. */
function bounds(g: Geometry, s: number) {
  return { x: Math.max(0, (g.fitW * s - g.w) / 2), y: Math.max(0, (g.fitH * s - g.h) / 2) };
}

/** Pan that keeps the image point under `at` (stage coords) fixed while scaling from s0 to s. */
function anchored(g: Geometry, at: Point, s0: number, s: number, x0: number, y0: number) {
  const b = bounds(g, s);
  const px = at.x - g.w / 2;
  const py = at.y - g.h / 2;
  return {
    x: clamp(px - (px - x0) * (s / s0), -b.x, b.x),
    y: clamp(py - (py - y0) * (s / s0), -b.y, b.y),
  };
}

type ViewerProps = { images: ProjectImage[]; index: number; onClose: () => void; onIndex: (i: number) => void };

function Viewer({ images, index, onClose, onIndex }: ViewerProps) {
  const { t, dir } = useI18n();
  const reduce = useReducedMotion();
  const rtl = dir === "rtl";
  const image = images[index];
  const count = images.length;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hintId = useId();

  const [stage, setStage] = useState({ w: 0, h: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const [level, setLevel] = useState(1);
  const [overImage, setOverImage] = useState(false);
  useMotionValueEvent(scale, "change", (v) => setLevel(v));

  const ratio = image.width / image.height;
  const fitW = Math.max(0, Math.min(stage.w - PAD * 2, (stage.h - PAD * 2) * ratio));
  const fitH = fitW / ratio;
  const maxScale = fitW > 0 ? clamp((image.width / fitW) * 1.5, 2, 4) : 2;
  const zoomed = level > 1.01;
  const atMax = level >= maxScale - 0.01;

  const geo = useRef<Geometry>({ w: 0, h: 0, fitW: 0, fitH: 0, maxScale: 2 });
  useLayoutEffect(() => {
    geo.current = { w: stage.w, h: stage.h, fitW, fitH, maxScale };
  }, [stage.w, stage.h, fitW, fitH, maxScale]);

  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture | null>(null);
  const lastTap = useRef<{ t: number; p: Point } | null>(null);

  useEffect(() => {
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      previous?.focus();
    };
  }, []);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setStage({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stopAll = useCallback(() => {
    x.stop();
    y.stop();
    scale.stop();
  }, [x, y, scale]);

  const spring = reduce ? { duration: 0 } : ({ type: "spring", stiffness: 320, damping: 36 } as const);

  const zoomTo = useCallback(
    (target: number, at?: Point) => {
      const g = geo.current;
      const s0 = scale.get();
      const s = clamp(target, 1, g.maxScale);
      const pos = anchored(g, at ?? { x: g.w / 2, y: g.h / 2 }, s0, s, x.get(), y.get());
      const opts = reduce ? { duration: 0 } : ({ type: "spring", stiffness: 320, damping: 36 } as const);
      stopAll();
      animate(scale, s, opts);
      animate(x, pos.x, opts);
      animate(y, pos.y, opts);
    },
    [x, y, scale, reduce, stopAll],
  );

  const fit = useCallback(() => zoomTo(1), [zoomTo]);

  const go = useCallback((delta: number) => count > 1 && onIndex((index + delta + count) % count), [count, index, onIndex]);

  // Every image opens fitted.
  useEffect(() => {
    stopAll();
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [index, x, y, scale, stopAll]);

  const panBy = useCallback(
    (dx: number, dy: number) => {
      const b = bounds(geo.current, scale.get());
      stopAll();
      x.set(clamp(x.get() + dx, -b.x, b.x));
      y.set(clamp(y.get() + dy, -b.y, b.y));
    },
    [x, y, scale, stopAll],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const at = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (e.ctrlKey || e.metaKey) {
        const g = geo.current;
        const s0 = scale.get();
        const s = clamp(s0 * Math.exp(-e.deltaY * 0.01), 1, g.maxScale);
        const pos = anchored(g, at, s0, s, x.get(), y.get());
        stopAll();
        scale.set(s);
        x.set(pos.x);
        y.set(pos.y);
      } else if (scale.get() > 1.01) {
        panBy(-e.deltaX, -e.deltaY);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [x, y, scale, stopAll, panBy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isZoomed = scale.get() > 1.01;
      const forward = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === "Escape") {
        if (isZoomed) fit();
        else onClose();
      } else if (e.key === "+" || e.key === "=") zoomTo(scale.get() * ZOOM_STEP);
      else if (e.key === "-" || e.key === "_") zoomTo(scale.get() / ZOOM_STEP);
      else if (e.key === "0") fit();
      else if (isZoomed && e.key.startsWith("Arrow")) {
        e.preventDefault();
        const step = 80;
        if (e.key === "ArrowLeft") panBy(step, 0);
        if (e.key === "ArrowRight") panBy(-step, 0);
        if (e.key === "ArrowUp") panBy(0, step);
        if (e.key === "ArrowDown") panBy(0, -step);
      } else if (e.key === forward) go(1);
      else if (e.key === back) go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])")];
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
  }, [rtl, scale, fit, zoomTo, panBy, go, onClose]);

  const local = (e: React.PointerEvent): Point => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const inside = (p: Point) => {
    const g = geo.current;
    const s = scale.get();
    const cx = g.w / 2 + x.get();
    const cy = g.h / 2 + y.get();
    return Math.abs(p.x - cx) <= (g.fitW * s) / 2 && Math.abs(p.y - cy) <= (g.fitH * s) / 2;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = local(e);
    pointers.current.set(e.pointerId, p);
    stopAll();
    if (pointers.current.size === 1) {
      gesture.current = { type: e.pointerType, start: p, x0: x.get(), y0: y.get(), moved: false, last: { p, t: e.timeStamp }, v: { x: 0, y: 0 } };
    } else if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.moved = true;
      gesture.current.pinch = { d0: Math.max(dist(a, b), 1), s0: scale.get(), m0: mid(a, b), x0: x.get(), y0: y.get() };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = local(e);
    if (!pointers.current.has(e.pointerId)) {
      if (e.pointerType === "mouse") setOverImage(inside(p));
      return;
    }
    pointers.current.set(e.pointerId, p);
    const g = gesture.current;
    if (!g) return;

    if (g.pinch && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const geom = geo.current;
      const s = clamp((g.pinch.s0 * dist(a, b)) / g.pinch.d0, 1, geom.maxScale);
      const m = mid(a, b);
      const m0x = g.pinch.m0.x - geom.w / 2;
      const m0y = g.pinch.m0.y - geom.h / 2;
      const bnd = bounds(geom, s);
      scale.set(s);
      x.set(clamp(m.x - geom.w / 2 - (m0x - g.pinch.x0) * (s / g.pinch.s0), -bnd.x, bnd.x));
      y.set(clamp(m.y - geom.h / 2 - (m0y - g.pinch.y0) * (s / g.pinch.s0), -bnd.y, bnd.y));
      return;
    }

    const dx = p.x - g.start.x;
    const dy = p.y - g.start.y;
    if (!g.moved && Math.hypot(dx, dy) > 5) g.moved = true;
    if (!g.moved) return;
    const dt = Math.max(e.timeStamp - g.last.t, 1);
    g.v = { x: ((p.x - g.last.p.x) / dt) * 1000, y: ((p.y - g.last.p.y) / dt) * 1000 };
    g.last = { p, t: e.timeStamp };

    if (scale.get() > 1.01) {
      const b = bounds(geo.current, scale.get());
      x.set(clamp(g.x0 + dx, -b.x, b.x));
      y.set(clamp(g.y0 + dy, -b.y, b.y));
    } else if (count > 1) {
      x.set(dx * 0.35);
    }
  };

  const glide = (mv: MotionValue<number>, velocity: number, max: number) =>
    animate(mv, mv.get(), {
      type: "inertia",
      velocity: reduce ? 0 : velocity,
      min: -max,
      max,
      power: 0.35,
      timeConstant: 260,
      bounceStiffness: 500,
      bounceDamping: 40,
    });

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = local(e);
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    if (!g) return;

    if (pointers.current.size === 1) {
      const [rest] = [...pointers.current.values()];
      gesture.current = { ...g, pinch: undefined, start: rest, x0: x.get(), y0: y.get(), last: { p: rest, t: e.timeStamp }, v: { x: 0, y: 0 } };
      return;
    }
    if (pointers.current.size > 1) return;
    gesture.current = null;
    const s = scale.get();

    if (g.moved) {
      if (s > 1.01) {
        const b = bounds(geo.current, s);
        glide(x, g.v.x, b.x);
        glide(y, g.v.y, b.y);
        return;
      }
      if (s !== 1) zoomTo(1);
      animate(x, 0, spring);
      const dx = p.x - g.start.x;
      if (count > 1 && Math.abs(dx) > SWIPE) go((rtl ? dx > 0 : dx < 0) ? 1 : -1);
      return;
    }

    // A tap or click that didn't move.
    if (g.type === "mouse") {
      if (s > 1.01) fit();
      else if (inside(p)) zoomTo(TAP_ZOOM, p);
      else onClose();
      return;
    }
    const prev = lastTap.current;
    if (prev && e.timeStamp - prev.t < 300 && dist(p, prev.p) < 30) {
      lastTap.current = null;
      if (s > 1.01) fit();
      else zoomTo(TAP_ZOOM, p);
      return;
    }
    lastTap.current = { t: e.timeStamp, p };
    if (s <= 1.01 && !inside(p)) onClose();
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) {
      gesture.current = null;
      if (scale.get() <= 1.01) animate(x, 0, spring);
    }
  };

  const cursorLabel = zoomed ? t.cursor.drag : overImage ? t.cursor.zoom : t.cursor.close;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.lightbox.label}
      data-lenis-prevent
      className="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-x label flex h-[var(--nav-h)] shrink-0 items-center justify-between gap-4">
        <span className="text-muted tabular-nums">
          {pad(index + 1)} / {pad(count)}
        </span>
        <div className="flex items-center gap-1">
          <ToolButton label={t.lightbox.zoomOut} onClick={() => zoomTo(scale.get() / ZOOM_STEP)} disabled={!zoomed}>
            <ZoomOut aria-hidden className="size-4" strokeWidth={1.5} />
          </ToolButton>
          <ToolButton label={t.lightbox.zoomIn} onClick={() => zoomTo(scale.get() * ZOOM_STEP)} disabled={atMax}>
            <ZoomIn aria-hidden className="size-4" strokeWidth={1.5} />
          </ToolButton>
          <ToolButton label={t.lightbox.fit} onClick={fit} disabled={!zoomed}>
            <Minimize2 aria-hidden className="size-4" strokeWidth={1.5} />
          </ToolButton>
          <span aria-hidden className="mx-2 h-5 w-px bg-border" />
          <button ref={closeRef} type="button" onClick={onClose} className="inline-flex h-11 items-center gap-2 ps-2">
            {t.lightbox.close} <X aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={cn(
          "relative min-h-0 flex-1 touch-none select-none overflow-hidden",
          zoomed ? "cursor-grab active:cursor-grabbing" : overImage ? "cursor-zoom-in" : "cursor-default",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOverImage(false)}
        aria-describedby={hintId}
        data-cursor={zoomed ? "drag" : "image"}
        data-cursor-label={cursorLabel}
      >
        {fitW > 0 ? (
          <motion.div
            key={index}
            className="absolute will-change-transform"
            style={{
              left: (stage.w - fitW) / 2,
              top: (stage.h - fitH) / 2,
              width: fitW,
              height: fitH,
              x,
              y,
              scale,
              background: toneOf(image),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={90}
              sizes="200vw"
              draggable={false}
              className="pointer-events-none object-contain"
            />
          </motion.div>
        ) : null}
      </div>

      <div className="container-x grid shrink-0 grid-cols-[auto_1fr_auto] items-center gap-4 pb-5 pt-3">
        {count > 1 ? (
          <button
            type="button"
            onClick={() => go(-1)}
            className="label inline-flex h-11 items-center gap-2"
            aria-label={t.lightbox.previous}
          >
            <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.lightbox.prevShort}</span>
          </button>
        ) : (
          <span />
        )}
        <div className="flex min-w-0 flex-col items-center gap-1 text-center">
          {image.caption ? <p className="max-w-[60ch] text-small text-muted">{image.caption}</p> : null}
          <p id={hintId} className="label text-subtle" aria-live="polite">
            {zoomed ? t.lightbox.hintPan : t.lightbox.hintZoom}
          </p>
        </div>
        {count > 1 ? (
          <button
            type="button"
            onClick={() => go(1)}
            className="label inline-flex h-11 items-center gap-2"
            aria-label={t.lightbox.next}
          >
            <span className="hidden sm:inline">{t.lightbox.nextShort}</span>
            <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" strokeWidth={1.5} />
          </button>
        ) : (
          <span />
        )}
      </div>
    </motion.div>
  );
}

function ToolButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
