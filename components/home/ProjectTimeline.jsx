"use client";

import { motion } from "framer-motion";

const STAGES = [
  { title: "Discovery", days: "1-7" },
  { title: "Design", days: "7-21" },
  { title: "Development", days: "21-60" },
  { title: "Testing", days: "60-75" },
  { title: "Deployment", days: "75-80" },
  { title: "Maintenance", days: "Ongoing" },
];

export default function ProjectTimeline() {
  return (
    <section id="timeline" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-4">Project Timeline</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Delivery Roadmap</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-3">Estimated delivery stages for typical projects. Timelines vary by scope.</p>
        </motion.div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />
            <div className="flex items-center justify-between space-x-6">
              {STAGES.map((stage, idx) => (
                <motion.div key={stage.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="relative w-1/6 z-10 text-center">
                  <div className="mx-auto w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center text-primary font-semibold text-lg">{idx + 1}</div>
                  <h4 className="text-foreground font-bold mt-4">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{stage.days} days</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          {STAGES.map((stage, idx) => (
            <motion.div key={stage.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-bold">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground">{stage.days} days</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">{idx + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
