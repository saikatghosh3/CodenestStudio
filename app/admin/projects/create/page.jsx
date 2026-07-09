"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save, X, Plus, AlertCircle, Link, Image, Code, Globe, Github, FolderOpen, Star } from "lucide-react";

export default function CreateProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    images: [],
    technologies: [],
    liveLink: "",
    githubLink: "",
    category: "Web App",
    featured: false,
  });
  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch {
        // fall back to empty
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function addTech() {
    const tech = techInput.trim();
    if (tech && !form.technologies.includes(tech)) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
      setTechInput("");
    }
  }

  function removeTech(tech) {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  }

  function addImage() {
    const img = imageInput.trim();
    if (img) {
      setForm((prev) => ({ ...prev, images: [...prev.images, img] }));
      setImageInput("");
    }
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleThumbnailUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm((prev) => ({ ...prev, thumbnail: dataUrl }));
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const urls = await Promise.all(files.map((file) => readFileAsDataURL(file)));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  }

  function removeImage(index) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create project");
        return;
      }

      router.push("/admin/projects");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 sm:p-6 lg:p-8 max-w-4xl"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Create New Project</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new project to your portfolio
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">Basic Information</h2>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. E-Commerce Platform"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="Auto-generated from title"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the project, its purpose, and key features..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">Media</h2>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Thumbnail URL or Upload *</label>
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        name="thumbnail"
                        value={form.thumbnail}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/thumbnail.jpg"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 transition-colors"
                    />
                  </div>
                  {form.thumbnail && (
                    <div className="mt-3 rounded-xl overflow-hidden bg-muted border border-border w-fit">
                      <img
                        src={form.thumbnail}
                        alt="Thumbnail preview"
                        className="h-36 w-56 object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Additional Images</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="url"
                          value={imageInput}
                          onChange={(e) => setImageInput(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                          onKeyDown={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addImage())
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addImage}
                        className="px-3.5 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 transition-colors"
                    />
                  </div>
                  {form.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative group rounded-lg overflow-hidden bg-muted border border-border aspect-[4/3]">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 p-1 bg-destructive/90 text-destructive-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">Technologies</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="e.g. React, Node.js, MongoDB"
                    className="flex-1 px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTech())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3.5 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {form.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                      >
                        <Code className="h-3 w-3" />
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)} className="hover:text-destructive ml-0.5">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">Links & Classification</h2>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Live Link</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        name="liveLink"
                        value={form.liveLink}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">GitHub Link</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        name="githubLink"
                        value={form.githubLink}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Category</label>
                    <div className="relative">
                      <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none"
                      >
                        {categoriesLoading ? (
                          <option value="">Loading...</option>
                        ) : categories.length === 0 ? (
                          <option value="">No categories available</option>
                        ) : (
                          categories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.featured ? "bg-primary" : "bg-border"}`}>
                        <input
                          type="checkbox"
                          name="featured"
                          checked={form.featured}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${form.featured ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-medium group-hover:text-foreground transition-colors">
                        <Star className={`h-4 w-4 ${form.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                        Featured Project
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                <Save className="h-4 w-4" />
                {loading ? "Creating..." : "Create Project"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-7 py-3 border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
