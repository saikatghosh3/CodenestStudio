"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import {
  ArrowLeft, Building2, Users, Monitor, Server, Shield, Cloud,
  Eye, Target, Heart, Lightbulb, Code2, Globe, Loader2,
  Sparkles
} from "lucide-react";

const TEAM_SECTIONS = [
  { key: "frontendTeam", icon: Monitor, gradient: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20", iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
  { key: "backendTeam", icon: Server, gradient: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500" },
  { key: "qaTeam", icon: Shield, gradient: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20", iconBg: "bg-purple-500/10", iconColor: "text-purple-500" },
  { key: "devopsTeam", icon: Cloud, gradient: "from-orange-500/10 to-amber-500/10", border: "border-orange-500/20", iconBg: "bg-orange-500/10", iconColor: "text-orange-500" },
];

const LEADER_THEMES = [
  { gradient: "from-blue-500 via-cyan-400 to-blue-500", text: "text-blue-500", badge: "bg-blue-500/10 text-blue-500 border border-blue-500/20" },
  { gradient: "from-purple-500 via-pink-400 to-purple-500", text: "text-purple-500", badge: "bg-purple-500/10 text-purple-500 border border-purple-500/20" },
  { gradient: "from-emerald-500 via-teal-400 to-emerald-500", text: "text-emerald-500", badge: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" },
  { gradient: "from-orange-500 via-amber-400 to-orange-500", text: "text-orange-500", badge: "bg-orange-500/10 text-orange-500 border border-orange-500/20" },
  { gradient: "from-rose-500 via-pink-400 to-rose-500", text: "text-rose-500", badge: "bg-rose-500/10 text-rose-500 border border-rose-500/20" },
  { gradient: "from-primary via-blue-400 to-primary", text: "text-primary", badge: "bg-primary/10 text-primary border border-primary/20" },
];

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/about-us", { cache: "no-store" }).then((r) => r.ok ? r.json() : null),
      fetch("/api/settings", { cache: "no-store" }).then((r) => r.ok ? r.json() : null),
    ])
      .then(([aboutData, settingsData]) => {
        if (aboutData) setData(aboutData);
        if (settingsData) setSettings(settingsData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar initialSettings={settings} />
        <div className="flex items-center justify-center pt-32 pb-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer initialSettings={settings} />
      </div>
    );
  }

  if (!data || !data.published) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar initialSettings={settings} />
        <div className="flex items-center justify-center pt-32 pb-40 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Available</h1>
            <p className="text-muted-foreground mb-6">This page is currently unavailable.</p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
        <Footer initialSettings={settings} />
      </div>
    );
  }

  const { companyInfo, leadership, frontendTeam, backendTeam, qaTeam, devopsTeam } = data;

  return (
    <div className="min-h-screen bg-background">
      <Navbar initialSettings={settings} />

      {/* Hero Section */}
      <section className="pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-40 lg:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.06] [mask-image:linear-gradient(180deg,black,transparent)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card mb-5 sm:mb-7 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">Who We Are</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-5 sm:mb-7 text-balance"
            >
              About{"\u00A0"}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
                {companyInfo?.title?.replace(/^About\s+/i, "") || "CodeNestStudio"}
              </span>
            </motion.h1>

            {companyInfo?.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                {companyInfo.description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4 text-center"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Client Focus</p>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">End-to-End</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Development</p>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Scalable</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Web Solutions</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      {(companyInfo?.vision || companyInfo?.mission || companyInfo?.values) && (
        <section className="py-12 sm:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                What Drives Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Purpose & Principles
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {companyInfo?.mission && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/40"
                >
                  <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center gap-4 mb-5 sm:mb-7">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Target className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-500">Mission</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">Why We Exist</h3>
                    </div>
                  </div>
                  <p className="relative z-10 text-sm sm:text-base text-muted-foreground leading-relaxed border-l-2 border-purple-500/40 pl-4 sm:pl-5">
                    {companyInfo.mission}
                  </p>
                </motion.div>
              )}

              {companyInfo?.vision && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/40"
                >
                  <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center gap-4 mb-5 sm:mb-7">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Eye className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-500">Vision</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">Where We&apos;re Going</h3>
                    </div>
                  </div>
                  <p className="relative z-10 text-sm sm:text-base text-muted-foreground leading-relaxed border-l-2 border-blue-500/40 pl-4 sm:pl-5">
                    {companyInfo.vision}
                  </p>
                </motion.div>
              )}
            </div>

            {companyInfo?.values && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-5 sm:mt-6 lg:mt-8 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-emerald-500/5 via-card to-teal-500/5 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40"
              >
                <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-500">Values</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">What Guides Us</h3>
                    </div>
                  </div>
                  <p className="flex-1 text-sm sm:text-base text-muted-foreground leading-relaxed sm:border-l-2 sm:border-emerald-500/30 sm:pl-8">
                    {companyInfo.values}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Leadership Section */}
      {leadership?.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <div className="relative inline-block overflow-hidden rounded-full p-[1px] mb-4 sm:mb-6 group cursor-default">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-background dark:bg-background rounded-full transition-colors">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest">Leadership</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
                Meet Our <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Leaders</span>
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                The visionaries driving innovation and excellence at CodeNestStudio.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {leadership.map((leader, idx) => {
                const theme = LEADER_THEMES[idx % LEADER_THEMES.length];
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={leader._id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative overflow-hidden rounded-3xl p-[1px] group max-w-4xl mx-auto"
                  >
                    <span className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-3xl animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative bg-background rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10">
                      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-4 sm:gap-6 lg:gap-10`}>
                        {/* Image */}
                        <div className="shrink-0">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden border-2 border-border">
                            {leader.image ? (
                              <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${theme.text}`}>
                                {leader.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`flex-1 min-w-0 ${isEven ? "text-center md:text-left" : "text-center md:text-right"}`}>
                          <div className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 ${theme.badge}`}>
                            {leader.designation}
                          </div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">{leader.name}</h3>
                          {leader.description && (
                            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed">{leader.description}</p>
                          )}
                          <div className={`mt-4 sm:mt-5 h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r ${theme.gradient} ${isEven ? "" : "ml-auto"}`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Sections */}
      {TEAM_SECTIONS.map(({ key, icon: Icon, gradient, border, iconBg, iconColor }, sectionIdx) => {
        const team = data[key];
        if (!team) return null;
        const reversed = sectionIdx % 2 === 1;
        const memberCount = team.members?.length || 0;
        const teamLabel =
          ({ frontendTeam: "Frontend", backendTeam: "Backend", qaTeam: "QA", devopsTeam: "DevOps" })[key] ||
          team.title?.split(" ")[0] ||
          "Team";

        return (
          <section
            key={key}
            className={`relative overflow-hidden py-12 sm:py-16 lg:py-20 ${reversed ? "bg-secondary/40" : ""}`}
          >
            {/* corner glow */}
            <div
              className={`pointer-events-none absolute top-0 ${reversed ? "right-0" : "left-0"} w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br ${gradient} blur-[100px] rounded-full opacity-30 dark:opacity-20`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              {/* Header :: icon tile + title | member count | description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 sm:mb-12"
              >
                <div className={`flex items-start lg:items-end justify-between gap-4 sm:gap-6 ${reversed ? "lg:flex-row-reverse" : ""}`}>
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span
                      className={`w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-2xl border ${border} ${iconBg} flex items-center justify-center shadow-sm`}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Our Experts
                      </span>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight truncate">
                        {team.title || key}
                      </h2>
                    </div>
                  </div>

                  {memberCount > 0 && (
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 -mt-0.5">
                      <span className={`text-2xl sm:text-3xl font-bold leading-none ${iconColor}`}>
                        {String(memberCount).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium leading-tight whitespace-nowrap">
                        <span className="block">Specialists</span>
                        <span className="hidden sm:block">on the {teamLabel} team</span>
                      </span>
                    </div>
                  )}
                </div>

                {team.description && (
                  <p className={`mt-4 sm:mt-5 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed ${reversed ? "lg:text-right lg:max-w-2xl lg:ml-auto" : "max-w-2xl"}`}>
                    {team.description}
                  </p>
                )}
              </motion.div>

              {/* Capabilities :: tech stack bar */}
              {team.technologyStack?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-12"
                >
                  <span className="mr-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Capabilities
                  </span>
                  {team.technologyStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium rounded-lg border ${border} backdrop-blur-sm whitespace-nowrap transition-colors duration-200 hover:-translate-y-0.5`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                      {tech}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Team Members */}
              {memberCount > 0 && (
                <div className="grid grid-cols-2 min-[480px]:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                  {team.members.map((member, idx) => (
                    <motion.div
                      key={member._id || idx}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
                      className="group relative flex flex-col items-center text-center rounded-2xl sm:rounded-3xl bg-card border border-border px-2 py-6 sm:p-5 sm:py-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5 overflow-hidden"
                    >
                      {/* accents */}
                      <span className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                      <span className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-25`} />
                      <span className="absolute top-3 right-3.5 text-[10px] font-semibold text-muted-foreground/30 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* avatar with hover orbit */}
                      <div className="relative mb-3 sm:mb-4">
                        <span className={`absolute -inset-1.5 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500`} />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border group-hover:border-primary/40 transition-colors duration-300 shrink-0">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <span className={`text-base sm:text-lg lg:text-xl font-bold ${iconColor}`}>
                              {member.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm lg:text-base font-bold text-foreground leading-snug line-clamp-2">
                        {member.name}
                      </h4>
                      <span className="mt-1 text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-wider max-w-full truncate">
                        {teamLabel} Member
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-card to-purple-500/10 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">Ready to Work With Us?</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-5 sm:mb-6 px-2">Let us help you build something extraordinary. Get in touch and let us bring your vision to life.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Code2 className="h-4 w-4" /> Start a Project
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer initialSettings={settings} />
    </div>
  );
}
