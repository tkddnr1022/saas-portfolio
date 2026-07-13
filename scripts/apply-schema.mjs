import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const schemaPath = join(root, "db", "schema.sql");

function loadEnvFile() {
  for (const name of [".env.local", ".env"]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;

    const text = readFileSync(path, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
    return name;
  }
  return null;
}

async function main() {
  const loaded = loadEnvFile();
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error(
      "DATABASE_URL is required. Add it to .env.local or .env (see .env.example).",
    );
    process.exit(1);
  }

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
