import {
  BookOpen,
  Egg,
  type LucideIcon,
} from "lucide-react";

import { GithubIcon } from "@/components/icons/github-icon";
import { KakaoIcon } from "@/components/icons/kakao-icon";
import { FOOTER_LINKS, type LinkIcon } from "@/data/links";
import { SITE_NAME } from "@/data/site";

type IconComponent = LucideIcon | typeof GithubIcon | typeof KakaoIcon;

const ICON_MAP: Record<LinkIcon, IconComponent> = {
  github: GithubIcon,
  blog: BookOpen,
  kakao: KakaoIcon,
  mealio: Egg,
};


function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          © {year} {SITE_NAME}
        </p>

        <nav aria-label="소셜 링크" className="flex items-center gap-1">
          {FOOTER_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon];
            const external = isExternalHref(link.href);

            return (
              <a
                key={link.id}
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={
                  external ? `${link.label} (새 창에서 열림)` : link.label
                }
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
