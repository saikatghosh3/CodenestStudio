"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Plus, Pencil, Trash2, AlertCircle, Play, ImageOff } from "lucide-react";

export default function AdminVideoShowcase() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const res = await fetch("/api/video-showcase");
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
        setDbError("");
      } else {
        const data = await res.json();
        setDbError(data.error || "Failed to load videos");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this video?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/video-showcase/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete video");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Video Showcase</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage showcase videos displayed on the homepage
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/video-showcase/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Video
            </button>
          </div>

          {dbError && (
            <div className="mb-6 p-4 rounded-lg border border-destructive/30 bg-destructive/5 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Database Connection Error</p>
                <p className="text-sm text-muted-foreground mt-1">{dbError}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Make sure MONGODB_URI is set in your .env file.
                </p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <p className="text-muted-foreground">
                {dbError
                  ? "Cannot load videos until database is connected"
                  : "No videos yet"}
              </p>
              {!dbError && (
                <button
                  onClick={() => router.push("/admin/video-showcase/create")}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Add your first showcase video
                </button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-lg border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Preview</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Title</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Video URL</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Fallback Image</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Active</th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map((video) => (
                      <motion.tr
                        key={video._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="w-14 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                            {video.fallbackImage ? (
                              <img
                                src={video.fallbackImage}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div className={`w-full h-full items-center justify-center ${video.fallbackImage ? "hidden" : "flex"}`}>
                              <Play className="h-4 w-4 text-muted-foreground/60" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-sm">{video.title}</span>
                        </td>
                        <td className="px-4 py-3 max-w-[200px]">
                          <span className="text-xs text-muted-foreground truncate block">{video.videoUrl}</span>
                        </td>
                        <td className="px-4 py-3">
                          {video.fallbackImage ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                              <ImageOff className="h-3 w-3" /> Has Image
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              video.isActive !== false
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {video.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/video-showcase/edit/${video._id}`)}
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(video._id)}
                              disabled={deleting === video._id}
                              className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
