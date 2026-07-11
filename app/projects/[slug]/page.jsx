"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Star, Calendar, Tag, ChevronRight, Code2 } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/by-slug/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          const normalized = { ...data };
          if (typeof normalized.technologies === "string") {
            normalized.technologies = normalized.technologies
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
          if (!Array.isArray(normalized.technologies)) {
            normalized.technologies = normalized.technologies || [];
          }
          if (typeof normalized.images === "string") {
            normalized.images = normalized.images
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
          if (!Array.isArray(normalized.images)) {
            normalized.images = normalized.images || [];
          }

          if (!cancelled) setProject(normalized);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (params.slug) fetchProject();
    return () => { cancelled = true; };
  }, [params.slug]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen pt-24 sm:pt-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="mb-8 h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="aspect-[21/9] max-h-[500px] bg-muted rounded-2xl sm:rounded-3xl mb-10 sm:mb-14 animate-pulse" />
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                  <div className="h-6 w-28 bg-muted rounded-full animate-pulse" />
                </div>
                <div className="h-12 w-3/4 bg-muted rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-muted rounded-2xl animate-pulse" />
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <a href="/#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </a>
          </div>
        </div>
      </main>
    );
  }

  const allImages = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <main>
      <Navbar />
      <div className="relative min-h-screen pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </a>
          </motion.div>

          {project.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-14 bg-card border border-border shadow-xl"
            >
              <div className="aspect-[21/9] max-h-[500px]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  width={1200}
                  height={514}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 bg-background/60 backdrop-blur-md border border-border/50 text-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  Featured
                </div>
              )}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                    <Tag className="h-3 w-3" />
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                  {project.title}
                </h1>

                <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </motion.div>

              {allImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full" />
                    Project Gallery
                  </h2>

                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-card border border-border">
                    <div className="aspect-video">
                      <img
                        src={allImages[activeImage]}
                        alt={`${project.title} screenshot ${activeImage + 1}`}
                        width={960}
                        height={540}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          i === activeImage
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16">
                          <img
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            width={96}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-32 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Actions</h3>
                  <div className="space-y-3">
                    {project.liveLink && (
                      <button
                        onClick={() => setDemoModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                      >
                        <ExternalLink className="h-4 w-4" /> View Live Demo
                      </button>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-xl font-semibold text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <Github className="h-4 w-4" /> View Source Code
                      </a>
                    )}
                    <a
                      href={`https://wa.me/8801758197272?text=${encodeURIComponent(`Hello, I'm interested in a project similar to ${project.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl font-semibold text-sm hover:bg-emerald-500/20 transition-colors"
                    >
                      Inquire About This Project
                    </a>
                  </div>
                </div>

                {project.technologies?.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-lg border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Project Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="text-foreground font-medium">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {project.featured ? "Featured" : "Completed"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Published</span>
                      <span className="text-foreground font-medium">
                        {new Date(project.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
      <ProjectDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        url={project.liveLink}
        title={project.title}
      />
    </main>
  );
}
