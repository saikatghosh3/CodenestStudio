"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/Sidebar";
import { Mail, Trash2, AlertCircle, Inbox, MailOpen } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [dbError, setDbError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      if (res.ok) {
        setMessages(await res.json());
        setDbError("");
      } else {
        const data = await res.json().catch(() => ({}));
        setDbError(data.error || "Failed to load messages");
      }
    } catch {
      setDbError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete message");
      }
    } catch {
      alert("Network error while deleting");
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Contact Messages</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Messages submitted from the contact form
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground">
              <Inbox className="h-4 w-4" /> {messages.length} total
            </span>
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
          ) : messages.length === 0 ? (
            <div className="text-center py-20 rounded-lg border border-border border-dashed">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {dbError ? "Cannot load messages until database is connected" : "No messages yet"}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-lg border border-border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">From</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Email</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Subject</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Message</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <motion.tr
                        key={msg._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                              {(msg.name || "?").charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-sm">{msg.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-sm text-muted-foreground hover:text-primary hover:underline"
                          >
                            {msg.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-foreground max-w-[160px] truncate inline-block align-middle">
                            {msg.subject || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-[260px]">
                          <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(msg.createdAt)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=${encodeURIComponent(
                                `Re: ${msg.subject || "Your message"}`
                              )}`}
                              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
                              title="Reply"
                            >
                              <MailOpen className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(msg._id)}
                              disabled={deleting === msg._id}
                              className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                              title="Delete"
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
