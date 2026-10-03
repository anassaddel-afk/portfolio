"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, MessageCircle, X } from "lucide-react";
import { localAssistant } from "@/data/assistant";
import type { AssistantMessage, SuggestedQuestion } from "@/lib/assistant";
import { lockScroll } from "@/lib/scroll";
import { ASK_ANAS_OPEN } from "@/lib/ask-anas";
import { EASE_OUT, cn } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";

type Turn = { user: string; assistant: AssistantMessage };

export function AskAnas() {
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [browse, setBrowse] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const copy = t.askAnas;
  const questions = localAssistant.questions(locale);

  useEffect(() => {
    setTurns([]);
    setPending(false);
    setBrowse(true);
  }, [locale]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(ASK_ANAS_OPEN, onOpen);
    return () => window.removeEventListener(ASK_ANAS_OPEN, onOpen);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 767.98px)");
    if (mobile.matches) lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("button, a, textarea, input")].filter(
        (el) => !el.hasAttribute("disabled"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    const last = logRef.current?.querySelector<HTMLElement>("[data-turn]:last-child");
    last?.scrollIntoView({ block: "nearest", behavior: reduce ? "instant" : "smooth" });
  }, [turns, pending, reduce]);

  const ask = async (text: string, questionId?: string) => {
    if (pending || !text.trim()) return;
    setPending(true);
    setBrowse(false);
    const reply = await Promise.resolve(localAssistant.respond({ locale, text, questionId }));
    setTurns((prev) => [...prev, { user: text, assistant: reply }]);
    setPending(false);
  };

  const spring = reduce ? { duration: 0.15 } : { duration: 0.4, ease: EASE_OUT };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="backdrop"
            aria-hidden
            className="fixed inset-0 z-[54] bg-background/40 md:bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div className="contents">
        <AnimatePresence>
          {open ? (
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              id="ask-anas"
              aria-labelledby={titleId}
              data-safe
              data-lenis-prevent
              className="pointer-events-auto fixed inset-x-3 top-[calc(var(--nav-h)+0.75rem)] bottom-3 z-[55] grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[var(--radius-md)] border border-border bg-background shadow-[0_24px_80px_-32px_rgb(0_0_0/0.45)] md:inset-auto md:bottom-6 md:end-6 md:top-auto md:h-auto md:max-h-[min(38rem,calc(100svh-var(--nav-h)-3.5rem))] md:w-[min(26rem,calc(100vw-2.5rem))] origin-bottom md:origin-bottom-right rtl:md:origin-bottom-left"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={spring}
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div className="min-w-0">
                  <h2 id={titleId} className="text-lead font-medium tracking-(--tracking-tight)">
                    {copy.name}
                  </h2>
                  <p className="mt-1 max-w-[36ch] text-small text-muted">{copy.subtitle}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={copy.close}
                  className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-surface"
                >
                  <X aria-hidden className="size-4" strokeWidth={1.5} />
                </button>
              </header>

              <div ref={logRef} className="min-h-0 overflow-y-auto overscroll-contain px-5 py-4">
                {turns.length ? (
                  <ol className="flex flex-col gap-6">
                    {turns.map((turn) => (
                      <li key={turn.assistant.id} data-turn className="flex flex-col gap-3">
                        <p className="self-end max-w-[36ch] rounded-2xl rounded-ee-sm bg-surface px-3.5 py-2 text-small">{turn.user}</p>
                        <Answer
                          message={turn.assistant}
                          explore={copy.explore}
                          related={copy.related}
                          onNavigate={() => setOpen(false)}
                        />
                      </li>
                    ))}
                  </ol>
                ) : null}
                {browse ? (
                  <div className={cn(turns.length > 0 && "mt-8 border-t border-border pt-4")}>
                    <p className="label text-muted">{copy.questions}</p>
                    <ul className="mt-4 flex flex-col">
                    {questions.map((item) => (
                      <QuestionRow
                        key={item.id}
                        item={item}
                        disabled={pending}
                        onAsk={() => ask(item.question, item.id)}
                      />
                    ))}
                    </ul>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBrowse(true)}
                    className="label mt-4 flex h-11 items-center text-muted hover:text-foreground"
                  >
                    {copy.more}
                  </button>
                )}
              </div>

              <form
                className="border-t border-border px-3 py-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const field = e.currentTarget.elements.namedItem("ask") as HTMLInputElement;
                  const value = field.value.trim();
                  if (!value) return;
                  field.value = "";
                  ask(value);
                }}
              >
                <input
                  name="ask"
                  type="text"
                  autoComplete="off"
                  placeholder={copy.placeholder}
                  className="h-11 w-full bg-transparent px-2 text-small outline-none placeholder:text-subtle"
                  aria-label={copy.placeholder}
                />
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {!hidden && !open ? (
            <motion.button
              key="fab"
              type="button"
              aria-expanded={false}
              aria-controls="ask-anas"
              aria-label={copy.open}
              onClick={() => setOpen(true)}
              data-safe
              className="label fixed bottom-[max(5.25rem,calc(env(safe-area-inset-bottom)+4.25rem))] end-3 z-40 flex h-12 items-center gap-2 rounded-full border border-border bg-background pe-5 ps-4 text-(length:--fs-nav) shadow-[0_12px_40px_-18px_rgb(0_0_0/0.4)] transition-colors hover:border-foreground md:end-6"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={spring}
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.5} />
              <span>{copy.open}</span>
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

function QuestionRow({ item, disabled, onAsk }: { item: SuggestedQuestion; disabled: boolean; onAsk: () => void }) {
  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={onAsk}
        className="group flex w-full items-baseline justify-between gap-4 border-b border-border py-2.5 text-start last:border-b-0 disabled:opacity-50"
      >
        <span>
          <span className="label block text-subtle">{item.topic}</span>
          <span className="mt-1 block text-small transition-[translate] duration-500 ease-[var(--ease-out)] group-hover:nudge-1">
            {item.question}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          strokeWidth={1.5}
          className="size-4 shrink-0 self-center text-muted transition-[translate,opacity] duration-500 group-hover:nudge-1 group-hover:text-foreground rtl:-scale-x-100"
        />
      </button>
    </li>
  );
}

function Answer({
  message,
  explore,
  related,
  onNavigate,
}: {
  message: AssistantMessage;
  explore: string;
  related: string;
  onNavigate: () => void;
}) {
  const reduce = useReducedMotion();
  const external = message.link?.href.startsWith("http");
  const Icon = external ? ArrowUpRight : ArrowRight;
  const label = message.link?.kind === "case" ? explore : related;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.15 } : { duration: 0.5, ease: EASE_OUT }}
      className="flex flex-col gap-3"
    >
      {message.paragraphs.map((p) => (
        <p key={p} className="text-small text-muted">
          {p}
        </p>
      ))}
      {message.link ? (
        <Link
          href={message.link.href}
          onClick={onNavigate}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="group mt-1 inline-flex h-11 w-fit items-center gap-2 text-small"
        >
          <span className="link-draw group-hover:bg-[length:100%_1px]">
            {label}
            {message.link.title ? ` — ${message.link.title}` : ""}
          </span>
          <Icon
            aria-hidden
            strokeWidth={1.5}
            className={cn(
              "size-3.5 transition-[translate] duration-500 rtl:-scale-x-100",
              external ? "group-hover:-translate-y-0.5 group-hover:nudge-0.5" : "group-hover:nudge-1",
            )}
          />
        </Link>
      ) : null}
    </motion.div>
  );
}
