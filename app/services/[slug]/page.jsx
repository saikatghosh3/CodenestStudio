"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Feather, Cpu, Globe, Code2, Zap, LifeBuoy } from "lucide-react";
import { getServiceBySlug, SERVICES_DATA } from "@/utils/servicesData";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const iconMap = {
  Feather,
  Code2,
  Globe,
  Cpu,
  Zap,
  LifeBuoy,
};

export default function ServiceDetail() {
  const params = useParams();
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-3">Service Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
            <a href="/#why" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </a>
          </div>
        </div>
      </main>
    );
  }

  const Icon = iconMap[service.icon] || Feather;
  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main>
      <Navbar />
      <div className="relative min-h-screen pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <a href="/#why" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </a>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest">What We Offer</span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mt-1 leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {service.shortDesc}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 bg-card border border-border rounded-2xl p-6 sm:p-8"
          >
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              {service.longDesc}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Benefits & Capabilities
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Our Process
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.process.map((step, idx) => (
                <div key={step.step} className="relative bg-card border border-border rounded-xl p-5">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 mt-1">{step.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Other Services
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedServices.map((s) => {
                const RelIcon = iconMap[s.icon] || Feather;
                return (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group bg-card border border-border rounded-xl p-5 hover:bg-card/80 hover:border-primary/30 transition-all"
                  >
                    <RelIcon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{s.shortDesc}</p>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 sm:p-10 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Let&apos;s discuss how our {service.title.toLowerCase()} expertise can help bring your vision to life.
            </p>
            <a
              href={`https://wa.me/8801758197272?text=${encodeURIComponent(`Hello, I'm interested in your ${service.title} service.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Start the Conversation
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
