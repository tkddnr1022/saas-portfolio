import type { ProjectDetail } from "@/data/projects";

import { ProjectCta } from "./project-cta";
import { ProjectHero } from "./project-hero";
import { ProjectModules } from "./project-modules";

type ProjectPageProps = {
  project: ProjectDetail;
};

export function ProjectPageView({ project }: ProjectPageProps) {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <ProjectHero project={project} />
      <ProjectModules modules={project.modules} />
      <ProjectCta project={project} />
    </main>
  );
}
