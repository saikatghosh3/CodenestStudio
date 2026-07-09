"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save, AlertCircle, HelpCircle, Image } from "lucide-react";

export default function CreateVideo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    fallbackImage: "",
    isActive: true,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/video-showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create video");
        return;
      }

      router.push("/admin/video-showcase");
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
          className="p-4 sm:p-6 lg:p-8 max-w-3xl"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Add Showcase Video</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new video to the homepage showcase section
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Project Showreel 2025"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Video URL *
                <span className="ml-1.5 inline-flex align-middle">
                  <span className="group relative">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 rounded-lg bg-card border border-border text-xs text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      Paste a Google Drive embed URL or any iframe-compatible video URL.
                    </span>
                  </span>
                </span>
              </label>
              <input
                type="url"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                required
                placeholder="https://drive.google.com/file/d/.../preview"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Fallback Image URL
                <span className="ml-1.5 inline-flex align-middle">
                  <span className="group relative">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 rounded-lg bg-card border border-border text-xs text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      Optional. A still image shown as thumbnail before play, or if the video fails to load.
                    </span>
                  </span>
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="fallbackImage"
                  value={form.fallbackImage}
                  onChange={handleChange}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {form.fallbackImage && (
                <div className="mt-3 relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={form.fallbackImage}
                    alt="Fallback preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-muted text-muted-foreground text-xs">
                    <Image className="h-5 w-5 mr-1.5" /> Invalid image
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {loading ? "Adding..." : "Add Video"}
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
