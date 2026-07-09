"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save, AlertCircle, Star } from "lucide-react";

export default function EditReview() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    rating: 5,
    text: "",
    isActive: true,
  });

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const allReviews = await res.json();
          const found = allReviews.find((r) => r._id === params.id);
          if (found) {
            setForm({
              name: found.name || "",
              company: found.company || "",
              rating: found.rating || 5,
              text: found.text || "",
              isActive: found.isActive !== false,
            });
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setError("Failed to load review. Check your database connection.");
      } finally {
        setFetching(false);
      }
    }
    if (params.id) fetchReview();
  }, [params.id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function setRating(val) {
    setForm((prev) => ({ ...prev, rating: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/reviews/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update review");
        return;
      }

      router.push("/admin/reviews");
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
            <p className="text-sm text-muted-foreground">Loading review...</p>
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
            <h1 className="text-2xl font-bold mb-2">Review Not Found</h1>
            <p className="text-muted-foreground mb-4">
              This review may have been deleted or the ID is invalid.
            </p>
            <button
              onClick={() => router.push("/admin/reviews")}
              className="text-primary hover:underline text-sm"
            >
              Back to Reviews
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
            <h1 className="text-2xl font-bold">Edit Review</h1>
            <p className="text-sm text-muted-foreground mt-1">Update client testimonial details</p>
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
                <label className="block text-sm font-medium mb-1.5">Client Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        val <= form.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {form.rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Review Text *</label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
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
