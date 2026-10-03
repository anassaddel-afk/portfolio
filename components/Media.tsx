import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import { cn } from "@/lib/utils";

type MediaProps = {
  image: ProjectImage;
  sizes: string;
  priority?: boolean;
  /** Case-study imagery is always shown whole; "cover" is only for decorative photography. */
  fit?: "contain" | "cover";
  className?: string;
  onLoad?: () => void;
};

/** Fills its (relative, sized) parent with an image. */
export function Media({ image, sizes, priority, fit = "contain", className, onLoad }: MediaProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      quality={90}
      priority={priority}
      onLoad={onLoad}
      draggable={false}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}

/** Frame background for an image: its sampled edge colour, so letterboxing reads as a matte. */
export const toneOf = (image: ProjectImage) => image.tone ?? "var(--surface)";
