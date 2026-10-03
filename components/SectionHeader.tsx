import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./TextReveal";

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  className?: string;
  size?: "h1" | "display";
};

export function SectionHeader({ index, label, title, aside, className, size = "h1" }: SectionHeaderProps) {
  const titleText = title.map((line) => (typeof line === "string" ? line : "")).join(" ");
  const showLabel = Boolean(index) || label !== titleText;

  return (
    <div className={cn("grid gap-y-6 md:grid-cols-12 md:items-end md:gap-x-[var(--gutter)]", className)}>
      <div className="md:col-span-7">
        {showLabel ? (
          <p className="label flex gap-3 text-muted">
            {index ? <span className="text-accent">({index})</span> : null}
            <span>{label}</span>
          </p>
        ) : null}
        <TextReveal
          as="h2"
          lines={title}
          className={cn("font-medium", showLabel ? "mt-4" : "", size === "display" ? "text-display" : "text-h1")}
        />
      </div>
      {aside ? <div className="md:col-span-4 md:col-start-9">{aside}</div> : null}
    </div>
  );
}
