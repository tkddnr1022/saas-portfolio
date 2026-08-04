import Image from "next/image";

import { EXTERNAL_LINKS } from "@/data/links";
import {
  SITE_EMAIL,
  SITE_FULL_NAME,
  SITE_GITHUB_ID,
  SITE_GITHUB_URL,
  SITE_JOB_TITLE,
  SITE_PHOTO_SRC,
  SITE_PORTFOLIO_URL,
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
    {
      key: "portfolio",
      node: (
        <a href={SITE_PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          {displayUrl(SITE_PORTFOLIO_URL)}
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
    <header className="resume-block mb-6 flex gap-6 border-b-2 border-neutral-900 pb-5">
      <div className="resume-photo relative shrink-0 overflow-hidden bg-neutral-200 ring-1 ring-neutral-300">
        <Image
          src={SITE_PHOTO_SRC}
          alt={`${SITE_FULL_NAME} 프로필`}
          fill
          className="object-cover"
          unoptimized
          priority
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h1 className="resume-name leading-none font-bold tracking-tight">{SITE_FULL_NAME}</h1>
        <p className="resume-job mt-2 font-medium">
          {SITE_JOB_TITLE}
          <span className="mx-1.5 font-normal text-neutral-400">·</span>
          <span className="font-normal text-neutral-700">{SITE_YEARS_OF_EXPERIENCE}년차</span>
        </p>

        <ul className="resume-contact mt-3 flex flex-wrap items-center gap-x-0 gap-y-1 text-neutral-700">
          {contacts.map((item, index) => (
            <li key={item.key} className="flex items-center">
              {index > 0 ? (
                <span className="mx-2 select-none text-neutral-400" aria-hidden="true">
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
