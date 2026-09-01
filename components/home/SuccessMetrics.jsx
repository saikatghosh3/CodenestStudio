"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const METRICS = [
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Responsive Sites", value: 100, suffix: "%" },
  { label: "Avg Delivery (days)", value: 21, suffix: "d" },
  { label: "Technologies", value: 12, suffix: "+" },
];

export default function SuccessMetrics() {
  return (
    <section id="metrics" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-4">Success Metrics</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Proven Results</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-3">Numbers that show our impact and reliability.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {METRICS.map((m, idx) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                <AnimatedCounter from={0} to={m.value} duration={1600} className="inline-block" suffix={m.suffix} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
