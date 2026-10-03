"use client";

import { Fragment } from "react";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, switching, t } = useI18n();

  return (
    <div role="group" aria-label={t.language.label} className={cn("label flex h-11 items-center text-(length:--fs-nav)", className)}>
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <Fragment key={l}>
            {i > 0 ? (
              <span aria-hidden className="px-0.5 text-subtle">
                /
              </span>
            ) : null}
            <button
              type="button"
              lang={l}
              onClick={() => setLocale(l)}
              aria-pressed={active}
              aria-label={t.language.switchTo[l]}
              disabled={switching}
              className={cn(
                "relative flex h-11 min-w-9 items-center justify-center px-1.5 transition-colors duration-300",
                active ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {t.language.short[l]}
              {active ? <span aria-hidden className="absolute bottom-2 start-1/2 h-px w-3 -translate-x-1/2 bg-accent rtl:translate-x-1/2" /> : null}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
