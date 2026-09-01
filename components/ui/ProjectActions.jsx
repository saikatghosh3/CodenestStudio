"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import ProjectDemoModal from "@/components/ui/ProjectDemoModal";

export default function ProjectActions({ project }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="lg:col-span-1"
    >
      <div className="lg:sticky lg:top-32 space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Actions
          </h3>
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
              href={`https://wa.me/8801758197272?text=${encodeURIComponent(
                `Hello, I'm interested in a project similar to ${project.title}.`
              )}`}
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
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Project Info
          </h3>
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

      <ProjectDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        url={project.liveLink}
        title={project.title}
      />
    </motion.div>
  );
}
