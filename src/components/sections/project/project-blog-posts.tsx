"use client";

import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import type { ProjectBlogPost } from "@/data/projects";

type ProjectBlogPostsProps = {
  posts: ProjectBlogPost[];
};

export function ProjectBlogPosts({ posts }: ProjectBlogPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="blog-posts-heading" className="border-t border-border px-6 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Reveal as="header" className="space-y-3">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Writing
          </p>
          <h2
            id="blog-posts-heading"
            className="font-heading text-h2 font-semibold tracking-tight"
          >
            관련 글
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            이 프로젝트를 만들며 정리한 글입니다.
          </p>
        </Reveal>

        <Reveal index={1}>
          <ul className="flex flex-col">
            {posts.map((post) => (
              <li key={post.href}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-border py-4 text-body transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  <span className="font-medium leading-snug">{post.title}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
