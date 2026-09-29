export type Role = {
  company: string;
  period: string;
  start: string;
  role: string;
  location: string;
  summary: string;
  focus: string[];
  href?: string;
};

export type Product = {
  name: string;
  context: string;
  year: string;
  href?: string;
};

export const roles: Role[] = [
  {
    company: "Resal",
    period: "2024 — Present",
    start: "2024",
    role: "Senior Product Designer",
    location: "Saudi Arabia · Remote",
    summary:
      "Led product design across Resal's Consumer, Business, and Merchant ecosystem, shaping end-to-end experiences across loyalty, payments, wallet, booking, and growth.",
    focus: ["Loyalty", "Payments", "Wallet", "Booking", "Growth"],
    href: "https://www.resal.me/",
  },
  {
    company: "Waitery",
    period: "2025 — 2026",
    start: "2025",
    role: "Senior Product Designer",
    location: "Canada · Remote",
    summary:
      "Designed a multi-product restaurant ecosystem connecting customers, waiters, and kitchen teams.",
    focus: ["Multi-product", "Restaurants", "B2B"],
    href: "https://waitery.ca/",
  },
  {
    company: "Blue Ribbon",
    period: "2023 — 2025",
    start: "2023",
    role: "Senior Product Designer",
    location: "Egypt",
    summary:
      "Designed a digital sports club and its design system, creating a scalable foundation for consistent experiences across the product.",
    focus: ["Design systems", "B2C", "Sports"],
  },
  {
    company: "Dsquares",
    period: "2022 — 2024",
    start: "2022",
    role: "Product Designer",
    location: "Egypt",
    summary:
      "Designed and scaled loyalty platforms and white-labeled products for enterprise clients, building reusable design systems and experiences across brands including Mastercard, Vodafone, ExxonMobil, and Egypt Post.",
    focus: ["Loyalty", "White-label", "Enterprise"],
    href: "https://dsquares.com/",
  },
  {
    company: "Bypa-ss",
    period: "2021 — 2022",
    start: "2021",
    role: "Junior Product Designer",
    location: "Egypt",
    summary:
      "Designed mobile experiences, interactions, and motion across research-driven product initiatives.",
    focus: ["Mobile", "Interaction", "Motion"],
  },
];

export const products: Product[] = [
  { name: "Resal App", context: "Resal", year: "2025", href: "https://apps.apple.com/eg/app/resal-%D8%B1%D8%B3%D8%A7%D9%84/id1164433567" },
  { name: "Resal Platform", context: "Resal", year: "2026", href: "https://giftcards.resal.me/en" },
  { name: "Resal", context: "Resal", year: "2025", href: "https://www.resal.me/" },
  { name: "Resal Merchants", context: "Resal", year: "2025", href: "https://www.resal.me/resal-loyalty/" },
  { name: "Waitery", context: "B2B merchant platform", year: "2025", href: "https://waitery.ca/" },
  { name: "KODE Club", context: "Blue Ribbon", year: "2025", href: "https://apps.apple.com/eg/app/kode-sports-club/id1603263204" },
  { name: "C-Cubed", context: "Dsquares", year: "2024", href: "https://dsquares.com/c-cubed/" },
  { name: "Priceless", context: "Mastercard · Dsquares", year: "2024" },
  { name: "Mobilawy", context: "Mobil 1 · Dsquares", year: "2023" },
];

export const toolbox = [
  "Figma",
  "FigJam",
  "Figma Make",
  "Framer",
  "Photoshop",
  "Illustrator",
  "After Effects",
  "Lottie",
  "Google Analytics",
  "Mixpanel",
  "Notion",
  "Confluence",
  "Miro",
  "Jira",
  "Claude",
  "Cursor",
];

export const principles = [
  { title: "Understand before designing.", body: "The problem, the people and the constraints come first. Screens come after." },
  { title: "Make complexity feel simple.", body: "Loyalty rules, payments and B2B workflows are complex. Using them shouldn't be." },
  { title: "Design systems, not isolated screens.", body: "Reusable decisions scale across products, brands and teams." },
  { title: "Build it with product and engineering.", body: "The best solutions come from designing with the people who ship them." },
  { title: "Design for people and the business.", body: "Clear and intuitive is the baseline. Real business impact is the goal." },
  { title: "Ship, learn, improve.", body: "Every release is a question. Data and users answer it." },
];

export const capabilities = [
  {
    group: "Product",
    items: [
      { name: "Product strategy", note: "Framing problems, scoping bets, defining what to build first." },
      { name: "UX research", note: "Interviews, usability tests and analytics to ground decisions." },
      { name: "Growth thinking", note: "Designing for activation, retention and redemption loops." },
    ],
  },
  {
    group: "Craft",
    items: [
      { name: "Interaction design", note: "Flows, states and motion that make products feel effortless." },
      { name: "UI design", note: "Precise, calm interfaces across mobile, web and dashboards." },
      { name: "Design systems", note: "Tokens, components and guidelines that scale across apps." },
    ],
  },
  {
    group: "Context",
    items: [
      { name: "B2B & B2C products", note: "Consumer apps, merchant tools and enterprise consoles." },
      { name: "Complex workflows", note: "Segmentation, campaigns, payments, bookings, wallets." },
      { name: "Cross-functional teams", note: "Working side by side with product managers and engineers." },
    ],
  },
];
