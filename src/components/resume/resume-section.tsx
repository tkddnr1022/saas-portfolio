import type { ReactNode } from "react";

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ResumeSection({ title, children, className = "" }: ResumeSectionProps) {
  return (
    <section className={`resume-section mb-6 ${className}`.trim()}>
      <h2 className="resume-section-title">
        <span className="resume-section-accent" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}
