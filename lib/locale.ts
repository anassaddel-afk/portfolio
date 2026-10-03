import { cookies } from "next/headers";
import { translations } from "@/data/translations";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "./i18n";

/** The visitor's language, persisted in a cookie so the server renders it without a flash. */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary() {
  const locale = await getLocale();
  return { locale, t: translations[locale] };
}
