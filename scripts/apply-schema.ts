import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

import { loadEnvFile, requireEnv } from "./lib/load-env.js";
import { projectRoot } from "./lib/project-root.js";

const schemaPath = join(projectRoot, "db", "schema.sql");

async function main() {
  const loaded = loadEnvFile();
  const connectionString = requireEnv("DATABASE_URL");

  if (loaded) {
    console.log(`Loaded env from ${loaded}`);
  }

  const sql = readFileSync(schemaPath, "utf8");
  const client = new pg.Client({
    connectionString,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();

  try {
    await client.query(sql);
    console.log("Applied db/schema.sql successfully (documents + indexes).");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Failed to apply schema:", error);
  process.exit(1);
});
