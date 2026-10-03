"use client";

import { createElement, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";

type Tag = "p" | "h2" | "h3" | "div";

type ScrollRevealTextProps = {
  as?: Tag;
  className?: string;
  children: string;
  id?: string;
};

const COPIED_STYLES = [
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-feature-settings",
  "font-variation-settings",
  "letter-spacing",
  "word-spacing",
  "line-height",
  "text-transform",
  "text-indent",
  "direction",
  "text-align",
  "word-break",
  "overflow-wrap",
  "white-space",
  "text-wrap",
  "hyphens",
] as const;

function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  const pad = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  return Math.max(0, el.clientWidth - pad);
}

/** Group words by the line boxes the browser actually wraps, including RTL. */
function splitLines(text: string, width: number, style: CSSStyleDeclaration): string[][] {
  const probe = document.createElement("div");
  probe.setAttribute("aria-hidden", "true");
  probe.style.position = "fixed";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.top = "0";
  probe.style.insetInlineStart = "0";
  probe.style.width = `${width}px`;
  probe.style.margin = "0";
  probe.style.padding = "0";
  probe.style.border = "0";
  probe.style.boxSizing = "border-box";
  for (const prop of COPIED_STYLES) {
    probe.style.setProperty(prop, style.getPropertyValue(prop));
  }

  const parts = text.split(/(\s+)/).filter((part) => part.length > 0);
  const spans: HTMLSpanElement[] = [];
  for (const part of parts) {
    const span = document.createElement("span");
    span.textContent = part;
    probe.appendChild(span);
    spans.push(span);
  }

  document.body.appendChild(probe);
  try {
    const lines: string[][] = [];
    let currentTop = Number.NaN;
    for (const span of spans) {
      const content = span.textContent ?? "";
      if (!content.trim()) {
        if (lines.length > 0) lines[lines.length - 1].push(content);
        continue;
      }
      const top = Math.round(span.getBoundingClientRect().top);
      if (lines.length === 0 || Math.abs(top - currentTop) > 2) {
        lines.push([content]);
        currentTop = top;
      } else {
        lines[lines.length - 1].push(content);
      }
    }
    return lines.filter((line) => line.join("").trim().length > 0);
  } finally {
    probe.remove();
  }
}

function linesEqual(current: string[][] | null, next: string[][]) {
  if (!current || current.length !== next.length) return false;
  for (let i = 0; i < current.length; i++) {
    if (current[i].join("") !== next[i].join("")) return false;
  }
  return true;
}

function progressFor(top: number, index: number, vh: number) {
  const shift = Math.min(index, 6) * vh * 0.022;
  const start = vh * 0.82 - shift;
  const end = vh * 0.4 - shift;
  const raw = (start - top) / (start - end || 1);
  if (raw <= 0) return 0;
  if (raw >= 1) return 1;
  return raw;
}

function applyProgress(line: HTMLElement, top: number, vh: number) {
  const index = Number(line.dataset.revealIndex ?? "0");
  line.style.setProperty("--reveal", progressFor(top, index, vh).toFixed(4));
}

const active = new Set<HTMLElement>();
let rafId = 0;

function tick() {
  const vh = window.innerHeight;
  const lines = [...active];
  const tops = lines.map((line) => line.getBoundingClientRect().top);
  for (let i = 0; i < lines.length; i++) applyProgress(lines[i], tops[i], vh);
  rafId = active.size > 0 ? requestAnimationFrame(tick) : 0;
}

function kick() {
  if (!rafId && active.size > 0) rafId = requestAnimationFrame(tick);
}

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      const vh = window.innerHeight;
      for (const entry of entries) {
        const nodes = [...(entry.target as HTMLElement).querySelectorAll<HTMLElement>("[data-reveal-line]")];
        if (entry.isIntersecting) {
          for (const node of nodes) active.add(node);
        } else {
          const tops = nodes.map((node) => node.getBoundingClientRect().top);
          nodes.forEach((node, i) => {
            applyProgress(node, tops[i], vh);
            active.delete(node);
          });
        }
      }
      kick();
    },
    { rootMargin: "18% 0px 12% 0px", threshold: 0 },
  );
  return observer;
}

function register(root: HTMLElement) {
  const io = getObserver();
  io.observe(root);
  return () => {
    io.unobserve(root);
    root.querySelectorAll<HTMLElement>("[data-reveal-line]").forEach((node) => active.delete(node));
    if (active.size === 0 && rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollRevealText({ as = "p", className, children, id }: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<string[][] | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    let frame = 0;
    let cancelled = false;

    const measure = () => {
      if (prefersReducedMotion()) {
        root.classList.remove("is-ready");
        setLines(null);
        return;
      }
      const width = contentWidth(root);
      if (width <= 0) return;
      const next = splitLines(children, width, getComputedStyle(root));
      if (next.length === 0) return;
      setLines((prev) => (linesEqual(prev, next) ? prev : next));
    };

    measure();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(root);
    document.fonts?.ready.then(() => {
      if (!cancelled && root.isConnected) measure();
    });

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    motion.addEventListener("change", measure);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      motion.removeEventListener("change", measure);
      root.classList.remove("is-ready");
    };
  }, [children]);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !lines || prefersReducedMotion()) return;
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-reveal-line]")];
    const vh = window.innerHeight;
    const tops = nodes.map((node) => node.getBoundingClientRect().top);
    nodes.forEach((node, i) => applyProgress(node, tops[i], vh));
    root.classList.add("is-ready");
    return register(root);
  }, [lines]);

  const content: ReactNode = lines
    ? lines.map((line, index) => (
        <span key={index} data-reveal-line data-reveal-index={index} className="scroll-reveal-line block">
          <span className="scroll-reveal-inner block">{line.join("")}</span>
        </span>
      ))
    : children;

  return createElement(
    as,
    { ref: ref as Ref<HTMLElement>, id, className: cn("scroll-reveal", className) },
    content,
  );
}
