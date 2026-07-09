"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";
import { Plus, Pencil, Trash2, Star, ExternalLink, AlertCircle } from "lucide-react";

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ url: "", title: "" });

  const openDemo = (project) => {
    if (!project.liveLink) return;
    setSelectedProject({ url: project.liveLink, title: project.title });
    setDemoModalOpen(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setDbError("");
      } else {
        const data = await res.json();
        setDbError(data.error || "Failed to load projects");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete project");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  async function handleToggleFeatured(id) {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _toggleFeatured: true }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p._id === id ? updated : p)));
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
              <h1 className="text-2xl font-bold">All Projects</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your portfolio projects
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/projects/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New Project
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
          ) : projects.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <p className="text-muted-foreground">
                {dbError
                  ? "Cannot load projects until database is connected"
                  : "No projects yet"}
              </p>
              {!dbError && (
                <button
                  onClick={() => router.push("/admin/projects/create")}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Create your first project
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
                        Project
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
                    {projects.map((project) => (
                      <motion.tr
                        key={project._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {project.thumbnail && (
                              <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="h-10 w-16 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-sm">{project.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {(project.images || []).slice(0, 3).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt=""
                                className="h-8 w-12 rounded object-cover"
                              />
                            ))}
                            {(project.images || []).length > 3 && (
                              <span className="text-xs text-muted-foreground">+{(project.images || []).length - 3}</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {(project.technologies || []).slice(0, 6).map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                            {(project.technologies || []).length === 0 && (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                            {project.category}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleFeatured(project._id)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                              project.featured
                                ? "bg-accent/10 text-accent"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Star
                              className={`h-3 w-3 ${project.featured ? "fill-current" : ""}`}
                            />
                            {project.featured ? "Featured" : "Set Featured"}
                          </button>
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {project.liveLink && (
                              <button
                                onClick={() => openDemo(project)}
                                className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/projects/edit/${project._id}`
                                )
                              }
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              disabled={deleting === project._id}
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
        url={selectedProject.url}
        title={selectedProject.title}
      />
    </div>
  );
}
