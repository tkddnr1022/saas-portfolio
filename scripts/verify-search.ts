import { createOpenAI } from "@ai-sdk/openai";
import { embed } from "ai";
import pg from "pg";

import { loadEnvFile, requireEnv } from "./lib/load-env.js";
import { serverEnv } from "@/lib/env";

const SAMPLE_QUERIES = [
  "주요 경력과 역할을 알려줘",
  "사용하는 기술 스택은 무엇인가요?",
  "가장 자랑스러운 프로젝트는 무엇인가요?",
  "자격증이나 교육 이력이 있나요?",
  "협업 스타일과 강점을 설명해줘",
  "백엔드 개발 경험은 어떤가요?",
  "프론트엔드에서 어떤 프레임워크를 썼나요?",
];

const LOW_SIMILARITY_THRESHOLD = 0.2;
const PREVIEW_LENGTH = 120;

type SearchRow = {
  content: string;
  metadata: {
    source?: string;
    category?: string;
    date?: string;
  };
  similarity: number;
};

function preview(text: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= PREVIEW_LENGTH) return oneLine;
  return `${oneLine.slice(0, PREVIEW_LENGTH)}…`;
}

async function main() {
  const loaded = loadEnvFile();
  const apiKey = requireEnv("OPENAI_API_KEY");
  const connectionString = requireEnv("DATABASE_URL");

  if (loaded) {
    console.log(`Loaded env from ${loaded}`);
  }

  const openai = createOpenAI({ apiKey });
  const model = openai.embedding(serverEnv.openaiEmbeddingModel);

  const client = new pg.Client({
    connectionString,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();

  try {
    const countResult = await client.query<{ count: string }>(
      "SELECT COUNT(*)::text AS count FROM documents",
    );
    const documentCount = Number(countResult.rows[0]?.count ?? 0);

    if (documentCount === 0) {
      console.error("FAIL: documents table is empty. Run npm run kb:reindex first.");
      process.exit(1);
    }

    console.log(`documents: ${documentCount} rows\n`);

    let warnings = 0;

    for (const query of SAMPLE_QUERIES) {
      const { embedding } = await embed({ model, value: query });
      const vector = JSON.stringify(embedding);

      const { rows } = await client.query<SearchRow>(
        `SELECT content, metadata, 1 - (embedding <=> $1::vector) AS similarity
         FROM documents
         ORDER BY embedding <=> $1::vector
         LIMIT 5`,
        [vector],
      );

      console.log(`Q: ${query}`);
      if (rows.length === 0) {
        console.log("  (no results)\n");
        warnings += 1;
        continue;
      }

      const top = rows[0]!;
      if (top.similarity < LOW_SIMILARITY_THRESHOLD) {
        warnings += 1;
        console.log(
          `  WARN: top similarity ${top.similarity.toFixed(3)} < ${LOW_SIMILARITY_THRESHOLD}`,
        );
      }

      for (const [index, row] of rows.entries()) {
        const source = row.metadata.source ?? "unknown";
        const category = row.metadata.category ?? "unknown";
        console.log(
          `  ${index + 1}. [${row.similarity.toFixed(3)}] ${source} (${category}) — ${preview(row.content)}`,
        );
      }
      console.log("");
    }

    if (warnings > 0) {
      console.log(`Completed with ${warnings} warning(s). Review low-similarity matches above.`);
    } else {
      console.log("Verification completed — no low-similarity warnings.");
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Failed to verify vector search:", error);
  process.exit(1);
});
