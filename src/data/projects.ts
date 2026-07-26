import projectsData from "./projects.json";

export type ProjectPoint =
  | string
  | {
      text: string;
      showResume?: boolean;
    };

export type ProjectModule = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  points: ProjectPoint[];
  image?: string;
};

export function getPointText(point: ProjectPoint): string {
  return typeof point === "string" ? point : point.text;
}

export function isResumePoint(point: ProjectPoint): boolean {
  return typeof point === "string" ? true : point.showResume !== false;
}

export type ProjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  type: string;
  role: string;
  stack: string[];
  startDate: string;
  endDate: string | null;
  showSite: boolean;
  showResume: boolean;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  figmaUrl?: string;
  banner?: string;
  modules: ProjectModule[];
};

type ProjectsData = {
  projects: ProjectDetail[];
};

const data = projectsData as ProjectsData;

/** All projects from SSOT (site + resume). */
export const ALL_PROJECTS: ProjectDetail[] = data.projects;

/** Projects shown on the portfolio site and `/projects/[slug]`. */
export const PROJECT_DETAILS: ProjectDetail[] = ALL_PROJECTS.filter(
  (project) => project.showSite,
);

/** Projects included in the resume print page, sorted by startDate ascending. */
export const RESUME_PROJECTS: ProjectDetail[] = ALL_PROJECTS.filter(
  (project) => project.showResume,
).sort((a, b) => a.startDate.localeCompare(b.startDate));

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_DETAILS.map((project) => project.slug);
}

export function formatResumePeriod(startDate: string, endDate: string | null): string {
  const format = (date: string) => {
    const [year, month] = date.split("-");
    return `${year}.${month}`;
  };

  const end = endDate ? format(endDate) : "Present";
  return `${format(startDate)} ~ ${end}`;
}
