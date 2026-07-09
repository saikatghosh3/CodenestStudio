import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import slugify from "slugify";

export async function getAllProjects(filters = {}) {
  await dbConnect();
  const query = {};
  if (filters.category) query.category = filters.category;
  if (filters.featured) query.featured = filters.featured === "true";
  return Project.find(query).sort({ createdAt: -1 }).lean();
}

export async function getProjectBySlug(slug) {
  await dbConnect();
  return Project.findOne({ slug }).lean();
}

export async function getFeaturedProjects() {
  await dbConnect();
  return Project.find({ featured: true }).sort({ createdAt: -1 }).lean();
}

export async function createProject(data) {
  await dbConnect();
  const slug = data.slug || slugify(data.title, { lower: true, strict: true });
  return Project.create({ ...data, slug });
}

export async function updateProject(id, data) {
  await dbConnect();
  if (data.title && !data.slug) {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }
  return Project.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteProject(id) {
  await dbConnect();
  return Project.findByIdAndDelete(id).lean();
}

export async function toggleFeatured(id) {
  await dbConnect();
  const project = await Project.findById(id);
  if (!project) return null;
  project.featured = !project.featured;
  await project.save();
  return project.toObject();
}
