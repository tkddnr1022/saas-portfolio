"use client";

import { AlertCircleIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChatErrorProps = {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
};

export function ChatError({ message, onDismiss, onRetry }: ChatErrorProps) {
  return (
    <div
      role="alert"
      className="border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-3 border-b px-4 py-3 text-sm"
    >
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1 space-y-2">
        <p className="leading-relaxed">{message}</p>
        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={onRetry}
            className="border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            다시 시도
          </Button>
        ) : null}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onDismiss}
        aria-label="에러 닫기"
        className="text-destructive shrink-0"
      >
        <XIcon className="size-3.5" />
      </Button>
    </div>
  );
}
