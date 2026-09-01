"use client";

import { motion } from "framer-motion";
import {
  Feather,
  Cpu,
  Globe,
  Code2,
  Zap,
  LifeBuoy,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const CARDS = [
  {
    title: "Modern UI/UX Design",
    icon: Feather,
    desc: "Delightful, conversion-focused interfaces built around how your users actually behave.",
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "group-hover:shadow-fuchsia-500/30",
    border: "group-hover:border-fuchsia-500/40",
    slug: "ui-ux-design",
  },
  {
    title: "SEO Optimized",
    icon: Globe,
    desc: "Built for visibility — fast, crawlable and ranking-ready from day one.",
    gradient: "from-emerald-500 to-green-600",
    glow: "group-hover:shadow-emerald-500/30",
    border: "group-hover:border-emerald-500/40",
    slug: "seo-optimized",
  },
  {
    title: "Responsive on Every Device",
    icon: Cpu,
    desc: "Pixel-perfect across phones, tablets and desktops.",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/30",
    border: "group-hover:border-violet-500/40",
    slug: "responsive-design",
  },
  {
    title: "Clean & Scalable Code",
    icon: Code2,
    desc: "Maintainable architecture that grows with your business.",
    gradient: "from-sky-500 to-blue-600",
    glow: "group-hover:shadow-sky-500/30",
    border: "group-hover:border-sky-500/40",
    slug: "clean-scalable-code",
  },
  {
    title: "Fast Delivery",
    icon: Zap,
    desc: "Reliable timelines and rapid, on-schedule delivery.",
    gradient: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-amber-500/30",
    border: "group-hover:border-amber-500/40",
    slug: "fast-delivery",
  },
  {
    title: "Long-Term Support",
    icon: LifeBuoy,
    desc: "We stay with you after launch — monitoring, maintaining and improving your product as it grows.",
    gradient: "from-cyan-500 to-teal-600",
    glow: "group-hover:shadow-cyan-500/30",
    border: "group-hover:border-cyan-500/40",
    featured: true,
    points: ["24/7 proactive monitoring", "SLA-backed uptime", "Continuous improvements"],
    slug: "long-term-support",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-20 lg:py-28 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -left-24 w-96 h-96 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[130px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.06] [mask-image:linear-gradient(180deg,black,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-5 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            Why Clients Choose Us
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Trusted for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quality & Growth
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            We pair premium design with engineering excellence and business-first thinking to
            ship products that don&apos;t just look great — they convert and scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (idx % 3) * 0.08, duration: 0.5 }}
                className={`group relative rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${card.glow} ${card.border} flex flex-col ${
                  card.featured ? "sm:col-span-2 lg:col-span-2 lg:col-start-2" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.gradient}`}
                  style={{ mixBlendMode: "soft-light" }}
                />
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>

                <div className="relative z-10 mt-5">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{card.desc}</p>

                  {card.featured && (
                    <ul className="mt-5 space-y-2.5">
                      {card.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2.5 text-sm font-medium text-foreground/80"
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${card.gradient}`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <a
                  href={`/services/${card.slug}`}
                  className={`relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity ${
                    card.featured ? "" : "mt-auto"
                  }`}
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
