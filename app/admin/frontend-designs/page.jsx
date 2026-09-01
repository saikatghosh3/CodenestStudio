"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";
import { Plus, Pencil, Trash2, Star, ExternalLink, AlertCircle, Palette } from "lucide-react";

export default function AdminFrontendDesigns() {
  const router = useRouter();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({ url: "", title: "" });

  const openDemo = (design) => {
    if (!design.liveLink) return;
    setSelectedDesign({ url: design.liveLink, title: design.title });
    setDemoModalOpen(true);
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  async function fetchDesigns() {
    try {
      const res = await fetch("/api/frontend-designs");
      if (res.ok) {
        const data = await res.json();
        setDesigns(data);
        setDbError("");
      } else {
        const data = await res.json();
        setDbError(data.error || "Failed to load frontend designs");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this frontend design?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/frontend-designs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDesigns((prev) => prev.filter((d) => d._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete frontend design");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  async function handleToggleFeatured(id) {
    try {
      const res = await fetch(`/api/frontend-designs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _toggleFeatured: true }),
      });
      if (res.ok) {
        const updated = await res.json();
        setDesigns((prev) => prev.map((d) => (d._id === id ? updated : d)));
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                Frontend Designs
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your frontend design showcase
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/frontend-designs/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New Design
            </button>
          </div>

          {dbError && (
            <div className="mb-6 p-4 rounded-lg border border-destructive/30 bg-destructive/5 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Database Connection Error
                </p>
                <p className="text-sm text-muted-foreground mt-1">{dbError}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Make sure MONGODB_URI is set in your .env file.
                </p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : designs.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {dbError
                  ? "Cannot load designs until database is connected"
                  : "No frontend designs yet"}
              </p>
              {!dbError && (
                <button
                  onClick={() => router.push("/admin/frontend-designs/create")}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Create your first design
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
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Design
                      </th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Images
                      </th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Technologies
                      </th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Category
                      </th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Featured
                      </th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                        Date
                      </th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {designs.map((design) => (
                      <motion.tr
                        key={design._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {design.thumbnail && (
                              <img
                                src={design.thumbnail}
                                alt={design.title}
                                className="h-10 w-16 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-sm">{design.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                                {design.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {(design.images || []).slice(0, 3).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt=""
                                className="h-8 w-12 rounded object-cover"
                              />
                            ))}
                            {(design.images || []).length > 3 && (
                              <span className="text-xs text-muted-foreground">+{(design.images || []).length - 3}</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {(design.technologies || []).slice(0, 6).map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                            {(design.technologies || []).length === 0 && (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                            {design.category}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleFeatured(design._id)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                              design.featured
                                ? "bg-accent/10 text-accent"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Star
                              className={`h-3 w-3 ${design.featured ? "fill-current" : ""}`}
                            />
                            {design.featured ? "Featured" : "Set Featured"}
                          </button>
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground">
                            {new Date(design.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {design.liveLink && (
                              <button
                                onClick={() => openDemo(design)}
                                className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/frontend-designs/edit/${design._id}`
                                )
                              }
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(design._id)}
                              disabled={deleting === design._id}
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
      <ProjectDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        url={selectedDesign.url}
        title={selectedDesign.title}
      />
    </div>
  );
}
