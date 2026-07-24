import { RESUME_SUMMARY } from "@/data/career";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeSummary() {
  return (
    <ResumeSection title="소개">
      <p className="resume-text leading-relaxed text-neutral-800">{RESUME_SUMMARY}</p>
    </ResumeSection>
  );
}
