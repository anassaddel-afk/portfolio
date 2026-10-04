import type { Locale } from "@/lib/i18n";

/**
 * Interface copy for every language.
 * Hero headline lines use `{portrait}` for the inline photo.
 * `rotating` is the closing phrase that cycles in the Hero.
 * Project and experience content lives next to its data in `projects.ts` and `experience.ts`.
 */
const en = {
  meta: {
    title: "Anas Adel — Product Designer (B2B, B2C & SaaS)",
    description: "Anas Adel — Product Designer (B2B, B2C & SaaS) Portfolio website",
    ogAlt: "Anas Adel, Product Designer (B2B, B2C & SaaS)",
  },
  name: "Anas Adel",
  role: "Senior Product Designer",
  skipToContent: "Skip to content",

  nav: {
    label: "Primary",
    mobileLabel: "Mobile",
    home: "Anas Adel — home",
    menu: "Menu",
    close: "Close",
    items: { work: "Work", about: "About", experience: "Experience", contact: "Contact" },
  },
  language: {
    label: "Language",
    short: { en: "EN", ar: "عربي" },
    switchTo: { en: "Switch to English", ar: "Switch to Arabic" },
  },
  theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme", light: "Light theme", dark: "Dark theme" },

  collaborators: {
    red: ["User Research", "Customer Insights", "Usability Testing", "User Needs"],
    green: ["Design Systems", "Interaction Design", "Information Architecture", "Design Patterns"],
    blue: ["Product Strategy", "Product Discovery", "Experimentation", "Product Thinking"],
    yellow: ["Prototyping", "Concept Testing", "Experience Design", "Interface Design"],
  },
  curious: {
    prompt: "Curious about my work, or how I approach product problems?",
    cta: "Ask Anas",
  },

  hero: {
    label: "Introduction",
    eyebrow: "Senior digital product designer",
    years: "",
    headline: ["I {portrait} design digital products", "and user experiences,", "turning complex problems into"],
    rotating: [
      "simpler solutions.",
      "usable experiences.",
      "beautiful interfaces.",
      "human-centered products.",
      "scalable systems.",
      "measurable outcomes.",
    ],
    headlineText:
      "I design digital products and user experiences, turning complex problems into simpler solutions, usable experiences, beautiful interfaces, human-centered products, scalable systems, and measurable outcomes.",
    supporting: "",
    viewWork: "View work",
    letsTalk: "Let's talk",
    scrollDown: "Scroll down",
    curious: "Curious by default —",
    ticker: ["Create things.", "Solve problems.", "Explore ideas.", "Build products.", "Keep growing."],
    selectedProjects: "Selected projects",
    greeting: "Hi, I'm Anas",
    portraitLabel: "Say hi to Anas",
  },

  work: {
    label: "Selected Work",
    title: ["My Work"],
    intro: "Products where the hard part is the flow — loyalty, payments, memberships, and the tools that run them.",
    projects: "Projects",
    viewCaseStudy: "View case study",
    comingSoon: "Coming soon",
    comingSoonNote: "Case study coming soon.",
    indexCta: "Index of all work",
  },

  about: {
    label: "About",
    greeting: ["Hello,", "I'm Anas."],
    paragraphs: [
      "I work on products where payments, memberships, operations and people have to fit in one flow. A wallet that has to know who paid. Points someone can actually spend. A club visit that starts on a phone and ends at a gate.",
      "I like working with product and engineering from the constraint through the thing that ships. The screen is how a decision shows up. It is not where the decision starts.",
    ],
    downloadCv: "Download CV",
    fullExperience: "Full experience",
    portraitAlt: "Black and white portrait of Anas Adel smiling, arms crossed",
    stats: { years: "Years in product design", companies: "Companies" },
    regionsLabel: "Regions",
    regions: ["MENA", "US"],
    productsLabel: "Products",
    audiences: ["B2B", "B2C"],
    industriesLabel: "Industries",
    industries: ["Fintech", "Loyalty", "Marketplaces", "SaaS"],
  },

  principles: {
    label: "Principles",
    title: ["How I Work"],
    intro:
      "I start with the problem, understand the context around it, and use evidence to make decisions. Then I work with the team to turn those decisions into something people can actually use — and measure what happens next.",
    close:
      "I look for the intersection between what people need, what the product needs to achieve, and what the team can realistically build.",
  },

  capabilities: {
    label: "Capabilities",
    title: ["From the problem", "to the pixel."],
    intro: "Research, the flow, the system, and the interface that ships.",
    toolbox: "Toolbox",
  },

  experience: {
    label: "Experience",
    title: ["Where I've worked"],
    careerTitle: "Where I've worked",
    intro: "What I worked on, who I worked with, and which results belong to me, the team, or the company.",
    careerIntro: "A short pass through the products, the problems, and what changed.",
    viewFull: "View full experience",
    fullLink: "Full experience & products",
    opensNewTab: "(opens in a new tab)",
  },

  contact: {
    label: "Contact",
    title: ["Have a product", "problem to solve?"],
    letsTalk: "Let's talk",
    email: "Email",
    elsewhere: "Elsewhere",
    call: "Book a 30-min call",
  },

  social: { linkedin: "LinkedIn", substack: "Substack", dribbble: "Dribbble", x: "X", cv: "CV", email: "Email" },

  footer: { backToTop: "Back to top" },

  copyEmail: { copy: "Copy", copied: "Copied", status: "Email address copied to clipboard" },

  cursor: { view: "View", viewProject: "View project", open: "Open", drag: "Drag", close: "Close", zoom: "Zoom", next: "Next", hello: "Hello" },

  caseStudy: {
    allWork: "All work",
    caseStudy: "Case study",
    viewLive: "View live product",
    contents: "Contents",
    sectionsLabel: "Case study sections",
    step: "Step",
    nextProject: "Next project",
    viewCaseStudy: "View case study",
    meta: { client: "Client", company: "Company", role: "Role", year: "Year", platform: "Platform", focus: "Focus" },
  },

  gallery: { label: "Image gallery", previous: "Previous images", next: "Next images", open: "Open image" },

  lightbox: {
    label: "Image viewer",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    prevShort: "Prev",
    nextShort: "Next",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fit: "Fit to screen",
    hintZoom: "Click or pinch to zoom",
    hintPan: "Drag to move around the image",
  },

  beforeAfter: { before: "Before", after: "After", compare: "Compare before and after", drag: "Drag to compare", valueText: "% before" },

  workPage: {
    metaTitle: "Work",
    metaDescription: "A selection of products, experiences, and design systems designed by Anas Adel.",
    label: "(Index) — Work",
    title: ["My Work"],
    intro: "Products where the hard part is the flow — loyalty, payments, memberships, and the tools that run them.",
    listLabel: "All projects",
  },

  aboutPage: {
    metaTitle: "About",
    metaDescription: "How Anas Adel thinks about product problems, and the work he cares about.",
  },

  experiencePage: {
    metaTitle: "Experience",
    metaDescription: "A professional timeline and selected products designed by Anas Adel.",
    label: "(Timeline) — Experience",
    title: ["Experience"],
    productsLabel: "Products",
    productsTitle: ["Shipped products"],
    toolboxLabel: "Toolbox",
    toolboxTitle: ["My toolbox"],
    toolboxIntro: "What I use from research through a shipped interface.",
  },

  notFound: { title: ["This page", "doesn't exist."], back: "Back home" },

  askAnas: {
    name: "Ask Anas",
    open: "Ask Anas",
    close: "Close Ask Anas",
    subtitle: "Curious about my work or how I approach product problems? Ask away.",
    questions: "Suggested questions",
    explore: "View case study",
    related: "Read more",
    more: "Ask something else",
    placeholder: "Or ask in your own words",
    fallback: "I can talk about where I've worked, the redemption case study, how I start a problem, or how I use research and experiments. Pick a question, or ask in your own words.",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    title: "أنس عادل — مصمم منتجات (B2B و B2C و SaaS)",
    description: "أنس عادل — مصمم منتجات (B2B و B2C و SaaS) موقع الأعمال",
    ogAlt: "أنس عادل، مصمم منتجات (B2B و B2C و SaaS)",
  },
  name: "أنس عادل",
  role: "مصمم منتجات أول",
  skipToContent: "انتقل إلى المحتوى",

  nav: {
    label: "التنقّل الرئيسي",
    mobileLabel: "قائمة الجوال",
    home: "أنس عادل — الصفحة الرئيسية",
    menu: "القائمة",
    close: "إغلاق",
    items: { work: "الأعمال", about: "نبذة", experience: "الخبرات", contact: "تواصل" },
  },
  language: {
    label: "اللغة",
    short: { en: "EN", ar: "عربي" },
    switchTo: { en: "عرض الموقع بالإنجليزية", ar: "عرض الموقع بالعربية" },
  },
  theme: { toLight: "التبديل إلى الوضع الفاتح", toDark: "التبديل إلى الوضع الداكن", light: "الوضع الفاتح", dark: "الوضع الداكن" },

  collaborators: {
    red: ["بحث المستخدم", "رؤى العملاء", "اختبار سهولة الاستخدام", "احتياجات المستخدم"],
    green: ["أنظمة التصميم", "تصميم التفاعل", "هندسة المعلومات", "أنماط التصميم"],
    blue: ["استراتيجية المنتج", "اكتشاف المنتج", "التجريب", "تفكير المنتج"],
    yellow: ["النماذج الأولية", "اختبار المفاهيم", "تصميم التجربة", "تصميم الواجهة"],
  },
  curious: {
    prompt: "حابب تعرف أكثر عن شغلي، أو عن طريقتي في حل مشكلات المنتجات؟",
    cta: "اسأل أنس",
  },

  hero: {
    label: "المقدّمة",
    eyebrow: "مصمم منتجات رقمية",
    years: "",
    headline: ["أنا {portrait} أصمّم المنتجات الرقمية", "وتجارب المستخدم،", "وأحوّل المشكلات المعقّدة إلى"],
    rotating: [
      "حلول أبسط.",
      "تجارب أسهل استخداماً.",
      "واجهات أوضح.",
      "منتجات تضع الناس أولاً.",
      "أنظمة قابلة للتوسّع.",
      "نتائج يمكن قياسها.",
    ],
    headlineText:
      "أصمّم المنتجات الرقمية وتجارب المستخدم، وأحوّل المشكلات المعقّدة إلى حلول أبسط، وتجارب أسهل استخداماً، وواجهات أوضح، ومنتجات تضع الناس أولاً، وأنظمة قابلة للتوسّع، ونتائج يمكن قياسها.",
    supporting: "",
    viewWork: "استعرض الأعمال",
    letsTalk: "لنتحدّث",
    scrollDown: "مرّر للأسفل",
    curious: "فضولي بطبعي —",
    ticker: ["أصنع الأشياء.", "أحلّ المشكلات.", "أستكشف الأفكار.", "أبني المنتجات.", "أواصل النمو."],
    selectedProjects: "مشاريع مختارة",
    greeting: "أهلاً وسهلاً، معك أنس",
    portraitLabel: "ألقِ التحية على أنس",
  },

  work: {
    label: "أعمال مختارة",
    title: ["أعمالى"],
    intro: "منتجات يكون المسار فيها هو الجزء الصعب: الولاء، والمدفوعات، والعضويات، والأدوات التي تديرها الفرق.",
    projects: "مشاريع",
    viewCaseStudy: "عرض دراسة الحالة",
    comingSoon: "قريبًا",
    comingSoonNote: "دراسة الحالة قريبًا.",
    indexCta: "فهرس جميع الأعمال",
  },

  about: {
    label: "نبذة",
    greeting: ["مرحباً،", "أنا أنس."],
    paragraphs: [
      "أعمل على منتجات يجب أن تجتمع فيها المدفوعات والعضويات والعمليات والناس في مسار واحد. محفظة تعرف من دفع. نقاط يمكن إنفاقها فعلاً. زيارة نادٍ تبدأ من الهاتف وتنتهي عند البوابة.",
      "أحب العمل مع فرق المنتج والهندسة من القيد حتى ما يُطلق. الشاشة هي الطريقة التي يظهر بها القرار، وليست المكان الذي يبدأ منه.",
    ],
    downloadCv: "تحميل السيرة الذاتية",
    fullExperience: "الخبرات كاملة",
    portraitAlt: "صورة بالأبيض والأسود لأنس عادل مبتسماً ومكتوف الذراعين",
    stats: { years: "سنوات في تصميم المنتجات", companies: "شركات" },
    regionsLabel: "المناطق",
    regions: ["الشرق الأوسط", "أمريكا"],
    productsLabel: "المنتجات",
    audiences: ["B2B", "B2C"],
    industriesLabel: "القطاعات",
    industries: ["التقنية المالية", "برامج الولاء", "الأسواق الرقمية", "SaaS"],
  },

  principles: {
    label: "المبادئ",
    title: ["كيف أعمل"],
    intro:
      "أبدأ بفهم المشكلة وسياقها، وأستخدم البحث والبيانات للوصول إلى قرارات أوضح. ثم أعمل مع الفريق لتحويل هذه القرارات إلى تجربة يمكن للناس استخدامها، وأتابع ما يحدث بعدها.",
    close:
      "أبحث عن نقطة التقاء ما يحتاجه المستخدم، وما يحتاج المنتج إلى تحقيقه، وما يستطيع الفريق بناءه بشكل واقعي.",
  },

  capabilities: {
    label: "القدرات",
    title: ["من المشكلة", "إلى آخر بكسل."],
    intro: "البحث، والمسار، والنظام، والواجهة التي تصل إلى الناس.",
    toolbox: "الأدوات",
  },

  experience: {
    label: "الخبرات",
    title: ["أين عملت"],
    careerTitle: "أماكن عملت بها",
    intro: "ما عملت عليه، ومع من، وأي النتائج تعود إليّ أو إلى الفريق أو إلى الشركة.",
    careerIntro: "مرور مختصر على المنتجات، والمشكلات، وما الذي تغيّر.",
    viewFull: "عرض الخبرة كاملة",
    fullLink: "الخبرات والمنتجات كاملة",
    opensNewTab: "(يفتح في علامة تبويب جديدة)",
  },

  contact: {
    label: "تواصل",
    title: ["هل لديك تحدٍّ في المنتج", "يحتاج إلى حل؟"],
    letsTalk: "لنتحدّث",
    email: "البريد الإلكتروني",
    elsewhere: "روابط أخرى",
    call: "احجز مكالمة مدتها 30 دقيقة",
  },

  social: { linkedin: "LinkedIn", substack: "Substack", dribbble: "Dribbble", x: "X", cv: "السيرة الذاتية", email: "البريد" },

  footer: { backToTop: "العودة إلى الأعلى" },

  copyEmail: { copy: "نسخ", copied: "تم النسخ", status: "تم نسخ البريد الإلكتروني" },

  cursor: { view: "عرض", viewProject: "عرض المشروع", open: "افتح", drag: "اسحب", close: "إغلاق", zoom: "تكبير", next: "التالي", hello: "مرحباً" },

  caseStudy: {
    allWork: "كل الأعمال",
    caseStudy: "دراسة حالة",
    viewLive: "شاهد المنتج",
    contents: "المحتويات",
    sectionsLabel: "أقسام دراسة الحالة",
    step: "الخطوة",
    nextProject: "المشروع التالي",
    viewCaseStudy: "عرض دراسة الحالة",
    meta: { client: "العميل", company: "الشركة", role: "الدور", year: "السنة", platform: "المنصّة", focus: "التركيز" },
  },

  gallery: { label: "معرض الصور", previous: "الصور السابقة", next: "الصور التالية", open: "افتح الصورة" },

  lightbox: {
    label: "عارض الصور",
    close: "إغلاق",
    previous: "الصورة السابقة",
    next: "الصورة التالية",
    prevShort: "السابقة",
    nextShort: "التالية",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    fit: "ملاءمة الشاشة",
    hintZoom: "انقر أو باعد بإصبعيك للتكبير",
    hintPan: "اسحب للتنقّل داخل الصورة",
  },

  beforeAfter: { before: "قبل", after: "بعد", compare: "قارن بين قبل وبعد", drag: "اسحب للمقارنة", valueText: "% قبل" },

  workPage: {
    metaTitle: "الأعمال",
    metaDescription: "منتجات وتجارب وأنظمة تصميم من عمل أنس عادل.",
    label: "(الفهرس) — الأعمال",
    title: ["أعمالى"],
    intro: "منتجات يكون المسار فيها هو الجزء الصعب: الولاء، والمدفوعات، والعضويات، والأدوات التي تديرها الفرق.",
    listLabel: "جميع المشاريع",
  },

  aboutPage: {
    metaTitle: "نبذة",
    metaDescription: "كيف يفكّر أنس عادل في مشكلات المنتجات، والعمل الذي يهتم به.",
  },

  experiencePage: {
    metaTitle: "الخبرات",
    metaDescription: "المسيرة المهنية ومنتجات مختارة من عمل أنس عادل.",
    label: "(المسيرة) — الخبرات",
    title: ["الخبرات"],
    productsLabel: "المنتجات",
    productsTitle: ["منتجات أُطلقت"],
    toolboxLabel: "الأدوات",
    toolboxTitle: ["أدواتي"],
    toolboxIntro: "ما أستخدمه من بحث المستخدمين حتى الواجهة التي تصل إلى الناس.",
  },

  notFound: { title: ["هذه الصفحة", "غير موجودة."], back: "العودة إلى الرئيسية" },

  askAnas: {
    name: "اسأل أنس",
    open: "اسأل أنس",
    close: "إغلاق اسأل أنس",
    subtitle: "حابب تعرف أكثر عن شغلي أو طريقتي في حل مشكلات المنتجات؟ اسألني.",
    questions: "أسئلة مقترحة",
    explore: "عرض دراسة الحالة",
    related: "اقرأ المزيد",
    more: "اسأل عن شيء آخر",
    placeholder: "أو اكتب سؤالك",
    fallback: "أقدر أحكي عن أماكن اشتغلت فيها، أو عن دراسة الاستبدال، أو عن كيف أبدأ مشكلة، أو عن البحث والتجارب. اختَر سؤالًا، أو اكتب سؤالك.",
  },
};

export const translations: Record<Locale, Dictionary> = { en, ar };
