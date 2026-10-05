"use client";

import { useEffect, useRef } from "react";
import "./mockup-scene.css";

const VIEW_W = 1440;
const VIEW_H = 900;
const ENTER_MS = 1500;
const SCROLL_MS = 4000;
const SCENE_MS = 8000;

const KEYS = buildKeys();

function buildKeys() {
  const rows = [14, 13, 12, 11];
  const gap = 5;
  const keyH = 11;
  const rowGap = 4;
  const width = 1000;
  const keys: { x: number; y: number; w: number; h: number }[] = [];

  rows.forEach((count, r) => {
    const inset = 10 + r * 16;
    const avail = width - inset * 2;
    const keyW = (avail - gap * (count - 1)) / count;
    const y = r * (keyH + rowGap);
    for (let i = 0; i < count; i++) {
      keys.push({ x: inset + i * (keyW + gap), y, w: keyW, h: keyH });
    }
  });

  const y = rows.length * (keyH + rowGap);
  const spaceW = 280;
  keys.push({ x: 18, y, w: 72, h: keyH });
  keys.push({ x: (width - spaceW) / 2, y, w: spaceW, h: keyH });
  keys.push({ x: width - 90, y, w: 72, h: keyH });
  return keys;
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** The scaled screen clips the iframe's layout box, so lazy images never request. */
function frameSource(img: HTMLImageElement) {
  const srcset = img.getAttribute("srcset");
  if (srcset) {
    const options = srcset.split(",").map((part) => {
      const [url, descriptor] = part.trim().split(/\s+/);
      return { url, width: Number.parseInt(descriptor ?? "0", 10) || 0 };
    });
    const fit = options.find((option) => option.width >= 828);
    if (fit?.url) return fit.url;
    return options.at(-1)?.url;
  }
  return img.getAttribute("src");
}

function wakeImages(doc: Document) {
  doc.querySelectorAll("img").forEach((node) => {
    const img = node as HTMLImageElement;
    if (img.complete && img.naturalWidth > 0) return;
    const src = frameSource(img);
    if (!src || img.dataset.frame === src) return;
    img.dataset.frame = src;
    img.loading = "eager";
    img.removeAttribute("srcset");
    img.src = src;
  });
}

function workScrollTarget(win: Window, doc: Document) {
  const work = doc.getElementById("work");
  if (!work) return 0;
  const title = work.querySelector("h2");
  const anchor = title ?? work;
  const nav = doc.getElementById("site-header")?.getBoundingClientRect().height ?? 0;
  const top = anchor.getBoundingClientRect().top + win.scrollY - nav - 18;
  const max = Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);
  return Math.max(0, Math.min(top, max));
}

export function MockupScene() {
  const cameraRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const camera = cameraRef.current;
    const laptop = laptopRef.current;
    if (!iframe || !camera || !laptop) return;

    let cancelled = false;
    let started = false;
    let raf = 0;
    let wakeFrame = 0;
    let startTimer = 0;
    let images: MutationObserver | null = null;

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stop = () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(wakeFrame);
      images?.disconnect();
    };

    const play = () => {
      if (started || cancelled) return;
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (!doc || !win || !doc.getElementById("hero")) return;
      started = true;

      try {
        win.history.scrollRestoration = "manual";
      } catch {
        /* The iframe can ignore this if the document is not ready. */
      }
      win.scrollTo(0, 0);
      wakeImages(doc);
      const scheduleWake = () => {
        if (wakeFrame || cancelled) return;
        wakeFrame = requestAnimationFrame(() => {
          wakeFrame = 0;
          if (!cancelled) wakeImages(doc);
        });
      };
      images = new MutationObserver(scheduleWake);
      images.observe(doc.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["src", "srcset"] });

      if (reduced()) {
        laptop.dataset.state = "still";
        return;
      }

      const onHold = (event: AnimationEvent) => {
        if (event.target !== camera || event.animationName !== "mockup-push") return;
        camera.dataset.state = "held";
      };
      camera.addEventListener("animationend", onHold);
      laptop.dataset.state = "live";
      camera.dataset.state = "live";

      startTimer = window.setTimeout(() => {
        if (cancelled || reduced()) return;
        const target = workScrollTarget(win, doc);
        const t0 = performance.now();
        const step = (now: number) => {
          if (cancelled) return;
          const p = (now - t0) / SCROLL_MS;
          win.scrollTo(0, target * smoothstep(p));
          if (p < 1) raf = requestAnimationFrame(step);
          else win.scrollTo(0, target);
        };
        raf = requestAnimationFrame(step);
      }, ENTER_MS);

      return () => camera.removeEventListener("animationend", onHold);
    };

    let detachHold = () => {};
    const boot = () => {
      if (started || cancelled) return;
      const remove = play();
      if (remove) detachHold = remove;
    };

    boot();
    iframe.addEventListener("load", boot);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (!motion.matches) return;
      stop();
      laptop.dataset.state = "still";
      camera.dataset.state = "still";
      iframe.contentWindow?.scrollTo(0, 0);
    };
    motion.addEventListener("change", onMotion);

    return () => {
      cancelled = true;
      stop();
      detachHold();
      iframe.removeEventListener("load", boot);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <main id="main" className="mockup-scene">
      <p className="sr-only">
        Laptop preview of the portfolio homepage. It rests on the introduction, then scrolls to selected work.
        <a href="/">Open the portfolio homepage</a>
      </p>

      <div ref={cameraRef} className="mockup-camera" data-state="idle" style={{ ["--scene-ms" as string]: `${SCENE_MS}ms` }}>
        <div ref={laptopRef} className="mockup-laptop" data-state="idle" aria-hidden="true">
          <div className="mockup-lid">
            <div className="mockup-bezel">
              <span className="mockup-cam" />
              <div className="mockup-screen">
                <iframe
                  ref={iframeRef}
                  title="Anas Adel portfolio homepage"
                  src={`/?embed=mockup`}
                  tabIndex={-1}
                  style={{ width: VIEW_W, height: VIEW_H }}
                />
              </div>
            </div>
          </div>
          <div className="mockup-base">
            <svg className="mockup-keys" viewBox="0 0 1000 71" aria-hidden="true">
              {KEYS.map((key, i) => (
                <rect key={i} x={key.x} y={key.y} width={key.w} height={key.h} rx="1.5" />
              ))}
            </svg>
            <span className="mockup-trackpad" />
          </div>
          <div className="mockup-shadow" />
        </div>
      </div>
    </main>
  );
}
