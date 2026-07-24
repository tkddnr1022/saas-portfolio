import {
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
  formatEducationPeriod,
  formatResumeDate,
} from "@/data/career";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeMeta() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ResumeSection title="학력" className="mb-0">
        <ul className="space-y-1.5">
          {EDUCATION.map((edu) => (
            <li key={edu.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p className="font-bold">{edu.school}</p>
              <p className="mt-0.5 text-[#444]">
                {edu.field} · {edu.degree}
              </p>
              <p className="mt-0.5 tabular-nums text-[8.5pt] text-[#777]">
                {formatEducationPeriod(edu.startDate, edu.endDate)}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="어학" className="mb-0">
        <ul className="space-y-1.5">
          {LANGUAGES.map((lang) => (
            <li key={lang.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p className="font-bold">{lang.score ?? lang.name}</p>
              {lang.date ? (
                <p className="mt-0.5 tabular-nums text-[8.5pt] text-[#777]">
                  {formatResumeDate(lang.date)}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="자격증" className="mb-0">
        <ul className="space-y-1.5">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p className="font-bold">{cert.name}</p>
              <p className="mt-0.5 text-[#444]">{cert.issuer}</p>
              <p className="mt-0.5 tabular-nums text-[8.5pt] text-[#777]">
                {formatResumeDate(cert.date)}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>
    </div>
  );
}
