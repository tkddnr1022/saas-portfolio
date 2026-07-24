import { EXPERIENCES } from "@/data/career";
import { formatResumePeriod } from "@/data/projects";
import { ResumeBullet } from "@/components/resume/resume-bullet";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeCareer() {
  return (
    <ResumeSection title="경력">
      <ul className="space-y-4">
        {EXPERIENCES.map((experience) => (
          <li key={experience.id} className="resume-entry break-inside-avoid">
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <strong className="text-[11pt] font-bold">{experience.company}</strong>
                <span className="text-[9.5pt] text-[#555]">
                  {experience.role}
                  <span className="mx-1 text-[#ccc]">·</span>
                  {experience.employmentType}
                  <span className="mx-1 text-[#ccc]">·</span>
                  {experience.tenureLabel}
                </span>
              </div>
              <span className="shrink-0 text-[9pt] tabular-nums text-[#666]">
                {formatResumePeriod(experience.startDate, experience.endDate)}
              </span>
            </div>

            <p className="text-[9.5pt] leading-relaxed text-[#333]">{experience.summary}</p>

            <p className="mt-1 text-[8.5pt] text-[#666]">
              <span className="font-semibold text-[#444]">Stack</span>
              <span className="mx-1.5 text-[#ccc]">·</span>
              {experience.stack.join(", ")}
            </p>

            {experience.achievements.length > 0 ? (
              <div className="mt-2">
                <p className="mb-0.5 text-[9pt] font-bold text-[#1a1a1a]">주요 성과</p>
                <ul className="space-y-0.5 text-[9.5pt] leading-relaxed">
                  {experience.achievements.map((item) => (
                    <ResumeBullet key={item.text}>
                      {item.text}
                      {item.metric ? (
                        <span className="ml-1 font-semibold text-[#0f6e6e]">
                          ({item.metric})
                        </span>
                      ) : null}
                    </ResumeBullet>
                  ))}
                </ul>
              </div>
            ) : null}

            {experience.responsibilities.length > 0 ? (
              <div className="mt-2">
                <p className="mb-0.5 text-[9pt] font-bold text-[#1a1a1a]">담당 업무</p>
                <ul className="space-y-0.5 text-[9.5pt] leading-relaxed">
                  {experience.responsibilities.map((item) => (
                    <ResumeBullet key={item} marker="muted">
                      {item}
                    </ResumeBullet>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </ResumeSection>
  );
}
