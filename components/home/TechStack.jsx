"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "PostgreSQL",
  "Prisma",
  "JWT",
  "REST API",
];

export default function TechStack() {
  return (
    <section id="stack" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-4">Technology Stack</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Tools & Technologies</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-3">A modern stack chosen for performance, scalability, and developer happiness.</p>
        </motion.div>

        <div className="overflow-hidden">
          <div className="flex gap-8 w-max animate-marquee">
            {[...TECH, ...TECH].map((t, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl text-foreground hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="font-semibold">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
