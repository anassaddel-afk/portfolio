/**
 * Project content.
 *
 * Source of truth: https://anasadel.framer.website (titles, tags, clients, visuals).
 * The Framer case-study pages still contain template filler text, so:
 *  - summaries and "design choices" below are written from the real product screens — edit freely;
 *  - anything that would be a claim (research findings, metrics, outcomes) is a `needed` block,
 *    rendered on the page as a clearly marked [CONTENT NEEDED] placeholder.
 */

/** Crop window on an image, in fractions: centre x/y and visible width. */
export type Crop = { x: number; y: number; w: number };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  crop?: Crop;
};

export type Block =
  | { type: "text"; lead?: string; body?: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "decisions"; items: { title: string; body: string }[] }
  | { type: "image"; image: ProjectImage; aspect?: string }
  | { type: "gallery"; images: ProjectImage[]; aspect?: string }
  | { type: "story"; steps: { title: string; body: string; image: ProjectImage }[]; aspect?: string }
  | { type: "beforeAfter"; before?: ProjectImage; after: ProjectImage; aspect?: string }
  | { type: "needed"; prompt: string; hints?: string[] };

export type Section = { id: string; label: string; title?: string; blocks: Block[] };

export type ProjectLayout = "right" | "left" | "full" | "split";

export type Project = {
  slug: string;
  title: string;
  /** Title split into lines for the editorial homepage treatment. */
  display: string[];
  summary: string;
  tags: string[];
  client: string;
  company?: string;
  year?: string;
  role?: string;
  platform?: string;
  liveUrl?: string;
  cover: ProjectImage;
  layout: ProjectLayout;
  sections: Section[];
};

const img = {
  resal: { src: "/images/work/resal-redemption.png", width: 2048, height: 1536 },
  kode: { src: "/images/work/kode-club.png", width: 1600, height: 1200 },
  smoov: { src: "/images/work/smoov.png", width: 2048, height: 1456 },
  seamless: { src: "/images/work/seamless-priceless.png", width: 1600, height: 1200 },
  campaign: { src: "/images/work/campaign-management.png", width: 1672, height: 941 },
  system: { src: "/images/work/design-system.png", width: 1672, height: 941 },
  ryze: { src: "/images/work/ryze-coaching.png", width: 1600, height: 1200 },
};

const impactNeeded: Block = {
  type: "needed",
  prompt: "What changed after launch?",
  hints: ["Adoption or conversion", "Task success / time on task", "Support tickets", "Business result"],
};

const learningsNeeded: Block = {
  type: "needed",
  prompt: "What would you do differently, and what did this project teach you?",
};

export const projects: Project[] = [
  {
    slug: "kode-club",
    title: "From Club to Digital Experience",
    display: ["From Club", "to Digital Experience"],
    summary: "Bringing a sports club's membership, wallet and services into a single app.",
    tags: ["B2C", "UI / UX", "User Research"],
    client: "KODE Club",
    company: "Blue Ribbon",
    year: "2025",
    role: "Senior Product Designer",
    platform: "iOS & Android app",
    liveUrl: "https://apps.apple.com/eg/app/kode-sports-club/id1603263204",
    cover: { ...img.kode, alt: "KODE Club app home screen and wallet screen on two phones" },
    layout: "right",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "A club you can carry in your pocket.",
        blocks: [
          {
            type: "text",
            lead: "KODE is a multi-branch sports club in Egypt. The app turns the club into a digital experience — members pay, top up, follow their academies and discover what's happening, without going to the front desk.",
          },
          {
            type: "facts",
            items: [
              { label: "Client", value: "KODE Club" },
              { label: "Company", value: "Blue Ribbon" },
              { label: "Role", value: "Senior Product Designer" },
              { label: "Platform", value: "iOS & Android" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "What wasn't working?",
        blocks: [
          {
            type: "needed",
            prompt: "Describe how members interacted with the club before the app, and the problem this project set out to solve.",
            hints: ["Who are the members (families, athletes, parents)?", "Constraints: branches, payments, legacy systems"],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "Two screens carry most of the club.",
        blocks: [
          {
            type: "gallery",
            aspect: "4/5",
            images: [
              {
                ...img.kode,
                crop: { x: 0.28, y: 0.58, w: 0.5 },
                alt: "Home screen with balance, daily highlights and featured programme",
                caption: "Home — branch switcher, balance with Pay and Send, and daily highlights for news, kids and sports.",
              },
              {
                ...img.kode,
                crop: { x: 0.72, y: 0.42, w: 0.5 },
                alt: "Wallet screen with family member wallets and transactions",
                caption: "Wallet — switch between family members' wallets, transfer, pay, recharge, and see transactions by academy.",
              },
            ],
          },
          {
            type: "decisions",
            items: [
              { title: "Money first", body: "Balance and the two most common actions — Pay and Send — sit at the top of home." },
              { title: "One account, the whole family", body: "Member wallets live side by side, so a parent can manage each child's balance from one place." },
              { title: "Transactions with context", body: "Every payment shows the academy and the member it belongs to, not just an amount." },
            ],
          },
        ],
      },
      {
        id: "research",
        label: "Research",
        title: "What we learned from members.",
        blocks: [
          { type: "needed", prompt: "Summarise the research: methods, who you spoke to, and the key insights that shaped the app." },
        ],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
  {
    slug: "resal-redemption",
    title: "Designing Resal's first redemption experience",
    display: ["Designing Resal's first", "redemption experience"],
    summary: "Turning accumulated points into a simple, valuable first redemption.",
    tags: ["B2C", "UI / UX", "User Research"],
    client: "Resal",
    year: "2025",
    role: "Senior Product Designer",
    platform: "Mobile app",
    liveUrl: "https://apps.apple.com/eg/app/resal-%D8%B1%D8%B3%D8%A7%D9%84/id1164433567",
    cover: { ...img.resal, alt: "Three Resal app screens: points balance, converting points to AlFursan miles, and conversion success" },
    layout: "left",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Points only matter when you can use them.",
        blocks: [
          {
            type: "text",
            lead: "Resal members earn points on every riyal they spend in the Resal market. This project designed the first way to spend them: converting Resal points into Saudia AlFursan miles.",
          },
          {
            type: "facts",
            items: [
              { label: "Client", value: "Resal" },
              { label: "Role", value: "Senior Product Designer" },
              { label: "Year", value: "2025" },
              { label: "Platform", value: "Mobile app · Arabic-first" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "How might a first redemption feel simple — and worth it?",
        blocks: [
          {
            type: "needed",
            prompt: "What was the situation before? Why was a first redemption the priority, and what made it hard?",
            hints: ["Business goal behind redemption", "Constraints from the airline partner", "Tiers and conversion rules"],
          },
        ],
      },
      {
        id: "flow",
        label: "Flow",
        title: "Three steps from balance to miles.",
        blocks: [
          {
            type: "story",
            aspect: "3/4",
            steps: [
              {
                title: "See what your points are worth",
                body: "The points home shows the balance, progress through Silver, Gold and Platinum tiers, and a clear entry point to convert to AlFursan miles. How points are earned is explained right below.",
                image: { ...img.resal, crop: { x: 0.2, y: 0.54, w: 0.46 }, alt: "Resal points home with balance of 2,600 points and tier progress" },
              },
              {
                title: "Choose, with the math done for you",
                body: "Instead of typing an amount, members pick from preset bundles. The exchange updates live — 480 points becomes 40 miles — and the rate is stated upfront. Bundles above the balance are disabled, not hidden.",
                image: { ...img.resal, crop: { x: 0.5, y: 0.5, w: 0.46 }, alt: "Conversion screen with point bundles and live exchange to miles" },
              },
              {
                title: "Confirm, and make it a moment",
                body: "Success is celebrated with the AlFursan ticket, then backed by the details members need: membership number, miles earned, points spent and a reference — with a clear way home or to convert again.",
                image: { ...img.resal, crop: { x: 0.8, y: 0.46, w: 0.46 }, alt: "Conversion success screen with AlFursan ticket and transaction details" },
              },
            ],
          },
        ],
      },
      {
        id: "decisions",
        label: "Decisions",
        title: "Small choices, removing doubt.",
        blocks: [
          {
            type: "decisions",
            items: [
              { title: "Presets over free input", body: "Fixed bundles take arithmetic out of the decision and match valid conversion amounts." },
              { title: "Both currencies, always", body: "Points and miles appear side by side at every step, so the value is never abstract." },
              { title: "Disable, don't hide", body: "Showing larger bundles as unavailable sets a goal instead of making options disappear." },
              { title: "Proof after delight", body: "The celebratory moment is followed by the records people need to trust the transaction." },
            ],
          },
          { type: "image", image: { ...img.resal, alt: "The complete redemption flow across three screens" }, aspect: "4/3" },
        ],
      },
      {
        id: "research",
        label: "Research",
        title: "What shaped the flow.",
        blocks: [{ type: "needed", prompt: "Which research or data informed these decisions? Include what you tested and what changed as a result." }],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
  {
    slug: "smoov",
    title: "Smoov — Designing a Better Moving Experience",
    display: ["Smoov —", "a better moving experience"],
    summary: "A moving service built around one clear promise — a fixed price per room — and a booking flow in four steps.",
    tags: ["B2B", "B2C", "UI / UX", "User Research", "SaaS"],
    client: "Smoov",
    platform: "Web app · Mobile app",
    cover: { ...img.smoov, alt: "Smoov website: hero with fixed price per room, and the four-step moving process" },
    layout: "full",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Moving home, without the guesswork.",
        blocks: [
          {
            type: "text",
            lead: "Smoov is a home-moving service in Riyadh. The experience is built around a promise customers can understand instantly: a fixed price per room, whatever is inside it.",
          },
          {
            type: "facts",
            items: [
              { label: "Client", value: "Smoov" },
              { label: "Deliverables", value: "Web app · Mobile app" },
              { label: "Audience", value: "B2B · B2C" },
              { label: "Year", value: "[CONTENT NEEDED]" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "Why moving felt stressful.",
        blocks: [
          {
            type: "needed",
            prompt: "What made the previous moving experience stressful or unclear, and what did you find in research?",
            hints: ["Pricing uncertainty", "Trust and damage", "Scheduling"],
          },
        ],
      },
      {
        id: "solution",
        label: "Solution",
        title: "A clear promise, then four steps.",
        blocks: [
          {
            type: "gallery",
            aspect: "3/4",
            images: [
              {
                ...img.smoov,
                crop: { x: 0.28, y: 0.4, w: 0.44 },
                alt: "Smoov landing page hero and value propositions",
                caption: "Landing — fixed price per room up front, with safety, punctuality and no-surprise pricing as the three promises.",
              },
              {
                ...img.smoov,
                crop: { x: 0.75, y: 0.45, w: 0.44 },
                alt: "Smoov four-step process and instalment payments",
                caption: "Process — details and package, booking confirmation, moving day, and a quality call — plus pay-later instalments.",
              },
            ],
          },
          {
            type: "beforeAfter",
            after: { ...img.smoov, alt: "Redesigned Smoov experience" },
            aspect: "16/11",
          },
        ],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
  {
    slug: "seamless",
    title: "Seamless — Mastercard loyalty consumers",
    display: ["Seamless —", "Mastercard loyalty"],
    summary: "A Mastercard Priceless app for finding offers nearby, redeeming vouchers and seeing what you've saved.",
    tags: ["B2C", "UI / UX"],
    client: "Mastercard",
    company: "Dsquares",
    year: "2024",
    role: "Product Designer",
    platform: "Mobile app",
    cover: { ...img.seamless, alt: "Collage of Mastercard Priceless app screens: offers, map, voucher and savings history" },
    layout: "split",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Loyalty you can actually feel.",
        blocks: [
          {
            type: "text",
            lead: "Designed at Dsquares for Mastercard's Priceless programme: an app where cardholders discover offers, redeem them in store, and see exactly how much they've saved.",
          },
          {
            type: "facts",
            items: [
              { label: "Client", value: "Mastercard" },
              { label: "Company", value: "Dsquares" },
              { label: "Role", value: "Product Designer" },
              { label: "Year", value: "2024" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "The challenge.",
        blocks: [{ type: "needed", prompt: "What was the goal for Mastercard, and what did cardholders struggle with?" }],
      },
      {
        id: "solution",
        label: "Solution",
        title: "From discovery to savings.",
        blocks: [
          {
            type: "gallery",
            aspect: "4/5",
            images: [
              { ...img.seamless, crop: { x: 0.63, y: 0.45, w: 0.42 }, alt: "Priceless home screen", caption: "Home — total savings up front, then featured and personal offers." },
              { ...img.seamless, crop: { x: 0.35, y: 0.3, w: 0.45 }, alt: "Map of nearby offers", caption: "Nearby — offers on a map, for deciding where to go." },
              { ...img.seamless, crop: { x: 0.14, y: 0.58, w: 0.42 }, alt: "Voucher with QR code", caption: "Redeem — QR and voucher code, with a savings calculator." },
              { ...img.seamless, crop: { x: 0.47, y: 0.8, w: 0.45 }, alt: "Savings history by week", caption: "History — savings and vouchers over time." },
            ],
          },
        ],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
  {
    slug: "campaign-management",
    title: "Campaign management system — Campaigns & Segmentation",
    display: ["Campaigns", "& Segmentation"],
    summary: "A B2B console for segmenting a loyalty programme's customers and reaching them through SMS and WhatsApp campaigns.",
    tags: ["B2B", "UX", "User Research"],
    client: "Dsquares",
    role: "Product Designer",
    platform: "Web dashboard",
    cover: { ...img.campaign, alt: "Dsquares dashboard: customer segments treemap, campaigns table and WhatsApp message composer" },
    layout: "right",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "From who to message, to what to send.",
        blocks: [
          {
            type: "text",
            lead: "Loyalty teams need to know who their customers are before they can talk to them. This console connects the two: segments on one side, campaigns on the other.",
          },
          {
            type: "facts",
            items: [
              { label: "Company", value: "Dsquares" },
              { label: "Role", value: "Product Designer" },
              { label: "Platform", value: "Web dashboard" },
              { label: "Year", value: "[CONTENT NEEDED]" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "The operational problem.",
        blocks: [
          {
            type: "needed",
            prompt: "How did operators segment and message customers before? Who used this tool and what slowed them down?",
            hints: ["Operator personas", "Manual steps", "Channel constraints (SMS, WhatsApp)"],
          },
        ],
      },
      {
        id: "system",
        label: "System",
        title: "Three connected surfaces.",
        blocks: [
          {
            type: "gallery",
            aspect: "16/10",
            images: [
              { ...img.campaign, crop: { x: 0.28, y: 0.52, w: 0.58 }, alt: "Segments view", caption: "Segments — every customer group at a glance, sized by share, with risk and churn made visible." },
              { ...img.campaign, crop: { x: 0.76, y: 0.28, w: 0.46 }, alt: "Campaigns table", caption: "Campaigns — status totals, channel, recurring vs one-time, and conversion rate per campaign." },
              { ...img.campaign, crop: { x: 0.75, y: 0.74, w: 0.46 }, alt: "WhatsApp composer", caption: "Composer — personalised content with variables and a live iOS / Android preview." },
            ],
          },
          {
            type: "decisions",
            items: [
              { title: "Segments as a map", body: "A treemap shows the size of each group and its risk in one view, before any table." },
              { title: "Status before detail", body: "Totals for active, scheduled, finished and draft campaigns frame the table below." },
              { title: "Preview while writing", body: "Operators see the message on a device as they compose it, variables included." },
            ],
          },
        ],
      },
      {
        id: "research",
        label: "Research",
        title: "Research.",
        blocks: [{ type: "needed", prompt: "What research did you run with operators, and what did it change?" }],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
  {
    slug: "design-system",
    title: "One Design System, 3+ Apps",
    display: ["One design system,", "3+ apps"],
    summary: "A sports-club design system — tokens, components, patterns and guidelines — built to power multiple apps.",
    tags: ["Design System"],
    client: "Blue Ribbon",
    year: "2024",
    role: "Senior Product Designer",
    platform: "Design system",
    cover: { ...img.system, alt: "Sport Club Design System cover with tokens, button properties, checkboxes and engagement widget" },
    layout: "full",
    sections: [
      {
        id: "overview",
        label: "Overview",
        title: "Built for teams who move together.",
        blocks: [
          {
            type: "text",
            lead: "At Blue Ribbon, the sports-club products needed one foundation. The system brings components, tokens, patterns and guidelines together so every app is built from the same decisions.",
          },
          {
            type: "facts",
            items: [
              { label: "Company", value: "Blue Ribbon" },
              { label: "Role", value: "Senior Product Designer" },
              { label: "Year", value: "2024" },
              { label: "Scope", value: "Components · Tokens · Patterns · Guidelines" },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        title: "Why a system.",
        blocks: [
          {
            type: "needed",
            prompt: "What inconsistencies or delivery problems made a shared system necessary? Which apps did it need to serve?",
          },
        ],
      },
      {
        id: "foundations",
        label: "Foundations",
        title: "Decisions, made once.",
        blocks: [
          {
            type: "gallery",
            aspect: "4/3",
            images: [
              { ...img.system, crop: { x: 0.15, y: 0.36, w: 0.34 }, alt: "Color tokens panel", caption: "Tokens — semantic colour, typography, spacing, radius and shadows." },
              { ...img.system, crop: { x: 0.87, y: 0.34, w: 0.34 }, alt: "Button component properties", caption: "Components — variants, sizes, states and icon slots as properties." },
              { ...img.system, crop: { x: 0.3, y: 0.8, w: 0.34 }, alt: "Member engagement widget", caption: "Patterns — data and feedback components for club products." },
            ],
          },
        ],
      },
      {
        id: "apps",
        label: "Apps",
        title: "One foundation, several products.",
        blocks: [
          {
            type: "gallery",
            aspect: "4/3",
            images: [
              { ...img.ryze, alt: "RYZE Performance+ private coaching app screens", caption: "RYZE Performance+ — private coaching hub. [CONTENT NEEDED: confirm it's built on the system]" },
              { ...img.kode, alt: "KODE Club app screens", caption: "KODE Club — member app. [CONTENT NEEDED: confirm it's built on the system]" },
            ],
          },
        ],
      },
      { id: "impact", label: "Impact", title: "Outcome.", blocks: [impactNeeded, learningsNeeded] },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function projectIndex(slug: string) {
  return projects.findIndex((p) => p.slug === slug) + 1;
}
