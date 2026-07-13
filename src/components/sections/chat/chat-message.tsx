import type { UIMessage } from "ai";

import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: UIMessage;
  isStreaming?: boolean;
};

function getTextFromParts(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const text = getTextFromParts(message);

  if (!text && !isStreaming) {
    return null;
  }

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
      data-role={message.role}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground",
        )}
      >
        {text}
        {isStreaming && !text ? (
          <span className="animate-pulse" aria-label="생각 중">
            생각 중..
          </span>
        ) : null}
      </div>
    </div>
  );
}
