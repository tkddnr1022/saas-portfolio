import { RESUME_STACKS } from "@/data/career";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeSkills() {
  return (
    <ResumeSection title="기술 스택">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {RESUME_STACKS.map((stack) => (
          <div key={stack.id} className="flex gap-2 text-[9.5pt] leading-snug">
            <dt className="w-[4.2em] shrink-0 font-bold text-[#1a1a1a]">{stack.label}</dt>
            <dd className="min-w-0 text-[#333]">{stack.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </ResumeSection>
  );
}
