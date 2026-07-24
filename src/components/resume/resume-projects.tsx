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
    <li className="resume-entry space-y-2 border-t border-neutral-200 pt-4 first:border-t-0 first:pt-0">
      <div className="break-inside-avoid">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <div className="min-w-0">
            <strong className="resume-title font-bold">{project.name}</strong>
            <span className="resume-text ml-2 text-neutral-600">{project.tagline}</span>
          </div>
          <span className="resume-text-sm shrink-0 tabular-nums text-neutral-500">
            {formatResumePeriod(project.startDate, project.endDate)}
          </span>
        </div>

        <p className="resume-text mt-1 leading-relaxed text-neutral-700">{project.overview}</p>

        <p className="resume-text-xs mt-1 leading-snug text-neutral-500">
          <span className="font-semibold text-neutral-700">{project.type}</span>
          <span className="mx-1.5 text-neutral-300">·</span>
          {project.role}
          <span className="mx-1.5 text-neutral-300">·</span>
          {project.stack.join(", ")}
          {liveHost && project.liveUrl ? (
            <>
              <span className="mx-1.5 text-neutral-300">·</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {liveHost}
              </a>
            </>
          ) : null}
        </p>
      </div>

      {project.modules.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {project.modules.map((module) => (
            <li key={module.id} className="break-inside-avoid">
              <p className="resume-text font-bold text-neutral-900">{module.title}</p>
              <p className="resume-text-sm mt-0.5 leading-relaxed text-neutral-600">
                {module.problem}
              </p>
              <ul className="resume-text mt-0.5 space-y-0.5 leading-relaxed">
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
      <ul>
        {RESUME_PROJECTS.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </ul>
    </ResumeSection>
  );
}
