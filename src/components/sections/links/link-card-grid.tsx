import {
  BookOpen,
  Egg,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

import { GithubIcon } from "@/components/icons/github-icon";
import { NotionIcon } from "@/components/icons/notion-icon";
import {
  EXTERNAL_LINKS,
  type LinkIcon,
} from "@/data/links";
import { cn } from "@/lib/utils";

type IconComponent = LucideIcon | typeof GithubIcon | typeof NotionIcon;

const ICON_MAP: Record<LinkIcon, IconComponent> = {
  github: GithubIcon,
  blog: BookOpen,
  notion: NotionIcon,
  mealio: Egg,
};

type LinkCardGridProps = {
  className?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function LinkCardGrid({ className }: LinkCardGridProps) {
  return (
    <ul
      className={cn(
        "grid w-full grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4",
        className,
      )}
    >
      {EXTERNAL_LINKS.map((link) => {
        const Icon = ICON_MAP[link.icon];
        const external = isExternalHref(link.href);

        return (
          <li key={link.id}>
            <a
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group relative flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-[linear-gradient(to_bottom,oklch(0.52_0.12_195/0.04),var(--card))] lg:min-h-56 lg:flex-col lg:items-stretch lg:gap-5 lg:p-6"
            >
              <div className="flex shrink-0 items-center justify-between lg:w-full">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-primary lg:size-11">
                  <Icon aria-hidden="true" className="size-4 lg:size-5" />
                </span>
                <ExternalLink
                  aria-hidden="true"
                  className="hidden size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:block"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-0.5 lg:space-y-2">
                <p className="font-heading font-semibold tracking-tight">
                  {link.label}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>

              <ExternalLink
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:hidden"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
