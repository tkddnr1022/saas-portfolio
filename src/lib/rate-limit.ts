import Redis from "ioredis";

import { serverEnv } from "@/lib/env";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;
const KEY_PREFIX = "ratelimit:chat:";

const globalForRedis = globalThis as unknown as {
  redis?: Redis;
};

function createRedisClient(): Redis {
  return new Redis(serverEnv.redisUrl, {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
  });
}

function getRedis(): Redis {
  if (!globalForRedis.redis) {
    globalForRedis.redis = createRedisClient();
  }

  return globalForRedis.redis;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

export async function checkChatRateLimit(ip: string): Promise<RateLimitResult> {
  const redis = getRedis();
  const key = `${KEY_PREFIX}${ip}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  if (count > MAX_REQUESTS) {
    const ttl = await redis.ttl(key);
    return { ok: false, retryAfter: ttl > 0 ? ttl : WINDOW_SECONDS };
  }

  return { ok: true, remaining: MAX_REQUESTS - count };
}
