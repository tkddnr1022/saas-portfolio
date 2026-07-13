export type HireStatus = "available" | "open_to_work" | "unavailable";

const HIRE_STATUSES: HireStatus[] = ["available", "open_to_work", "unavailable"];

function parseHireStatus(value: string | undefined): HireStatus {
  if (value && HIRE_STATUSES.includes(value as HireStatus)) {
    return value as HireStatus;
  }

  return "available";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

/** Public (client-safe) flags */
export const hireStatus = parseHireStatus(process.env.NEXT_PUBLIC_HIRE_STATUS);
export const showSalary = process.env.NEXT_PUBLIC_SHOW_SALARY === "true";

/**
 * Server-only env accessors. Call from Route Handlers / scripts only —
 * do not import these into client components.
 */
export const serverEnv = {
  get openaiApiKey() {
    return requireEnv("OPENAI_API_KEY");
  },
  get openaiEmbeddingModel() {
    return requireEnv("OPENAI_EMBEDDING_MODEL");
  },
  get openaiChatModel() {
    return process.env.OPENAI_CHAT_MODEL ?? "gpt-5.4";
  },
  get databaseUrl() {
    return requireEnv("DATABASE_URL");
  },
  get redisUrl() {
    return requireEnv("REDIS_URL");
  },
};
