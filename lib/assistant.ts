import type { Locale, Text } from "./i18n";

/**
 * The assistant's public contract.
 * Today's implementation answers from structured portfolio data.
 * Tomorrow this same shape can wrap a real model: user → model → knowledge → answer → related project.
 */
export type AssistantLink = {
  href: string;
  /** "case" uses the case-study CTA; "page" uses the related-project CTA. */
  kind: "case" | "page";
  /** Optional title shown after the CTA, e.g. the project name. */
  title?: string;
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  paragraphs: string[];
  link?: AssistantLink;
};

export type SuggestedQuestion = {
  id: string;
  topic: string;
  question: string;
};

export type AssistantQuery = {
  locale: Locale;
  text: string;
  questionId?: string;
};

export type TopicAnswer = {
  paragraphs: string[];
  link?: AssistantLink;
};

export type AssistantKnowledge = {
  questions: { id: string; topic: Text; question: Text; aliases: Text[] }[];
  answers: Record<string, TopicAnswer>;
  fallback: string;
};

export interface PortfolioAssistant {
  questions(locale: Locale): SuggestedQuestion[];
  respond(query: AssistantQuery): AssistantMessage | Promise<AssistantMessage>;
}

export const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
