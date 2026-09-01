"use client";

import { motion } from "framer-motion";
import {
  Heart,
  BookOpen,
  Coffee,
  ShoppingCart,
  Home,
  Plane,
  Database,
  Store,
  ArrowUpRight,
} from "lucide-react";

const INDUSTRIES = [
  {
    title: "Healthcare",
    icon: Heart,
    desc: "HIPAA-ready portals, telehealth & patient management platforms.",
    gradient: "from-rose-500 to-red-600",
    glow: "group-hover:shadow-rose-500/30",
    border: "group-hover:border-rose-500/40",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Education",
    icon: BookOpen,
    desc: "LMS, e-learning and student engagement experiences.",
    gradient: "from-sky-500 to-blue-600",
    glow: "group-hover:shadow-sky-500/30",
    border: "group-hover:border-sky-500/40",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Restaurant",
    icon: Coffee,
    desc: "Online ordering, reservations & POS integrations.",
    gradient: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-amber-500/30",
    border: "group-hover:border-amber-500/40",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    desc: "High-converting stores with secure checkout & analytics.",
    gradient: "from-emerald-500 to-green-600",
    glow: "group-hover:shadow-emerald-500/30",
    border: "group-hover:border-emerald-500/40",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Real Estate",
    icon: Home,
    desc: "Property search, lead capture & CRM automation.",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/30",
    border: "group-hover:border-violet-500/40",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Travel & Booking",
    icon: Plane,
    desc: "Flights, hotels & itinerary platforms that scale.",
    gradient: "from-cyan-500 to-teal-600",
    glow: "group-hover:shadow-cyan-500/30",
    border: "group-hover:border-cyan-500/40",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "ERP Systems",
    icon: Database,
    desc: "Modular operations, inventory & reporting suites.",
    gradient: "from-indigo-500 to-blue-600",
    glow: "group-hover:shadow-indigo-500/30",
    border: "group-hover:border-indigo-500/40",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "POS Systems",
    icon: Store,
    desc: "Lightning-fast checkout & real-time sales dashboards.",
    gradient: "from-fuchsia-500 to-pink-600",
    glow: "group-hover:shadow-fuchsia-500/30",
    border: "group-hover:border-fuchsia-500/40",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-20 lg:py-28 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[130px]" />
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
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Industries We Serve
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Built for <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">every industry</span> that matters
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            From healthcare to e-commerce, we craft tailored, scalable digital experiences that
            drive results — no matter your sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {INDUSTRIES.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (idx % 4) * 0.07, duration: 0.5 }}
                className={`group relative rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${it.glow} ${it.border} ${
                  it.featured ? "lg:col-span-2 lg:row-span-2 flex flex-col justify-between" : "min-h-[220px] flex flex-col"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${it.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 transition-colors duration-500 group-hover:from-black/80" />

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${it.gradient}`}
                  style={{ mixBlendMode: "soft-light" }}
                />

                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${it.gradient} flex items-center justify-center text-white shadow-lg shadow-black/40 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.8} />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </div>

                <div className={`relative z-10 ${it.featured ? "mt-8" : "mt-auto pt-6"}`}>
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                    {it.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-2 leading-relaxed">{it.desc}</p>
                </div>

                <div className={`relative z-10 mt-6 h-0.5 w-10 rounded-full bg-gradient-to-r ${it.gradient} transition-all duration-500 group-hover:w-20`} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Don&apos;t see your industry?{" "}
            <span className="text-foreground font-semibold">We build for it too.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
