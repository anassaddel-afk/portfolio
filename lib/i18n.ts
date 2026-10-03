export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "locale";

export const isLocale = (value: unknown): value is Locale => value === "en" || value === "ar";
export const directionOf = (locale: Locale): Direction => (locale === "ar" ? "rtl" : "ltr");

/** A string written in every supported language. */
export type Text = Record<Locale, string>;

/**
 * Content shape where any free-text field may be a `Text` pair.
 * Literal unions (e.g. layout names) stay literal, so they're never mistaken for copy.
 */
export type Localized<T> = T extends string
  ? string extends T
    ? string | Text
    : T
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

function isText(value: unknown): value is Text {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === locales.length && locales.every((l) => typeof (value as Text)[l] === "string");
}

/** Resolves every `Text` pair in a content tree to the given locale. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  const walk = (v: unknown): unknown => {
    if (isText(v)) return v[locale];
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(value) as T;
}

/** Resolves a content tree once per locale, so lookups are free at render time. */
export function localizeAll<T>(value: Localized<T>): Record<Locale, T> {
  return { en: localize(value, "en"), ar: localize(value, "ar") };
}
