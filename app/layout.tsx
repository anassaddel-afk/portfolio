import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { AskAnas } from "@/components/AskAnas";
import { Atmosphere } from "@/components/Atmosphere";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { themeScript } from "@/components/ThemeToggle";
import { directionOf } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: t.meta.title, template: `%s — ${t.name}` },
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/images/about/anas-wide.png", width: 1730, height: 909, alt: t.meta.ogAlt }],
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
    },
    twitter: { card: "summary_large_image" },
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
          <style>{`.js-reveal{opacity:1!important;filter:none!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh bg-background text-foreground">
        <a
          href="#main"
          className="label sr-only z-[90] rounded-full bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.skipToContent}
        </a>
        <LanguageProvider locale={locale}>
          <Providers>
            <Atmosphere />
            <SmoothScroll />
            <ScrollProgress />
            <Navbar />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer />
            <AskAnas />
            <Cursor />
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
