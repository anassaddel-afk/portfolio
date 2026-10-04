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
    { en: "Where have you worked?", ar: "أين عملت؟" },
    [
      { en: "experience", ar: "خبرة" },
      { en: "where have you worked", ar: "أين عملت" },
      { en: "career", ar: "مسيرة" },
    ],
  ),
  q(
    "thinking",
    { en: "Product thinking", ar: "التفكير في المنتج" },
    { en: "How do you approach a product problem?", ar: "كيف تتعامل مع مشكلة منتج؟" },
    [
      { en: "approach", ar: "يتعامل" },
      { en: "product problem", ar: "مشكلة جديدة" },
      { en: "how do you start", ar: "كيف تبدأ" },
    ],
  ),
  q(
    "project",
    { en: "Case studies", ar: "دراسات الحالة" },
    { en: "Walk me through the redemption case study", ar: "احكِ لي عن دراسة الاستبدال" },
    [
      { en: "project", ar: "مشروع" },
      { en: "case study", ar: "دراسة حالة" },
      { en: "work", ar: "أعمال" },
    ],
  ),
  q(
    "experiment",
    { en: "Experiments", ar: "التجارب" },
    { en: "How do you run a growth experiment?", ar: "كيف تدير تجربة نمو؟" },
    [
      { en: "experiment", ar: "تجربة" },
      { en: "first experiment", ar: "أول تجربة" },
      { en: "hypothesis", ar: "فرضية" },
    ],
  ),
  q(
    "data",
    { en: "Data", ar: "البيانات" },
    { en: "How do you use data in design?", ar: "كيف تستخدم البيانات في التصميم؟" },
    [
      { en: "data", ar: "بيانات" },
      { en: "analytics", ar: "تحليلات" },
      { en: "improve ux", ar: "تحسين تجربة" },
    ],
  ),
  q(
    "loyalty",
    { en: "Loyalty", ar: "الولاء" },
    { en: "How would you design a way to spend points?", ar: "كيف تصمّم تجربة لإنفاق النقاط؟" },
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
    { en: "How do you like to work?", ar: "كيف تحب أن تعمل؟" },
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
        "Most of the work has been in loyalty, payments, and the products around them — for the people using them, and for the teams running them.",
        "At Resal I design across consumer, merchant, and business products, and I work with the growth team on experiments. Before that: QR ordering at Waitery, a sports-club app and its design system at Blue Ribbon, loyalty and fintech at Dsquares, and an early e-prescription product at Bypa-ss, where I joined as a junior designer.",
        "I keep company growth with the company. I can tell you what I designed, and what the team or the business recorded around it.",
      ],
      link: { href: "/experience", kind: "page", title: "Experience" },
    },
    thinking: {
      paragraphs: [
        "I start with the problem, before the interface.",
        "Who it's for, what they're trying to do, and what the business needs from it. Then what we already know: research, analytics, and the constraints of the system. From there I write a few hypotheses, design the smallest thing that would test them, and ship with a way to learn.",
        "On the first redemption experience, the job was not a conversion screen. It was making unused points feel spendable.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "First redemption experience" },
    },
    project: {
      paragraphs: [
        "The study you can read now is the first redemption experience. Members could earn points, but spending them was not a clear path.",
        "They see what their points are worth, pick a preset bundle with the exchange shown as they go, and leave with a record they can trust. Bundles above the balance stay visible but disabled: a goal, not a dead end.",
        "The other studies are still being written. KODE Club is a sports membership and wallet in one app. Campaigns is a console for segments and WhatsApp.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "First redemption experience" },
    },
    experiment: {
      paragraphs: [
        "A first experiment should answer one question, not launch a product.",
        "I pick the riskiest assumption — usually about value, not polish — and design the smallest path that would prove or kill it. On the redemption experience, that was preset bundles instead of a free-input calculator. The rate was obvious, and we could see which amounts people chose.",
        "At Resal I also sit in a growth cadence: I contribute to more than 11 experiments a month, and I lead more than four.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "First redemption experience" },
    },
    data: {
      paragraphs: [
        "I use data to see where people hesitate. It does not replace talking to them.",
        "Analytics show where a flow drops off. Then I go back to the interface: is the value unclear, is a step too much work, is a state missing?",
        "On Waitery, median time from the QR scan to the kitchen fell 16%, and checkout drop-off fell 18%. At Dsquares, campaign tools put segments next to the work so operators could see what was working before the next message.",
      ],
      link: { href: "/experience", kind: "page", title: "Experience" },
    },
    loyalty: {
      paragraphs: [
        "Points only matter when someone can spend them.",
        "On the first redemption experience, the job was to turn a number on a screen into something a member would actually do. Three steps: see what the points are worth, pick a bundle with both currencies shown, and leave with proof. Bundles they cannot afford yet stay in the list, disabled, so the next goal is visible.",
        "At Dsquares I also designed loyalty, including Mastercard Priceless: nearby offers, a voucher redeemed in store, and a running total of what you've saved.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "First redemption experience" },
    },
    about: {
      paragraphs: [
        "I work on products where the system is the hard part. A balance someone can spend. A booking that has to become a payment. A campaign that has to know who it is for.",
        "I like starting from the constraint, then the flow, then the screen. I do that with product and engineering, across loyalty, payments, and memberships.",
      ],
      link: { href: "/about", kind: "page", title: "About" },
    },
  },
  ar: {
    experience: {
      paragraphs: [
        "معظم العمل كان في الولاء والمدفوعات وما حولهما، لمن يستخدم المنتج وللفرق التي تديره.",
        "في رسال أصمّم منتجات للأفراد والتجّار وقطاع الأعمال، وأعمل مع فريق النمو على التجارب. قبلها: الطلب عبر رمز QR في Waitery، وتطبيق نادٍ رياضي ونظام تصميمه في Blue Ribbon، ومنتجات ولاء وتقنية مالية في Dsquares، وتجربة مبكرة للوصفات الطبية الإلكترونية في Bypa-ss، حيث بدأت كمصمم مبتدئ.",
        "أُبقي نمو الشركة مع الشركة. أقدر أحكي ما صمّمته، وما سجّله الفريق أو النشاط حوله.",
      ],
      link: { href: "/experience", kind: "page", title: "الخبرات" },
    },
    thinking: {
      paragraphs: [
        "أبدأ من المشكلة، قبل الواجهة.",
        "لمن هي، وماذا يحاول الشخص أن يفعل، وماذا يحتاج العمل منها. ثم ما نعرفه أصلًا: بحث المستخدمين، وتحليلات المنتج، وقيود النظام. من هناك أكتب فرضيات قليلة، وأصمّم أصغر شيء يختبرها، وأطلقه بطريقة تسمح لنا أن نتعلّم.",
        "في أول تجربة استبدال، لم تكن المهمة شاشة تحويل. كانت أن تصبح النقاط غير المستخدمة شيئًا يمكن إنفاقه.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "أول تجربة استبدال" },
    },
    project: {
      paragraphs: [
        "الدراسة التي يمكن قراءتها الآن هي أول تجربة استبدال. كان الأعضاء يكسبون النقاط، لكن إنفاقها لم يكن مسارًا واضحًا.",
        "يرون قيمة نقاطهم، ويختارون باقة جاهزة مع سعر التحويل ظاهرًا أثناء الاختيار، ويغادرون بسجل يثقون به. الباقات التي تفوق الرصيد تبقى ظاهرة لكن معطّلة: هدف، لا نهاية مسدودة.",
        "الدراسات الأخرى ما زالت تُكتب. KODE Club عضوية نادٍ ومحفظة في تطبيق واحد. والحملات لوحة للشرائح وواتساب.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "أول تجربة استبدال" },
    },
    experiment: {
      paragraphs: [
        "التجربة الأولى تجيب عن سؤال واحد. لا تُطلق منتجًا كاملًا.",
        "أختار أخطر افتراض، وغالبًا يكون عن القيمة لا عن الصقل، وأصمّم أصغر مسار يثبته أو يُسقطه. في تجربة الاستبدال كانت الباقات الجاهزة بدل آلة حاسبة حرّة. صار السعر واضحًا، ورأينا أي المبالغ يختارها الناس.",
        "في رسال أعمل أيضًا ضمن إيقاع نمو: أساهم في أكثر من 11 تجربة شهريًا، وأقود أكثر من أربع.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "أول تجربة استبدال" },
    },
    data: {
      paragraphs: [
        "أستخدم البيانات لأرى أين يتردّد الناس. لا تغني عن الحديث معهم.",
        "تحليلات المنتج تُظهر أين يتوقف المسار. ثم أعود إلى الواجهة: هل القيمة غير واضحة؟ هل الخطوة أثقل مما ينبغي؟ هل حالة ناقصة؟",
        "في Waitery انخفض الوسيط الزمني من مسح رمز QR حتى المطبخ بنسبة 16%، وانخفض التخلي عن إتمام الدفع بنسبة 18%. في Dsquares وضعت أدوات الحملات الشرائح بجانب العمل، ليرى الفريق ما الذي ينجح قبل الرسالة التالية.",
      ],
      link: { href: "/experience", kind: "page", title: "الخبرات" },
    },
    loyalty: {
      paragraphs: [
        "لا قيمة للنقاط إن لم يستطع أحد إنفاقها.",
        "في أول تجربة استبدال كانت المهمة تحويل رقم على الشاشة إلى شيء يفعله العضو فعلًا. ثلاث خطوات: يرى قيمة النقاط، يختار باقة والعملتان ظاهرتان، ويخرج بإثبات. الباقات التي لا يقدر عليها بعد تبقى في القائمة معطّلة، فيظهر الهدف التالي.",
        "في Dsquares صمّمت الولاء أيضًا، ومنها Mastercard Priceless: عروض قريبة، وقسيمة تُستبدل في المتجر، ومجموع لما تم توفيره.",
      ],
      link: { href: "/work/resal-redemption", kind: "case", title: "أول تجربة استبدال" },
    },
    about: {
      paragraphs: [
        "أعمل على منتجات يكون النظام فيها هو الجزء الصعب. رصيد يمكن إنفاقه. حجز يجب أن يصبح دفعة. حملة يجب أن تعرف لمن هي.",
        "أحب أن أبدأ من القيد، ثم المسار، ثم الشاشة. أفعل ذلك مع المنتج والهندسة، في الولاء والمدفوعات والعضويات.",
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
