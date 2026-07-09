"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { FolderOpen, Star, TrendingUp, Plus, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, featured: 0, categories: 0 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          const categories = new Set(data.map((p) => p.category));
          setStats({
            total: data.length,
            featured: data.filter((p) => p.featured).length,
            categories: categories.size,
          });
          setDbError("");
        } else {
          const data = await res.json();
          setDbError(data.error || "Failed to load projects. Check your MongoDB connection.");
        }
      } catch {
        setDbError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of your projects
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
                  Make sure MONGODB_URI is set in your .env file and your MongoDB Atlas cluster is accessible.
                </p>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.featured}</p>
                  <p className="text-sm text-muted-foreground">Featured</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.categories}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 rounded-lg border border-border border-dashed">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {dbError ? "Cannot load projects until database is connected" : "No projects yet"}
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
            <div className="space-y-2">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-10 w-16 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.category}
                        {project.featured ? " - Featured" : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      router.push(`/admin/projects/edit/${project._id}`)
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ))}
              {projects.length > 5 && (
                <button
                  onClick={() => router.push("/admin/projects")}
                  className="w-full py-3 text-sm text-center text-primary hover:underline"
                >
                  View all {projects.length} projects
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
