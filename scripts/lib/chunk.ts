import { getEncoding } from "js-tiktoken";

import type { ChunkMetadata, ChunkRecord } from "./types.js";

const CHUNK_SIZE = 512;
const OVERLAP = 64;
const STRIDE = CHUNK_SIZE - OVERLAP;

export function chunkText(
  text: string,
  metadata: Omit<ChunkMetadata, "chunkIndex">,
): ChunkRecord[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const enc = getEncoding("cl100k_base");
  const tokens = enc.encode(trimmed);
  if (tokens.length === 0) return [];

  const records: ChunkRecord[] = [];
  let chunkIndex = 0;

  for (let start = 0; start < tokens.length; start += STRIDE) {
    const slice = tokens.slice(start, start + CHUNK_SIZE);
    if (slice.length === 0) break;

    const content = enc.decode(slice).trim();
    if (content) {
      records.push({
        content,
        metadata: { ...metadata, chunkIndex },
      });
      chunkIndex += 1;
    }

    if (start + CHUNK_SIZE >= tokens.length) break;
  }

  return records;
}
