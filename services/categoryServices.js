import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

const DEFAULT_CATEGORIES = [
  { name: "Web App", description: "Full-stack web applications", order: 1 },
  { name: "Mobile App", description: "Cross-platform mobile solutions", order: 2 },
  { name: "E-Commerce", description: "Online store and marketplace solutions", order: 3 },
  { name: "SaaS", description: "Software as a Service platforms", order: 4 },
  { name: "Portfolio", description: "Personal and professional portfolio sites", order: 5 },
  { name: "Landing Page", description: "Conversion-optimized landing pages", order: 6 },
  { name: "Dashboard", description: "Analytics and admin dashboards", order: 7 },
  { name: "Other", description: "Miscellaneous projects", order: 8 },
];

export async function getAllCategories() {
  const cached = getCached(CACHE_KEYS.CATEGORIES);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    let categories = await Category.find().sort({ order: 1, name: 1 }).lean();
    setCache(CACHE_KEYS.CATEGORIES, categories, CACHE_TTL.LONG);
    return categories;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getCategoryById(id) {
  await dbConnect();
  return Category.findById(id).lean();
}

export async function createCategory(data) {
  await dbConnect();
  const category = await Category.create(data);
  invalidateCache(CACHE_KEYS.CATEGORIES);
  return category.toObject();
}

export async function updateCategory(id, data) {
  await dbConnect();
  const category = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  invalidateCache(CACHE_KEYS.CATEGORIES);
  return category;
}

export async function deleteCategory(id) {
  await dbConnect();
  const category = await Category.findByIdAndDelete(id).lean();
  invalidateCache(CACHE_KEYS.CATEGORIES);
  return category;
}
