import { ProjectCardGrid } from "@/components/sections/projects/project-card-grid";
import { SectionHeader, SectionShell } from "@/components/sections/section-header";

const SECTION_TITLE = "직접 설계하고 완성한 프로젝트";

const SECTION_DESCRIPTION = "문제를 정의하고 아키텍처부터 구현·운영까지 책임진 작업물입니다.";

export function ProjectsSection() {
  return (
    <SectionShell id="projects">
      <SectionHeader
        sectionId="projects"
        eyebrow="Projects"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <ProjectCardGrid />
    </SectionShell>
  );
}
