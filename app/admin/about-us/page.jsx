"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import {
  Save, Plus, Trash2, Loader2, AlertCircle, CheckCircle2,
  Building2, Users, Monitor, Server, Shield, Cloud,
  Image, ChevronDown, ChevronUp, Eye, EyeOff, X
} from "lucide-react";

const SECTION_ICONS = {
  companyInfo: Building2,
  leadership: Users,
  frontendTeam: Monitor,
  backendTeam: Server,
  qaTeam: Shield,
  devopsTeam: Cloud,
};

const SECTION_LABELS = {
  companyInfo: "Company Information",
  leadership: "Leadership",
  frontendTeam: "Frontend Team",
  backendTeam: "Backend Team",
  qaTeam: "QA Team",
  devopsTeam: "DevOps Team",
};

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminAboutUs() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [expandedSections, setExpandedSections] = useState({});
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/about-us");
        if (res.ok) {
          const data = await res.json();
          setForm({
            published: data.published ?? true,
            companyInfo: data.companyInfo || { title: "", description: "", vision: "", mission: "", values: "" },
            leadership: data.leadership?.length ? data.leadership : [],
            frontendTeam: data.frontendTeam || { title: "", description: "", technologyStack: [], members: [] },
            backendTeam: data.backendTeam || { title: "", description: "", technologyStack: [], members: [] },
            qaTeam: data.qaTeam || { title: "", description: "", technologyStack: [], members: [] },
            devopsTeam: data.devopsTeam || { title: "", description: "", technologyStack: [], members: [] },
          });
          const allExpanded = {};
          Object.keys(SECTION_LABELS).forEach((k) => (allExpanded[k] = true));
          setExpandedSections(allExpanded);
        } else if (res.status === 401) {
          router.push("/admin/login");
        }
      } catch {
        setMessage({ type: "error", text: "Failed to load about us data" });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  function toggleSection(key) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function updateCompanyInfo(field, value) {
    setForm((prev) => ({ ...prev, companyInfo: { ...prev.companyInfo, [field]: value } }));
  }

  function updateLeader(index, field, value) {
    setForm((prev) => {
      const updated = [...prev.leadership];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, leadership: updated };
    });
  }

  async function handleLeaderImageUpload(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    updateLeader(index, "image", dataUrl);
  }

  function addLeader() {
    setForm((prev) => ({
      ...prev,
      leadership: [...prev.leadership, { name: "", designation: "", description: "", image: "", order: prev.leadership.length + 1 }],
    }));
  }

  function removeLeader(index) {
    setForm((prev) => ({ ...prev, leadership: prev.leadership.filter((_, i) => i !== index) }));
  }

  function updateTeamSection(teamKey, field, value) {
    setForm((prev) => ({ ...prev, [teamKey]: { ...prev[teamKey], [field]: value } }));
  }

  function addTeamMember(teamKey) {
    setForm((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        members: [...(prev[teamKey].members || []), { name: "", image: "", order: (prev[teamKey].members?.length || 0) + 1 }],
      },
    }));
  }

  function removeTeamMember(teamKey, index) {
    setForm((prev) => ({
      ...prev,
      [teamKey]: { ...prev[teamKey], members: prev[teamKey].members.filter((_, i) => i !== index) },
    }));
  }

  function updateTeamMember(teamKey, index, field, value) {
    setForm((prev) => {
      const members = [...prev[teamKey].members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, [teamKey]: { ...prev[teamKey], members } };
    });
  }

  async function handleTeamMemberImageUpload(teamKey, index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    updateTeamMember(teamKey, index, "image", dataUrl);
  }

  function addTechStackItem(teamKey) {
    setForm((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        technologyStack: [...(prev[teamKey].technologyStack || []), ""],
      },
    }));
  }

  function removeTechStackItem(teamKey, index) {
    setForm((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        technologyStack: prev[teamKey].technologyStack.filter((_, i) => i !== index),
      },
    }));
  }

  function updateTechStackItem(teamKey, index, value) {
    setForm((prev) => {
      const stack = [...prev[teamKey].technologyStack];
      stack[index] = value;
      return { ...prev, [teamKey]: { ...prev[teamKey], technologyStack: stack } };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        ...form,
        leadership: form.leadership.filter((l) => l.name || l.designation),
      };
      const res = await fetch("/api/about-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "About Us page saved successfully." });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else if (res.status === 401) {
        router.push("/admin/login");
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save" });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-background flex items-center justify-center pt-14 lg:pt-0">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background min-h-screen pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">About Us Management</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage all sections of the About Us page.</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                form.published
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {form.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {form.published ? "Published" : "Unpublished"}
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
              }`}
            >
              {message.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Info */}
            <SectionCard
              label={SECTION_LABELS.companyInfo}
              icon={SECTION_ICONS.companyInfo}
              expanded={expandedSections.companyInfo}
              onToggle={() => toggleSection("companyInfo")}
            >
              <div className="space-y-5">
                <Field label="Title" value={form.companyInfo.title} onChange={(v) => updateCompanyInfo("title", v)} placeholder="About CodeNestStudio" />
                <TextArea label="Description" value={form.companyInfo.description} onChange={(v) => updateCompanyInfo("description", v)} placeholder="Company description..." />
                <TextArea label="Vision" value={form.companyInfo.vision} onChange={(v) => updateCompanyInfo("vision", v)} placeholder="Company vision..." />
                <TextArea label="Mission" value={form.companyInfo.mission} onChange={(v) => updateCompanyInfo("mission", v)} placeholder="Company mission..." />
                <TextArea label="Values" value={form.companyInfo.values} onChange={(v) => updateCompanyInfo("values", v)} placeholder="Company values..." />
              </div>
            </SectionCard>

            {/* Leadership */}
            <SectionCard
              label={SECTION_LABELS.leadership}
              icon={SECTION_ICONS.leadership}
              expanded={expandedSections.leadership}
              onToggle={() => toggleSection("leadership")}
            >
              <div className="space-y-4">
                {form.leadership.map((leader, idx) => (
                  <div key={idx} className="p-4 bg-background rounded-xl border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Leader {idx + 1}</span>
                      <button type="button" onClick={() => removeLeader(idx)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Name" value={leader.name} onChange={(v) => updateLeader(idx, "name", v)} placeholder="Full name" />
                      <Field label="Designation" value={leader.designation} onChange={(v) => updateLeader(idx, "designation", v)} placeholder="CEO, CTO, etc." />
                    </div>
                    <TextArea label="Description" value={leader.description} onChange={(v) => updateLeader(idx, "description", v)} placeholder="Short bio..." />

                    {/* Leader Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        <Image className="h-3.5 w-3.5 inline mr-1.5 text-muted-foreground" />
                        Profile Image
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="url"
                          value={leader.image?.startsWith("data:") ? "" : leader.image || ""}
                          onChange={(e) => updateLeader(idx, "image", e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          placeholder="https://example.com/photo.jpg"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleLeaderImageUpload(idx, e)}
                          className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 transition-colors"
                        />
                      </div>
                      {leader.image && (
                        <div className="mt-3 relative inline-block">
                          <img
                            src={leader.image}
                            alt="Preview"
                            className="h-20 w-20 rounded-xl object-cover border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => updateLeader(idx, "image", "")}
                            className="absolute -top-1.5 -right-1.5 p-1 bg-destructive text-destructive-foreground rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addLeader} className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  <Plus className="h-4 w-4" /> Add Leader
                </button>
              </div>
            </SectionCard>

            {/* Team Sections */}
            {["frontendTeam", "backendTeam", "qaTeam", "devopsTeam"].map((teamKey) => (
              <SectionCard
                key={teamKey}
                label={SECTION_LABELS[teamKey]}
                icon={SECTION_ICONS[teamKey]}
                expanded={expandedSections[teamKey]}
                onToggle={() => toggleSection(teamKey)}
              >
                <div className="space-y-5">
                  <Field label="Section Title" value={form[teamKey].title} onChange={(v) => updateTeamSection(teamKey, "title", v)} placeholder="Team name" />
                  <TextArea label="Description" value={form[teamKey].description} onChange={(v) => updateTeamSection(teamKey, "description", v)} placeholder="Team description..." />

                  {/* Technology Stack */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Technology Stack</label>
                    <div className="space-y-2">
                      {(form[teamKey].technologyStack || []).map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => updateTechStackItem(teamKey, idx, e.target.value)}
                            className="flex-1 bg-background border border-border rounded-lg px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            placeholder="Technology name"
                          />
                          <button type="button" onClick={() => removeTechStackItem(teamKey, idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addTechStackItem(teamKey)} className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                        <Plus className="h-3.5 w-3.5" /> Add Technology
                      </button>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Team Members</label>
                    <div className="space-y-4">
                      {(form[teamKey].members || []).map((member, idx) => (
                        <div key={idx} className="p-3 bg-background rounded-xl border border-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Member {idx + 1}</span>
                            <button type="button" onClick={() => removeTeamMember(teamKey, idx)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateTeamMember(teamKey, idx, "name", e.target.value)}
                              className="flex-1 bg-transparent border border-border rounded-lg px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                              placeholder="Member name"
                            />
                            <input
                              type="url"
                              value={member.image?.startsWith("data:") ? "" : member.image || ""}
                              onChange={(e) => updateTeamMember(teamKey, idx, "image", e.target.value)}
                              className="flex-1 bg-transparent border border-border rounded-lg px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                              placeholder="Image URL"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleTeamMemberImageUpload(teamKey, idx, e)}
                              className="flex-1 text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 transition-colors"
                            />
                            {member.image && (
                              <div className="relative shrink-0">
                                <img src={member.image} alt="Preview" className="h-10 w-10 rounded-lg object-cover border border-border" />
                                <button
                                  type="button"
                                  onClick={() => updateTeamMember(teamKey, idx, "image", "")}
                                  className="absolute -top-1 -right-1 p-0.5 bg-destructive text-destructive-foreground rounded-full"
                                >
                                  <X className="h-2.5 w-2.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={() => addTeamMember(teamKey)} className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                        <Plus className="h-4 w-4" /> Add Member
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            ))}

            {/* Save */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 pb-8">
              <p className="text-xs text-muted-foreground">Changes are applied immediately to the live site.</p>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving..." : "Save About Us"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function SectionCard({ label, icon: Icon, expanded, onToggle, children }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-foreground">{label}</h2>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>
      {expanded && <div className="p-5 sm:p-6">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, icon: Icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 inline mr-1.5 text-muted-foreground" />}
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}
