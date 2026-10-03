import { localizeAll, type Localized, type Locale } from "@/lib/i18n";

export type Role = {
  company: string;
  period: string;
  role: string;
  location: string;
  summary: string;
  focus: string[];
  href?: string;
};

export type Product = { name: string; context: string; year: string; href?: string };
export type Principle = { title: string; body: string };
export type CapabilityGroup = { group: string; items: { name: string; note: string }[] };

type Experience = {
  roles: Role[];
  products: Product[];
  principles: Principle[];
  capabilities: CapabilityGroup[];
  toolbox: string[];
};

const seniorPD = { en: "Senior Product Designer", ar: "مصمم منتجات أول" };
const egypt = { en: "Egypt", ar: "مصر" };
const loyalty = { en: "Loyalty", ar: "الولاء" };

const content: Localized<Experience> = {
  roles: [
    {
      company: "Resal",
      period: { en: "2024 — Present", ar: "2024 — الآن" },
      role: seniorPD,
      location: { en: "Saudi Arabia · Remote", ar: "السعودية · عن بُعد" },
      summary: {
        en: "Led product design across Resal's Consumer, Business, and Merchant ecosystem, shaping end-to-end experiences across loyalty, payments, wallet, booking, and growth.",
        ar: "قدت تصميم المنتجات عبر منظومة Resal للمستهلكين والأعمال والتجّار، وشكّلت تجارب متكاملة في الولاء والمدفوعات والمحفظة والحجوزات والنمو.",
      },
      focus: [
        loyalty,
        { en: "Payments", ar: "المدفوعات" },
        { en: "Wallet", ar: "المحفظة" },
        { en: "Booking", ar: "الحجوزات" },
        { en: "Growth", ar: "النمو" },
      ],
      href: "https://www.resal.me/",
    },
    {
      company: "Waitery",
      period: "2025 — 2026",
      role: seniorPD,
      location: { en: "Canada · Remote", ar: "كندا · عن بُعد" },
      summary: {
        en: "Designed a multi-product restaurant ecosystem connecting customers, waiters, and kitchen teams.",
        ar: "صمّمت منظومة مطاعم متعددة المنتجات تربط العملاء والنادلين وفرق المطبخ.",
      },
      focus: [{ en: "Multi-product", ar: "متعدد المنتجات" }, { en: "Restaurants", ar: "المطاعم" }, "B2B"],
      href: "https://waitery.ca/",
    },
    {
      company: "Blue Ribbon",
      period: "2023 — 2025",
      role: seniorPD,
      location: egypt,
      summary: {
        en: "Designed a digital sports club and its design system, creating a scalable foundation for consistent experiences across the product.",
        ar: "صمّمت نادياً رياضياً رقمياً ونظام التصميم الخاص به، لبناء أساس قابل للتوسّع يضمن تجارب متّسقة عبر المنتج.",
      },
      focus: [{ en: "Design systems", ar: "أنظمة التصميم" }, "B2C", { en: "Sports", ar: "الرياضة" }],
    },
    {
      company: "Dsquares",
      period: "2022 — 2024",
      role: { en: "Product Designer", ar: "مصمم منتجات" },
      location: egypt,
      summary: {
        en: "Designed and scaled loyalty platforms and white-labeled products for enterprise clients, building reusable design systems and experiences across brands including Mastercard, Vodafone, ExxonMobil, and Egypt Post.",
        ar: "صمّمت منصات ولاء ومنتجات بعلامات بيضاء لعملاء من المؤسسات ووسّعت نطاقها، وبنيت أنظمة تصميم وتجارب قابلة لإعادة الاستخدام لعلامات منها Mastercard وVodafone وExxonMobil والبريد المصري.",
      },
      focus: [loyalty, { en: "White-label", ar: "العلامات البيضاء" }, { en: "Enterprise", ar: "المؤسسات" }],
      href: "https://dsquares.com/",
    },
    {
      company: "Bypa-ss",
      period: "2021 — 2022",
      role: { en: "Junior Product Designer", ar: "مصمم منتجات مبتدئ" },
      location: egypt,
      summary: {
        en: "Designed mobile experiences, interactions, and motion across research-driven product initiatives.",
        ar: "صمّمت تجارب للجوال وتفاعلات وحركة ضمن مبادرات منتجات قائمة على الأبحاث.",
      },
      focus: [{ en: "Mobile", ar: "الجوال" }, { en: "Interaction", ar: "التفاعل" }, { en: "Motion", ar: "الحركة" }],
    },
  ],

  products: [
    { name: "Resal App", context: "Resal", year: "2025", href: "https://apps.apple.com/eg/app/resal-%D8%B1%D8%B3%D8%A7%D9%84/id1164433567" },
    { name: "Resal Platform", context: "Resal", year: "2026", href: "https://giftcards.resal.me/en" },
    { name: "Resal", context: "Resal", year: "2025", href: "https://www.resal.me/" },
    { name: "Resal Merchants", context: "Resal", year: "2025", href: "https://www.resal.me/resal-loyalty/" },
    { name: "Waitery", context: { en: "B2B merchant platform", ar: "منصة للتجّار (B2B)" }, year: "2025", href: "https://waitery.ca/" },
    { name: "KODE Club", context: "Blue Ribbon", year: "2025", href: "https://apps.apple.com/eg/app/kode-sports-club/id1603263204" },
    { name: "C-Cubed", context: "Dsquares", year: "2024", href: "https://dsquares.com/c-cubed/" },
    { name: "Priceless", context: "Mastercard · Dsquares", year: "2024" },
    { name: "Mobilawy", context: "Mobil 1 · Dsquares", year: "2023" },
  ],

  principles: [
    {
      title: { en: "Understand before designing.", ar: "افهم قبل أن أصمّم." },
      body: {
        en: "The problem, the people and the constraints come first. Screens come after.",
        ar: "المشكلة والناس والقيود أولاً. الشاشات تأتي لاحقاً.",
      },
    },
    {
      title: { en: "Make complexity feel simple.", ar: "اجعل التعقيد يبدو بسيطاً." },
      body: {
        en: "Loyalty rules, payments and B2B workflows are complex. Using them shouldn't be.",
        ar: "قواعد الولاء والمدفوعات ومسارات B2B معقّدة، أما استخدامها فلا ينبغي أن يكون كذلك.",
      },
    },
    {
      title: { en: "Design systems, not isolated screens.", ar: "أنظمة تصميم، لا شاشات منفصلة." },
      body: {
        en: "Reusable decisions scale across products, brands and teams.",
        ar: "القرارات القابلة لإعادة الاستخدام تتوسّع عبر المنتجات والعلامات والفرق.",
      },
    },
    {
      title: { en: "Build it with product and engineering.", ar: "اتعاون مع كل الفريق." },
      body: {
        en: "The best solutions come from designing with the people who ship them.",
        ar: "أفضل الحلول تأتي من التصميم مع من يطلقون المنتج.",
      },
    },
    {
      title: { en: "Design for people and the business.", ar: "أصمم للناس وللأعمال." },
      body: {
        en: "Clear and intuitive is the baseline. Real business impact is the goal.",
        ar: "الوضوح وسهولة الاستخدام هما الأساس، والأثر الحقيقي في الأعمال هو الهدف.",
      },
    },
    {
      title: { en: "Ship, learn, improve.", ar: "ابنى، اتعلم، أُحسن." },
      body: {
        en: "Every release is a question. Data and users answer it.",
        ar: "كل إصدار سؤال. البيانات والمستخدمون يجيبون عنه.",
      },
    },
  ],

  capabilities: [
    {
      group: { en: "Product", ar: "المنتج" },
      items: [
        {
          name: { en: "Product strategy", ar: "استراتيجية المنتج" },
          note: {
            en: "Framing problems, scoping bets, defining what to build first.",
            ar: "صياغة المشكلات، وتحديد الرهانات، وتقرير ما يُبنى أولاً.",
          },
        },
        {
          name: { en: "UX research", ar: "أبحاث تجربة المستخدم" },
          note: {
            en: "Interviews, usability tests and analytics to ground decisions.",
            ar: "مقابلات، واختبارات قابلية الاستخدام، وتحليلات تُبنى عليها القرارات.",
          },
        },
        {
          name: { en: "Growth thinking", ar: "التفكير في النمو" },
          note: {
            en: "Designing for activation, retention and redemption loops.",
            ar: "تصميم حلقات التفعيل والاستبقاء والاستبدال.",
          },
        },
      ],
    },
    {
      group: { en: "Craft", ar: "الحِرفة" },
      items: [
        {
          name: { en: "Interaction design", ar: "تصميم التفاعل" },
          note: {
            en: "Flows, states and motion that make products feel effortless.",
            ar: "مسارات وحالات وحركة تجعل المنتجات سهلة وسلسة.",
          },
        },
        {
          name: { en: "UI design", ar: "تصميم الواجهات" },
          note: {
            en: "Precise, calm interfaces across mobile, web and dashboards.",
            ar: "واجهات دقيقة وهادئة للجوال والويب ولوحات التحكم.",
          },
        },
        {
          name: { en: "Design systems", ar: "أنظمة التصميم" },
          note: {
            en: "Tokens, components and guidelines that scale across apps.",
            ar: "رموز تصميم ومكوّنات وإرشادات تتوسّع عبر التطبيقات.",
          },
        },
      ],
    },
    {
      group: { en: "Context", ar: "السياق" },
      items: [
        {
          name: { en: "B2B & B2C products", ar: "منتجات B2B و B2C" },
          note: {
            en: "Consumer apps, merchant tools and enterprise consoles.",
            ar: "تطبيقات للمستهلكين، وأدوات للتجّار، ولوحات تحكم للمؤسسات.",
          },
        },
        {
          name: { en: "Complex workflows", ar: "سير عمل معقّد" },
          note: {
            en: "Segmentation, campaigns, payments, bookings, wallets.",
            ar: "التقسيم، والحملات، والمدفوعات، والحجوزات، والمحافظ.",
          },
        },
        {
          name: { en: "Cross-functional teams", ar: "فرق متعددة التخصصات" },
          note: {
            en: "Working side by side with product managers and engineers.",
            ar: "العمل جنباً إلى جنب مع مديري المنتجات والمهندسين.",
          },
        },
      ],
    },
  ],

  toolbox: [
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
    "CleverTap",
    "Notion",
    "Confluence",
    "Miro",
    "Jira",
    "Claude",
    "Cursor",
  ],
};

const byLocale = localizeAll<Experience>(content);

export const getExperience = (locale: Locale) => byLocale[locale];
