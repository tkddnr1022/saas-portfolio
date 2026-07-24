import {
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
  formatEducationPeriod,
  formatResumeDate,
} from "@/data/career";

export function ResumeMeta() {
  return (
    <div className="space-y-4">
      <section className="resume-section">
        <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
          학력
        </h2>
        <ul className="space-y-2">
          {EDUCATION.map((edu) => (
            <li key={edu.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p>
                <strong className="font-bold">{edu.school}</strong>
                <span className="text-[#333]">
                  {" "}
                  {edu.field} 전공({edu.degree})
                </span>
              </p>
              <p className="mt-0.5 tabular-nums text-[#555]">
                {formatEducationPeriod(edu.startDate, edu.endDate)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
          어학 능력
        </h2>
        <ul className="space-y-2">
          {LANGUAGES.map((lang) => (
            <li key={lang.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p className="font-semibold">{lang.score ?? lang.name}</p>
              {lang.date ? (
                <p className="mt-0.5 tabular-nums text-[#555]">{formatResumeDate(lang.date)}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
          자격증
        </h2>
        <ul className="space-y-2">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id} className="resume-entry break-inside-avoid text-[9.5pt]">
              <p className="font-semibold">{cert.name}</p>
              <p className="mt-0.5 tabular-nums text-[#555]">{formatResumeDate(cert.date)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
