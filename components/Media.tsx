import Image from "next/image";
import type { Crop, ProjectImage } from "@/data/projects";
import { clamp, cn } from "@/lib/utils";

export function parseAspect(aspect: string) {
  const [w, h] = aspect.split("/").map(Number);
  return w / h;
}

/**
 * Positions an image so the crop window fills a frame of the given aspect ratio.
 * Values are clamped so the image always covers the frame.
 */
function cropStyle(crop: Crop, frameRatio: number, imageRatio: number) {
  const w = Math.min(crop.w, frameRatio / imageRatio);
  const visibleH = (w * imageRatio) / frameRatio;
  const cx = clamp(crop.x, w / 2, 1 - w / 2);
  const cy = clamp(crop.y, visibleH / 2, 1 - visibleH / 2);
  return {
    width: `${100 / w}%`,
    left: `${(0.5 - cx / w) * 100}%`,
    top: `${(0.5 - cy / visibleH) * 100}%`,
    maxWidth: "none",
  } as const;
}

type MediaProps = {
  image: ProjectImage;
  /** Aspect ratio of the frame, e.g. "4/3". Required for cropped images. */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  onLoad?: () => void;
};

/** Fills its (relative, sized) parent with an image — optionally a cropped detail of it. */
export function Media({ image, aspect, sizes, priority, fit = "cover", className, onLoad }: MediaProps) {
  if (image.crop && aspect) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        onLoad={onLoad}
        className={cn("absolute h-auto", className)}
        style={cropStyle(image.crop, parseAspect(aspect), image.width / image.height)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      onLoad={onLoad}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
