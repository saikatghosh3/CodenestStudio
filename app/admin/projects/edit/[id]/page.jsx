"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save, X, Plus, AlertCircle } from "lucide-react";

export default function EditProject() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
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

  useEffect(() => {
    async function fetchProject() {
      try {
        // Fetch all projects and find by ID (since we don't have a direct by-id GET endpoint)
        const res = await fetch("/api/projects");
        if (res.ok) {
          const allProjects = await res.json();
          const found = allProjects.find((p) => p._id === params.id);
          if (found) {
            setForm({
              title: found.title || "",
              slug: found.slug || "",
              description: found.description || "",
              thumbnail: found.thumbnail || "",
              images: found.images || [],
              technologies: found.technologies || [],
              liveLink: found.liveLink || "",
              githubLink: found.githubLink || "",
              category: found.category || "Web App",
              featured: found.featured || false,
            });
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setError("Failed to load project. Check your database connection.");
      } finally {
        setFetching(false);
      }
    }
    if (params.id) fetchProject();
  }, [params.id]);

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
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update project");
        return;
      }

      router.push("/admin/projects");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading project...</p>
          </div>
        </main>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-muted-foreground mb-4">
              This project may have been deleted or the ID is invalid.
            </p>
            <button
              onClick={() => router.push("/admin/projects")}
              className="text-primary hover:underline text-sm"
            >
              Back to Projects
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 sm:p-6 lg:p-8 max-w-3xl"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Edit Project</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Update project details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Thumbnail URL or upload image *
              </label>
              <input
                type="url"
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="mt-2 w-full text-sm text-muted-foreground"
              />
              {form.thumbnail && (
                <div className="mt-2 rounded-lg overflow-hidden bg-muted w-fit">
                  <img
                    src={form.thumbnail}
                    alt="Thumbnail preview"
                    className="h-32 w-48 object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Additional Images
              </label>
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addImage())
                    }
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-3 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full text-sm text-muted-foreground"
                />
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {form.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden bg-muted"
                    >
                      <img src={img} alt="" className="h-20 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Technologies
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. React, Node.js"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="px-3 py-2.5 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {form.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Live Link
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={form.liveLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input accent-primary"
                  />
                  <span className="text-sm font-medium">Featured Project</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
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
