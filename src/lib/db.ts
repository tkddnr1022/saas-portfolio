import { Pool, type QueryResultRow } from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: Pool;
};

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  return new Pool({
    connectionString,
    max: 5,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
}

export function getPool(): Pool {
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = createPool();
  }

  return globalForDb.pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params);
}

export type DocumentRow = {
  id: string;
  content: string;
  embedding: number[] | string;
  metadata: {
    source?: string;
    category?: string;
    date?: string;
    [key: string]: unknown;
  };
  created_at: Date;
};
