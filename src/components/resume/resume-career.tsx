import { EXPERIENCES } from "@/data/career";
import { formatResumePeriod } from "@/data/projects";

export function ResumeCareer() {
  return (
    <section className="resume-section mb-5">
      <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
        경력
      </h2>

      <ul className="space-y-4">
        {EXPERIENCES.map((experience) => (
          <li key={experience.id} className="resume-entry break-inside-avoid">
            <div className="mb-1.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <strong className="text-[11pt] font-bold">{experience.company}</strong>
                <span className="text-[9.5pt] tabular-nums text-[#555]">
                  {formatResumePeriod(experience.startDate, experience.endDate)}
                </span>
              </div>
              <p className="mt-0.5 text-[10pt] text-[#333]">
                {experience.role} / {experience.tenureLabel}
              </p>
            </div>

            <div className="space-y-1 text-[9.5pt] leading-relaxed">
              <p className="font-semibold">소개</p>
              <p>{experience.summary}</p>
              <ul className="mt-1 list-none space-y-0.5 pl-3">
                <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
                  고용 형태: {experience.employmentType}
                </li>
                <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
                  주요 기술: {experience.stack.join(", ")}
                </li>
              </ul>

              <p className="mt-2 font-semibold">직무 경험</p>
              <ul className="list-none space-y-0.5 pl-3">
                {experience.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="relative pl-3 before:absolute before:left-0 before:content-['◦']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
