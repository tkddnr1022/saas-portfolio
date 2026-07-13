"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { ChatError } from "@/components/sections/chat/chat-error";
import { ChatInput } from "@/components/sections/chat/chat-input";
import { ChatMessages } from "@/components/sections/chat/chat-messages";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validate-input";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

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

function getClientValidationError(text: string): string | undefined {
  const trimmed = text.trim();

  if (!trimmed) {
    return "메시지를 입력해 주세요.";
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return `메시지는 최대 ${MAX_MESSAGE_LENGTH}자까지 입력할 수 있습니다.`;
  }

  const normalized = trimmed.toLowerCase();
  if (BLOCKED_TERMS.some((term) => normalized.includes(term.toLowerCase()))) {
    return "부적절한 표현이 포함되어 있어 요청을 처리할 수 없습니다.";
  }

  return undefined;
}

function getErrorMessage(error: Error): string {
  const message = error.message.trim();

  if (message) {
    return message;
  }

  return "요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport: chatTransport,
  });

  const validationError = input.length > 0 ? getClientValidationError(input) : undefined;
  const isBusy = status === "submitted" || status === "streaming";

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    const clientError = getClientValidationError(trimmed);

    if (clientError || isBusy) {
      return;
    }

    setLastFailedMessage(trimmed);
    clearError();
    setInput("");

    try {
      await sendMessage({ text: trimmed });
      setLastFailedMessage(null);
    } catch {
      setInput(trimmed);
    }
  };

  const handleSubmit = () => {
    void handleSend(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    void handleSend(question);
  };

  const handleRetry = () => {
    if (!lastFailedMessage) return;
    void handleSend(lastFailedMessage);
  };

  const handleDismissError = () => {
    clearError();
    if (lastFailedMessage) {
      setInput(lastFailedMessage);
    }
  };

  return (
    <div className="border-border bg-muted/30 flex h-[min(480px,70dvh)] flex-col overflow-hidden rounded-xl border">
      {error ? (
        <ChatError
          message={getErrorMessage(error)}
          onDismiss={handleDismissError}
          onRetry={lastFailedMessage ? handleRetry : undefined}
        />
      ) : null}

      <ChatMessages
        messages={messages}
        status={status}
        onSuggestedQuestion={handleSuggestedQuestion}
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        onStop={() => void stop()}
        status={status}
        validationError={validationError}
      />
    </div>
  );
}
