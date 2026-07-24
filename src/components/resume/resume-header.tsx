import Image from "next/image";

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

export function ResumeHeader() {
  const blogHref = contactHref("blog");

  const contacts = [
    {
      key: "email",
      node: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>,
    },
    {
      key: "github",
      node: (
        <a href={SITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
          github.com/{SITE_GITHUB_ID}
        </a>
      ),
    },
    ...(blogHref
      ? [
          {
            key: "blog",
            node: (
              <a href={blogHref} target="_blank" rel="noopener noreferrer">
                {displayUrl(blogHref)}
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <header className="resume-block mb-5 flex gap-5 border-b-2 border-[#1a1a1a] pb-4">
      <div className="relative h-[30mm] w-[24mm] shrink-0 overflow-hidden bg-[#e8e8e8] ring-1 ring-[#d0d0d0]">
        <Image
          src={SITE_PHOTO_SRC}
          alt={`${SITE_FULL_NAME} 프로필`}
          fill
          className="object-cover"
          sizes="90px"
          priority
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h1 className="text-[24pt] leading-none font-bold tracking-tight">{SITE_FULL_NAME}</h1>
        <p className="mt-1.5 text-[11pt] font-medium text-[#0f6e6e]">
          {SITE_JOB_TITLE}
          <span className="mx-1.5 font-normal text-[#999]">·</span>
          <span className="font-normal text-[#444]">{SITE_YEARS_OF_EXPERIENCE}년차</span>
        </p>

        <ul className="mt-2.5 flex flex-wrap items-center gap-x-0 gap-y-1 text-[9pt] text-[#333]">
          {contacts.map((item, index) => (
            <li key={item.key} className="flex items-center">
              {index > 0 ? (
                <span className="mx-2 select-none text-[#bbb]" aria-hidden="true">
                  |
                </span>
              ) : null}
              {item.node}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
