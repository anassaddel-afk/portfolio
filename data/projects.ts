/**
 * Project content, in English and Arabic.
 *
 * Case-study copy is taken from the live product, the original Framer site,
 * and project decks where they exist. Do not invent metrics or research.
 */
import { localizeAll, type Localized, type Locale } from "@/lib/i18n";

/** Part of an image to spotlight, in fractions of its width and height (top-left origin). */
export type Focus = { x: number; y: number; w: number; h: number };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Colour sampled from the image edge, used for the frame around it. */
  tone?: string;
};

export type StoryStep = { title: string; body: string; image: ProjectImage; focus?: Focus };

export type InsightItem = { kicker?: string; title: string; body: string };
export type CompareColumn = { label: string; title: string; items: { title: string; body?: string }[] };
export type SystemItem = { title: string; body: string; steps: string[] };
export type JourneyStep = { label: string; note?: string; image?: ProjectImage; removed?: boolean };
export type MetricItem = { value: string; qualifier?: string; body: string };
export type PathItem = { title: string; steps: string[] };
export type FrameworkColumn = { title: string; items: string[] };
export type PhoneItem = { image: ProjectImage; label: string; kicker?: string };

export type Block =
  | { type: "text"; kicker?: string; lead?: string; body?: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "decisions"; items: { title: string; body: string }[] }
  | { type: "image"; image: ProjectImage }
  | { type: "gallery"; images: ProjectImage[] }
  | { type: "story"; steps: StoryStep[] }
  | { type: "beforeAfter"; before: ProjectImage; after: ProjectImage }
  | { type: "insights"; items: InsightItem[] }
  | { type: "compare"; left: CompareColumn; right: CompareColumn }
  | { type: "systems"; items: SystemItem[] }
  | { type: "journey"; eyebrow?: string; title?: string; note?: string; steps: JourneyStep[] }
  | { type: "metrics"; note?: string; items: MetricItem[] }
  | { type: "ecosystem"; center: string; lanes: string[]; foot: string }
  | { type: "flow"; steps: string[] }
  | { type: "paths"; items: PathItem[] }
  | { type: "framework"; columns: FrameworkColumn[] }
  | { type: "detail"; image: ProjectImage; kicker?: string; title: string; body: string; reverse?: boolean }
  | { type: "phones"; items: PhoneItem[]; caption?: string }
  | { type: "feature"; image: ProjectImage; caption?: string }
  | { type: "pair"; left: PhoneItem; right: PhoneItem; caption?: string };

export type Section = { id: string; label: string; title?: string; blocks: Block[] };

export type ProjectLayout = "right" | "left" | "full" | "split";

/** `available` publishes the case study. `coming-soon` keeps the project, without opening the write-up. */
export type ProjectStatus = "available" | "coming-soon";

export type Project = {
  slug: string;
  status: ProjectStatus;
  title: string;
  /** Title split into lines for the editorial homepage treatment. */
  display: string[];
  summary: string;
  /** Short card: the product, its domain, and one specific line. */
  card: { name: string; domain: string; line: string };
  tags: string[];
  client: string;
  company?: string;
  year?: string;
  role?: string;
  platform?: string;
  /** Short product name shown above the case-study headline. */
  kicker?: string;
  /** Extra line in the case-study meta, used when the work has a clear product focus. */
  focus?: string;
  liveUrl?: string;
  cover: ProjectImage;
  layout: ProjectLayout;
  sections: Section[];
};

const img = {
  resal: { src: "/images/work/resal-redemption.png", width: 2048, height: 1536, tone: "#f3f3ff" },
  resalPoints: { src: "/images/work/resal/points.jpg", width: 472, height: 1024, tone: "#eef1fb" },
  resalTransfer: { src: "/images/work/resal/transfer.jpg", width: 472, height: 1024, tone: "#eef1fb" },
  resalSuccess: { src: "/images/work/resal/success.jpg", width: 472, height: 1024, tone: "#eef1fb" },
  resalListing: { src: "/images/work/resal/listing.png", width: 375, height: 854, tone: "#eef1fb" },
  resalOriginalPoints: { src: "/images/work/resal/original-points.png", width: 375, height: 804, tone: "#f4eef8" },
  resalOriginalTransfer: { src: "/images/work/resal/original-transfer.png", width: 375, height: 854, tone: "#eef1fb" },
  resalOriginalSuccess: { src: "/images/work/resal/original-success.png", width: 375, height: 854, tone: "#eef1fb" },
  kode: { src: "/images/work/kode-club.png", width: 1600, height: 1200, tone: "#284f9d" },
  smoov: { src: "/images/work/smoov.png", width: 2048, height: 1456, tone: "#8266c7" },
  seamless: { src: "/images/work/seamless-priceless.png", width: 1600, height: 1200, tone: "#322c28" },
  campaign: { src: "/images/work/campaign-management.png", width: 1672, height: 941, tone: "#c6defc" },
  system: { src: "/images/work/design-system.png", width: 1672, height: 941, tone: "#8ba396" },
  ryze: { src: "/images/work/ryze-coaching.png", width: 1600, height: 1200, tone: "#1b4b57" },
};

const t = {
  overview: { en: "Overview", ar: "نظرة عامة" },
  problem: { en: "Problem", ar: "المشكلة" },
  insights: { en: "Insights", ar: "الرؤى" },
  strategy: { en: "Strategy", ar: "الاستراتيجية" },
  experience: { en: "Experience", ar: "التجربة" },
  outcome: { en: "Outcome", ar: "النتيجة" },
  learnings: { en: "Learnings", ar: "الدروس" },
  solution: { en: "Solution", ar: "الحل" },
  decisions: { en: "Decisions", ar: "القرارات" },
  client: { en: "Client", ar: "العميل" },
  company: { en: "Company", ar: "الشركة" },
  role: { en: "Role", ar: "الدور" },
  year: { en: "Year", ar: "السنة" },
  platform: { en: "Platform", ar: "المنصّة" },
  seniorPD: { en: "Senior Product Designer", ar: "مصمم منتجات أول" },
  pd: { en: "Product Designer", ar: "مصمم منتجات" },
  mobileApp: { en: "Mobile app", ar: "تطبيق جوال" },
  research: { en: "User Research", ar: "أبحاث المستخدم" },
};

const content: Localized<Project[]> = [
  {
    slug: "kode-club",
    status: "coming-soon",
    kicker: { en: "KODE Sports Club App", ar: "تطبيق KODE Sports Club" },
    title: {
      en: "Designing the digital layer of a modern sports club.",
      ar: "تصميم الطبقة الرقمية لنادٍ رياضي حديث.",
    },
    display: [
      { en: "Designing the digital layer", ar: "تصميم الطبقة الرقمية" },
      { en: "of a modern sports club.", ar: "لنادٍ رياضي حديث." },
    ],
    summary: {
      en: "KODE brings the club's everyday experiences into one mobile product — from discovering activities and booking facilities to managing academies, coaching, payments and access.",
      ar: "يجمع KODE تجارب النادي اليومية في منتج واحد للجوال — من اكتشاف الأنشطة وحجز الملاعب إلى متابعة الأكاديميات والتدريب والمدفوعات والدخول.",
    },
    card: {
      name: "KODE",
      domain: { en: "Sports club platform", ar: "منصة نادٍ رياضي" },
      line: {
        en: "Connecting bookings, payments, academies and member access.",
        ar: "يربط الحجوزات والمدفوعات والأكاديميات ودخول الأعضاء.",
      },
    },
    tags: ["B2C", { en: "Member experience", ar: "تجربة الأعضاء" }, { en: "Payments", ar: "المدفوعات" }],
    client: "KODE Club",
    company: "Blue Ribbon",
    year: "2025",
    role: t.pd,
    platform: { en: "Mobile", ar: "الجوال" },
    focus: {
      en: "Member experience · Booking · Payments · Access",
      ar: "تجربة الأعضاء · الحجوزات · المدفوعات · الدخول",
    },
    liveUrl: "https://apps.apple.com/eg/app/kode-sports-club/id1603263204",
    cover: {
      ...img.kode,
      alt: {
        en: "KODE Club app home screen and wallet screen on two phones",
        ar: "الشاشة الرئيسية وشاشة المحفظة في تطبيق KODE Club على هاتفين",
      },
    },
    layout: "right",
    sections: [
      {
        id: "club",
        label: { en: "The club", ar: "النادي" },
        title: {
          en: "A sports club is a multi-service product.",
          ar: "النادي الرياضي منتج متعدد الخدمات.",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "A member does not think in departments. They want to book a court, enroll a child, pay, see what is happening, and get through the gate.",
              ar: "العضو لا يفكر بأقسام النادي. يريد حجز ملعب، أو تسجيل ابنه، أو الدفع، أو معرفة ما يجري، أو الدخول من البوابة.",
            },
            body: [
              {
                en: "KODE is a multi-branch sports club. The product challenge was to connect those moments — facilities, academies, coaching, payments and access — into one member experience.",
                ar: "KODE نادٍ رياضي متعدد الفروع. كان تحدي المنتج ربط هذه اللحظات — الملاعب والأكاديميات والتدريب والمدفوعات والدخول — في تجربة واحدة للعضو.",
              },
            ],
          },
          {
            type: "ecosystem",
            center: { en: "KODE member", ar: "عضو KODE" },
            lanes: [
              { en: "Bookings", ar: "الحجوزات" },
              { en: "Academies", ar: "الأكاديميات" },
              { en: "Coaching", ar: "التدريب" },
              { en: "What's on", ar: "ما يجري" },
              { en: "Payments", ar: "المدفوعات" },
            ],
            foot: { en: "Club access", ar: "الدخول إلى النادي" },
          },
        ],
      },
      {
        id: "vision",
        label: { en: "Vision", ar: "الرؤية" },
        title: { en: "One member. One digital experience.", ar: "عضو واحد. تجربة رقمية واحدة." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The app is the front door. Discovery, booking, payment and the visit itself should feel like one path, not five products.",
              ar: "التطبيق هو الباب الأمامي. الاكتشاف والحجز والدفع والزيارة نفسها ينبغي أن تبدو مساراً واحداً، لا خمسة منتجات.",
            },
          },
          {
            type: "flow",
            steps: [
              { en: "Discover", ar: "اكتشف" },
              { en: "Plan", ar: "خطّط" },
              { en: "Book", ar: "احجز" },
              { en: "Pay", ar: "ادفع" },
              { en: "Attend", ar: "احضر" },
              { en: "Manage", ar: "أدِر" },
              { en: "Return", ar: "عُد" },
            ],
          },
        ],
      },
      {
        id: "domains",
        label: { en: "Domains", ar: "المجالات" },
        title: { en: "Designing beyond a single feature.", ar: "التصميم أبعد من ميزة واحدة." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "Each domain below is something the product actually carries: a court you can book, an academy you can open, a coach you can choose, a wallet that knows which member paid, and a code that opens the gate.",
                ar: "كل مجال أدناه موجود في المنتج فعلاً: ملعب يُحجز، وأكاديمية تُفتح، ومدرب يُختار، ومحفظة تعرف من دفع، ورمز يفتح البوابة.",
              },
            ],
          },
          {
            type: "insights",
            items: [
              {
                kicker: "01",
                title: { en: "Facilities", ar: "الملاعب" },
                body: {
                  en: "Pick a day and a court, then a time. Football, padel and basketball sit in the same booking pattern.",
                  ar: "اختر اليوم والملعب، ثم الوقت. كرة القدم والبادل وكرة السلة تتبع نمط الحجز نفسه.",
                },
              },
              {
                kicker: "02",
                title: { en: "Academies", ar: "الأكاديميات" },
                body: {
                  en: "Football, swimming, basketball and the rest are one list. A parent can open an academy and see its programmes.",
                  ar: "كرة القدم والسباحة وكرة السلة وغيرها في قائمة واحدة. يستطيع أحد الوالدين فتح أكاديمية ورؤية برامجها.",
                },
              },
              {
                kicker: "03",
                title: { en: "Private coaching", ar: "التدريب الخاص" },
                body: {
                  en: "Private coaching is a person you book for yourself or for someone in the family, on the same account as the rest of the club.",
                  ar: "التدريب الخاص شخص تحجزه لنفسك أو لأحد في العائلة، على الحساب نفسه الذي يحمل بقية النادي.",
                },
              },
              {
                kicker: "04",
                title: { en: "What's on", ar: "ما يجري في النادي" },
                body: {
                  en: "Home carries the club's news, programmes and services — sports, dining, referral — so the member does not have to go looking.",
                  ar: "الرئيسية تحمل أخبار النادي وبرامجه وخدماته — الرياضة والمطاعم والإحالة — فلا يحتاج العضو إلى البحث.",
                },
              },
              {
                kicker: "05",
                title: { en: "Wallet and payments", ar: "المحفظة والمدفوعات" },
                body: {
                  en: "Family wallets, transfer, pay, recharge and PIN. At checkout the member pays from the wallet or by card.",
                  ar: "محافظ العائلة، والتحويل، والدفع، والشحن، ورمز PIN. وعند إتمام الحجز يدفع العضو من المحفظة أو بالبطاقة.",
                },
              },
              {
                kicker: "06",
                title: { en: "Access", ar: "الدخول" },
                body: {
                  en: "A QR code is the member's key. The same account that booked the court is what the gate reads.",
                  ar: "رمز QR هو مفتاح العضو. الحساب نفسه الذي حجز الملعب هو ما تقرأه البوابة.",
                },
              },
              {
                kicker: "07",
                title: { en: "Engagement", ar: "الاستمرار" },
                body: {
                  en: "The home knows the member, the branch and the balance, then surfaces what the club wants them to see next.",
                  ar: "تعرف الرئيسية العضو والفرع والرصيد، ثم تُظهر ما يريد النادي أن يراه العضو بعد ذلك.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "system",
        label: { en: "System", ar: "المنظومة" },
        title: { en: "From features to a product system.", ar: "من ميزات إلى منظومة منتج." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The work was not to make each module look finished on its own. A booking that cannot be paid, or a payment that forgets what it was for, is not a product.",
              ar: "لم يكن العمل أن تبدو كل وحدة مكتملة وحدها. حجز لا يُدفع، أو دفع ينسى سببه، ليس منتجاً.",
            },
            body: [
              {
                en: "Discovery leads to a time. The time leads to a booking. The booking leads to payment. Payment leads to a confirmation the member can find again.",
                ar: "الاكتشاف يقود إلى وقت. والوقت يقود إلى حجز. والحجز يقود إلى دفع. والدفع يقود إلى تأكيد يستطيع العضو الرجوع إليه.",
              },
            ],
          },
          {
            type: "flow",
            steps: [
              { en: "Discover", ar: "اكتشف" },
              { en: "Select", ar: "اختر" },
              { en: "Book", ar: "احجز" },
              { en: "Pay", ar: "ادفع" },
              { en: "Confirm", ar: "أكّد" },
              { en: "Attend", ar: "احضر" },
              { en: "Return", ar: "عُد" },
            ],
          },
        ],
      },
      {
        id: "journeys",
        label: { en: "Journeys", ar: "المسارات" },
        title: { en: "How different members move through the same product.", ar: "كيف يتحرك أعضاء مختلفون داخل المنتج نفسه." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "These are product paths, not research findings. Each one uses something the app actually does.",
                ar: "هذه مسارات منتج، وليست نتائج بحث. كل مسار يستخدم شيئاً يفعله التطبيق فعلاً.",
              },
            ],
          },
          {
            type: "paths",
            items: [
              {
                title: { en: "The active member", ar: "العضو النشط" },
                steps: [
                  { en: "See what's on at the club", ar: "يرى ما يجري في النادي" },
                  { en: "Book a court", ar: "يحجز ملعباً" },
                  { en: "Pay", ar: "يدفع" },
                  { en: "Get a confirmation", ar: "يحصل على تأكيد" },
                ],
              },
              {
                title: { en: "The parent", ar: "أحد الوالدين" },
                steps: [
                  { en: "Open the academies", ar: "يفتح الأكاديميات" },
                  { en: "Choose a programme", ar: "يختار برنامجاً" },
                  { en: "Book for a family member", ar: "يحجز لأحد أفراد العائلة" },
                  { en: "Follow it from the family wallet", ar: "يتابعه من محفظة العائلة" },
                ],
              },
              {
                title: { en: "The regular player", ar: "اللاعب المعتاد" },
                steps: [
                  { en: "Find a court", ar: "يجد ملعباً" },
                  { en: "Check the day", ar: "يتفقد اليوم" },
                  { en: "Book and pay", ar: "يحجز ويدفع" },
                  { en: "Enter with a QR code", ar: "يدخل برمز QR" },
                ],
              },
              {
                title: { en: "The returning member", ar: "العضو العائد" },
                steps: [
                  { en: "Land on a home that knows them", ar: "يصل إلى رئيسية تعرفه" },
                  { en: "See highlights and services", ar: "يرى أبرز ما يحدث والخدمات" },
                  { en: "Pay or book again", ar: "يدفع أو يحجز من جديد" },
                  { en: "Come back to the same account", ar: "يعود إلى الحساب نفسه" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "facilities",
        label: { en: "Facilities", ar: "الملاعب" },
        title: { en: "A court is a time, not a page.", ar: "الملعب وقت، وليس صفحة." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "Booking starts from the member, not from an empty calendar. The screen shows who is booking, which week, which court and which slot is still open.",
                ar: "يبدأ الحجز من العضو، لا من تقويم فارغ. تُظهر الشاشة من يحجز، وأي أسبوع، وأي ملعب، وأي وقت ما زال متاحاً.",
              },
            ],
          },
        ],
      },
      {
        id: "academies",
        label: { en: "Academies", ar: "الأكاديميات" },
        title: { en: "Academies and coaching share the member, not a menu.", ar: "الأكاديميات والتدريب يشتركان في العضو، لا في قائمة." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "Academies are how a family finds a programme. Private coaching is how a member books a person. Both sit on the same account, and both can be booked for someone else in the family.",
                ar: "الأكاديميات هي طريقة العائلة للعثور على برنامج. والتدريب الخاص هو طريقة العضو لحجز شخص. كلاهما على الحساب نفسه، وكلاهما يمكن حجزه لشخص آخر في العائلة.",
              },
            ],
          },
        ],
      },
      {
        id: "payments",
        label: { en: "Payments", ar: "المدفوعات" },
        title: { en: "Making payments part of the experience.", ar: "جعل الدفع جزءاً من التجربة." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Payment is not a checkout dropped on the end. It has to know the booking, the wallet, the person it was for, and how to show that again.",
              ar: "الدفع ليس صفحة إتمام تُلصق في الآخر. يجب أن يعرف الحجز، والمحفظة، والشخص الذي خُصص له، وكيف يُظهر ذلك مرة أخرى.",
            },
            body: [
              {
                en: "The aim is simple: finishing a club activity should feel like one continuous journey.",
                ar: "الهدف بسيط: إتمام نشاط في النادي ينبغي أن يبدو رحلة واحدة متصلة.",
              },
            ],
          },
          {
            type: "flow",
            steps: [
              { en: "Book", ar: "احجز" },
              { en: "Pay", ar: "ادفع" },
              { en: "Confirm", ar: "أكّد" },
              { en: "Upcoming", ar: "القادم" },
            ],
          },
        ],
      },
      {
        id: "engagement",
        label: { en: "Engagement", ar: "الاستمرار" },
        title: { en: "The club should feel personal.", ar: "ينبغي أن يبدو النادي شخصياً." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "The home is addressed to a person: their name, their branch, their balance, and Pay and Send within reach. Daily highlights and services — sports, dining, referral — are how the club stays in view between visits. It is a companion for this club, not a generic booking tool.",
                ar: "الرئيسية موجّهة إلى شخص: اسمه، وفرعه، ورصيده، والدفع والإرسال في متناول يده. أبرز ما يحدث يومياً والخدمات — الرياضة والمطاعم والإحالة — هي طريقة النادي ليبقى حاضراً بين الزيارات. إنه رفيق لهذا النادي، لا أداة حجز عامة.",
              },
            ],
          },
        ],
      },
      {
        id: "physical",
        label: { en: "Access", ar: "الدخول" },
        title: { en: "The product does not end at the screen.", ar: "المنتج لا ينتهي عند الشاشة." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "A court, a class or a coaching session happens inside the club. The app's job is to carry the member up to that door and recognise them when they arrive.",
                ar: "الملعب أو الحصة أو جلسة التدريب تحدث داخل النادي. مهمة التطبيق أن يوصل العضو إلى ذلك الباب، وأن يتعرّف عليه حين يصل.",
              },
            ],
          },
          {
            type: "flow",
            steps: [
              { en: "Discover", ar: "اكتشف" },
              { en: "Book", ar: "احجز" },
              { en: "Pay", ar: "ادفع" },
              { en: "Arrive", ar: "صِل" },
              { en: "Enter", ar: "ادخل" },
              { en: "Play", ar: "العب" },
              { en: "Return", ar: "عُد" },
            ],
          },
        ],
      },
      {
        id: "metrics",
        label: { en: "Measures", ar: "القياس" },
        title: {
          en: "How I would measure success.",
          ar: "كيف أقيس النجاح.",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "These were not measured on the project. They are the signals I would watch: whether members finish a booking, come back, pay in the app, and keep using it.",
              ar: "لم تُقاس هذه على المشروع. هي الإشارات التي أراقبها: هل يُتم العضو الحجز، وهل يعود، وهل يدفع من التطبيق، وهل يستمر في استخدامه.",
            },
          },
          {
            type: "framework",
            columns: [
              {
                title: { en: "Member", ar: "العضو" },
                items: [
                  { en: "Booking completion", ar: "إتمام الحجز" },
                  { en: "Repeat activity", ar: "تكرار النشاط" },
                  { en: "Digital engagement", ar: "التفاعل الرقمي" },
                  { en: "Satisfaction", ar: "الرضا" },
                ],
              },
              {
                title: { en: "Club", ar: "النادي" },
                items: [
                  { en: "Digital booking adoption", ar: "اعتماد الحجز الرقمي" },
                  { en: "Payment adoption", ar: "اعتماد الدفع" },
                  { en: "Operational load at the desk", ar: "العبء التشغيلي في الاستقبال" },
                  { en: "Retention", ar: "الاستبقاء" },
                ],
              },
              {
                title: { en: "Product", ar: "المنتج" },
                items: [
                  { en: "Activation", ar: "التفعيل" },
                  { en: "Feature adoption", ar: "اعتماد الميزات" },
                  { en: "Conversion", ar: "التحويل" },
                  { en: "Repeat usage", ar: "الاستخدام المتكرر" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "outcome",
        label: t.outcome,
        title: { en: "A digital front door to the club.", ar: "باب رقمي أمامي للنادي." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The product brings the club's services into one member experience, and shortens the distance between noticing an activity and actually taking part in it.",
              ar: "يجمع المنتج خدمات النادي في تجربة واحدة للعضو، ويقرّب المسافة بين ملاحظة نشاط والمشاركة فيه فعلاً.",
            },
            body: [
              {
                en: "Activities, bookings, payments, access and the reasons to come back now live on one account.",
                ar: "الأنشطة والحجوزات والمدفوعات والدخول وأسباب العودة تعيش الآن على حساب واحد.",
              },
            ],
          },
        ],
      },
      {
        id: "reflection",
        label: { en: "Reflection", ar: "تأمل" },
        title: { en: "What I was designing for.", ar: "ما الذي كنت أصمّم من أجله." },
        blocks: [
          {
            type: "text",
            body: [
              {
                en: "My work covered the mobile member experience as one problem: booking, private coaching, payments, access, and the home that brings a member back. Marketing lived on that home too — programmes and highlights are how the club speaks inside the product, not beside it.",
                ar: "غطى عملي تجربة العضو على الجوال كمشكلة واحدة: الحجز، والتدريب الخاص، والمدفوعات، والدخول، والرئيسية التي تعيد العضو. والتسويق عاش على تلك الرئيسية أيضاً — البرامج وأبرز ما يحدث هي طريقة النادي في الحديث داخل المنتج، لا إلى جواره.",
              },
            ],
          },
          {
            type: "decisions",
            items: [
              {
                title: { en: "One account for the family", ar: "حساب واحد للعائلة" },
                body: {
                  en: "Wallets, academy payments and coaching bookings can belong to different people without becoming different products.",
                  ar: "المحافظ ومدفوعات الأكاديمية وحجوزات التدريب يمكن أن تخص أشخاصاً مختلفين دون أن تصبح منتجات مختلفة.",
                },
              },
              {
                title: { en: "Money with a reason", ar: "مال له سبب" },
                body: {
                  en: "A transaction keeps the academy and the member attached, so a parent can see what the payment was for.",
                  ar: "تحتفظ المعاملة بالأكاديمية والعضو، فيرى أحد الوالدين سبب الدفع.",
                },
              },
              {
                title: { en: "The visit is part of the flow", ar: "الزيارة جزء من المسار" },
                body: {
                  en: "Access is the last step of a booking, not a utility hidden in settings.",
                  ar: "الدخول هو الخطوة الأخيرة في الحجز، وليس أداة مخبأة في الإعدادات.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "resal-redemption",
    status: "available",
    title: { en: "Designing the First Redemption Experience", ar: "تصميم أول تجربة استبدال" },
    display: [
      { en: "Designing the First", ar: "تصميم أول تجربة" },
      { en: "Redemption Experience", ar: "استبدال" },
    ],
    summary: {
      en: "Members could earn points, but spending them was not a clear path. This study designs the redemption that closes the loop.",
      ar: "كان الأعضاء يكسبون النقاط، لكن إنفاقها لم يكن مسارًا واضحًا. هذه الدراسة تصمّم الاستبدال الذي يغلق الدورة.",
    },
    card: {
      name: "Redemption",
      domain: { en: "Loyalty and payments", ar: "الولاء والمدفوعات" },
      line: {
        en: "Turning unused points into a redemption members can trust.",
        ar: "تحويل النقاط غير المستخدمة إلى استبدال يثق به العضو.",
      },
    },
    tags: ["B2C", "UI / UX", t.research, { en: "Product Thinking", ar: "تفكير المنتج" }],
    client: "",
    year: "2025",
    role: t.seniorPD,
    platform: t.mobileApp,
    cover: {
      ...img.resal,
      alt: {
        en: "Three app screens: points balance, converting points to AlFursan miles, and conversion success",
        ar: "ثلاث شاشات من التطبيق: رصيد النقاط، وتحويل النقاط إلى أميال الفرسان، ونجاح التحويل",
      },
    },
    layout: "left",
    sections: [
      {
        id: "overview",
        label: t.overview,
        title: {
          en: "Completing the loyalty cycle from earning to redemption.",
          ar: "إكمال دورة الولاء من الكسب إلى الاستبدال.",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The product runs two value systems. One holds loyalty points. The other is a spendable balance. This project designed the missing piece: the first way to burn points.",
              ar: "يدير المنتج نظامي قيمة. الأول يحتفظ بنقاط الولاء. والثاني رصيد قابل للإنفاق. صمّم هذا المشروع الحلقة الناقصة: أول طريقة لاستبدال النقاط.",
            },
            body: [
              {
                en: "Members already earned points on every riyal spent in the marketplace. Until redemption shipped, the cycle stopped there. Points accumulated. There was nothing to do with them.",
                ar: "كان الأعضاء يكسبون نقاطاً مع كل ريال يُنفق في السوق. وإلى أن أُطلقت تجربة الاستبدال، توقفت الدورة عند هذا الحد. النقاط تتراكم، ولا يوجد ما يُفعل بها.",
              },
            ],
          },
          {
            type: "systems",
            items: [
              {
                title: { en: "Loyalty Wallet", ar: "محفظة الولاء" },
                body: {
                  en: "Earn loyalty points, store them, then burn them. Burn was designed, then delayed. AlFursan was the partner at launch.",
                  ar: "اكسب نقاط الولاء، واحتفظ بها، ثم استبدلها. صُمِّمت تجربة الاستبدال ثم تأخر تنفيذها. وكان الفرسان شريك الإطلاق.",
                },
                steps: [
                  { en: "Earn", ar: "اكسب" },
                  { en: "Store points", ar: "احتفظ بالنقاط" },
                  { en: "Burn", ar: "استبدل" },
                ],
              },
              {
                title: { en: "Spendable balance", ar: "الرصيد القابل للإنفاق" },
                body: {
                  en: "Loyalty partners such as Mobily and Qitaf convert into a usable balance, spent on purchases inside the marketplace.",
                  ar: "برامج الشركاء مثل موبايلي وقطاف تُحوَّل إلى رصيد قابل للاستخدام في الشراء داخل السوق.",
                },
                steps: [
                  { en: "Partner programmes", ar: "برامج الشركاء" },
                  { en: "Convert", ar: "حوّل" },
                  { en: "Spend", ar: "اشترِ" },
                ],
              },
            ],
          },
          {
            type: "facts",
            items: [
              { label: t.role, value: t.seniorPD },
              { label: t.platform, value: { en: "Mobile app · Arabic-first", ar: "تطبيق جوال · بالعربية أولاً" } },
            ],
          },
        ],
      },
      {
        id: "problem",
        label: t.problem,
        title: {
          en: "Earn was live. Burn was designed — and waiting.",
          ar: "تجربة الكسب كانت حيّة. وتجربة الاستبدال كانت مصمَّمة وتنتظر.",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Burn had been designed for a multi-partner ecosystem. Only Earn made it into production.",
              ar: "صُمِّمت تجربة الاستبدال لمنظومة متعددة الشركاء. وما وصل إلى الإنتاج هو الكسب فقط.",
            },
            body: [
              {
                en: "When implementation of Burn was delayed, Earn went out on its own. Points started to pile up with no way to spend them. Burn then became a launch priority — against a narrower reality: the first release would have one partner, AlFursan.",
                ar: "عندما تأخر تنفيذ الاستبدال، أُطلق الكسب منفرداً. بدأت النقاط تتراكم دون طريقة لإنفاقها. ثم أصبح الاستبدال أولوية إطلاق — أمام واقع أضيق: الإطلاق الأول بشريك واحد، الفرسان.",
              },
              {
                en: "The work was no longer to invent redemption from scratch. It was to ask whether the existing design still made sense for the product that would actually ship.",
                ar: "لم يعد العمل اختراع تجربة استبدال من الصفر. بل السؤال: هل التصميم القائم ما زال منطقياً للمنتج الذي سيُطلق فعلاً؟",
              },
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "14.2M+",
                body: {
                  en: "Loyalty points accumulated since March 2024, before any redemption existed.",
                  ar: "نقاط ولاء تراكمت منذ مارس 2024، قبل أن توجد أي تجربة استبدال.",
                },
              },
            ],
          },
          {
            type: "insights",
            items: [
              {
                title: { en: "A catalogue with one item", ar: "كتالوج فيه خيار واحد" },
                body: {
                  en: "The original design assumed many redemption partners. Launch had AlFursan only. Asking members to choose a partner was not a real choice.",
                  ar: "افترض التصميم الأصلي شركاء استبدال كثيرين. والإطلاق كان بالفرسان فقط. مطالبة الأعضاء باختيار شريك لم تكن خياراً حقيقياً.",
                },
              },
              {
                title: { en: "Earn without a path to spend", ar: "كسب بلا طريق للإنفاق" },
                body: {
                  en: "Members understood earning. They had no mental path to redemption. Points sat unused while the balance kept growing.",
                  ar: "فهم الأعضاء الكسب. ولم يكن لديهم مسار ذهني للاستبدال. بقيت النقاط بلا استخدام بينما الرصيد يكبر.",
                },
              },
              {
                title: { en: "Two transfer models, one screen", ar: "نموذجا تحويل على شاشة واحدة" },
                body: {
                  en: "Convert and Burn are different mental models. Competitive reviews showed people get lost when more than one transfer type lives on the same screen.",
                  ar: "التحويل والاستبدال نموذجان ذهنيان مختلفان. والمراجعات التنافسية أظهرت أن الناس يتوهون عندما يجتمع أكثر من نوع تحويل على الشاشة نفسها.",
                },
              },
            ],
          },
          {
            type: "feature",
            image: {
              ...img.resalListing,
              alt: {
                en: "Original partner listing with airlines, shopping and fuel brands",
                ar: "قائمة الشركاء الأصلية مع شركات الطيران والتسوق والوقود",
              },
            },
            caption: {
              en: "The original catalogue. At launch, only AlFursan would be live — a list of one.",
              ar: "الكتالوج الأصلي. عند الإطلاق، الفرسان وحده كان سيُتاح — قائمة من خيار واحد.",
            },
          },
        ],
      },
      {
        id: "insights",
        label: t.insights,
        title: {
          en: "Does the existing Burn design make sense for launch?",
          ar: "هل تصميم الاستبدال القائم منطقي للإطلاق؟",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Four inputs framed the constraint before any screens were revisited.",
              ar: "أربع مدخلات حدّدت القيد قبل إعادة النظر في أي شاشة.",
            },
          },
          {
            type: "insights",
            items: [
              {
                kicker: { en: "Stakeholders", ar: "أصحاب المصلحة" },
                title: { en: "Stakeholder interviews", ar: "مقابلات أصحاب المصلحة" },
                body: {
                  en: "Launch with one partner. Keep the first release simple. Ship quickly. Earning and redemption are not the same product moment.",
                  ar: "الإطلاق بشريك واحد. الإبقاء على الإصدار الأول بسيطاً. الإطلاق بسرعة. الكسب والاستبدال ليسا اللحظة نفسها في المنتج.",
                },
              },
              {
                kicker: { en: "Product", ar: "المنتج" },
                title: { en: "Product and analytics", ar: "المنتج والتحليلات" },
                body: {
                  en: "Points were already in members' wallets. The exchange rate for launch was fixed: 12 points = 1 AlFursan mile.",
                  ar: "النقاط كانت أصلاً في محافظ الأعضاء. وسعر التحويل عند الإطلاق ثابت: 12 نقطة = ميل فرسان واحد.",
                },
              },
              {
                kicker: { en: "Market", ar: "السوق" },
                title: { en: "Competitive review", ar: "مراجعة تنافسية" },
                body: {
                  en: "When more than one transfer type shares a screen, people hesitate. Clarity beats completeness at first launch.",
                  ar: "عندما يجتمع أكثر من نوع تحويل على شاشة واحدة، يتردد الناس. الوضوح يتقدّم على الاكتمال في الإطلاق الأول.",
                },
              },
              {
                kicker: { en: "Members", ar: "الأعضاء" },
                title: { en: "User insights", ar: "رؤى المستخدمين" },
                body: {
                  en: "Earning was familiar. Redemption was not. The first Burn had to be immediately understandable, not a catalogue to explore.",
                  ar: "الكسب كان مألوفاً. والاستبدال لم يكن كذلك. أول تجربة استبدال يجب أن تُفهم فوراً، لا أن تكون كتالوجاً للاستكشاف.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "strategy",
        label: t.strategy,
        title: {
          en: "Remove the choice that isn't a choice.",
          ar: "أزل الخيار الذي ليس خياراً.",
        },
        blocks: [
          {
            type: "compare",
            left: {
              label: { en: "Original assumption", ar: "الافتراض الأصلي" },
              title: { en: "A multi-partner ecosystem", ar: "منظومة متعددة الشركاء" },
              items: [
                {
                  title: { en: "Many redemption partners", ar: "شركاء استبدال كثر" },
                  body: {
                    en: "The design started with a catalogue so members could pick where to burn.",
                    ar: "بدأ التصميم بكتالوج ليختار الأعضاء أين يستبدلون.",
                  },
                },
                {
                  title: { en: "Partner selection as a step", ar: "اختيار الشريك كخطوة" },
                  body: {
                    en: "The journey assumed choosing a partner was valuable in its own right.",
                    ar: "افترض المسار أن اختيار الشريك قيمة بحد ذاته.",
                  },
                },
              ],
            },
            right: {
              label: { en: "Launch reality", ar: "واقع الإطلاق" },
              title: { en: "One partner. Selection added little.", ar: "شريك واحد. والاختيار لا يضيف." },
              items: [
                {
                  title: { en: "AlFursan only", ar: "الفرسان فقط" },
                  body: {
                    en: "The first release had a single destination. A listing of one is still a listing.",
                    ar: "الإصدار الأول بوجهة واحدة. وكتالوج الخيار الواحد ما زال كتالوجاً.",
                  },
                },
                {
                  title: { en: "Skip the empty decision", ar: "تجاوز القرار الفارغ" },
                  body: {
                    en: "If there is no real choice, do not ask people to make one.",
                    ar: "إن لم يكن هناك خيار حقيقي، فلا تطلب من الناس أن يختاروا.",
                  },
                },
              ],
            },
          },
          {
            type: "text",
            kicker: { en: "How might we", ar: "كيف يمكننا" },
            lead: {
              en: "Make Burn clear and immediately actionable when there is only one partner.",
              ar: "نجعل الاستبدال واضحاً وقابلاً للتنفيذ فوراً، وشريك الاستبدال واحد فقط.",
            },
          },
          {
            type: "journey",
            eyebrow: { en: "Original concept — not live", ar: "المفهوم الأصلي — لم يُطلق" },
            title: { en: "Four steps, starting with a catalogue.", ar: "أربع خطوات تبدأ بكتالوج." },
            note: {
              en: "Partner listing is the step removed later. Burn had not shipped yet. This is the designed concept, not a live experience.",
              ar: "قائمة الشركاء هي الخطوة التي أُزيلت لاحقاً. لم تكن تجربة الاستبدال قد أُطلقت بعد. هذا هو المفهوم المصمَّم، لا تجربة حيّة.",
            },
            steps: [
              {
                label: { en: "01 Loyalty programme", ar: "01 برنامج الولاء" },
                image: {
                  ...img.resalOriginalPoints,
                  alt: {
                    en: "Original loyalty programme screen with earn, redeem and buy actions",
                    ar: "الشاشة الأصلية لبرنامج الولاء مع إجراءات الكسب والاستبدال والشراء",
                  },
                },
              },
              {
                label: { en: "02 Partner listing", ar: "02 قائمة الشركاء" },
                image: {
                  ...img.resalListing,
                  alt: {
                    en: "Original partner catalogue with airlines, shopping and fuel brands",
                    ar: "كتالوج الشركاء الأصلي مع شركات الطيران والتسوق والوقود",
                  },
                },
              },
              {
                label: { en: "03 Transfer", ar: "03 التحويل" },
                image: {
                  ...img.resalOriginalTransfer,
                  alt: {
                    en: "Original AlFursan transfer screen with preset point amounts",
                    ar: "شاشة التحويل الأصلية إلى الفرسان مع كميات نقاط محددة",
                  },
                },
              },
              {
                label: { en: "04 Success", ar: "04 النجاح" },
                image: {
                  ...img.resalOriginalSuccess,
                  alt: {
                    en: "Original transfer success confirmation",
                    ar: "تأكيد نجاح التحويل في المفهوم الأصلي",
                  },
                },
              },
            ],
          },
          {
            type: "decisions",
            items: [
              {
                title: { en: "Simplify", ar: "بسّط" },
                body: {
                  en: "Drop partner selection. The shipped journey is Points → AlFursan Transfer → Success.",
                  ar: "أزل اختيار الشريك. المسار المُطلق: النقاط، ثم تحويل الفرسان، ثم النجاح.",
                },
              },
              {
                title: { en: "Clarify", ar: "وضّح" },
                body: {
                  en: "Make the redemption value obvious. The 12 = 1 rate sits on the Transfer screen, with points and miles shown together.",
                  ar: "اجعل قيمة الاستبدال واضحة. سعر 12 = 1 يظهر على شاشة التحويل، والنقاط والأميال معاً.",
                },
              },
              {
                title: { en: "Discover", ar: "سهّل الاكتشاف" },
                body: {
                  en: "Put AlFursan on the Points screen, and add an entry from Home, so Burn is findable without hunting through a catalogue.",
                  ar: "ضع الفرسان على شاشة النقاط، وأضف مدخلاً من الرئيسية، ليُكتشف الاستبدال دون البحث في كتالوج.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "experience",
        label: t.experience,
        title: {
          en: "Direct entry. Clear value. Confirmation.",
          ar: "دخول مباشر. قيمة واضحة. تأكيد.",
        },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The shipped experience is three steps. No partner selection.",
              ar: "التجربة المُطلقة ثلاث خطوات. بلا اختيار شريك.",
            },
            body: [
              {
                en: "Members can start from the Loyalty Programme or from Home. Both lead to AlFursan, then Transfer, then Success.",
                ar: "يمكن للعضو أن يبدأ من برنامج الولاء أو من الرئيسية. وكلا الطريقين يصل إلى الفرسان، ثم التحويل، ثم النجاح.",
              },
            ],
          },
          {
            type: "journey",
            eyebrow: { en: "From the loyalty programme", ar: "من برنامج الولاء" },
            steps: [
              { label: { en: "Loyalty programme", ar: "برنامج الولاء" } },
              { label: { en: "AlFursan", ar: "الفرسان" } },
              { label: { en: "Transfer", ar: "التحويل" } },
              { label: { en: "Success", ar: "النجاح" } },
            ],
          },
          {
            type: "journey",
            eyebrow: { en: "From Home", ar: "من الرئيسية" },
            steps: [
              { label: { en: "Home", ar: "الرئيسية" } },
              { label: { en: "AlFursan", ar: "الفرسان" } },
              { label: { en: "Transfer", ar: "التحويل" } },
              { label: { en: "Success", ar: "النجاح" } },
            ],
          },
          {
            type: "pair",
            caption: {
              en: "Discover: generic actions become a single AlFursan offer next to the balance.",
              ar: "الاكتشاف: الإجراءات العامة تصبح عرض فرسان واحد بجانب الرصيد.",
            },
            left: {
              kicker: { en: "Original concept", ar: "المفهوم الأصلي" },
              label: { en: "Loyalty home", ar: "مكافآت الولاء" },
              image: {
                ...img.resalOriginalPoints,
                alt: {
                  en: "Original loyalty home with earn, redeem and buy as three circular actions",
                  ar: "الشاشة الأصلية لمكافآت الولاء مع الكسب والاستبدال والشراء كثلاثة إجراءات دائرية",
                },
              },
            },
            right: {
              kicker: { en: "Shipped", ar: "المُطلق" },
              label: { en: "Points", ar: "النقاط" },
              image: {
                ...img.resalPoints,
                alt: {
                  en: "Shipped points screen with an AlFursan conversion banner under the balance",
                  ar: "شاشة النقاط المُطلقة مع بانر التحويل إلى الفرسان تحت الرصيد",
                },
              },
            },
          },
          {
            type: "journey",
            eyebrow: { en: "Shipped flow", ar: "المسار المُطلق" },
            title: { en: "Points, transfer, proof.", ar: "نقاط، تحويل، إثبات." },
            note: {
              en: "The three moments members actually move through.",
              ar: "اللحظات الثلاث التي يمر بها العضو فعلاً.",
            },
            steps: [
              {
                label: { en: "01 Points", ar: "01 النقاط" },
                image: {
                  ...img.resalPoints,
                  alt: {
                    en: "Points screen with a 2,600 point balance and an AlFursan conversion banner",
                    ar: "شاشة النقاط برصيد 2,600 نقطة وبانر التحويل إلى الفرسان",
                  },
                },
              },
              {
                label: { en: "02 AlFursan Transfer", ar: "02 تحويل الفرسان" },
                image: {
                  ...img.resalTransfer,
                  alt: {
                    en: "AlFursan transfer screen showing 12 points equal 1 mile and preset bundles",
                    ar: "شاشة تحويل الفرسان وتظهر 12 نقطة تساوي ميلاً واحداً مع باقات محددة",
                  },
                },
              },
              {
                label: { en: "03 Success", ar: "03 النجاح" },
                image: {
                  ...img.resalSuccess,
                  alt: {
                    en: "Transfer success screen with AlFursan ticket, membership number and miles earned",
                    ar: "شاشة نجاح التحويل مع تذكرة الفرسان ورقم العضوية والأميال المكتسبة",
                  },
                },
              },
            ],
          },
          {
            type: "detail",
            reverse: true,
            kicker: { en: "Clarify", ar: "التوضيح" },
            title: { en: "The rate is on the screen that needs it.", ar: "السعر على الشاشة التي تحتاجه." },
            body: {
              en: "12 points = 1 mile is stated on Transfer, not buried in help. Members pick a bundle; 480 points become 40 miles in view. Points and miles stay side by side, so the value is never abstract.",
              ar: "12 نقطة = ميل واحد مكتوبة على شاشة التحويل، لا في صفحة مساعدة. يختار العضو باقة؛ 480 نقطة تصبح 40 ميلاً أمامه. النقاط والأميال جنباً إلى جنب، فلا تبقى القيمة مجرّدة.",
            },
            image: {
              ...img.resalTransfer,
              alt: {
                en: "Transfer screen with live conversion from 480 points to 40 AlFursan miles",
                ar: "شاشة التحويل مع التحويل المباشر من 480 نقطة إلى 40 ميلاً في الفرسان",
              },
            },
          },
          {
            type: "detail",
            kicker: { en: "Confirm", ar: "التأكيد" },
            title: { en: "A moment, then the record.", ar: "لحظة، ثم السجل." },
            body: {
              en: "Success celebrates the transfer, then shows what members need to trust it: membership number, miles earned, points spent, and a reference — with a way home or into another transfer.",
              ar: "شاشة النجاح تحتفي بالتحويل، ثم تعرض ما يحتاجه العضو للثقة به: رقم العضوية، والأميال المكتسبة، والنقاط المحوّلة، ورقم العملية — مع طريق للرئيسية أو لتحويل آخر.",
            },
            image: {
              ...img.resalSuccess,
              alt: {
                en: "Success screen with AlFursan ticket artwork and transaction details",
                ar: "شاشة النجاح مع تذكرة الفرسان وتفاصيل العملية",
              },
            },
          },
        ],
      },
      {
        id: "outcome",
        label: t.outcome,
        title: { en: "What happened after launch.", ar: "ما حدث بعد الإطلاق." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "The first month showed that members would actually spend the points they had been holding.",
              ar: "أظهر الشهر الأول أن الأعضاء سينفقون فعلاً النقاط التي كانوا يحتفظون بها.",
            },
          },
          {
            type: "metrics",
            items: [
              {
                qualifier: { en: "Almost", ar: "قرابة" },
                value: "50%",
                body: {
                  en: "of users with points converted within the first month.",
                  ar: "من المستخدمين الذين لديهم نقاط حوّلوا خلال الشهر الأول.",
                },
              },
              {
                value: "0%",
                body: {
                  en: "technical issues on launch day.",
                  ar: "مشاكل تقنية في يوم الإطلاق.",
                },
              },
              {
                value: "0",
                body: {
                  en: "drop-off on the exchange from Wallet to spendable balance.",
                  ar: "تراجع في مسار التحويل من المحفظة إلى الرصيد القابل للإنفاق.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "learnings",
        label: t.learnings,
        title: {
          en: "Design for the reality you're shipping.",
          ar: "صمّم للواقع الذي تُطلقه.",
        },
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: { en: "Design for the reality you're shipping", ar: "صمّم للواقع الذي تُطلقه" },
                body: {
                  en: "A multi-partner catalogue is the right design for a multi-partner product. It was the wrong first release. The constraint was the brief.",
                  ar: "كتالوج الشركاء المتعددين تصميم صحيح لمنتج متعدد الشركاء. ولم يكن الإصدار الأول الصحيح. القيد كان هو الموجز.",
                },
              },
              {
                title: { en: "A choice only helps when there is a real choice", ar: "الخيار لا ينفع إلا إذا كان خياراً حقيقياً" },
                body: {
                  en: "Partner selection added a step without adding a decision. Removing it made Burn faster to understand and faster to complete.",
                  ar: "اختيار الشريك أضاف خطوة دون أن يضيف قراراً. إزالته جعلت الاستبدال أسرع فهماً وأسرع إتماماً.",
                },
              },
              {
                title: {
                  en: "Design for today's constraint without closing tomorrow",
                  ar: "صمّم لقيد اليوم دون إغلاق الغد",
                },
                body: {
                  en: "The shipped flow is AlFursan-first, not AlFursan-only forever. Partner selection can return when there are partners to select.",
                  ar: "المسار المُطلق يبدأ بالفرسان، لا ينتهي عنده إلى الأبد. يمكن أن يعود اختيار الشريك عندما يوجد شركاء للاختيار.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "smoov",
    status: "coming-soon",
    title: { en: "Smoov — Designing a Better Moving Experience", ar: "Smoov — تصميم تجربة نقل أفضل" },
    display: [
      { en: "Smoov —", ar: "Smoov —" },
      { en: "a better moving experience", ar: "تجربة نقل أفضل" },
    ],
    summary: {
      en: "A moving service built around one clear promise — a fixed price per room — and a booking flow in four steps.",
      ar: "خدمة نقل مبنية على وعد واحد واضح — سعر ثابت لكل غرفة — ومسار حجز من أربع خطوات.",
    },
    card: {
      name: "Smoov",
      domain: { en: "Home moving", ar: "نقل المنازل" },
      line: {
        en: "A fixed price per room, then a booking flow in four steps.",
        ar: "سعر ثابت لكل غرفة، ثم مسار حجز من أربع خطوات.",
      },
    },
    tags: ["B2B", "B2C", "UI / UX", t.research, "SaaS"],
    client: "Smoov",
    platform: { en: "Web app · Mobile app", ar: "تطبيق ويب · تطبيق جوال" },
    cover: {
      ...img.smoov,
      alt: {
        en: "Smoov website: hero with a fixed price per room, and the four-step moving process",
        ar: "موقع Smoov: الواجهة الرئيسية بسعر ثابت لكل غرفة، وخطوات النقل الأربع",
      },
    },
    layout: "full",
    sections: [
      {
        id: "overview",
        label: t.overview,
        title: { en: "Moving home, without the guesswork.", ar: "انتقال إلى منزل جديد، دون تخمين." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Smoov is a home-moving service in Riyadh. The experience is built around a promise customers can understand instantly: a fixed price per room, whatever is inside it.",
              ar: "Smoov خدمة لنقل الأثاث المنزلي في الرياض. بُنيت التجربة حول وعد يفهمه العميل فوراً: سعر ثابت لكل غرفة، أياً كان ما بداخلها.",
            },
          },
          {
            type: "facts",
            items: [
              { label: t.client, value: "Smoov" },
              { label: { en: "Deliverables", ar: "المُخرجات" }, value: { en: "Web app · Mobile app", ar: "تطبيق ويب · تطبيق جوال" } },
              { label: { en: "Audience", ar: "الجمهور" }, value: "B2B · B2C" },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: t.solution,
        title: { en: "A clear promise, then four steps.", ar: "وعد واضح، ثم أربع خطوات." },
        blocks: [
          {
            type: "story",
            steps: [
              {
                title: { en: "Landing", ar: "الصفحة الرئيسية" },
                body: {
                  en: "Fixed price per room up front, with safety, punctuality and no-surprise pricing as the three promises.",
                  ar: "سعر ثابت لكل غرفة منذ البداية، مع ثلاثة وعود: الأمان، والالتزام بالمواعيد، وأسعار بلا مفاجآت.",
                },
                image: {
                  ...img.smoov,
                  alt: {
                    en: "Smoov landing page hero and value propositions",
                    ar: "الواجهة الرئيسية لموقع Smoov ووعود الخدمة",
                  },
                },
                focus: { x: 0.082, y: 0.112, w: 0.396, h: 0.43 },
              },
              {
                title: { en: "Process", ar: "خطوات الخدمة" },
                body: {
                  en: "Details and package, booking confirmation, moving day, and a quality call — plus pay-later instalments.",
                  ar: "التفاصيل والباقة، وتأكيد الحجز، ويوم النقل، ومكالمة الجودة — مع إمكانية الدفع لاحقاً بالتقسيط.",
                },
                image: {
                  ...img.smoov,
                  alt: {
                    en: "Smoov four-step process and instalment payments",
                    ar: "خطوات Smoov الأربع والدفع بالتقسيط",
                  },
                },
                focus: { x: 0.528, y: 0.315, w: 0.396, h: 0.685 },
              },
            ],
          },
        ],
      },
      {
        id: "decision",
        label: t.decisions,
        title: { en: "The price is the product.", ar: "السعر هو المنتج." },
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: { en: "State the promise before the process", ar: "الوعد قبل الخطوات" },
                body: {
                  en: "A fixed price per room only works if it is the first thing a person understands. The four booking steps come after that, not before.",
                  ar: "السعر الثابت لكل غرفة لا ينفع إلا إذا كان أول ما يفهمه الشخص. خطوات الحجز الأربع تأتي بعده، لا قبله.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "seamless",
    status: "coming-soon",
    title: { en: "Seamless — Mastercard loyalty consumers", ar: "Seamless — ولاء عملاء Mastercard" },
    display: [
      { en: "Seamless —", ar: "Seamless —" },
      { en: "Mastercard loyalty", ar: "ولاء Mastercard" },
    ],
    summary: {
      en: "A Mastercard Priceless app for finding offers nearby, redeeming vouchers and seeing what you've saved.",
      ar: "تطبيق Mastercard Priceless لاكتشاف العروض القريبة، واستبدال القسائم، ومعرفة ما وفّرته.",
    },
    card: {
      name: { en: "Mastercard Priceless", ar: "Mastercard Priceless" },
      domain: { en: "Loyalty", ar: "الولاء" },
      line: {
        en: "Nearby offers, in-store redemption, and a record of what you've saved.",
        ar: "عروض قريبة، واستبدال داخل المتجر، وسجل لما وفّرته.",
      },
    },
    tags: ["B2C", "UI / UX"],
    client: "Mastercard",
    company: "Dsquares",
    year: "2024",
    role: t.pd,
    platform: t.mobileApp,
    cover: {
      ...img.seamless,
      alt: {
        en: "Collage of Mastercard Priceless app screens: offers, map, voucher and savings history",
        ar: "مجموعة من شاشات تطبيق Mastercard Priceless: العروض، والخريطة، والقسيمة، وسجل التوفير",
      },
    },
    layout: "split",
    sections: [
      {
        id: "overview",
        label: t.overview,
        title: { en: "Loyalty you can actually feel.", ar: "ولاء تشعر به فعلاً." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Designed at Dsquares for Mastercard's Priceless programme: an app where cardholders discover offers, redeem them in store, and see exactly how much they've saved.",
              ar: "صُمّم في Dsquares لبرنامج Priceless من Mastercard: تطبيق يكتشف فيه حاملو البطاقات العروض، ويستبدلونها في المتاجر، ويعرفون بدقّة كم وفّروا.",
            },
          },
          {
            type: "facts",
            items: [
              { label: t.client, value: "Mastercard" },
              { label: t.company, value: "Dsquares" },
              { label: t.role, value: t.pd },
            ],
          },
        ],
      },
      {
        id: "solution",
        label: t.solution,
        title: { en: "From discovery to savings.", ar: "من الاكتشاف إلى التوفير." },
        blocks: [
          {
            type: "story",
            steps: [
              {
                title: { en: "Home", ar: "الرئيسية" },
                body: {
                  en: "Total savings up front, then featured and personal offers.",
                  ar: "إجمالي التوفير في المقدّمة، ثم العروض المميزة والعروض المخصّصة لك.",
                },
                image: { ...img.seamless, alt: { en: "Priceless home screen", ar: "الشاشة الرئيسية في Priceless" } },
                focus: { x: 0.49, y: 0.05, w: 0.29, h: 0.79 },
              },
              {
                title: { en: "Nearby", ar: "بالقرب منك" },
                body: {
                  en: "Offers on a map, for deciding where to go.",
                  ar: "العروض على الخريطة، لتقرّر إلى أين تذهب.",
                },
                image: { ...img.seamless, alt: { en: "Map of nearby offers", ar: "خريطة العروض القريبة" } },
                focus: { x: 0.145, y: 0, w: 0.385, h: 0.61 },
              },
              {
                title: { en: "Redeem", ar: "الاستبدال" },
                body: {
                  en: "QR and voucher code, with a savings calculator.",
                  ar: "رمز QR ورمز القسيمة، مع حاسبة للتوفير.",
                },
                image: { ...img.seamless, alt: { en: "Voucher with a QR code", ar: "قسيمة مع رمز QR" } },
                focus: { x: 0, y: 0.25, w: 0.3, h: 0.75 },
              },
              {
                title: { en: "History", ar: "السجل" },
                body: {
                  en: "Savings and vouchers over time.",
                  ar: "التوفير والقسائم على مدار الوقت.",
                },
                image: { ...img.seamless, alt: { en: "Savings history by week", ar: "سجل التوفير حسب الأسبوع" } },
                focus: { x: 0.29, y: 0.595, w: 0.34, h: 0.405 },
              },
            ],
          },
        ],
      },
      {
        id: "decision",
        label: t.decisions,
        title: { en: "Savings before the catalogue.", ar: "التوفير قبل الكتالوج." },
        blocks: [
          {
            type: "decisions",
            items: [
              {
                title: { en: "Lead with what the card already did", ar: "ابدأ بما فعلته البطاقة" },
                body: {
                  en: "The home opens with money already saved, then the offers. Loyalty reads as a result, not a list of deals.",
                  ar: "تفتح الشاشة الرئيسية بما تم توفيره، ثم العروض. الولاء يظهر كنتيجة، لا كقائمة صفقات.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "campaign-management",
    status: "coming-soon",
    title: {
      en: "Campaign management system — Campaigns & Segmentation",
      ar: "نظام إدارة الحملات — الحملات والتقسيم",
    },
    display: [
      { en: "Campaigns", ar: "الحملات" },
      { en: "& Segmentation", ar: "والتقسيم" },
    ],
    summary: {
      en: "A B2B console for segmenting a loyalty programme's customers and reaching them through SMS and WhatsApp campaigns.",
      ar: "لوحة تحكم للأعمال لتقسيم عملاء برنامج الولاء والوصول إليهم عبر حملات الرسائل النصية وواتساب.",
    },
    card: {
      name: { en: "Campaigns", ar: "الحملات" },
      domain: { en: "Loyalty operations", ar: "تشغيل الولاء" },
      line: {
        en: "Segments and WhatsApp campaigns in one console for loyalty teams.",
        ar: "شرائح وحملات واتساب في لوحة واحدة لفرق الولاء.",
      },
    },
    tags: ["B2B", "UX", t.research],
    client: "Dsquares",
    role: t.pd,
    platform: { en: "Web dashboard", ar: "لوحة تحكم على الويب" },
    cover: {
      ...img.campaign,
      alt: {
        en: "Dsquares dashboard: customer segments treemap, campaigns table and WhatsApp message composer",
        ar: "لوحة تحكم Dsquares: مخطط شجري لشرائح العملاء، وجدول الحملات، ومحرّر رسائل واتساب",
      },
    },
    layout: "right",
    sections: [
      {
        id: "overview",
        label: t.overview,
        title: { en: "From who to message, to what to send.", ar: "من تخاطب، وماذا ترسل." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "Loyalty teams need to know who their customers are before they can talk to them. This console connects the two: segments on one side, campaigns on the other.",
              ar: "تحتاج فرق الولاء إلى معرفة عملائها قبل أن تخاطبهم. تربط لوحة التحكم هذه بين الأمرين: الشرائح في جهة، والحملات في الجهة الأخرى.",
            },
          },
          {
            type: "facts",
            items: [
              { label: t.company, value: "Dsquares" },
              { label: t.role, value: t.pd },
              { label: t.platform, value: { en: "Web dashboard", ar: "لوحة تحكم على الويب" } },
            ],
          },
        ],
      },
      {
        id: "system",
        label: { en: "System", ar: "النظام" },
        title: { en: "Three connected surfaces.", ar: "ثلاث واجهات مترابطة." },
        blocks: [
          {
            type: "story",
            steps: [
              {
                title: { en: "Segments", ar: "الشرائح" },
                body: {
                  en: "Every customer group at a glance, sized by share, with risk and churn made visible.",
                  ar: "كل مجموعات العملاء في نظرة واحدة، بحجم يعكس حصّتها، مع إظهار المخاطر ومعدّل التسرّب.",
                },
                image: { ...img.campaign, alt: { en: "Segments view", ar: "عرض الشرائح" } },
                focus: { x: 0.013, y: 0.048, w: 0.54, h: 0.905 },
              },
              {
                title: { en: "Campaigns", ar: "الحملات" },
                body: {
                  en: "Status totals, channel, recurring vs one-time, and conversion rate per campaign.",
                  ar: "إجماليات الحالة، والقناة، والحملات المتكرّرة مقابل الفردية، ومعدّل التحويل لكل حملة.",
                },
                image: { ...img.campaign, alt: { en: "Campaigns table", ar: "جدول الحملات" } },
                focus: { x: 0.551, y: 0.024, w: 0.414, h: 0.482 },
              },
              {
                title: { en: "Composer", ar: "محرّر الرسائل" },
                body: {
                  en: "Personalised content with variables and a live iOS / Android preview.",
                  ar: "محتوى مخصّص بالمتغيّرات، مع معاينة مباشرة على iOS و Android.",
                },
                image: { ...img.campaign, alt: { en: "WhatsApp message composer", ar: "محرّر رسائل واتساب" } },
                focus: { x: 0.551, y: 0.51, w: 0.418, h: 0.445 },
              },
            ],
          },
          {
            type: "decisions",
            items: [
              {
                title: { en: "Segments as a map", ar: "الشرائح كخريطة" },
                body: {
                  en: "A treemap shows the size of each group and its risk in one view, before any table.",
                  ar: "يُظهر المخطط الشجري حجم كل مجموعة ومخاطرها في عرض واحد، قبل أي جدول.",
                },
              },
              {
                title: { en: "Status before detail", ar: "الحالة قبل التفاصيل" },
                body: {
                  en: "Totals for active, scheduled, finished and draft campaigns frame the table below.",
                  ar: "إجماليات الحملات النشطة والمجدولة والمنتهية والمسودّات تؤطّر الجدول أسفلها.",
                },
              },
              {
                title: { en: "Preview while writing", ar: "المعاينة أثناء الكتابة" },
                body: {
                  en: "Operators see the message on a device as they compose it, variables included.",
                  ar: "يرى المشغّلون الرسالة على جهاز أثناء كتابتها، بما فيها المتغيّرات.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "design-system",
    status: "coming-soon",
    title: { en: "One Design System, 3+ Apps", ar: "نظام تصميم واحد لأكثر من 3 تطبيقات" },
    display: [
      { en: "One design system,", ar: "نظام تصميم واحد" },
      { en: "3+ apps", ar: "لأكثر من 3 تطبيقات" },
    ],
    summary: {
      en: "A sports-club design system — tokens, components, patterns and guidelines — built to power multiple apps.",
      ar: "نظام تصميم لنادٍ رياضي — رموز ومكوّنات وأنماط وإرشادات — بُني ليشغّل عدّة تطبيقات.",
    },
    card: {
      name: { en: "Sport Club Design System", ar: "نظام تصميم النادي" },
      domain: { en: "Design system", ar: "نظام تصميم" },
      line: {
        en: "Tokens, components and patterns shared across the club's apps.",
        ar: "رموز ومكوّنات وأنماط مشتركة بين تطبيقات النادي.",
      },
    },
    tags: [{ en: "Design System", ar: "نظام تصميم" }],
    client: "Blue Ribbon",
    year: "2024",
    role: t.seniorPD,
    platform: { en: "Design system", ar: "نظام تصميم" },
    cover: {
      ...img.system,
      alt: {
        en: "Sport Club Design System cover with tokens, button properties, checkboxes and an engagement widget",
        ar: "غلاف نظام تصميم النادي الرياضي مع الرموز وخصائص الأزرار ومربّعات الاختيار وأداة تفاعل الأعضاء",
      },
    },
    layout: "full",
    sections: [
      {
        id: "overview",
        label: t.overview,
        title: { en: "Built for teams who move together.", ar: "بُني لفرق تتحرّك معاً." },
        blocks: [
          {
            type: "text",
            lead: {
              en: "At Blue Ribbon, the sports-club products needed one foundation. The system brings components, tokens, patterns and guidelines together so every app is built from the same decisions.",
              ar: "في Blue Ribbon، احتاجت منتجات النادي الرياضي إلى أساس واحد. يجمع النظام المكوّنات والرموز والأنماط والإرشادات، لتُبنى كل التطبيقات من القرارات نفسها.",
            },
          },
          {
            type: "facts",
            items: [
              { label: t.company, value: "Blue Ribbon" },
              { label: t.role, value: t.seniorPD },
              {
                label: { en: "Scope", ar: "النطاق" },
                value: { en: "Components · Tokens · Patterns · Guidelines", ar: "المكوّنات · الرموز · الأنماط · الإرشادات" },
              },
            ],
          },
        ],
      },
      {
        id: "foundations",
        label: { en: "Foundations", ar: "الأسس" },
        title: { en: "Decisions, made once.", ar: "قرارات تُتّخذ مرّة واحدة." },
        blocks: [
          {
            type: "story",
            steps: [
              {
                title: { en: "Tokens", ar: "الرموز" },
                body: {
                  en: "Semantic colour, typography, spacing, radius and shadows.",
                  ar: "ألوان دلالية، وطباعة، ومسافات، وزوايا، وظلال.",
                },
                image: { ...img.system, alt: { en: "Colour tokens panel", ar: "لوحة رموز الألوان" } },
                focus: { x: 0.022, y: 0.115, w: 0.255, h: 0.495 },
              },
              {
                title: { en: "Components", ar: "المكوّنات" },
                body: {
                  en: "Variants, sizes, states and icon slots as properties.",
                  ar: "الأنواع والأحجام والحالات ومواضع الأيقونات كخصائص للمكوّن.",
                },
                image: { ...img.system, alt: { en: "Button component properties", ar: "خصائص مكوّن الزر" } },
                focus: { x: 0.768, y: 0.098, w: 0.208, h: 0.475 },
              },
              {
                title: { en: "Patterns", ar: "الأنماط" },
                body: {
                  en: "Data and feedback components for club products.",
                  ar: "مكوّنات للبيانات والملاحظات لمنتجات النادي.",
                },
                image: { ...img.system, alt: { en: "Member engagement widget", ar: "أداة تفاعل الأعضاء" } },
                focus: { x: 0.184, y: 0.652, w: 0.212, h: 0.325 },
              },
            ],
          },
        ],
      },
      {
        id: "apps",
        label: { en: "Apps", ar: "التطبيقات" },
        title: { en: "One foundation, several products.", ar: "أساس واحد، ومنتجات عدّة." },
        blocks: [
          {
            type: "gallery",
            images: [
              {
                ...img.ryze,
                alt: { en: "RYZE Performance+ private coaching app screens", ar: "شاشات تطبيق RYZE Performance+ للتدريب الخاص" },
                caption: { en: "RYZE Performance+ — private coaching hub.", ar: "RYZE Performance+ — منصّة للتدريب الخاص." },
              },
              {
                ...img.kode,
                alt: { en: "KODE Club app screens", ar: "شاشات تطبيق KODE Club" },
                caption: { en: "KODE Club — member app.", ar: "KODE Club — تطبيق الأعضاء." },
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The published redemption study leads the list. The rest keep their existing order. */
const ordered = [
  ...content.filter((project) => project.slug === "resal-redemption"),
  ...content.filter((project) => project.slug !== "resal-redemption"),
];

const byLocale = localizeAll<Project[]>(ordered);

export const getProjects = (locale: Locale) => byLocale[locale];

export const projectCount = ordered.length;

export function getProject(slug: string, locale: Locale) {
  return byLocale[locale].find((p) => p.slug === slug);
}

export function getNextProject(slug: string, locale: Locale) {
  const list = byLocale[locale];
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}

export function projectIndex(slug: string) {
  return ordered.findIndex((p) => p.slug === slug) + 1;
}

export const projectSlugs = ordered.map((p) => p.slug);
