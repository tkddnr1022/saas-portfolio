import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { validateChatInput } from "@/lib/chat/validate-input";
import { serverEnv } from "@/lib/env";
import { searchDocuments } from "@/lib/rag/search";
import { checkChatRateLimit, getClientIp } from "@/lib/rate-limit";

export const maxDuration = 30;

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return Response.json({ error: message }, { status, headers });
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = await checkChatRateLimit(ip);

    if (!rateLimit.ok) {
      return jsonError("요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.", 429, {
        "Retry-After": String(rateLimit.retryAfter),
      });
    }

    const body = (await request.json()) as { messages?: UIMessage[] };
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return jsonError("유효한 메시지가 필요합니다.", 400);
    }

    const validation = validateChatInput(messages);
    if (!validation.ok) {
      return jsonError(validation.error, 400);
    }

    const chunks = await searchDocuments(validation.text);
    const openai = createOpenAI({ apiKey: serverEnv.openaiApiKey });

    const result = streamText({
      model: openai(serverEnv.openaiChatModel),
      system: buildSystemPrompt(chunks),
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 800,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch {
    return jsonError("요청을 처리하는 중 오류가 발생했습니다.", 500);
  }
}
