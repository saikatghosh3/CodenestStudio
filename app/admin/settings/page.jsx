"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Save, Plus, Trash2, Loader2, Globe, Image, FileText, Mail, Phone, MapPin, MessageSquare, Link as LinkIcon, Copyright, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    siteName: "",
    brandName: "",
    logo: "",
    metaTitle: "",
    metaDescription: "",
    footerDescription: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    address: "",
    copyright: "",
    socialLinks: [],
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setForm({
            siteName: data.siteName || "",
            brandName: data.brandName || "",
            logo: data.logo || "",
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            footerDescription: data.footerDescription || "",
            email: data.email || "",
            phone: data.phone || "",
            whatsappNumber: data.whatsappNumber || "",
            address: data.address || "",
            copyright: data.copyright || "",
            socialLinks: data.socialLinks?.length
              ? data.socialLinks
              : [{ platform: "", url: "" }],
          });
        } else {
          if (res.status === 401) router.push("/admin/login");
        }
      } catch {
        setMessage({ type: "error", text: "Failed to load settings" });
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSocialChange(index, field, value) {
    const updated = [...form.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, socialLinks: updated }));
  }

  function addSocialLink() {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));
  }

  function removeSocialLink(index) {
    const updated = form.socialLinks.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, socialLinks: updated }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          socialLinks: form.socialLinks.filter((s) => s.platform || s.url),
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully." });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else if (res.status === 401) {
        router.push("/admin/login");
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save settings" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-background flex items-center justify-center pt-14 lg:pt-0">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  const sections = [
    {
      id: "identity",
      title: "Site Identity",
      icon: Globe,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Site Name" name="siteName" value={form.siteName} onChange={handleChange} placeholder="CodeNestStudio" />
          <Field label="Brand Name" name="brandName" value={form.brandName} onChange={handleChange} placeholder="CodeNestStudio" />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Logo Image URL
              <span className="text-muted-foreground font-normal ml-1">(leave empty for text logo)</span>
            </label>
            <input
              type="text"
              name="logo"
              value={form.logo}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              placeholder="https://example.com/logo.png"
            />
            {form.logo && (
              <div className="mt-3 inline-flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border">
                <img
                  src={form.logo}
                  alt="Logo preview"
                  className="h-10 w-10 object-contain rounded-lg border border-border"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="text-left">
                  <p className="text-xs font-medium text-foreground">Preview</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">{form.logo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "seo",
      title: "SEO & Metadata",
      icon: FileText,
      fields: (
        <div className="space-y-5">
          <Field label="Meta Title" name="metaTitle" value={form.metaTitle} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Meta Description</label>
            <textarea
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: Mail,
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" icon={Mail} />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} icon={Phone} />
          <Field label="WhatsApp Number" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} icon={MessageSquare} placeholder="8801758197272" />
          <Field label="Address" name="address" value={form.address} onChange={handleChange} icon={MapPin} />
        </div>
      ),
    },
    {
      id: "footer",
      title: "Footer",
      icon: Copyright,
      fields: (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Footer Description</label>
            <textarea
              name="footerDescription"
              value={form.footerDescription}
              onChange={handleChange}
              rows={3}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>
          <Field label="Copyright Text" name="copyright" value={form.copyright} onChange={handleChange} placeholder="CodeNestStudio. All rights reserved." />
        </div>
      ),
    },
    {
      id: "social",
      title: "Social Links",
      icon: LinkIcon,
      fields: (
        <div className="space-y-3">
          {form.socialLinks.map((link, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 bg-background rounded-xl border border-border">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                className="flex-1 bg-transparent border border-border rounded-lg px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Platform (e.g. Github)"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                className="flex-[2] bg-transparent border border-border rounded-lg px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="https://github.com/yourhandle"
              />
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="shrink-0 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors self-end sm:self-center"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSocialLink}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Social Link
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background min-h-screen pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Site Settings</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your website name, logo, contact info, and footer content.
              </p>
            </div>
          </div>

          {/* Toast message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-foreground">{section.title}</h2>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    {section.fields}
                  </div>
                </div>
              );
            })}

            {/* Save */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 pb-8">
              <p className="text-xs text-muted-foreground">
                Changes are applied immediately to the live site.
              </p>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder, icon: Icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 inline mr-1.5 text-muted-foreground" />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}
