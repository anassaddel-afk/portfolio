import type { Block } from "@/data/projects";
import { pad } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { ScrollRevealText } from "../ScrollRevealText";
import { BeforeAfter } from "./BeforeAfter";
import { DragGallery } from "./DragGallery";
import { Compare, Detail, Ecosystem, Feature, Flow, Framework, Insights, Journey, Metrics, Pair, Paths, Phones, Systems } from "./Narrative";
import { StickyStory } from "./StickyStory";
import { ZoomImage } from "./ZoomImage";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="flex flex-col gap-6">
          {block.kicker ? <p className="label text-accent">{block.kicker}</p> : null}
          {block.lead ? (
            <ScrollRevealText
              as="p"
              className="max-w-[34ch] text-[clamp(1.35rem,2.1vw,2rem)] leading-(--lh-quote) tracking-(--tracking-tight)"
            >
              {block.lead}
            </ScrollRevealText>
          ) : null}
          {block.body?.map((p) => (
            <p key={p} className="max-w-[62ch] text-body text-muted">
              {p}
            </p>
          ))}
        </div>
      );

    case "facts":
      return (
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <dt className="label text-muted">{item.label}</dt>
                <dd className="mt-3 text-body">{item.value}</dd>
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
              <p className="label tabular-nums text-accent">{pad(i + 1)}</p>
              <h3 className="mt-4 text-lead font-medium tracking-(--tracking-tight)">{item.title}</h3>
              <p className="mt-2 max-w-[44ch] text-body text-muted">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      );

    case "image":
      return <ZoomImage image={block.image} />;

    case "gallery":
      return <DragGallery images={block.images} />;

    case "story":
      return <StickyStory steps={block.steps} />;

    case "beforeAfter":
      return <BeforeAfter before={block.before} after={block.after} />;

    case "insights":
      return <Insights items={block.items} />;

    case "compare":
      return <Compare left={block.left} right={block.right} />;

    case "systems":
      return <Systems items={block.items} />;

    case "journey":
      return <Journey eyebrow={block.eyebrow} title={block.title} note={block.note} steps={block.steps} />;

    case "metrics":
      return <Metrics items={block.items} note={block.note} />;

    case "ecosystem":
      return <Ecosystem center={block.center} lanes={block.lanes} foot={block.foot} />;

    case "flow":
      return <Flow steps={block.steps} />;

    case "paths":
      return <Paths items={block.items} />;

    case "framework":
      return <Framework columns={block.columns} />;

    case "detail":
      return (
        <Detail
          image={block.image}
          kicker={block.kicker}
          title={block.title}
          body={block.body}
          reverse={block.reverse}
        />
      );

    case "phones":
      return <Phones items={block.items} caption={block.caption} />;

    case "feature":
      return <Feature image={block.image} caption={block.caption} />;

    case "pair":
      return <Pair left={block.left} right={block.right} caption={block.caption} />;
  }
}
