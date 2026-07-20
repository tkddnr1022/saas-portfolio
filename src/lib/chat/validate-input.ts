import type { UIMessage } from "ai";

export const MAX_MESSAGE_LENGTH = 500;

/** Basic Korean/English profanity and inappropriate terms */
const BLOCKED_TERMS = [
  "시발",
  "씨발",
  "개새끼",
  "병신",
  "지랄",
  "좆",
  "fuck",
  "shit",
  "bitch",
  "asshole",
] as const;

export type ValidationResult = { ok: true; text: string } | { ok: false; error: string };

function extractLastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role !== "user") continue;

    const text = message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("")
      .trim();

    return text;
  }

  return "";
}

function containsBlockedTerm(text: string): boolean {
  const normalized = text.toLowerCase();

  return BLOCKED_TERMS.some((term) => normalized.includes(term.toLowerCase()));
}

export function validateChatInput(messages: UIMessage[]): ValidationResult {
  const text = extractLastUserText(messages);

  if (!text) {
    return { ok: false, error: "메시지를 입력해 주세요." };
  }

  if (text.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `메시지는 최대 ${MAX_MESSAGE_LENGTH}자까지 입력할 수 있습니다.`,
    };
  }

  if (containsBlockedTerm(text)) {
    return {
      ok: false,
      error: "부적절한 표현이 포함되어 있어 요청을 처리할 수 없습니다.",
    };
  }

  return { ok: true, text };
}
