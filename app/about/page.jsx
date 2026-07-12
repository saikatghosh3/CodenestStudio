"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import {
  ArrowLeft, Building2, Users, Monitor, Server, Shield, Cloud,
  Eye, Target, Heart, Lightbulb, Code2, Globe, Loader2
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
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card mb-4 sm:mb-6 backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">Who We Are</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4 sm:mb-6">
              {companyInfo?.title || "About Us"}
            </h1>
            {companyInfo?.description && (
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {companyInfo.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      {(companyInfo?.vision || companyInfo?.mission || companyInfo?.values) && (
        <section className="py-12 sm:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {companyInfo?.vision && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                  className="bg-card border border-border rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{companyInfo.vision}</p>
                </motion.div>
              )}
              {companyInfo?.mission && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card border border-border rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-purple-500/30 transition-all group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-500/20 transition-colors">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-purple-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{companyInfo.mission}</p>
                </motion.div>
              )}
              {companyInfo?.values && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card border border-border rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-emerald-500/30 transition-all group sm:col-span-2 lg:col-span-1"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Our Values</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{companyInfo.values}</p>
                </motion.div>
              )}
            </div>
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
      {TEAM_SECTIONS.map(({ key, icon: Icon, gradient, border, iconBg, iconColor }) => {
        const team = data[key];
        if (!team) return null;

        return (
        <section key={key} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center mb-10 sm:mb-14"
    >
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card backdrop-blur-sm mb-4 sm:mb-6">
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${iconColor}`} />
        <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {team.title || key}
        </span>
      </div>

      {team.description && (
        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          {team.description}
        </p>
      )}
    </motion.div>

    {/* Technology Stack */}
    {team.technologyStack?.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 max-w-4xl mx-auto"
      >
        {team.technologyStack.map((tech, idx) => (
          <span
            key={idx}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border ${border} bg-gradient-to-r ${gradient} backdrop-blur-sm whitespace-nowrap`}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    )}

    {/* Team Members */}
    {team.members?.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {team.members.map((member, idx) => (
          <motion.div
            key={member._id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex flex-col items-center justify-start bg-card border border-border rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:border-primary/30 transition-all group h-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 overflow-hidden border-2 border-border group-hover:border-primary/30 transition-colors shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-base sm:text-lg lg:text-xl font-bold text-primary">
                  {member.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <h4 className="text-xs sm:text-sm lg:text-base font-bold text-foreground leading-snug line-clamp-2">
              {member.name}
            </h4>
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
