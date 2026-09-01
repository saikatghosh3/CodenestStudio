"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";

export default function Projects({ initialProjects = [], initialCategories = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({ url: "", title: "" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" }),
        ]);
        if (projRes.ok) {
          const data = await projRes.json();
          setProjects(data);
          setDbError("");
        } else {
          const data = await projRes.json();
          setDbError(data.error || "Failed to load projects");
        }
        if (catRes.ok) {
          const data = await catRes.json();
          setCategories(data);
        }
      } catch {
        setDbError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const usedCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
        <div className="absolute top-20 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-10 lg:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
            A curated selection of our best work — scalable, performant and beautiful applications. Swipe or use arrows to explore.
          </p>
        </motion.div>

        {dbError && (
          <div className="mb-10 max-w-2xl mx-auto p-4 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 backdrop-blur-sm">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-400">Unable to load projects</p>
              <p className="text-xs text-red-400/80 mt-1">{dbError}</p>
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 hover-target ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105"
                    : "bg-card text-muted-foreground border border-border hover:bg-card/80 hover:text-foreground backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <p className="text-foreground text-lg font-semibold">No projects found.</p>
            <p className="text-muted-foreground text-sm mt-2">
              {dbError ? "Projects will appear once the database is connected." : "Check back soon for updates!"}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Carousel */}
            <div className="relative group/carousel">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 sm:-ml-5">
                  {filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] pl-4 sm:pl-5"
                    >
                      <ProjectCard
                        project={project}
                        onDemo={(url, title) => {
                          setSelectedProject({ url, title });
                          setDemoModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              {filteredProjects.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    aria-label="Previous projects"
                    className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-card border border-border shadow-lg backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    aria-label="Next projects"
                    className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-card border border-border shadow-lg backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {scrollSnaps.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {scrollSnaps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                    aria-label={`Go to project slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === selectedIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <ProjectDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        url={selectedProject.url}
        title={selectedProject.title}
      />
    </section>
  );
}

function ProjectCard({ project, onDemo }) {
  return (
    <div className="group relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-sm overflow-hidden hover:border-white/30 dark:hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 dark:ring-white/5 pointer-events-none" />
      <a href={`/projects/${project.slug}`} className="block p-3 pt-3">
        <div className="relative aspect-[16/10] rounded-xl bg-muted overflow-hidden border border-border/70 group-hover:border-primary/40 transition-colors duration-500">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
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

          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border/60 group-hover:ring-transparent transition-all duration-500 pointer-events-none" />

          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-background/60 backdrop-blur-md border border-border/50 text-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              Featured
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center backdrop-blur-md shadow-lg shadow-primary/30 transform scale-50 group-hover:scale-100 transition-transform duration-400 ease-out">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </a>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {project.category}
          </span>
          {project.featured && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Featured
              </span>
            </>
          )}
        </div>

        <a href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
        </a>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
          {project.liveLink && (
            <button
              onClick={() => onDemo(project.liveLink, project.title)}
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </button>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
