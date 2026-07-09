import dbConnect from "@/lib/db";
import Category from "@/models/Category";

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
  await dbConnect();
  let categories = await Category.find().sort({ order: 1, name: 1 }).lean();
  if (categories.length === 0) {
    categories = await Category.create(DEFAULT_CATEGORIES);
    categories = categories.map((c) => c.toObject ? c.toObject() : c);
  }
  return categories;
}

export async function getCategoryById(id) {
  await dbConnect();
  return Category.findById(id).lean();
}

export async function createCategory(data) {
  await dbConnect();
  const category = await Category.create(data);
  return category.toObject();
}

export async function updateCategory(id, data) {
  await dbConnect();
  return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteCategory(id) {
  await dbConnect();
  return Category.findByIdAndDelete(id).lean();
}
