import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Providers } from "@/components/Providers";
import { SiteChrome } from "@/components/SiteChrome";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/data/site";
import { directionOf } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";
import { OG_IMAGE, SITE_URL, socialMetadata } from "@/lib/seo";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s — ${t.name}` },
    description: t.meta.description,
    authors: [{ name: "Anas Adel", url: SITE_URL }],
    creator: "Anas Adel",
    ...socialMetadata({
      title: t.meta.title,
      description: t.meta.description,
      path: "/",
      locale,
      image: { ...OG_IMAGE, alt: t.meta.ogAlt },
    }),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0f" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale, t } = await getDictionary();

  return (
    <html
      lang={locale}
      dir={directionOf(locale)}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.js-reveal,.scroll-reveal,.scroll-reveal-inner{opacity:1!important;filter:none!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: t.name,
              jobTitle: locale === "ar" ? "مصمم منتجات" : "Product Designer",
              url: SITE_URL,
              image: `${SITE_URL}${site.portrait.src}`,
              sameAs: [site.links.linkedin, site.links.substack],
            }),
          }}
        />
        <a
          href="#main"
          className="label sr-only z-[90] rounded-full bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.skipToContent}
        </a>
        <LanguageProvider locale={locale}>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
