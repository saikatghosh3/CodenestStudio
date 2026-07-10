import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import slugify from "slugify";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

export async function getAllProjects(filters = {}) {
  const cacheKey = filters.category
    ? CACHE_KEYS.PROJECTS_BY_CATEGORY(filters.category)
    : filters.featured
    ? CACHE_KEYS.PROJECTS_FEATURED
    : CACHE_KEYS.PROJECTS;

  const cached = getCached(cacheKey);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.featured) query.featured = filters.featured === "true";
    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
    setCache(cacheKey, projects, CACHE_TTL.MEDIUM);
    return projects;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getProjectBySlug(slug) {
  const cacheKey = CACHE_KEYS.PROJECT_BY_SLUG(slug);
  const cached = getCached(cacheKey);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();
    if (project) setCache(cacheKey, project, CACHE_TTL.MEDIUM);
    return project;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getFeaturedProjects() {
  const cached = getCached(CACHE_KEYS.PROJECTS_FEATURED);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 }).lean();
    setCache(CACHE_KEYS.PROJECTS_FEATURED, projects, CACHE_TTL.MEDIUM);
    return projects;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function createProject(data) {
  await dbConnect();
  const slug = data.slug || slugify(data.title, { lower: true, strict: true });
  const project = await Project.create({ ...data, slug });
  invalidateCache(/^projects/);
  return project;
}

export async function updateProject(id, data) {
  await dbConnect();
  if (data.title && !data.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }
  const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  invalidateCache(/^projects/);
  if (project?.slug) invalidateCache(CACHE_KEYS.PROJECT_BY_SLUG(project.slug));
  return project;
}

export async function deleteProject(id) {
  await dbConnect();
  const project = await Project.findByIdAndDelete(id).lean();
  invalidateCache(/^projects/);
  if (project?.slug) invalidateCache(CACHE_KEYS.PROJECT_BY_SLUG(project.slug));
  return project;
}

export async function toggleFeatured(id) {
  await dbConnect();
  const project = await Project.findById(id);
  if (!project) return null;
  project.featured = !project.featured;
  await project.save();
  invalidateCache(/^projects/);
  return project.toObject();
}
