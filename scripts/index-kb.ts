import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createOpenAI } from "@ai-sdk/openai";
import { embedMany } from "ai";
import pg from "pg";

import { loadEnvFile, requireEnv } from "./lib/load-env.js";
import { projectRoot } from "./lib/project-root.js";
import type { ChunkRecord } from "./lib/types.js";
import { serverEnv } from "@/lib/env";

const cachePath = join(projectRoot, "scripts", ".cache", "chunks.json");
const BATCH_SIZE = 100;

function loadChunks(): ChunkRecord[] {
  const raw = readFileSync(cachePath, "utf8");
  return JSON.parse(raw) as ChunkRecord[];
}

async function main() {
  const startedAt = Date.now();
  const loaded = loadEnvFile();
  const apiKey = requireEnv("OPENAI_API_KEY");
  const connectionString = requireEnv("DATABASE_URL");

  if (loaded) {
    console.log(`Loaded env from ${loaded}`);
  }

  const chunks = loadChunks();
  if (chunks.length === 0) {
    throw new Error("No chunks found. Run npm run kb:chunk first.");
  }

  const openai = createOpenAI({ apiKey });
  const model = openai.embedding(serverEnv.openaiEmbeddingModel);

  const client = new pg.Client({
    connectionString,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();

  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE documents");

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const { embeddings } = await embedMany({
        model,
        values: batch.map((chunk) => chunk.content),
      });

      for (let j = 0; j < batch.length; j += 1) {
        const chunk = batch[j]!;
        const embedding = embeddings[j]!;
        await client.query(
          `INSERT INTO documents (content, embedding, metadata)
           VALUES ($1, $2::vector, $3::jsonb)`,
          [chunk.content, JSON.stringify(embedding), JSON.stringify(chunk.metadata)],
        );
      }

      console.log(`Indexed ${Math.min(i + BATCH_SIZE, chunks.length)} / ${chunks.length}`);
    }

    await client.query("COMMIT");

    const bySource = new Map<string, number>();
    for (const chunk of chunks) {
      bySource.set(chunk.metadata.source, (bySource.get(chunk.metadata.source) ?? 0) + 1);
    }

    const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(`Indexed ${chunks.length} chunks in ${elapsedSec}s`);
    for (const [source, count] of [...bySource.entries()].sort()) {
      console.log(`  ${source}: ${count}`);
    }
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Failed to index knowledge base:", error);
  process.exit(1);
});
