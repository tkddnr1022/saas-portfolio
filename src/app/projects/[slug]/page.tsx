import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPageView } from "@/components/sections/project/project-page";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { SITE_NAME } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
    };
  }

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} | ${SITE_NAME}`,
      description: project.tagline,
    },
    twitter: {
      title: `${project.name} | ${SITE_NAME}`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageView project={project} />;
}
