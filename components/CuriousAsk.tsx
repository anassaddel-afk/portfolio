"use client";

import { ArrowRight } from "lucide-react";
import { openAskAnas } from "@/lib/ask-anas";
import { useI18n } from "./LanguageProvider";
import { Magnetic } from "./Magnetic";
import { ScrollRevealText } from "./ScrollRevealText";

export function CuriousAsk() {
  const { t } = useI18n();

  return (
    <section className="border-t border-border" aria-label={t.curious.cta}>
      <div className="container-x py-12 md:py-16">
        <div className="flex max-w-[36rem] flex-col items-start gap-5">
          <ScrollRevealText as="p" className="text-lead text-muted">
            {t.curious.prompt}
          </ScrollRevealText>
          <Magnetic>
            <button
              type="button"
              onClick={openAskAnas}
              className="group inline-flex h-11 items-center gap-3 text-foreground"
            >
              <span className="label link-draw text-(length:--fs-button) group-hover:bg-[length:100%_1px]">
                {t.curious.cta}
              </span>
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="size-4 transition-[translate] duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:nudge-1.5 rtl:-scale-x-100"
              />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
