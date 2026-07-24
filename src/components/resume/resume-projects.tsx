import {
  formatResumePeriod,
  RESUME_PROJECTS,
  type ProjectDetail,
} from "@/data/projects";
import { ResumeBullet } from "@/components/resume/resume-bullet";
import { ResumeSection } from "@/components/resume/resume-section";

function ProjectEntry({ project }: { project: ProjectDetail }) {
  const liveHost = project.liveUrl?.replace(/^https?:\/\//, "");

  return (
    <li className="resume-entry space-y-1.5 border-t border-[#e5e5e5] pt-3 first:border-t-0 first:pt-0">
      <div className="break-inside-avoid">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <div className="min-w-0">
            <strong className="text-[11pt] font-bold">{project.name}</strong>
            <span className="ml-2 text-[9.5pt] text-[#555]">{project.tagline}</span>
          </div>
          <span className="shrink-0 text-[9pt] tabular-nums text-[#666]">
            {formatResumePeriod(project.startDate, project.endDate)}
          </span>
        </div>

        <p className="mt-1 text-[9.5pt] leading-relaxed text-[#333]">{project.overview}</p>

        <p className="mt-1 text-[8.5pt] leading-snug text-[#666]">
          <span className="font-semibold text-[#444]">{project.type}</span>
          <span className="mx-1.5 text-[#ccc]">·</span>
          {project.role}
          <span className="mx-1.5 text-[#ccc]">·</span>
          {project.stack.join(", ")}
          {liveHost ? (
            <>
              <span className="mx-1.5 text-[#ccc]">·</span>
              <span>{liveHost}</span>
            </>
          ) : null}
        </p>
      </div>

      {project.modules.length > 0 ? (
        <ul className="mt-1.5 space-y-2">
          {project.modules.map((module) => (
            <li key={module.id} className="break-inside-avoid">
              <p className="text-[9.5pt] font-bold text-[#1a1a1a]">{module.title}</p>
              <p className="mt-0.5 text-[9pt] leading-relaxed text-[#555]">{module.problem}</p>
              <ul className="mt-0.5 space-y-0.5 text-[9.5pt] leading-relaxed">
                {module.points.map((point) => (
                  <ResumeBullet key={point}>{point}</ResumeBullet>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function ResumeProjects() {
  return (
    <ResumeSection title="프로젝트">
      <ul className="space-y-0">
        {RESUME_PROJECTS.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </ul>
    </ResumeSection>
  );
}
