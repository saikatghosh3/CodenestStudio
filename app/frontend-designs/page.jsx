"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, AlertCircle, ArrowUpRight, Palette } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";

export default function FrontendDesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({ url: "", title: "" });

  useEffect(() => {
    async function fetchDesigns() {
      try {
        const res = await fetch("/api/frontend-designs");
        if (res.ok) {
          const data = await res.json();
          setDesigns(data);
          setDbError("");
        } else {
          const data = await res.json();
          setDbError(data.error || "Failed to load designs");
        }
      } catch {
        setDbError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    }
    fetchDesigns();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="relative min-h-screen pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Palette className="h-4 w-4" />
              Frontend Designs
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
              UI/UX <span className="text-primary">Showcase</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
              A curated collection of our frontend design work — beautiful interfaces, seamless user experiences, and pixel-perfect implementations.
            </p>
          </motion.div>

          {dbError && (
            <div className="mb-12 max-w-2xl mx-auto p-4 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-400">Unable to load designs</p>
                <p className="text-xs text-red-400/80 mt-1">{dbError}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
                  <div className="aspect-[3/2] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded-lg w-3/4" />
                    <div className="h-3 bg-muted rounded-lg w-full" />
                    <div className="h-3 bg-muted rounded-lg w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : designs.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground text-lg font-semibold">No designs found.</p>
              <p className="text-muted-foreground text-sm mt-2">
                {dbError ? "Designs will appear once the database is connected." : "Check back soon for updates!"}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design, idx) => (
                <motion.div
                  key={design._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-400"
                >
                  <a href={`/frontend-designs/${design.slug}`} className="block relative aspect-[3/2] overflow-hidden">
                    {design.thumbnail ? (
                      <img
                        src={design.thumbnail}
                        alt={design.title}
                        width={480}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">No Preview</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {design.featured && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-background/60 backdrop-blur-md border border-border/50 text-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        Featured
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center backdrop-blur-md shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-400 ease-out">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </a>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        {design.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] text-muted-foreground font-medium">2026</span>
                    </div>

                    <a href={`/frontend-designs/${design.slug}`}>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                        {design.title}
                      </h3>
                    </a>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                      {design.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {design.technologies?.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded-md">
                          {tech}
                        </span>
                      ))}
                      {design.technologies?.length > 3 && (
                        <span className="px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded-md">
                          +{design.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      {design.liveLink && (
                        <button
                          onClick={() => {
                            setSelectedDesign({ url: design.liveLink, title: design.title });
                            setDemoModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </button>
                      )}
                      {design.githubLink && (
                        <a
                          href={design.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-3.5 w-3.5" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ProjectDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        url={selectedDesign.url}
        title={selectedDesign.title}
      />
    </main>
  );
}
