"use client";

import type { UIMessage } from "ai";

import { ChatMessage } from "@/components/sections/chat/chat-message";
import { SuggestedQuestions } from "@/components/sections/chat/suggested-questions";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  onSuggestedQuestion: (question: string) => void;
};

export function ChatMessages({ messages, status, onSuggestedQuestion }: ChatMessagesProps) {
  const isBusy = status === "submitted" || status === "streaming";
  const lastMessage = messages.at(-1);
  const showStreamingPlaceholder = isBusy && lastMessage?.role !== "assistant";

  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="채팅 메시지"
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            아래 추천 질문을 누르거나, 직접 입력해 보세요.
          </p>
          <SuggestedQuestions onSelect={onSuggestedQuestion} disabled={isBusy} />
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreaming={
                status === "streaming" &&
                message.id === lastMessage?.id &&
                message.role === "assistant"
              }
            />
          ))}
          {showStreamingPlaceholder ? (
            <ChatMessage
              message={{
                id: "streaming-placeholder",
                role: "assistant",
                parts: [{ type: "text", text: "" }],
              }}
              isStreaming
            />
          ) : null}
        </>
      )}
    </div>
  );
}
