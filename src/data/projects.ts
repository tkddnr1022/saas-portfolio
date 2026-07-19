import projectsData from "./projects.json";

export type ProjectModule = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  points: string[];
  image?: string;
};

export type ProjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  type: string;
  role: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  banner?: string;
  modules: ProjectModule[];
};

type ProjectsData = {
  projects: ProjectDetail[];
};

const data = projectsData as ProjectsData;

export const PROJECT_DETAILS: ProjectDetail[] = data.projects;

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECT_DETAILS.map((project) => project.slug);
}
