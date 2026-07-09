const rateLimit = new Map();

function cleanup(windowMs) {
  const now = Date.now();
  for (const [key, entry] of rateLimit) {
    if (now - entry.resetTime > windowMs) {
      rateLimit.delete(key);
    }
  }
}

export function rateLimiter({ windowMs = 15 * 60 * 1000, max = 10 } = {}) {
  return function checkRateLimit(ip) {
    const now = Date.now();
    const key = `${ip}`;

    const entry = rateLimit.get(key);

    if (!entry || now - entry.resetTime > windowMs) {
      rateLimit.set(key, { count: 1, resetTime: now });
      return { success: true, remaining: max - 1 };
    }

    entry.count++;

    if (entry.count > max) {
      return { success: false, remaining: 0, retryAfter: Math.ceil((windowMs - (now - entry.resetTime)) / 1000) };
    }

    return { success: true, remaining: max - entry.count };
  };
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}

export const loginLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

export const apiLimiter = rateLimiter({ windowMs: 60 * 1000, max: 30 });
