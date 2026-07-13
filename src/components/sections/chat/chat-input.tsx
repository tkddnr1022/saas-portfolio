"use client";

import { useLayoutEffect, useRef } from "react";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validate-input";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  status: "submitted" | "streaming" | "ready" | "error";
  validationError?: string;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  status,
  validationError,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBusy = status === "submitted" || status === "streaming";
  const canSubmit = value.trim().length > 0 && !isBusy && !validationError;
  const showStop = status === "streaming";

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!canSubmit) return;
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-border bg-background px-4 py-3"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="질문을 입력하세요…"
          aria-label="채팅 메시지 입력"
          aria-invalid={Boolean(validationError)}
          className={cn(
            "border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-9 max-h-24 min-w-0 flex-1 resize-none overflow-y-auto rounded-lg border px-3 py-1.5 text-sm leading-5 outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
            validationError && "border-destructive",
          )}
        />

        {showStop ? (
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={onStop}
            aria-label="응답 중단"
            className="shrink-0"
          >
            <SquareIcon className="size-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon-lg"
            disabled={!canSubmit}
            aria-label="메시지 전송"
            className="shrink-0"
          >
            <SendIcon className="size-4" />
          </Button>
        )}
      </div>

      <div className="mt-1.5 flex min-h-4 items-center justify-between gap-3">
        {validationError ? (
          <p className="text-destructive truncate text-xs" role="alert">
            {validationError}
          </p>
        ) : (
          <span className="text-muted-foreground text-xs">Enter로 전송 · Shift+Enter 줄바꿈</span>
        )}
        <p
          className={cn(
            "text-muted-foreground shrink-0 text-xs tabular-nums",
            value.length >= MAX_MESSAGE_LENGTH && "text-destructive",
          )}
          aria-live="polite"
        >
          {value.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </div>
    </form>
  );
}
