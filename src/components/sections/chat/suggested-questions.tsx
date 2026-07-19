"use client";

import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS } from "@/data/chat";

type SuggestedQuestionsProps = {
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function SuggestedQuestions({
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2"
      role="group"
      aria-label="추천 질문"
    >
      {SUGGESTED_QUESTIONS.map((question) => (
        <Button
          key={question}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="h-auto whitespace-normal px-3 py-2 text-left text-xs leading-snug"
        >
          <span>{question}</span>
        </Button>
      ))}
    </div>
  );
}
