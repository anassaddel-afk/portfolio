/**
 * Structured knowledge for Ask Anas.
 * Answers are written in Anas's voice, from the published experience, projects and principles.
 * Nothing here is invented. Swap `localAssistant` for a model later — the UI does not change.
 */
import { translations } from "./translations";
import { getExperience } from "./experience";
import { getProject } from "./projects";
import {
  normalize,
  type AssistantKnowledge,
  type AssistantMessage,
  type AssistantQuery,
  type PortfolioAssistant,
  type SuggestedQuestion,
  type TopicAnswer,
} from "@/lib/assistant";
import type { Locale, Text } from "@/lib/i18n";

const q = (
  id: string,
  topic: Text,
  question: Text,
  aliases: Text[],
): AssistantKnowledge["questions"][number] => ({ id, topic, question, aliases });

const questions: AssistantKnowledge["questions"] = [
  q(
    "experience",
    { en: "Experience", ar: "الخبرة" },
    { en: "Tell me about Anas' experience", ar: "ما هي خبرة أنس؟" },
    [
      { en: "experience", ar: "خبرة" },
      { en: "where have you worked", ar: "أين عملت" },
      { en: "career", ar: "مسيرة" },
    ],
  ),
  q(
    "thinking",
    { en: "Product thinking", ar: "التفكير في المنتج" },
    { en: "How does Anas approach a new product problem?", ar: "كيف يتعامل أنس مع مشكلة جديدة في المنتج؟" },
    [
      { en: "approach", ar: "يتعامل" },
      { en: "product problem", ar: "مشكلة جديدة" },
      { en: "how do you start", ar: "كيف تبدأ" },
    ],
  ),
  q(
    "project",
    { en: "Case studies", ar: "دراسات الحالة" },
    { en: "Show me a project Anas worked on", ar: "ما أبرز المشاريع التي عمل عليها أنس؟" },
    [
      { en: "project", ar: "مشروع" },
      { en: "case study", ar: "دراسة حالة" },
      { en: "work", ar: "أعمال" },
    ],
  ),
  q(
    "experiment",
    { en: "Experiments", ar: "التجارب" },
    { en: "How would Anas launch a first experiment?", ar: "كيف يطلق أنس أول تجربة؟" },
    [
      { en: "experiment", ar: "تجربة" },
      { en: "first experiment", ar: "أول تجربة" },
      { en: "hypothesis", ar: "فرضية" },
    ],
  ),
  q(
    "data",
    { en: "Data", ar: "البيانات" },
    { en: "How does Anas use data to improve UX?", ar: "كيف يستخدم أنس البيانات لتحسين تجربة المستخدم؟" },
    [
      { en: "data", ar: "بيانات" },
      { en: "analytics", ar: "تحليلات" },
      { en: "improve ux", ar: "تحسين تجربة" },
    ],
  ),
  q(
    "loyalty",
    { en: "Loyalty", ar: "الولاء" },
    { en: "How would Anas design a points-burning experience?", ar: "كيف يصمم أنس تجربة لحرق النقاط؟" },
    [
      { en: "loyalty", ar: "ولاء" },
      { en: "points", ar: "نقاط" },
      { en: "redemption", ar: "استبدال" },
      { en: "burning", ar: "حرق" },
    ],
  ),
  q(
    "about",
    { en: "About", ar: "نبذة" },
    { en: "What kind of designer is Anas?", ar: "من هو أنس كمصمم منتجات؟" },
    [
      { en: "what kind", ar: "نوع المصمم" },
      { en: "who is anas", ar: "من هو أنس" },
      { en: "about", ar: "نبذة" },
    ],
  ),
];

const answers: Record<Locale, Record<string, TopicAnswer>> = {
  en: {
    experience: {
      paragraphs: [
        "Most of the work has been in loyalty, payments and the products around them — for people using them, and for the teams running them.",
        "I led product design across Resal's consumer, business and merchant ecosystem. Before that: Waitery's restaurant platform, a sports-club product and its design system at Blue Ribbon, and white-label loyalty at Dsquares, including Mastercard.",
        "The through-line is the same: take a complex product problem, understand it properly, and ship something people can actually use.",
      ],
      link: { href: "/experience", kind: "page", title: "Experience" },
    },
    thinking: {
      paragraphs: [
        "Usually I start by understanding the problem before jumping into the interface.",
        "I frame it first: who it's for, what they're trying to do, and what the business needs from it. Then I look at what we already know — research, analytics, the constraints of the system. From there I write a few hypotheses, design the smallest thing that would test them, and ship with a way to learn.",
        "Screens come after that work. If the problem isn't clear, a beautiful interface won't save it. That's how I approached Resal's first redemption: the job wasn't a conversion screen, it was making unused points feel spendable.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "Resal redemption" },
    },
    project: {
      paragraphs: [
        "Start with Resal's first redemption experience — turning unused points into Saudia AlFursan miles.",
        "Members see what their points are worth, pick a preset bundle with the exchange shown live, and leave with a record they can trust. Bundles above the balance stay visible but disabled: a goal, not a dead end.",
        "If you want a different flavour: KODE Club is a sports membership and wallet in one app, and the campaign management system is a B2B console for segments and WhatsApp campaigns.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "Resal redemption" },
    },
    experiment: {
      paragraphs: [
        "A first experiment should answer one question, not launch a product.",
        "I pick the riskiest assumption — usually around value, not polish — and design the smallest path that would prove or kill it. At Resal that meant preset conversion bundles instead of a free-input calculator: the rate was obvious, and we could see which amounts people actually chose.",
        "At Smoov the experiment was the promise itself: a fixed price per room, stated on the landing page before anyone booked. Ship it, watch what people do, then decide whether to invest.",
      ],
      link: { href: "/work/smoov", kind: "case", title: "Smoov" },
    },
    data: {
      paragraphs: [
        "I use data to see where people hesitate — not as a substitute for talking to them.",
        "Google Analytics and Mixpanel show me where a flow drops off. Then I go back to the interface: is the value unclear, is a step too much work, is a state missing?",
        "On the campaign management system at Dsquares, segments and conversion rates sat next to the campaigns table so operators could see what was working before they wrote the next message. The loop is: ship, measure, change the thing that actually moved.",
      ],
      link: { href: "/work/campaign-management", kind: "case", title: "Campaigns & Segmentation" },
    },
    loyalty: {
      paragraphs: [
        "Points only matter when you can spend them.",
        "When I designed Resal's first redemption, the job was to turn a number on a screen into something a member would actually do. Three steps: see what your points are worth, pick a bundle with both currencies shown, and leave with proof. Bundles they can't afford yet stay in the list, disabled — so the next goal is visible.",
        "I designed loyalty at Dsquares too, including Mastercard Priceless: nearby offers, a voucher you redeem in store, and a running total of what you've saved. Same idea. Make the value feel real.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "Resal redemption" },
    },
    about: {
      paragraphs: [
        "I work on products where the system is the hard part — a balance someone can spend, a booking that has to become a payment, a campaign that has to know who it is for.",
        "The work I enjoy starts with the constraint, then the flow, then the screen. I do that with product and engineering, across loyalty, payments and membership products.",
        "Curious by default. That's the whole pitch.",
      ],
      link: { href: "/about", kind: "page", title: "About" },
    },
  },
  ar: {
    experience: {
      paragraphs: [
        "معظم العمل كان في الولاء والمدفوعات والمنتجات حولهما — لمن يستخدمها، وللفرق التي تديرها.",
        "قدت تصميم المنتجات عبر منظومة Resal للمستهلكين والأعمال والتجّار. قبلها: منصة Waitery للمطاعم، ومنتج نادٍ رياضي ونظام تصميمه في Blue Ribbon، وولاء بعلامات بيضاء في Dsquares، ومنها Mastercard.",
        "القاسم المشترك واحد: خذ مشكلة منتج معقّدة، افهمها كما ينبغي، وأطلق شيئاً يستطيع الناس استخدامه فعلاً.",
      ],
      link: { href: "/experience", kind: "page", title: "الخبرات" },
    },
    thinking: {
      paragraphs: [
        "عادةً أبدأ بفهم المشكلة قبل أن أقفز إلى الواجهة.",
        "أصوغها أولاً: لمن هي، وماذا يحاولون أن يفعلوا، وماذا يحتاج العمل منها. ثم أنظر إلى ما نعرفه أصلاً — الأبحاث، والتحليلات، وقيود النظام. من هناك أكتب عدّة فرضيات، وأصمّم أصغر شيء يختبرها، وأطلقه بطريقة تسمح لنا أن نتعلّم.",
        "الشاشات تأتي بعد هذا العمل. إن لم تكن المشكلة واضحة، فلن تنقذها واجهة جميلة. هكذا تعاملت مع أول استبدال في Resal: المهمة لم تكن شاشة تحويل، بل أن تصبح النقاط غير المستخدمة شيئاً يمكن إنفاقه.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "استبدال Resal" },
    },
    project: {
      paragraphs: [
        "ابدأ بأول تجربة استبدال في Resal — تحويل النقاط غير المستخدمة إلى أميال الفرسان من الخطوط السعودية.",
        "يرى الأعضاء قيمة نقاطهم، ويختارون باقة محدّدة مع سعر التحويل ظاهراً مباشرة، ويغادرون بسجل يثقون به. أما الباقات التي تفوق الرصيد فتبقى ظاهرة لكن معطّلة: هدف، لا نهاية مسدودة.",
        "إن أردت مثالاً مختلفاً: KODE Club عضوية نادٍ رياضي ومحفظة في تطبيق واحد، ونظام إدارة الحملات لوحة للأعمال للشرائح وحملات واتساب.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "استبدال Resal" },
    },
    experiment: {
      paragraphs: [
        "التجربة الأولى يجب أن تجيب عن سؤال واحد، لا أن تطلق منتجاً.",
        "أختار أكثر افتراض خطورة — وعادةً يكون حول القيمة لا حول الصقل — وأصمّم أصغر مسار يثبته أو يسقطه. في Resal كان ذلك باقات تحويل جاهزة بدل آلة حاسبة حرّة: صار السعر واضحاً، واستطعنا أن نرى أي المبالغ يختارها الناس فعلاً.",
        "في Smoov كانت التجربة هي الوعد نفسه: سعر ثابت لكل غرفة، مكتوب على الصفحة الرئيسية قبل أن يحجز أحد. أطلقه، راقب ما يفعله الناس، ثم قرّر إن كنت ستستثمر.",
      ],
      link: { href: "/work/smoov", kind: "case", title: "Smoov" },
    },
    data: {
      paragraphs: [
        "أستخدم البيانات لأرى أين يتردّد الناس — لا كبديل عن الحديث معهم.",
        "Google Analytics وMixpanel يُظهران لي أين يتوقف المسار. ثم أعود إلى الواجهة: هل القيمة غير واضحة، هل الخطوة أكبر من طاقتها، هل حالة ناقصة؟",
        "في نظام إدارة الحملات في Dsquares، كانت الشرائح ومعدّلات التحويل بجانب جدول الحملات، ليرى المشغّلون ما الذي ينجح قبل أن يكتبوا الرسالة التالية. الحلقة هي: أطلق، قِس، غيّر الشيء الذي تحرّك فعلاً.",
      ],
      link: { href: "/work/campaign-management", kind: "case", title: "الحملات والتقسيم" },
    },
    loyalty: {
      paragraphs: [
        "لا قيمة للنقاط ما لم تستطع إنفاقها.",
        "عندما صمّمت أول استبدال في Resal، كانت المهمة أن أحوّل رقماً على الشاشة إلى شيء يفعله العضو فعلاً. ثلاث خطوات: اعرف قيمة نقاطك، اختر باقة والعملتان ظاهرتان، واخرج بإثبات. الباقات التي لا يقدر عليها بعد تبقى في القائمة معطّلة — فيظهر الهدف التالي.",
        "صمّمت الولاء في Dsquares أيضاً، ومنها Mastercard Priceless: عروض قريبة، وقسيمة تُستبدل في المتجر، ومجموع لما وفّرته. الفكرة نفسها: اجعل القيمة ملموسة.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "استبدال Resal" },
    },
    about: {
      paragraphs: [
        "أعمل على منتجات يكون النظام فيها هو الجزء الصعب — رصيد يمكن إنفاقه، وحجز يجب أن يصبح دفعة، وحملة يجب أن تعرف لمن هي.",
        "العمل الذي أستمتع به يبدأ من القيد، ثم المسار، ثم الشاشة. أفعل ذلك مع فرق المنتج والهندسة، في الولاء والمدفوعات ومنتجات العضوية.",
        "فضولي بطبعي. هذا باختصار.",
      ],
      link: { href: "/about", kind: "page", title: "نبذة" },
    },
  },
};

function matchTopic(query: AssistantQuery): string | null {
  if (query.questionId && answers[query.locale][query.questionId]) return query.questionId;

  const text = normalize(query.text);
  if (!text) return null;

  for (const item of questions) {
    if (normalize(item.question[query.locale]) === text) return item.id;
  }

  let best: { id: string; score: number } | null = null;
  for (const item of questions) {
    let score = 0;
    const haystacks = [item.question[query.locale], ...item.aliases.map((a) => a[query.locale])];
    for (const hay of haystacks) {
      const n = normalize(hay);
      if (!n) continue;
      if (text.includes(n) || n.includes(text)) score += n.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { id: item.id, score };
  }
  return best?.id ?? null;
}

let messageId = 0;
const nextId = () => `ask-${++messageId}`;

/**
 * Local, data-backed assistant. Replace this export with a model-backed implementation
 * that still returns `AssistantMessage` — the panel does not need to change.
 */
export const localAssistant: PortfolioAssistant = {
  questions(locale: Locale): SuggestedQuestion[] {
    return questions.map((item) => ({
      id: item.id,
      topic: item.topic[locale],
      question: item.question[locale],
    }));
  },

  respond(query: AssistantQuery): AssistantMessage {
    const locale = query.locale;
    const topic = matchTopic(query);
    const answer = topic ? answers[locale][topic] : undefined;

    if (answer) {
      return {
        id: nextId(),
        role: "assistant",
        paragraphs: answer.paragraphs,
        link: answer.link,
      };
    }

    return {
      id: nextId(),
      role: "assistant",
      paragraphs: [translations[locale].askAnas.fallback],
    };
  },
};

/** Lets a future model look up a live project without the UI knowing how. */
export function projectFor(slug: string, locale: Locale) {
  return getProject(slug, locale);
}

export function rolesFor(locale: Locale) {
  return getExperience(locale).roles;
}
