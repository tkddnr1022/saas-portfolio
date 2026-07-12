import {
  BookOpen,
  Egg,
  FolderGit2,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";

import { FOOTER_LINKS, type LinkIcon } from "@/data/links";
import { SITE_NAME } from "@/data/site";

const ICON_MAP: Record<LinkIcon, LucideIcon> = {
  github: FolderGit2,
  blog: BookOpen,
  notion: NotebookPen,
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

        <nav aria-label="Social links" className="flex items-center gap-1">
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
                aria-label={link.label}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
