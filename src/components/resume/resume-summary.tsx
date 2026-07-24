import { RESUME_SUMMARY } from "@/data/career";

export function ResumeSummary() {
  return (
    <section className="resume-section mb-5">
      <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
        소개
      </h2>
      <p className="text-[9.5pt] leading-relaxed">{RESUME_SUMMARY}</p>
    </section>
  );
}
