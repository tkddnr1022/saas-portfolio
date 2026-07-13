import { createOpenAI } from "@ai-sdk/openai";
import { embed } from "ai";

import { query } from "@/lib/db";
import { serverEnv } from "@/lib/env";

const TOP_K = 5;

export type SearchChunk = {
  content: string;
  metadata: {
    source?: string;
    category?: string;
    date?: string;
  };
  similarity: number;
};

type SearchRow = {
  content: string;
  metadata: SearchChunk["metadata"];
  similarity: number;
};

function getOpenAI() {
  return createOpenAI({ apiKey: serverEnv.openaiApiKey });
}

export async function searchDocuments(queryText: string): Promise<SearchChunk[]> {
  const openai = getOpenAI();
  const model = openai.embedding(serverEnv.openaiEmbeddingModel);
  const { embedding } = await embed({ model, value: queryText });
  const vector = JSON.stringify(embedding);

  const { rows } = await query<SearchRow>(
    `SELECT content, metadata, 1 - (embedding <=> $1::vector) AS similarity
     FROM documents
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [vector, TOP_K],
  );

  return rows;
}

export function formatChunksForPrompt(chunks: SearchChunk[]): string {
  if (chunks.length === 0) {
    return "관련 문서를 찾지 못했습니다.";
  }

  return chunks
    .map((chunk, index) => {
      const source = chunk.metadata.source ?? "unknown";
      const category = chunk.metadata.category ?? "unknown";
      const date = chunk.metadata.date ?? "unknown";

      return `[${index + 1}] source: ${source} | category: ${category} | date: ${date}
${chunk.content}`;
    })
    .join("\n\n");
}
