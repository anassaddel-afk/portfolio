"use client";

import Image from "next/image";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { EASE_OUT, cn } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";
import { MagneticButton } from "./MagneticButton";
import { TextReveal } from "./TextReveal";

const TOUCH_DISMISS_MS = 3500;
const PHRASE_HOLD_MS = 2800;

/**
 * Inline photo in the headline. Hover (mouse), focus (keyboard) or tap (touch) opens a greeting bubble.
 * The bubble is absolutely positioned, so opening it never shifts the headline.
 */
function InlinePortrait() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [wave, setWave] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const pointer = useRef("mouse");
  const bubbleId = useId();

  const show = () => {
    if (!open) setWave((n) => n + 1);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) hide();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={t.hero.portraitLabel}
      aria-expanded={open}
      aria-describedby={bubbleId}
      data-cursor="link"
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && show()}
      onBlur={hide}
      onClick={(e) => {
        const type = e.detail === 0 ? "keyboard" : pointer.current;
        if (type === "mouse") return;
        if (open) return hide();
        show();
        if (type !== "keyboard") {
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setOpen(false), TOUCH_DISMISS_MS);
        }
      }}
      className="group relative mx-[0.04em] inline-block h-[0.74em] w-[1.3em] -translate-y-[0.04em] rounded-full align-middle"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full bg-surface">
        <Image
          src={site.portrait.src}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 240px, 120px"
          className={cn(
            "object-cover object-[50%_30%] transition-[filter,scale] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
            open ? "scale-[1.06] grayscale-0" : "grayscale",
          )}
        />
      </span>

      <motion.span
        id={bubbleId}
        role="tooltip"
        initial={{ opacity: 0, y: 8, scale: 0.92, visibility: "hidden" }}
        animate={
          open
            ? { opacity: 1, y: 0, scale: 1, visibility: "visible" }
            : { opacity: 0, y: 8, scale: 0.92, transitionEnd: { visibility: "hidden" } }
        }
        transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 520, damping: 30, mass: 0.7 }}
        className="pointer-events-none absolute bottom-[calc(100%+10px)] start-[42%] z-10 flex origin-bottom-left items-center gap-2 whitespace-nowrap rounded-2xl rounded-es-sm bg-foreground px-3.5 py-2 text-(length:--fs-greeting) leading-snug font-medium tracking-normal text-background shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] rtl:origin-bottom-right"
      >
        <span key={wave} aria-hidden className={cn("text-[1.1em] leading-none", open && !reduce && "wave")}>
          👋
        </span>
        <span>{t.hero.greeting}</span>
        <span aria-hidden className="absolute -bottom-[5px] start-2.5 size-2.5 rotate-45 rounded-[2px] bg-foreground" />
      </motion.span>
    </button>
  );
}

/** Renders a headline line, replacing `{portrait}` with the photo. */
function HeadlineLine({ text }: { text: string }) {
  return text
    .split(/(\{portrait\})/)
    .filter(Boolean)
    .map((part, i) => {
      if (part === "{portrait}") return <InlinePortrait key={i} />;
      return <Fragment key={i}>{part}</Fragment>;
    });
}

/**
 * Editorial rotating closer. Invisible copies of every phrase lock the slot to the longest line,
 * so the Hero never jumps. Reduced motion still advances the phrase, without the vertical move.
 */
function RotatingPhrase({ phrases }: { phrases: readonly string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const current = phrases[i % phrases.length] ?? phrases[0];

  useEffect(() => {
    if (phrases.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % phrases.length), PHRASE_HOLD_MS);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  return (
    <span className="relative mx-auto grid max-w-full justify-items-center">
      {phrases.map((phrase) => (
        <span key={phrase} aria-hidden className="invisible col-start-1 row-start-1 max-w-full text-balance">
          {phrase}
        </span>
      ))}

      <span className="hero-phrase-root relative col-start-1 row-start-1 block h-full w-full overflow-hidden">
        {reduce ? (
          <span className="hero-phrase block max-w-full text-balance">{current}</span>
        ) : (
          <AnimatePresence initial={false}>
            <motion.span
              key={current}
              className="absolute inset-0 flex items-center justify-center text-center"
              initial={{ y: "0.38em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-0.38em", opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <span className="hero-phrase text-balance">{current}</span>
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}

/** Quiet cue at the foot of the Hero. Opacity breathes; scrolling fades it out. */
function ScrollCue({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 48], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none flex shrink-0 justify-center pt-8">
      <p data-safe className={cn("label flex flex-col items-center gap-2 text-muted", reduce ? "opacity-40" : "scroll-cue")}>
        {label}
        <span aria-hidden className="text-[0.875rem] leading-none">
          ↓
        </span>
      </p>
    </motion.div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const { hero } = t;
  const headingId = useId();

  const toWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget("#work");
  };

  return (
    <section
      id="hero"
      aria-label={hero.label}
      className="container-x relative z-[1] flex min-h-[100svh] flex-col pt-[calc(var(--nav-h)+var(--space-7))] pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pt-[calc(var(--nav-h)+var(--space-8))] md:pb-10 lg:pt-[calc(var(--nav-h)+var(--space-9))] lg:pb-12"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div data-safe className="relative z-10 flex flex-col items-center">
        <motion.p
          className="label text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {hero.eyebrow}
        </motion.p>

        <span id={headingId} hidden>
          {hero.headlineText}
        </span>
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.15}
          stagger={0.1}
          labelledBy={headingId}
          className="mt-4 max-w-[22ch] text-[length:var(--fs-hero)] leading-[var(--lh-hero)] font-medium tracking-[var(--tracking-display)] text-balance md:max-w-[24ch]"
          lineClassName="max-lg:whitespace-normal"
          lines={[
            ...hero.headline.map((line, i) => <HeadlineLine key={i} text={line} />),
            <RotatingPhrase key="rotating" phrases={hero.rotating} />,
          ]}
        />

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.65 }}
        >
          <MagneticButton href="/#work" variant="hero" onClick={toWork}>
            {hero.viewWork}
          </MagneticButton>
          <MagneticButton href="/#contact" variant="text" onClick={(e) => (e.preventDefault(), scrollToTarget("#contact"))}>
            {hero.letsTalk}
          </MagneticButton>
        </motion.div>
        </div>
      </div>

      <ScrollCue label={hero.scrollDown} />
    </section>
  );
}
