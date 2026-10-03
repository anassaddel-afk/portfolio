"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { translations, type Dictionary } from "@/data/translations";
import { LOCALE_COOKIE, directionOf, type Direction, type Locale } from "@/lib/i18n";
import { getLenis } from "@/lib/scroll";

type ContextValue = {
  locale: Locale;
  dir: Direction;
  t: Dictionary;
  switching: boolean;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<ContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}

const FADE_MS = 220;

type Anchor = { id: string; progress: number } | { y: number };

/** Remembers which section the reader is in, as a fraction of it, so a taller or shorter translation lands in the same place. */
function captureAnchor(): Anchor {
  const probe = window.innerHeight * 0.3;
  const sections = [...document.querySelectorAll<HTMLElement>("#main section[id], #main [data-anchor]")];
  let current: HTMLElement | null = null;
  for (const el of sections) {
    if (el.getBoundingClientRect().top <= probe) current = el;
  }
  if (!current || window.scrollY < 8) return { y: window.scrollY };
  const r = current.getBoundingClientRect();
  return { id: current.id, progress: (probe - r.top) / Math.max(r.height, 1) };
}

function restoreAnchor(anchor: Anchor) {
  let target: number;
  if ("y" in anchor) target = anchor.y;
  else {
    const el = document.getElementById(anchor.id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    target = window.scrollY + r.top + anchor.progress * r.height - window.innerHeight * 0.3;
  }
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
  else window.scrollTo({ top: target, behavior: "instant" });
}

/**
 * The locale comes from the server (cookie), so the first paint is already in the right language.
 * Switching fades the page out, updates the cookie, re-renders the server tree in place and fades back in.
 */
export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [pending, setPending] = useState<Locale | null>(null);
  const anchor = useRef<Anchor | null>(null);
  const dir = directionOf(locale);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale || pending) return;
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      anchor.current = captureAnchor();
      setPending(next);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.documentElement.dataset.langSwitching = "";
      window.setTimeout(() => startTransition(() => router.refresh()), reduce ? 0 : FADE_MS);
    },
    [locale, pending, router],
  );

  useLayoutEffect(() => {
    if (!pending || pending !== locale) return;
    if (anchor.current) restoreAnchor(anchor.current);
    anchor.current = null;
    setPending(null);
    requestAnimationFrame(() => {
      delete document.documentElement.dataset.langSwitching;
    });
  }, [locale, pending]);

  useEffect(() => {
    if (!pending) return;
    const safety = window.setTimeout(() => {
      delete document.documentElement.dataset.langSwitching;
      setPending(null);
    }, 6000);
    return () => window.clearTimeout(safety);
  }, [pending]);

  return (
    <LanguageContext.Provider value={{ locale, dir, t: translations[locale], switching: pending !== null, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
