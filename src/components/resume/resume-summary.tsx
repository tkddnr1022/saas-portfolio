import { RESUME_SUMMARY } from "@/data/career";
import { ResumeSection } from "@/components/resume/resume-section";

export function ResumeSummary() {
  return (
    <ResumeSection title="소개">
      <p className="text-[9.5pt] leading-relaxed text-[#222]">{RESUME_SUMMARY}</p>
    </ResumeSection>
  );
}
