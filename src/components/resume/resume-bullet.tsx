import type { ReactNode } from "react";

type ResumeBulletProps = {
  children: ReactNode;
  marker?: "accent" | "muted";
};

function AccentMarker() {
  return (
    <svg
      className="resume-bullet-marker resume-accent mt-[0.35em] shrink-0"
      width="0.55em"
      height="0.7em"
      viewBox="0 0 8 10"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="1,0.5 7.5,5 1,9.5" fill="currentColor" />
    </svg>
  );
}

function MutedMarker() {
  return (
    <span
      className="resume-bullet-dot mt-[0.55em] shrink-0 select-none bg-neutral-500"
      aria-hidden="true"
    />
  );
}

export function ResumeBullet({ children, marker = "accent" }: ResumeBulletProps) {
  return (
    <li className="flex gap-1.5">
      {marker === "accent" ? <AccentMarker /> : <MutedMarker />}
      <span className="min-w-0">{children}</span>
    </li>
  );
}
