import type { ReactNode } from "react";

type ResumeBulletProps = {
  children: ReactNode;
  marker?: "accent" | "muted";
};

const MARKER = {
  accent: { char: "▸", className: "resume-accent" },
  muted: { char: "·", className: "text-neutral-500" },
} as const;

export function ResumeBullet({ children, marker = "accent" }: ResumeBulletProps) {
  const { char, className } = MARKER[marker];

  return (
    <li className="flex gap-1.5">
      <span className={`shrink-0 select-none ${className}`} aria-hidden="true">
        {char}
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
