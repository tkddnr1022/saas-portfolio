import type { Metadata } from "next";

import { ResumeDocument } from "@/components/resume/resume-document";
import { SITE_FULL_NAME } from "@/data/site";

export const metadata: Metadata = {
  title: `이력서 | ${SITE_FULL_NAME}`,
  description: `${SITE_FULL_NAME} 이력서 (PDF 출력용)`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumePage() {
  return <ResumeDocument />;
}
