import { ChatPanel } from "@/components/sections/chat/chat-panel";

const SECTION_TITLE = "이력서 대신, 직접 물어보세요";

const SECTION_DESCRIPTION =
  "경력·기술·협업 스타일까지 1인칭으로 답변합니다. 궁금한 점을 자유롭게 질문해 보세요.";

export function ChatSection() {
  return (
    <section
      id="chat"
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Ask Me
          </p>
          <h2 className="font-heading text-h2 font-semibold tracking-tight">
            {SECTION_TITLE}
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </header>

        <ChatPanel />
      </div>
    </section>
  );
}
