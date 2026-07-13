import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { loadKbChunks } from "./lib/kb.js";
import { projectRoot } from "./lib/project-root.js";

const cacheDir = join(projectRoot, "scripts", ".cache");
const cachePath = join(cacheDir, "chunks.json");

async function main() {
  const chunks = loadKbChunks();
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cachePath, JSON.stringify(chunks, null, 2), "utf8");

  const bySource = new Map<string, number>();
  for (const chunk of chunks) {
    bySource.set(chunk.metadata.source, (bySource.get(chunk.metadata.source) ?? 0) + 1);
  }

  console.log(`Wrote ${chunks.length} chunks to scripts/.cache/chunks.json`);
  for (const [source, count] of [...bySource.entries()].sort()) {
    console.log(`  ${source}: ${count}`);
  }
}

main().catch((error) => {
  console.error("Failed to chunk knowledge base:", error);
  process.exit(1);
});
