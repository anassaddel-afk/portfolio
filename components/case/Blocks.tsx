import type { Block } from "@/data/projects";
import { pad } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { ContentNeeded, isNeeded } from "./ContentNeeded";
import { DragGallery } from "./DragGallery";
import { StickyStory } from "./StickyStory";
import { ZoomImage } from "./ZoomImage";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <Reveal className="flex flex-col gap-6">
          {block.lead ? (
            <p className="max-w-[34ch] text-[clamp(1.35rem,2.1vw,2rem)] leading-[1.3] tracking-[-0.025em]">
              {block.lead}
            </p>
          ) : null}
          {block.body?.map((p) => (
            <p key={p} className="max-w-[62ch] text-body text-muted">
              {p}
            </p>
          ))}
        </Reveal>
      );

    case "facts":
      return (
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <dt className="label text-muted">{item.label}</dt>
                <dd className={isNeeded(item.value) ? "label mt-3 text-accent" : "mt-3 text-body"}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "decisions":
      return (
        <ol className="grid gap-x-[var(--gutter)] gap-y-10 md:grid-cols-2">
          {block.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.06} className="border-t border-border pt-5">
              <p className="label text-accent">{pad(i + 1)}</p>
              <h3 className="mt-4 text-lead font-medium tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 max-w-[44ch] text-body text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      );

    case "image":
      return <ZoomImage image={block.image} aspect={block.aspect} />;

    case "gallery":
      return <DragGallery images={block.images} aspect={block.aspect} />;

    case "story":
      return <StickyStory steps={block.steps} aspect={block.aspect} />;

    case "beforeAfter":
      return <BeforeAfter before={block.before} after={block.after} aspect={block.aspect} />;

    case "needed":
      return <ContentNeeded prompt={block.prompt} hints={block.hints} />;
  }
}
