const cache = new Map();

const DEFAULT_TTL = 60 * 1000;
const STALE_THRESHOLD = 5 * 1000;

export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now > entry.expiresAt + STALE_THRESHOLD) {
    cache.delete(key);
    return null;
  }

  if (now > entry.expiresAt) {
    return { data: entry.data, stale: true };
  }

  return { data: entry.data, stale: false };
}

export function setCache(key, data, ttl = DEFAULT_TTL) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
}

export function invalidateCache(key) {
  if (key instanceof RegExp) {
    for (const k of cache.keys()) {
      if (key.test(k)) cache.delete(k);
    }
  } else {
    cache.delete(key);
  }
}

export function invalidateAll() {
  cache.clear();
}

export const CACHE_KEYS = {
  PROJECTS: "projects",
  PROJECTS_BY_CATEGORY: (cat) => `projects:cat:${cat}`,
  PROJECTS_FEATURED: "projects:featured",
  PROJECT_BY_SLUG: (slug) => `project:slug:${slug}`,
  CATEGORIES: "categories",
  PRICING: "pricing",
  REVIEWS: "reviews",
  REVIEWS_ADMIN: "reviews:admin",
  SETTINGS: "settings",
  ABOUT_US: "about_us",
  VIDEOS: "videos",
  VIDEOS_ACTIVE: "videos:active",
  FRONTEND_DESIGNS: "frontend_designs",
  FRONTEND_DESIGNS_BY_CATEGORY: (cat) => `frontend_designs:cat:${cat}`,
  FRONTEND_DESIGNS_FEATURED: "frontend_designs:featured",
  FRONTEND_DESIGN_BY_SLUG: (slug) => `frontend_design:slug:${slug}`,
};

export const CACHE_TTL = {
  SHORT: 30 * 1000,
  MEDIUM: 60 * 1000,
  LONG: 5 * 60 * 1000,
  VERY_LONG: 15 * 60 * 1000,
};
