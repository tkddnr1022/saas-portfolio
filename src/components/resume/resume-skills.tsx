import { RESUME_STACKS } from "@/data/career";

export function ResumeSkills() {
  return (
    <section className="resume-section mb-5">
      <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
        기술 스택
      </h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[9.5pt] leading-snug">
        {RESUME_STACKS.map((stack) => (
          <div key={stack.id} className="contents">
            <dt className="font-semibold text-[#333]">{stack.label}</dt>
            <dd className="min-w-0">{stack.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
