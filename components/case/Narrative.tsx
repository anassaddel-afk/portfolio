"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type {
  CompareColumn,
  InsightItem,
  JourneyStep,
  FrameworkColumn,
  MetricItem,
  PathItem,
  PhoneItem,
  ProjectImage,
  SystemItem,
} from "@/data/projects";
import { cn, pad } from "@/lib/utils";
import { ImageReveal } from "../ImageReveal";
import { useI18n } from "../LanguageProvider";
import { Media, toneOf } from "../Media";
import { Reveal } from "../Reveal";
import { Lightbox } from "./Lightbox";

function Phone({
  image,
  label,
  removed,
  onOpen,
  className,
  delay = 0,
}: {
  image?: ProjectImage;
  label?: string;
  removed?: boolean;
  onOpen?: () => void;
  className?: string;
  delay?: number;
}) {
  const { t } = useI18n();

  const frame = image && !removed ? (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full overflow-hidden rounded-[1.75rem] ring-1 ring-border transition-transform duration-[1100ms] ease-[var(--ease-out)] hover:scale-[1.015]"
      style={{ aspectRatio: `${image.width} / ${image.height}`, background: toneOf(image) }}
      data-cursor="image"
      data-cursor-label={t.cursor.zoom}
      aria-label={`${t.gallery.open}: ${image.alt}`}
    >
      <ImageReveal className="absolute inset-0" delay={delay}>
        <div className="absolute inset-0" style={{ background: toneOf(image) }}>
          <Media image={image} sizes="(min-width: 768px) 28vw, 80vw" />
        </div>
      </ImageReveal>
    </button>
  ) : (
    <div className="flex aspect-[9/19.5] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-border px-5 text-center">
      <p className="label text-accent">{t.beforeAfter.before}</p>
      <p className="mt-3 text-small text-muted">{label}</p>
    </div>
  );

  return (
    <figure className={cn("flex w-full flex-col items-center gap-3", className)}>
      {frame}
      {label && image ? <figcaption className="label text-muted">{label}</figcaption> : null}
    </figure>
  );
}

function Arrow({ down, className }: { down?: boolean; className?: string }) {
  return (
    <ChevronRight
      aria-hidden
      strokeWidth={1.5}
      className={cn("size-4 shrink-0 text-muted", down ? "rotate-90" : "rtl:rotate-180", className)}
    />
  );
}

export function Insights({ items }: { items: InsightItem[] }) {
  return (
    <ol className="grid gap-x-[var(--gutter)] gap-y-10 md:grid-cols-2">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % 2) * 0.06} className="border-t border-border pt-5">
          <p className="label tabular-nums text-accent">{item.kicker ?? pad(i + 1)}</p>
          <h3 className="mt-4 text-lead font-medium tracking-(--tracking-tight)">{item.title}</h3>
          <p className="mt-2 max-w-[44ch] text-body text-muted">{item.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Compare({ left, right }: { left: CompareColumn; right: CompareColumn }) {
  const Column = ({ side, emphasis }: { side: CompareColumn; emphasis?: boolean }) => (
    <article className={cn("border-t pt-5", emphasis ? "border-foreground/25" : "border-border")}>
      <p className="label text-muted">{side.label}</p>
      <h3 className="mt-4 text-lead font-medium tracking-(--tracking-tight)">{side.title}</h3>
      <ul className="mt-6 flex flex-col gap-5">
        {side.items.map((item) => (
          <li key={item.title}>
            <p className="text-body">{item.title}</p>
            {item.body ? <p className="mt-1 text-small text-muted">{item.body}</p> : null}
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <Reveal className="grid gap-10 md:grid-cols-2">
      <Column side={left} />
      <Column side={right} emphasis />
    </Reveal>
  );
}

export function Systems({ items }: { items: SystemItem[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} className="border-t border-border pt-5">
          <h3 className="text-lead font-medium tracking-(--tracking-tight)">{item.title}</h3>
          <p className="mt-2 max-w-[44ch] text-body text-muted">{item.body}</p>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {item.steps.map((step, s) => (
              <li key={step} className="flex items-center gap-2">
                {s > 0 ? <Arrow /> : null}
                <span className="label rounded-full border border-border px-3 py-1.5">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}

export function Journey({
  eyebrow,
  title,
  note,
  steps,
}: {
  eyebrow?: string;
  title?: string;
  note?: string;
  steps: JourneyStep[];
}) {
  const images = steps.map((s) => s.image).filter((img): img is ProjectImage => Boolean(img));
  const [open, setOpen] = useState<number | null>(null);
  const hasPhones = images.length > 0;

  return (
    <Reveal>
      {eyebrow || title ? (
        <header className="mb-8 max-w-[52ch]">
          {eyebrow ? <p className="label text-muted">{eyebrow}</p> : null}
          {title ? <h3 className="mt-3 text-h3 font-medium">{title}</h3> : null}
        </header>
      ) : null}

      {hasPhones ? (
        <ol
          className={cn(
            "flex flex-col items-center gap-8",
            steps.length > 3 ? "md:grid md:grid-cols-2 md:items-start xl:flex xl:flex-row" : "md:flex-row md:items-start",
          )}
        >
          {steps.map((step, i) => {
            const imageIndex = step.image ? images.findIndex((img) => img.src === step.image!.src) : -1;
            return (
              <li
                key={step.label}
                className="relative flex w-full max-w-[300px] flex-col items-center gap-4 md:max-w-none md:min-w-0 md:flex-1"
              >
                <Phone
                  image={step.image}
                  label={step.label}
                  removed={step.removed}
                  delay={i * 0.08}
                  onOpen={imageIndex >= 0 ? () => setOpen(imageIndex) : undefined}
                />
                {i < steps.length - 1 ? (
                  <>
                    <span className="md:hidden">
                      <Arrow down />
                    </span>
                    <span
                      className={cn(
                        "pointer-events-none absolute top-[36%] -end-3 hidden -translate-y-1/2",
                        steps.length <= 3 ? "md:block" : "xl:block",
                      )}
                    >
                      <Arrow />
                    </span>
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : (
        <ol className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {steps.map((step, i) => (
            <li key={step.label} className="flex items-center gap-3">
              {i > 0 ? <Arrow /> : null}
              <div>
                <p className="label rounded-full border border-border px-3 py-1.5">{step.label}</p>
                {step.note ? <p className="mt-2 text-small text-muted">{step.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      )}

      {note ? <p className="mt-6 max-w-[52ch] text-small text-muted">{note}</p> : null}
      {images.length ? <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} /> : null}
    </Reveal>
  );
}

export function Metrics({ items, note }: { items: MetricItem[]; note?: string }) {
  return (
    <div>
      {note ? <p className="label mb-8 max-w-[46ch] text-muted">{note}</p> : null}
    <dl className="grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.body} delay={i * 0.08} className="border-t border-border pt-5">
          <dt className="sr-only">{item.body}</dt>
          <dd>
            {item.qualifier ? <p className="label mb-2 text-muted">{item.qualifier}</p> : null}
            <p className="text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-none tracking-(--tracking-display)">
              {item.value}
            </p>
            <p className="mt-4 max-w-[28ch] text-body text-muted">{item.body}</p>
          </dd>
        </Reveal>
      ))}
    </dl>
    </div>
  );
}

/** Member at the center, club domains around them, access where the visit becomes physical. */
export function Ecosystem({ center, lanes, foot }: { center: string; lanes: string[]; foot: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center">
      <p className="rounded-full border border-foreground/20 bg-surface px-5 py-2.5 text-body">{center}</p>
      <span aria-hidden className="hidden h-8 w-px bg-border lg:block" />
      <span aria-hidden className="hidden h-px w-full bg-border lg:block" />
      <ul className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-0 lg:grid-cols-5">
        {lanes.map((lane) => (
          <li key={lane} className="flex flex-col items-center">
            <span aria-hidden className="hidden h-6 w-px bg-border lg:block" />
            <span className="flex w-full items-center justify-center rounded-2xl border border-border px-3 py-4 text-center text-small">
              {lane}
            </span>
          </li>
        ))}
      </ul>
      <span aria-hidden className="mt-8 hidden h-px w-full bg-border lg:mt-0 lg:block" />
      <span aria-hidden className="hidden h-8 w-px bg-border lg:block" />
      <p className="mt-8 rounded-full border border-foreground/20 px-5 py-2.5 text-body lg:mt-0">{foot}</p>
    </div>
  );
}

export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          {i > 0 ? <Arrow down className="sm:hidden" /> : null}
          {i > 0 ? <Arrow className="hidden sm:block" /> : null}
          <span className="label rounded-full border border-border px-3 py-1.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function Paths({ items }: { items: PathItem[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 2) * 0.06} className="border-t border-border pt-5">
          <h3 className="text-lead font-medium tracking-(--tracking-tight)">{item.title}</h3>
          <ol className="mt-5 flex flex-col gap-2">
            {item.steps.map((step, s) => (
              <li key={step} className="flex items-center gap-2">
                {s > 0 ? <Arrow down /> : <span className="size-4" aria-hidden />}
                <span className="text-body">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}

export function Framework({ columns }: { columns: FrameworkColumn[] }) {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {columns.map((column, i) => (
        <Reveal key={column.title} delay={i * 0.06} className="border-t border-border pt-5">
          <h3 className="text-lead font-medium tracking-(--tracking-tight)">{column.title}</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {column.items.map((item) => (
              <li key={item} className="text-body text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function Detail({
  image,
  kicker,
  title,
  body,
  reverse,
}: {
  image: ProjectImage;
  kicker?: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
      <div className={cn("mx-auto w-full max-w-[320px] md:col-span-5", reverse && "md:col-start-8")}>
        <Phone image={image} onOpen={() => setOpen(0)} />
      </div>
      <Reveal className={cn(reverse ? "md:col-span-6 md:row-start-1" : "md:col-span-6 md:col-start-7")} delay={0.08}>
        {kicker ? <p className="label text-accent">{kicker}</p> : null}
        <h3 className="mt-4 max-w-[20ch] text-h3 font-medium">{title}</h3>
        <p className="mt-4 max-w-[44ch] text-body text-muted">{body}</p>
      </Reveal>
      <Lightbox images={[image]} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}

export function Phones({ items, caption }: { items: PhoneItem[]; caption?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal>
      <ol
        className={cn(
          "grid justify-items-center gap-10",
          items.length === 2 && "md:grid-cols-2",
          items.length >= 3 && "md:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <li key={item.label} className="w-full max-w-[280px]">
            <Phone image={item.image} label={item.label} delay={i * 0.08} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ol>
      {caption ? <p className="mt-8 max-w-[52ch] text-small text-muted">{caption}</p> : null}
      <Lightbox images={items.map((item) => item.image)} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Reveal>
  );
}

export function Feature({ image, caption }: { image: ProjectImage; caption?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal className="flex flex-col items-center">
      <div className="w-full max-w-[340px]">
        <Phone image={image} onOpen={() => setOpen(0)} />
      </div>
      {caption ? <p className="mt-6 max-w-[52ch] text-center text-small text-muted">{caption}</p> : null}
      <Lightbox images={[image]} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Reveal>
  );
}

export function Pair({
  left,
  right,
  caption,
}: {
  left: PhoneItem;
  right: PhoneItem;
  caption?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const images = [left.image, right.image];

  return (
    <Reveal>
      <ol className="grid justify-items-center gap-10 md:grid-cols-2">
        {[left, right].map((item, i) => (
          <li key={item.label} className="flex w-full max-w-[300px] flex-col items-center">
            {item.kicker ? <p className="label mb-4 text-muted">{item.kicker}</p> : null}
            <Phone image={item.image} label={item.label} delay={i * 0.08} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ol>
      {caption ? <p className="mt-8 max-w-[52ch] text-small text-muted">{caption}</p> : null}
      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Reveal>
  );
}
