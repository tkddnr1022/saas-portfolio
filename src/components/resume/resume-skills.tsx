import { RESUME_STACKS } from "@/data/career";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeSkills() {
  return (
    <ResumeSection title="기술 스택">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-2">
        {RESUME_STACKS.map((stack) => (
          <div key={stack.id} className="resume-text flex gap-2 leading-snug">
            <dt className="resume-label shrink-0 font-bold text-neutral-900">{stack.label}</dt>
            <dd className="min-w-0 text-neutral-700">{stack.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </ResumeSection>
  );
}
