import type { Dictionary } from "./translations";

/** Language-independent facts. All copy lives in `translations.ts`. */
export const site = {
  url: "https://anasadel.framer.website",
  email: "anassaddel@gmail.com",

  portrait: { src: "/images/about/anas-portrait.png", width: 1239, height: 1269 },

  stats: { years: 7, companies: 5 },

  links: {
    email: "mailto:anassaddel@gmail.com",
    linkedin: "https://www.linkedin.com/in/anas-husseinn/",
    substack: "https://substack.com/@anasadel",
    cv: "https://drive.google.com/file/d/1NRyGgqohc9bjp_dRhFT3cVIWcXpD5VMl/view?usp=sharing",
    call: "https://cal.com/anas.adel/30min",
    // Add profile URLs here and they appear in Contact and the menu automatically.
    dribbble: "",
    x: "",
  },

  nav: [
    { id: "work", href: "/#work" },
    { id: "about", href: "/#about" },
    { id: "experience", href: "/experience" },
    { id: "contact", href: "/#contact" },
  ],
} as const;

export type NavId = (typeof site.nav)[number]["id"];

export type SocialLink = { id: keyof Dictionary["social"]; label: string; href: string };

export function socialLinks(t: Dictionary): SocialLink[] {
  const { links } = site;
  const list: SocialLink[] = [
    { id: "linkedin", label: t.social.linkedin, href: links.linkedin },
    { id: "substack", label: t.social.substack, href: links.substack },
  ];
  if (links.dribbble) list.push({ id: "dribbble", label: t.social.dribbble, href: links.dribbble });
  if (links.x) list.push({ id: "x", label: t.social.x, href: links.x });
  list.push({ id: "cv", label: t.social.cv, href: links.cv });
  return list;
}
