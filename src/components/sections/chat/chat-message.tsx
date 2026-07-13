"use client";

import type { UIMessage } from "ai";
import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";

import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: UIMessage;
  isStreaming?: boolean;
};

const streamdownPlugins = { code, cjk };

const streamdownTranslations = {
  copied: "복사됨",
  copyCode: "코드 복사",
  copyLink: "링크 복사",
  copyTable: "표 복사",
  copyTableAsCsv: "CSV로 복사",
  copyTableAsMarkdown: "Markdown으로 복사",
  copyTableAsTsv: "TSV로 복사",
  downloadFile: "파일 다운로드",
  downloadImage: "이미지 다운로드",
  downloadTable: "표 다운로드",
  downloadTableAsCsv: "CSV로 다운로드",
  downloadTableAsMarkdown: "Markdown으로 다운로드",
  openLink: "링크 열기",
  openExternalLink: "외부 링크 열기",
  externalLinkWarning: "외부 링크로 이동합니다",
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
        {isUser ? (
          text
        ) : text ? (
          <Streamdown
            animated
            className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            isAnimating={isStreaming}
            mode={isStreaming ? "streaming" : "static"}
            plugins={streamdownPlugins}
            translations={streamdownTranslations}
          >
            {text}
          </Streamdown>
        ) : null}
        {isStreaming && !text ? (
          <span className="animate-pulse" aria-label="생각 중">
            생각 중..
          </span>
        ) : null}
      </div>
    </div>
  );
}
