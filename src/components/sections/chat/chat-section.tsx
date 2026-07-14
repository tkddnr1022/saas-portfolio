import { ChatPanel } from "@/components/sections/chat/chat-panel";
import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";
import { Reveal } from "@/components/motion/reveal";

const SECTION_TITLE = "이력서 대신, 직접 물어보세요";

const SECTION_DESCRIPTION =
  "경력·기술·협업 스타일까지 1인칭으로 답변합니다. 궁금한 점을 자유롭게 질문해 보세요.";

export function ChatSection() {
  return (
    <SectionShell id="chat">
      <SectionHeader
        sectionId="chat"
        eyebrow="Ask Me"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <Reveal>
        <ChatPanel />
      </Reveal>
    </SectionShell>
  );
}
