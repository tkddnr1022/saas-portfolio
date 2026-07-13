import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { projectRoot } from "./project-root.js";

/**
 * Loads `.env.local` then `.env` into `process.env` (first file wins per key).
 * Returns the filename that was loaded, or null if none found.
 */
export function loadEnvFile(): string | null {
  for (const name of [".env.local", ".env"]) {
    const path = join(projectRoot, name);
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

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required. Add it to .env.local or .env (see .env.example).`);
  }
  return value;
}
