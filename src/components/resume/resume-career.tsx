import { EXPERIENCES } from "@/data/career";
import { formatResumePeriod } from "@/data/projects";
import { ResumeBullet } from "@/components/resume/resume-bullet";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeCareer() {
  return (
    <ResumeSection title="경력">
      <ul className="space-y-5">
        {EXPERIENCES.map((experience) => (
          <li key={experience.id} className="resume-entry break-inside-avoid">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <strong className="resume-title font-bold">{experience.company}</strong>
                <span className="resume-text text-neutral-600">
                  {experience.role}
                  <span className="mx-1 text-neutral-300">·</span>
                  {experience.employmentType}
                  <span className="mx-1 text-neutral-300">·</span>
                  {experience.tenureLabel}
                </span>
              </div>
              <span className="resume-text-sm shrink-0 tabular-nums text-neutral-500">
                {formatResumePeriod(experience.startDate, experience.endDate)}
              </span>
            </div>

            <p className="resume-text leading-relaxed text-neutral-700">{experience.summary}</p>

            <p className="resume-text-xs mt-1 text-neutral-500">
              <span className="font-semibold text-neutral-700">Stack</span>
              <span className="mx-1.5 text-neutral-300">·</span>
              {experience.stack.join(", ")}
            </p>

            {experience.achievements.length > 0 ? (
              <div className="mt-2">
                <p className="resume-text-sm mb-0.5 font-bold text-neutral-900">주요 성과</p>
                <ul className="resume-text space-y-0.5 leading-relaxed">
                  {experience.achievements.map((item) => (
                    <ResumeBullet key={item.text}>
                      {item.text}
                      {item.metric ? (
                        <span className="resume-accent ml-1 font-semibold">({item.metric})</span>
                      ) : null}
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
