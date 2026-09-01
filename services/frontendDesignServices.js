import dbConnect from "@/lib/db";
import FrontendDesign from "@/models/FrontendDesign";
import slugify from "slugify";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

export async function getAllFrontendDesigns(filters = {}) {
  const cacheKey = filters.category
    ? CACHE_KEYS.FRONTEND_DESIGNS_BY_CATEGORY(filters.category)
    : filters.featured
    ? CACHE_KEYS.FRONTEND_DESIGNS_FEATURED
    : CACHE_KEYS.FRONTEND_DESIGNS;

  const cached = getCached(cacheKey);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.featured) query.featured = filters.featured === "true";
    const designs = await FrontendDesign.find(query).sort({ createdAt: -1 }).lean();
    setCache(cacheKey, designs, CACHE_TTL.LONG);
    return designs;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getFrontendDesignBySlug(slug) {
  const cacheKey = CACHE_KEYS.FRONTEND_DESIGN_BY_SLUG(slug);
  const cached = getCached(cacheKey);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const design = await FrontendDesign.findOne({ slug }).lean();
    if (design) setCache(cacheKey, design, CACHE_TTL.MEDIUM);
    return design;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getFeaturedFrontendDesigns() {
  const cached = getCached(CACHE_KEYS.FRONTEND_DESIGNS_FEATURED);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const designs = await FrontendDesign.find({ featured: true }).sort({ createdAt: -1 }).lean();
    setCache(CACHE_KEYS.FRONTEND_DESIGNS_FEATURED, designs, CACHE_TTL.LONG);
    return designs;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function createFrontendDesign(data) {
  await dbConnect();
  const slug = data.slug || slugify(data.title, { lower: true, strict: true });
  const design = await FrontendDesign.create({ ...data, slug });
  invalidateCache(/^frontend_designs/);
  return design;
}

export async function updateFrontendDesign(id, data) {
  await dbConnect();
  if (data.title && !data.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }
  const design = await FrontendDesign.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  invalidateCache(/^frontend_designs/);
  if (design?.slug) invalidateCache(CACHE_KEYS.FRONTEND_DESIGN_BY_SLUG(design.slug));
  return design;
}

export async function deleteFrontendDesign(id) {
  await dbConnect();
  const design = await FrontendDesign.findByIdAndDelete(id).lean();
  invalidateCache(/^frontend_designs/);
  if (design?.slug) invalidateCache(CACHE_KEYS.FRONTEND_DESIGN_BY_SLUG(design.slug));
  return design;
}

export async function toggleFeaturedFrontendDesign(id) {
  await dbConnect();
  const design = await FrontendDesign.findById(id);
  if (!design) return null;
  design.featured = !design.featured;
  await design.save();
  invalidateCache(/^frontend_designs/);
  return design.toObject();
}
