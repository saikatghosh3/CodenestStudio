"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Shield,
  ArrowLeft,
  Scale,
  Clock,
  Mail,
  Ban,
  Handshake,
  ScrollText,
  PenTool,
  RefreshCw,
  Globe2,
} from "lucide-react";

const terms = [
  {
    icon: CheckCircle2,
    title: "Acceptance of Terms",
    content:
      "By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If any part doesn't sit right with you, that's okay — just don't use the services.",
    note: "Binds you once you use our services",
    good: true,
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content:
      "Payments are due within 15 days of the invoice date. Late payments may incur a 5% monthly interest charge, and we reserve the right to pause services for non-payment.",
    note: "Late fee: 5% per month",
    good: false,
  },
  {
    icon: Handshake,
    title: "User Responsibilities",
    content:
      "You agree to share accurate information, keep your account secure, follow all applicable laws, and use our services only for lawful purposes.",
    note: "Suspension or legal action on misuse",
    good: false,
  },
  {
    icon: RefreshCw,
    title: "Cancellation & Refunds",
    content:
      "Cancel your subscription anytime. Annual plans qualify for a refund within 14 days of purchase; monthly plans are non-refundable.",
    note: "14-day refund window for annual plans",
    good: true,
  },
  {
    icon: Ban,
    title: "Prohibited Activities",
    content:
      "No hacking, reverse engineering, malware, spam, scraping, or illegal use of our services. Period.",
    note: "Immediate account termination",
    good: false,
  },
  {
    icon: Globe2,
    title: "Service Availability",
    content:
      "We strive for 99.9% uptime but don't guarantee uninterrupted access. Scheduled maintenance is announced at least 48 hours in advance.",
    note: "No compensation for downtime",
    good: false,
  },
  {
    icon: PenTool,
    title: "Intellectual Property",
    content:
      "All content, designs, code, and materials we create remain our property (or our licensors'), unless ownership is explicitly transferred in a written agreement. You may not reuse them without permission.",
    note: "Deliverables ownership defined in your contract",
    good: true,
  },
  {
    icon: Scale,
    title: "Liability & Governing Law",
    content:
      "Our services are provided on an 'as-is' basis, and liability is limited to the extent permitted by law. These terms are governed by the laws of [Your Country/State], with disputes resolved through binding arbitration in [Your City].",
    note: "As-is basis; subject to your local law",
    good: false,
  },
];

const commitments = [
  "Fair, human-readable terms",
  "No surprise subscriptions",
  "Transparent milestone pricing",
  "Your data is never sold",
];

export default function TermsOfService() {
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
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Fair Terms, Zero Fine Print
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We wrote these terms in plain language, because a great partnership
              starts with full clarity — no legal jargon, no hidden traps.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-muted/70 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Effective: January 15, 2024
            </div>
          </motion.div>

          {/* Commitments strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {commitments.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2.5 py-3.5 px-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold">{c}</span>
              </div>
            ))}
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                Please Read Carefully
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-500">
                By using our services you agree to these terms, which form a binding legal
                agreement between you and our company.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {terms.map((term, i) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="group relative bg-card rounded-2xl p-6 sm:p-7 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all" />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 shrink-0 transition-transform group-hover:scale-105">
                    <term.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold tracking-tight mb-1.5">{term.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">{term.content}</p>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
                        term.good
                          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                          : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {term.good ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5" />
                      )}
                      {term.note}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Governing Law + Acknowledgment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-12 p-8 sm:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-background to-background border border-primary/20"
          >
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="p-4 rounded-2xl bg-primary/10 ring-1 ring-primary/20 shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Governing Law & Legal Contact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These terms are governed by the laws of [Your Country/State], with any
                  disputes resolved through binding arbitration in [Your City]. For any legal
                  questions or clarifications, our team is just an email away.
                </p>
                <Link
                  href="mailto:codersync9@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Mail className="h-4 w-4" />
                  codersync9@gmail.com
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ScrollText className="h-4 w-4 text-primary/60" />
              By continuing to use our services, you acknowledge you have read, understood, and agree
              to these Terms of Service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
