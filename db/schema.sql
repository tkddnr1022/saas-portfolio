-- RAG documents table for portfolio chatbot
-- Requires: PostgreSQL with pgvector extension enabled

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE documents IS 'Chunked knowledge-base documents with embeddings (text-embedding-3-small, 1536-dim)';
COMMENT ON COLUMN documents.content IS 'Chunk text used for RAG context';
COMMENT ON COLUMN documents.embedding IS 'OpenAI text-embedding-3-small vector (1536 dimensions)';
COMMENT ON COLUMN documents.metadata IS 'JSON tags: source, category, date, and optional extras';

-- Cosine similarity search for top-k retrieval
CREATE INDEX IF NOT EXISTS documents_embedding_hnsw_idx
  ON documents
  USING hnsw (embedding vector_cosine_ops);

-- Filter by metadata keys (source / category / date)
CREATE INDEX IF NOT EXISTS documents_metadata_gin_idx
  ON documents
  USING gin (metadata);
