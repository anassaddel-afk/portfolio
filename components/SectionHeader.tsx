import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "./TextReveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  className?: string;
  size?: "h1" | "display";
};

export function SectionHeader({ index, label, title, aside, className, size = "h1" }: SectionHeaderProps) {
  return (
    <div className={cn("grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-[var(--gutter)]", className)}>
      <div className="md:col-span-7">
        <p className="label flex gap-3 text-muted">
          <span className="text-accent">({index})</span>
          <span>{label}</span>
        </p>
        <TextReveal
          as="h2"
          lines={title}
          className={cn("mt-6 font-medium md:mt-8", size === "display" ? "text-display" : "text-h1")}
        />
      </div>
      {aside ? <div className="md:col-span-4 md:col-start-9">{aside}</div> : null}
    </div>
  );
}
