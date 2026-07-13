import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

import { chunkText } from "./chunk.js";
import { projectRoot } from "./project-root.js";
import type { ChunkRecord } from "./types.js";

export const KB_DIR = join(projectRoot, "content", "kb");

type Frontmatter = {
  source?: string;
  category?: string;
  date?: string;
};

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  if (!raw.startsWith("---")) {
    return { frontmatter: {}, body: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { frontmatter: {}, body: raw };
  }

  const frontmatter: Frontmatter = {};
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");

  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([\w-]+):\s*(.+)$/);
    if (!match) continue;
    const [, key, value] = match;
    const cleaned = value.trim().replace(/^["']|["']$/g, "");
    if (key === "source" || key === "category" || key === "date") {
      frontmatter[key] = cleaned;
    }
  }

  return { frontmatter, body };
}

function walkMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (entry.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function inferCategory(relativePath: string): string {
  const parts = relativePath.split(sep);
  if (parts.length <= 1) return "general";
  return parts[0] ?? "general";
}

function toIsoDate(mtimeMs: number): string {
  return new Date(mtimeMs).toISOString().slice(0, 10);
}

export function loadKbChunks(): ChunkRecord[] {
  if (!existsSync(KB_DIR) || !statSync(KB_DIR).isDirectory()) {
    throw new Error(
      `Knowledge base directory not found: content/kb\nPlace Markdown files under content/kb/ before running kb:chunk.`,
    );
  }

  const markdownFiles = walkMarkdownFiles(KB_DIR);
  if (markdownFiles.length === 0) {
    throw new Error(`No Markdown files found under content/kb/`);
  }

  const chunks: ChunkRecord[] = [];

  for (const filePath of markdownFiles) {
    const relativePath = relative(KB_DIR, filePath).split(sep).join("/");
    const raw = readFileSync(filePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const stat = statSync(filePath);

    const metadata = {
      source: frontmatter.source ?? relativePath,
      category: frontmatter.category ?? inferCategory(relativePath),
      date: frontmatter.date ?? toIsoDate(stat.mtimeMs),
    };

    chunks.push(...chunkText(body, metadata));
  }

  return chunks;
}
