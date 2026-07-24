import Image from "next/image";
import type { ReactNode } from "react";

import { EXTERNAL_LINKS } from "@/data/links";
import {
  SITE_EMAIL,
  SITE_FULL_NAME,
  SITE_GITHUB_ID,
  SITE_GITHUB_URL,
  SITE_JOB_TITLE,
  SITE_PHOTO_SRC,
  SITE_YEARS_OF_EXPERIENCE,
} from "@/data/site";

function contactHref(id: string): string | undefined {
  return EXTERNAL_LINKS.find((link) => link.id === id)?.href;
}

function displayUrl(href: string): string {
  return href.replace(/^https?:\/\//, "");
}

type InfoRow = {
  label: string;
  value: ReactNode;
};

export function ResumeHeader() {
  const blogHref = contactHref("blog");

  const rows: InfoRow[] = [
    {
      label: "직무 / 경력",
      value: (
        <>
          {SITE_JOB_TITLE} / {SITE_YEARS_OF_EXPERIENCE}년차
        </>
      ),
    },
    {
      label: "이메일",
      value: (
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
      ),
    },
    {
      label: "GitHub",
      value: (
        <a href={SITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
          {SITE_GITHUB_ID}
        </a>
      ),
    },
  ];

  if (blogHref) {
    rows.push({
      label: "Blog",
      value: (
        <a href={blogHref} target="_blank" rel="noopener noreferrer">
          {displayUrl(blogHref)}
        </a>
      ),
    });
  }

  return (
    <header className="resume-block mb-5 flex gap-5 border-b border-[#222] pb-4">
      <div className="relative h-[28mm] w-[22mm] shrink-0 overflow-hidden bg-[#e8e8e8] print:h-[28mm] print:w-[22mm]">
        <Image
          src={SITE_PHOTO_SRC}
          alt={`${SITE_FULL_NAME} 프로필`}
          fill
          className="object-cover"
          sizes="83px"
          priority
        />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="mb-3 text-[22pt] leading-none font-bold tracking-tight">{SITE_FULL_NAME}</h1>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[9.5pt] leading-snug">
          {rows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="font-semibold text-[#333]">{row.label}</dt>
              <dd className="min-w-0 break-all">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
