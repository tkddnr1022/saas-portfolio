export type ChunkMetadata = {
  source: string;
  category: string;
  date: string;
  chunkIndex: number;
};

export type ChunkRecord = {
  content: string;
  metadata: ChunkMetadata;
};
