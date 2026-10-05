"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";
import { useI18n } from "./LanguageProvider";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="site-footer" className="relative z-10 container-x">
      <div className="label grid gap-y-8 border-t border-border py-10 md:grid-cols-12 md:items-center md:gap-x-[var(--gutter)] md:py-12">
        <p className="md:col-span-4">
          {t.name}
          <span className="block text-muted">{t.role}</span>
        </p>

        <div className="flex items-center justify-between gap-8 md:col-span-3 md:col-start-10 md:justify-end">
          <span className="text-muted tabular-nums">© {new Date().getFullYear()}</span>
          <button type="button" onClick={() => scrollToTarget(0)} className="group inline-flex h-11 items-center gap-2">
            {t.footer.backToTop}
            <ArrowUp
              aria-hidden
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
