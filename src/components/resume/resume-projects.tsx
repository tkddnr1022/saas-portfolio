import {
  formatResumePeriod,
  RESUME_PROJECTS,
  type ProjectDetail,
} from "@/data/projects";

function ProjectEntry({ project }: { project: ProjectDetail }) {
  const liveHost = project.liveUrl?.replace(/^https?:\/\//, "");

  return (
    <li className="resume-entry space-y-2">
      <div className="break-inside-avoid">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <strong className="text-[11pt] font-bold">{project.name}</strong>
          <span className="text-[9.5pt] tabular-nums text-[#555]">
            {formatResumePeriod(project.startDate, project.endDate)}
          </span>
        </div>
        <p className="mt-0.5 text-[10pt] text-[#333]">{project.tagline}</p>
      </div>

      <div className="space-y-1 text-[9.5pt] leading-relaxed">
        <p className="font-semibold">소개</p>
        <p>{project.overview}</p>
        <ul className="mt-1 list-none space-y-0.5 pl-3">
          <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
            형태: {project.type}
          </li>
          <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
            참여 역할: {project.role}
          </li>
          <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
            주요 기술: {project.stack.join(", ")}
          </li>
          {liveHost ? (
            <li className="relative pl-3 before:absolute before:left-0 before:content-['◦']">
              URL: {liveHost}
            </li>
          ) : null}
        </ul>
      </div>

      {project.modules.length > 0 ? (
        <div className="space-y-2 text-[9.5pt] leading-relaxed">
          <p className="font-semibold">경험</p>
          <ul className="space-y-2">
            {project.modules.map((module) => (
              <li key={module.id} className="break-inside-avoid pl-1">
                <p className="relative pl-3 font-semibold before:absolute before:left-0 before:font-normal before:content-['◦']">
                  {module.title}
                </p>
                <p className="mt-0.5 pl-3">{module.problem}</p>
                <ul className="mt-1 list-none space-y-0.5 pl-6">
                  {module.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-3 before:absolute before:left-0 before:content-['▪']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export function ResumeProjects() {
  return (
    <section className="resume-section mb-5">
      <h2 className="resume-section-title mb-2 border-b border-[#444] pb-1 text-[12pt] font-bold">
        프로젝트
      </h2>
      <ul className="space-y-5">
        {RESUME_PROJECTS.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}
