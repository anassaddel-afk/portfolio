import { localizeAll, type Localized, type Locale } from "@/lib/i18n";

export type RoleHighlight = { value: string; label: string };

export type Role = {
  company: string;
  period: string;
  role: string;
  location: string;
  /** Short line for the home timeline. */
  summary: string;
  /** Fuller account for the experience page. */
  detail: string;
  highlights: RoleHighlight[];
  focus: string[];
  /** Project work, not a staff role. Shown as small metadata beside the date. */
  freelance?: boolean;
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
const freelanceNote = { en: "Freelance", ar: "عمل مستقل" };
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
        en: "Designed across consumer, merchant, and business products, pairing product design with growth experiments. Over two years the ecosystem recorded 3× user growth, 8× paying-customer growth, and 5× sales growth.",
        ar: "صمّمت منتجات للأفراد والتجّار وقطاع الأعمال، إلى جانب تجارب النمو. خلال عامين سجّلت المنظومة نموًا بمقدار 3 أضعاف في المستخدمين، و8 أضعاف في العملاء الذين دفعوا، و5 أضعاف في المبيعات.",
      },
      detail: {
        en: "I design across Resal's consumer, merchant, and business products — loyalty, payments, wallet, booking, and growth — with product and growth partners. I contribute to more than 11 experiments a month and lead more than four. One feature I designed helped bring more than 15 merchants into the ecosystem in its first quarter. The 3×, 8×, and 5× figures are business results for that two-year period, not a claim that design alone produced them.",
        ar: "أعمل على تصميم منتجات رسال للأفراد والتجّار وقطاع الأعمال: الولاء، والمدفوعات، والمحفظة، والحجوزات، والنمو، مع فرق المنتج والنمو. أساهم في أكثر من 11 تجربة شهريًا، وأقود أكثر من أربع. إحدى الخصائص التي صمّمتها ساعدت على انضمام أكثر من 15 تاجرًا في ربعها الأول. أرقام 3 و8 و5 أضعاف نتائج للمنظومة خلال عامين، وليست أثرًا أنسبه لعملي وحدي.",
      },
      highlights: [
        {
          value: "11+",
          label: { en: "experiments a month, with the growth team", ar: "تجربة نمو شهريًا، مع فريق النمو" },
        },
        {
          value: "15+",
          label: { en: "merchants onboarded in a feature's first quarter", ar: "تاجرًا في الربع الأول لخاصية جديدة" },
        },
      ],
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
      freelance: true,
      location: { en: "Canada · Remote", ar: "كندا · عن بُعد" },
      summary: {
        en: "Improved QR ordering and checkout: 16% less time to complete an order, 18% less checkout drop-off, and 12% higher average order value.",
        ar: "حسّنت الطلب عبر رمز QR وإتمام الدفع: وقت أقل بنسبة 16% لإتمام الطلب، وتخلٍّ أقل بنسبة 18% أثناء الدفع، ومتوسط قيمة طلب أعلى بنسبة 12%.",
      },
      detail: {
        en: "I worked on the path from scanning a QR code to the kitchen receiving the order, and on the checkout that follows. Median order completion time fell 16%. Checkout drop-off, from the start of checkout to a completed payment, fell 18%. Average order value rose 12% through menu structure and where upsells sit. Before engineering handoff, using Claude Code Pro cut design iteration cycles by 20%.",
        ar: "عملت على المسار من مسح رمز QR حتى وصول الطلب إلى المطبخ، ثم على إتمام الدفع. انخفض الوسيط الزمني لإتمام الطلب بنسبة 16%. وانخفض التخلي عن الدفع، من بدايته حتى اكتمال الدفع، بنسبة 18%. وارتفع متوسط قيمة الطلب بنسبة 12% عبر ترتيب القائمة ومواضع العروض الإضافية. وقبل تسليم العمل للهندسة، خفّض استخدام Claude Code Pro دورات تعديل التصميم بنسبة 20%.",
      },
      highlights: [
        {
          value: "−16%",
          label: { en: "order completion time", ar: "وقت إتمام الطلب" },
        },
        {
          value: "−18%",
          label: { en: "checkout drop-off", ar: "التخلي عن إتمام الدفع" },
        },
        {
          value: "+12%",
          label: { en: "average order value", ar: "متوسط قيمة الطلب" },
        },
      ],
      focus: [{ en: "Multi-product", ar: "متعدد المنتجات" }, { en: "Restaurants", ar: "المطاعم" }, "B2B"],
      href: "https://waitery.ca/",
    },
    {
      company: "Blue Ribbon",
      period: "2023 — 2025",
      role: seniorPD,
      freelance: true,
      location: egypt,
      summary: {
        en: "Designed an early digital sports club experience in MENA, across 14+ features. Nearly 90% of members used the app in its first quarter. The design system then supported 3+ more club apps.",
        ar: "صمّمت تجربة رقمية مبكرة لنادٍ رياضي في المنطقة، تضم أكثر من 14 خاصية. استخدم نحو 90% من الأعضاء التطبيق في ربعه الأول، ثم دعم نظام التصميم أكثر من 3 تطبيقات إضافية.",
      },
      detail: {
        en: "I worked on a mobile app that puts a club's bookings, academies, payments, and access in one place — more than 14 features in that app. In the first quarter, nearly 90% of members were using it. I also designed a reusable system that went on to support more than three other club apps.",
        ar: "عملت على تطبيق يجمع حجوزات النادي وأكاديمياته ومدفوعاته ودخول الأعضاء في مكان واحد، بأكثر من 14 خاصية. في الربع الأول كان نحو 90% من الأعضاء يستخدمونه. وصمّمت نظامًا قابلًا لإعادة الاستخدام دعم أكثر من ثلاثة تطبيقات لأندية أخرى.",
      },
      highlights: [
        {
          value: "~90%",
          label: { en: "of members using the app in the first quarter", ar: "من الأعضاء استخدموا التطبيق في الربع الأول" },
        },
        {
          value: "3+",
          label: { en: "more club apps on the design system", ar: "تطبيقات إضافية اعتمدت على نظام التصميم" },
        },
      ],
      focus: [{ en: "Design systems", ar: "أنظمة التصميم" }, "B2C", { en: "Sports", ar: "الرياضة" }],
    },
    {
      company: "Dsquares",
      period: "2022 — 2024",
      role: { en: "Product Designer", ar: "مصمم منتجات" },
      location: egypt,
      summary: {
        en: "Designed loyalty and fintech experiences for 15+ enterprise clients. Contributed to C-Cubed, a campaign and segmentation platform that simplified operations for 7+ companies and was associated with 20% company revenue growth in its first quarter.",
        ar: "صمّمت تجارب ولاء وتقنية مالية لأكثر من 15 عميلًا من الشركات. وساهمت في C-Cubed، منصة لإدارة الحملات وتقسيم العملاء، بسّطت العمل لأكثر من 7 شركات وارتبطت بنمو إيرادات الشركة بنسبة 20% في ربعها الأول.",
      },
      detail: {
        en: "I designed loyalty and fintech products for more than 15 enterprise clients, including work already public for Mastercard, Vodafone, ExxonMobil, and Egypt Post. With engineers, product managers, growth marketing, data, and operations, I contributed to C-Cubed: campaign management and customer segmentation for account managers, operations, and clients. The platform supported more than seven enterprise companies. In its first quarter, the company reported 20% revenue growth associated with the initiative. Launching campaigns also took less operational effort.",
        ar: "صمّمت منتجات ولاء وتقنية مالية لأكثر من 15 عميلًا من الشركات، ومنها أعمال نُشرت سابقًا مع Mastercard وVodafone وExxonMobil والبريد المصري. ومع الهندسة والمنتج ونمو التسويق والبيانات والعمليات، ساهمت في C-Cubed: إدارة الحملات وتقسيم العملاء لمديري الحسابات والعمليات والعملاء. دعمت المنصة أكثر من سبع شركات. وفي ربعها الأول أعلنت الشركة عن نمو في الإيرادات بنسبة 20% مرتبط بهذه المبادرة. كما صار إطلاق الحملات أقل جهدًا على العمليات.",
      },
      highlights: [
        {
          value: "15+",
          label: { en: "enterprise clients", ar: "عميلًا من الشركات" },
        },
        {
          value: "20%",
          label: { en: "company revenue growth in the first quarter", ar: "نمو إيرادات الشركة في الربع الأول" },
        },
      ],
      focus: [loyalty, { en: "White-label", ar: "العلامات البيضاء" }, { en: "Enterprise", ar: "المؤسسات" }],
      href: "https://dsquares.com/",
    },
    {
      company: "Bypa-ss",
      period: "2021 — 2022",
      role: { en: "Junior Product Designer", ar: "مصمم منتجات مبتدئ" },
      location: egypt,
      summary: {
        en: "As a junior designer, contributed to an early e-prescription experience in MENA: high-fidelity UI from healthcare requirements, plus research, medical information, and documentation.",
        ar: "كمصمم مبتدئ، ساهمت في تجربة مبكرة للوصفات الطبية الإلكترونية في المنطقة: واجهات عالية الدقة من متطلبات الرعاية الصحية، مع البحث والمعلومات الطبية والتوثيق.",
      },
      detail: {
        en: "Bypa-ss builds healthcare infrastructure in Egypt, including a national health-information network. I joined as a junior designer. I contributed to an early e-prescription experience in MENA, turned requirements into high-fidelity UI, worked on medical information, documented product and design requirements, and practiced research by watching how people used the product. The suite has served more than 200,000 users and more than 5,000 providers. The company also reported 10× physician growth and 5× consumer growth in one year. Those are product and company figures, not results I delivered on my own.",
        ar: "تبني Bypa-ss بنية تحتية للرعاية الصحية في مصر، ومنها شبكة وطنية لتبادل المعلومات الصحية. انضممت كمصمم مبتدئ. ساهمت في تجربة مبكرة للوصفات الطبية الإلكترونية في المنطقة، وحوّلت المتطلبات إلى واجهات عالية الدقة، وعملت على المعلومات الطبية، ووثّقت متطلبات المنتج والتصميم، وتدرّبت على البحث بمراقبة استخدام الناس. خدمت المنظومة أكثر من 200 ألف مستخدم وأكثر من 5 آلاف مقدّم خدمة. كما أعلنت الشركة عن نمو بمقدار 10 أضعاف في الأطباء و5 أضعاف في المستخدمين خلال عام. هذه أرقام للمنتج والشركة، لا نتائج أنجزتها بمفردي.",
      },
      highlights: [
        {
          value: "200K+",
          label: { en: "users", ar: "مستخدم" },
        },
        {
          value: "5K+",
          label: { en: "providers reached by the product", ar: "مقدّم خدمة تصل إليهم المنظومة" },
        },
      ],
      focus: [{ en: "Mobile", ar: "الجوال" }, { en: "Interaction", ar: "التفاعل" }, { en: "Motion", ar: "الحركة" }],
    },
  ],

  products: [
    { name: "Resal App", context: "Resal", year: "2025", href: "https://apps.apple.com/eg/app/resal-%D8%B1%D8%B3%D8%A7%D9%84/id1164433567" },
    { name: "Resal Platform", context: "Resal", year: "2026", href: "https://giftcards.resal.me/en" },
    { name: "Resal", context: "Resal", year: "2025", href: "https://www.resal.me/" },
    { name: "Resal Merchants", context: "Resal", year: "2025", href: "https://www.resal.me/resal-loyalty/" },
    { name: "Waitery", context: freelanceNote, year: "2025", href: "https://waitery.ca/" },
    { name: "KODE Club", context: freelanceNote, year: "2025", href: "https://apps.apple.com/eg/app/kode-sports-club/id1603263204" },
    { name: "C-Cubed", context: "Dsquares", year: "2024", href: "https://dsquares.com/c-cubed/" },
    { name: "Priceless", context: "Mastercard · Dsquares", year: "2024" },
    { name: "Mobilawy", context: "Mobil 1 · Dsquares", year: "2023" },
  ],

  principles: [
    {
      title: { en: "Start with the real problem", ar: "أبدأ بالمشكلة الحقيقية" },
      body: {
        en: "Before designing a solution, I try to understand what is really happening — what people need, what the business is trying to achieve, and where the friction actually comes from.",
        ar: "قبل أن أصمم الحل، أحاول فهم ما يحدث فعلًا: ماذا يحتاج الناس، وما الذي يحاول المنتج تحقيقه، وأين تكمن المشكلة.",
      },
    },
    {
      title: { en: "Understand the whole picture", ar: "أفهم الصورة كاملة" },
      body: {
        en: "I look beyond the screen. I consider the journey, the business rules, what the product depends on, the constraints, and the people involved in making it work.",
        ar: "أنظر إلى الصورة كاملة، لا إلى الشاشة وحدها. أفهم رحلة المستخدم، وقواعد المنتج، وما يعتمد عليه، والقيود، والناس الذين يشاركون في بناء التجربة.",
      },
    },
    {
      title: { en: "Let evidence shape the decision", ar: "أحوّل الأدلة إلى قرارات" },
      body: {
        en: "I choose the method from the question — observation, interviews, product analytics, usability testing, or an experiment. The point is to test an assumption, not to confirm one.",
        ar: "أختار طريقة البحث حسب السؤال: ملاحظة ومقابلات، أو تحليلات المنتج، أو اختبار استخدام، أو تجربة. الهدف أن أختبر افتراضًا، لا أن أؤكد قرارًا اتخذته مسبقًا.",
      },
    },
    {
      title: { en: "Build with the team", ar: "أعمل مع الفريق" },
      body: {
        en: "Good product design happens with the people building and growing the product. I work with product managers, programmers, and the growth, marketing, and data teams so a decision can actually move into the product.",
        ar: "تصميم المنتج الجيد يحدث مع من يبنون المنتج ويطوّرونه. أعمل مع مديري المنتجات والمبرمجين وفرق النمو والتسويق والبيانات حتى يكون القرار قابلاً للتنفيذ داخل المنتج.",
      },
    },
    {
      title: { en: "Move quickly, learn, improve", ar: "أتحرك بسرعة، وأتعلّم، وأطوّر" },
      body: {
        en: "I prototype early, test ideas, and iterate from what happens after launch — whether people finish the journey and the outcome actually moves. When AI tools speed up exploration, prototyping, or documentation, I use them as an accelerator. The product decisions stay mine.",
        ar: "أصنع النماذج الأولية مبكرًا، وأختبر الأفكار، وأطوّرها حسب ما يحدث بعد الإطلاق: هل يكمل الناس الرحلة، وهل تتحرك النتيجة المطلوبة. وعندما تسرّع أدوات الذكاء الاصطناعي الاستكشاف أو النمذجة أو التوثيق، أستخدمها لتسريع العمل. قرارات المنتج تبقى بيدي.",
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

const PRESENT = /present|الآن|now/i;

/** Years inside a display period. Does not change how the period is shown. */
function periodSpan(period: string) {
  const years = period.match(/\d{4}/g)?.map(Number) ?? [];
  const start = years[0] ?? 0;
  const end = years[1] ?? start;
  const current = PRESENT.test(period);
  return { start, end: current ? 9999 : end, current };
}

/**
 * Most recent first. An ongoing role (Present) ranks ahead of a finished
 * role, even when that finished role started later. Then later end year,
 * then later start year.
 */
export function sortExperienceByDate<T extends { period: string }>(roles: readonly T[]): T[] {
  return [...roles].sort((a, b) => {
    const left = periodSpan(a.period);
    const right = periodSpan(b.period);
    if (left.current !== right.current) return left.current ? -1 : 1;
    if (left.end !== right.end) return right.end - left.end;
    return right.start - left.start;
  });
}
