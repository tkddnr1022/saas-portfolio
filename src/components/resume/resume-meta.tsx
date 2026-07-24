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
    <div className="grid grid-cols-3 gap-5">
      <ResumeSection title="학력" className="mb-0">
        <ul className="space-y-2">
          {EDUCATION.map((edu) => (
            <li key={edu.id} className="resume-entry resume-text break-inside-avoid">
              <p className="font-bold">{edu.school}</p>
              <p className="mt-0.5 text-neutral-700">
                {edu.field} · {edu.degree}
              </p>
              <p className="resume-text-xs mt-0.5 tabular-nums text-neutral-500">
                {formatEducationPeriod(edu.startDate, edu.endDate)}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="어학" className="mb-0">
        <ul className="space-y-2">
          {LANGUAGES.map((lang) => (
            <li key={lang.id} className="resume-entry resume-text break-inside-avoid">
              <p className="font-bold">{lang.score ?? lang.name}</p>
              {lang.date ? (
                <p className="resume-text-xs mt-0.5 tabular-nums text-neutral-500">
                  {formatResumeDate(lang.date)}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="자격증" className="mb-0">
        <ul className="space-y-2">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id} className="resume-entry resume-text break-inside-avoid">
              <p className="font-bold">{cert.name}</p>
              <p className="mt-0.5 text-neutral-700">{cert.issuer}</p>
              <p className="resume-text-xs mt-0.5 tabular-nums text-neutral-500">
                {formatResumeDate(cert.date)}
              </p>
            </li>
          ))}
        </ul>
      </ResumeSection>
    </div>
  );
}
