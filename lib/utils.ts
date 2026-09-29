export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const pad = (n: number) => String(n).padStart(2, "0");

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Mirrors --ease-out in globals.css */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Mirrors --ease-in-out in globals.css */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
