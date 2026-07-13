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
  get databaseUrl() {
    return requireEnv("DATABASE_URL");
  },
  get redis() {
    const restUrl = process.env.UPSTASH_REDIS_REST_URL;
    const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    const redisUrl = process.env.REDIS_URL;

    if (restUrl && restToken) {
      return { type: "upstash" as const, url: restUrl, token: restToken };
    }

    if (redisUrl) {
      return { type: "url" as const, url: redisUrl };
    }

    throw new Error(
      "Redis is not configured. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or REDIS_URL.",
    );
  },
};
