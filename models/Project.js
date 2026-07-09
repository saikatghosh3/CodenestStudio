import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    technologies: [{ type: String }],
    liveLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    category: { type: String, required: true, default: "Web App" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
