"use client";

import { Printer } from "lucide-react";

import { ResumeCareer } from "@/components/resume/resume-career";
import { ResumeHeader } from "@/components/resume/resume-header";
import { ResumeMeta } from "@/components/resume/resume-meta";
import { ResumeProjects } from "@/components/resume/resume-projects";
import { ResumeSkills } from "@/components/resume/resume-skills";
import { ResumeSummary } from "@/components/resume/resume-summary";
import { Button } from "@/components/ui/button";

export function ResumeDocument() {
  return (
    <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-4 px-4 py-6 print:max-w-none print:gap-0 print:p-0">
      <div className="print:hidden flex justify-end">
        <Button type="button" size="lg" onClick={() => window.print()}>
          <Printer aria-hidden="true" />
          <span>PDF로 저장</span>
        </Button>
      </div>

      <article className="resume-document bg-white px-[14mm] py-[12mm] text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/5 print:px-0 print:py-0 print:shadow-none print:ring-0">
        <ResumeHeader />
        <ResumeSummary />
        <ResumeSkills />
        <ResumeCareer />
        <ResumeProjects />
        <ResumeMeta />
      </article>
    </div>
  );
}
