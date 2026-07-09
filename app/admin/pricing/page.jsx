"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Plus, Pencil, Trash2, Star, AlertCircle, ArrowUpDown } from "lucide-react";

export default function AdminPricing() {
  const router = useRouter();
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetchPricing();
  }, []);

  async function fetchPricing() {
    try {
      const res = await fetch("/api/pricing");
      if (res.ok) {
        const data = await res.json();
        setPricing(data);
        setDbError("");
      } else {
        const data = await res.json();
        setDbError(data.error || "Failed to load pricing");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/pricing/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPricing((prev) => prev.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete pricing");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  async function handleTogglePopular(id, current) {
    try {
      const res = await fetch(`/api/pricing/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ popular: !current }),
      });
      if (res.ok) {
        setPricing((prev) =>
          prev.map((p) => (p._id === id ? { ...p, popular: !current } : p))
        );
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
              <h1 className="text-2xl font-bold">Pricing Plans</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your pricing packages
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/pricing/create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New Plan
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
          ) : pricing.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <p className="text-muted-foreground">
                {dbError
                  ? "Cannot load pricing until database is connected"
                  : "No pricing plans yet"}
              </p>
              {!dbError && (
                <button
                  onClick={() => router.push("/admin/pricing/create")}
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Create your first pricing plan
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
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Order</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Name</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Price</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Features</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Popular</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Active</th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.map((plan) => (
                      <motion.tr
                        key={plan._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">{plan.order}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">{plan.name}</p>
                            {plan.subtitle && (
                              <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold">{plan.price}</span>
                          {plan.period && (
                            <span className="text-xs text-muted-foreground ml-1">/ {plan.period}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {plan.features?.slice(0, 3).map((f) => (
                              <span
                                key={f}
                                className="inline-flex px-2 py-0.5 bg-primary/10 text-primary text-xs rounded"
                              >
                                {f}
                              </span>
                            ))}
                            {plan.features?.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{plan.features.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleTogglePopular(plan._id, plan.popular)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                              plan.popular
                                ? "bg-accent/10 text-accent"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Star className={`h-3 w-3 ${plan.popular ? "fill-current" : ""}`} />
                            {plan.popular ? "Popular" : "Set Popular"}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                              plan.isActive !== false
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {plan.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/pricing/edit/${plan._id}`)}
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(plan._id)}
                              disabled={deleting === plan._id}
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
