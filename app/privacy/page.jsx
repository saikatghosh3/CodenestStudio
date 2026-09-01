"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  ArrowLeft,
  Clock,
  Server,
  Users,
  Fingerprint,
  Cookie,
  FileCheck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    tagline: "Only what you choose to share",
    content:
      "We collect information you provide directly to us, including your name, email address, phone number, company name, and payment details when you register, place an order, or reach out through our contact forms.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    tagline: "Transparent, purposeful, never invasive",
    content:
      "Your data powers everything we do: delivering and improving our services, processing transactions securely, responding to your inquiries, keeping you informed of updates, and tailoring your experience to feel personal.",
    accent: "from-sky-500 to-indigo-500",
  },
  {
    icon: Lock,
    title: "Data Security",
    tagline: "Defense-in-depth, always on",
    content:
      "Your data is protected with SSL/TLS encryption, monitored firewalls, and routine security audits. While no method of transmission over the internet is 100% guaranteed, we deploy industry-leading safeguards and best practices.",
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    tagline: "You stay in control",
    content:
      "We use cookies to make browsing smoother, understand site traffic, and personalise content. Prefer not to? You can disable or clear cookies anytime through your browser settings.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Data Sharing",
    tagline: "Never sold, ever",
    content:
      "We never sell your personal data. We only share it with trusted partners who help run our operations — and always under strict confidentiality agreements.",
    accent: "from-rose-500 to-pink-500",
  },
  {
    icon: Server,
    title: "Data Retention",
    tagline: "Kept only as long as needed",
    content:
      "We keep your information while your account is active or as long as needed to deliver services. Want it gone? Request deletion at any time and we'll honour it promptly.",
    accent: "from-cyan-500 to-blue-500",
  },
];

const highlights = [
  { icon: BadgeCheck, label: "GDPR-Aligned" },
  { icon: Fingerprint, label: "Never Sold" },
  { icon: FileCheck, label: "Audited Annually" },
  { icon: Lock, label: "256-bit Encryption" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      {/* Back Button */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Your Privacy, Our Priority
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We treat your data the way we&apos;d want our own treated — transparently,
              securely, and with total respect for your trust.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-muted/70 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Last updated: January 15, 2024
            </div>
          </motion.div>

          {/* Highlights strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {highlights.map((h) => (
              <div
                key={h.label}
                className="group flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <h.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                <span className="text-sm font-semibold">{h.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="group relative bg-card rounded-2xl p-6 sm:p-7 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all" />
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${section.accent} text-white shadow-lg shadow-black/10 shrink-0 transition-transform group-hover:scale-105`}
                  >
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 mb-1.5">
                      <h3 className="text-xl font-bold tracking-tight">{section.title}</h3>
                      <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">
                        — {section.tagline}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-12 p-8 sm:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-background to-background border border-primary/20 text-center"
          >
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold tracking-tight mb-2">Questions About Your Privacy?</h3>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Our Data Protection Officer is here to help. Reach out any time — we&apos;ll get back to you quickly.
            </p>
            <Link
              href="mailto:codersync9@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              codersync9@gmail.com
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
