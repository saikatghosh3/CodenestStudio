"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Plus, Pencil, Trash2, Star, AlertCircle } from "lucide-react";

export default function AdminReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
        setDbError("");
      } else {
        const data = await res.json();
        setDbError(data.error || "Failed to load reviews");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete review");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  function renderStars(rating) {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} />
    ));
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Client Reviews</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage client testimonials and reviews
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/reviews/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New Review
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <p className="text-muted-foreground">
                {dbError
                  ? "Cannot load reviews until database is connected"
                  : "No reviews yet"}
              </p>
              {!dbError && (
                <button
                  onClick={() => router.push("/admin/reviews/create")}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Create your first review
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
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Client</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Company</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Rating</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Review</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Active</th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <motion.tr
                        key={review._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                              {review.name.split(" ")[0][0]}
                            </div>
                            <span className="font-medium text-sm">{review.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">{review.company}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </td>
                        <td className="px-4 py-3 max-w-[280px]">
                          <p className="text-sm text-muted-foreground truncate">
                            &ldquo;{review.text}&rdquo;
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              review.isActive !== false
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {review.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/reviews/edit/${review._id}`)}
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(review._id)}
                              disabled={deleting === review._id}
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
