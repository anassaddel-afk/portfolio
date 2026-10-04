import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/** Production origin. Preview and local deployments must not become the canonical URL. */
export const SITE_URL = "https://anasadel.com";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
} as const;

type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

/** Canonical, Open Graph, and Twitter/X tags for one URL. */
export function socialMetadata({
  title,
  description,
  path = "/",
  locale,
  image,
}: {
  title: string;
  description: string;
  path?: string;
  locale: Locale;
  image: SocialImage;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Anas Adel",
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
