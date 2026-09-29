export const site = {
  name: "Anas Adel",
  role: "Senior Product Designer",
  url: "https://anasadel.framer.website",
  email: "anassaddel@gmail.com",
  description:
    "Anas Adel is a Senior Product Designer turning complex products into simple, useful experiences — across fintech, loyalty, marketplaces and SaaS, for B2B and B2C.",

  hero: {
    lines: ["I turn complex", "products into simple,", "useful experiences."],
    supporting:
      "Senior Product Designer with 7+ years designing B2B and B2C products across fintech, loyalty, marketplaces and SaaS — in MENA and the US.",
    // From the original Framer hero: "Create things. Solve problems. Explore ideas. Build products. Keep growing."
    ticker: ["Create things.", "Solve problems.", "Explore ideas.", "Build products.", "Keep growing."],
    currently: { company: "Resal", href: "https://www.resal.me/" },
  },

  about: {
    greeting: ["Hello,", "I'm Anas."],
    paragraphs: [
      "I'm a Senior Product Designer focused on turning complex products into simple, useful experiences. With 7+ years of experience across MENA and the US, I've worked across fintech, loyalty, marketplaces, and B2B and B2C products — from early research and product strategy to design systems and shipped experiences.",
      "I care about understanding the problem before designing the solution, working closely with product and engineering teams, and creating experiences that are not only clear and intuitive, but also drive real business impact.",
    ],
    portrait: {
      src: "/images/about/anas-portrait.png",
      width: 1239,
      height: 1269,
      alt: "Black and white portrait of Anas Adel smiling, arms crossed",
    },
    stats: [
      { value: 7, suffix: "+", label: "Years in product design" },
      { value: 5, suffix: "", label: "Companies", pad: true },
    ],
    regions: ["MENA", "US"],
    audiences: ["B2B", "B2C"],
    industries: ["Fintech", "Loyalty", "Marketplaces", "SaaS"],
  },

  links: {
    email: "mailto:anassaddel@gmail.com",
    linkedin: "https://www.linkedin.com/in/anas-husseinn/",
    substack: "https://substack.com/@anasadel",
    cv: "https://drive.google.com/file/d/1NRyGgqohc9bjp_dRhFT3cVIWcXpD5VMl/view?usp=sharing",
    call: "https://cal.com/anas.adel/30min",
    // [CONTENT NEEDED] The Framer site shows "Dribbble" without a URL, and no X/Twitter profile.
    // Add them here and they'll appear in Contact + Footer automatically.
    dribbble: "",
    x: "",
  },

  nav: [
    { id: "work", label: "Work", href: "/#work" },
    { id: "about", label: "About", href: "/#about" },
    { id: "experience", label: "Experience", href: "/#experience" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ],
} as const;

export type SocialLink = { label: string; href: string; external?: boolean };

export function socialLinks(): SocialLink[] {
  const { links } = site;
  const list: SocialLink[] = [
    { label: "LinkedIn", href: links.linkedin, external: true },
    { label: "Substack", href: links.substack, external: true },
  ];
  if (links.dribbble) list.push({ label: "Dribbble", href: links.dribbble, external: true });
  if (links.x) list.push({ label: "X", href: links.x, external: true });
  list.push({ label: "CV", href: links.cv, external: true });
  return list;
}
