"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Shield, 
  Trash2, 
  ArrowLeft,
  Scale,
  Clock,
  Mail,
  Ban
} from "lucide-react";

export default function TermsOfService() {
  const terms = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: "By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part, please do not use our services.",
      penalty: "Violation may result in account termination"
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: "All payments are due within 15 days of invoice date. Late payments may incur a 5% monthly interest fee. We reserve the right to suspend services for non-payment.",
      penalty: "Late fee: 5% per month"
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: "You agree to provide accurate information, maintain account security, comply with all applicable laws, and not misuse our services for illegal activities.",
      penalty: "Account suspension or legal action"
    },
    {
      icon: Trash2,
      title: "Cancellation & Refund",
      content: "You may cancel your subscription at any time. Refunds are provided within 14 days of purchase for annual plans. Monthly plans are non-refundable.",
      penalty: "No refund after 14 days"
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      content: "You may not hack, reverse engineer, distribute malware, spam, scrape data, or use our services for illegal purposes.",
      penalty: "Immediate account termination"
    },
    {
      icon: Clock,
      title: "Service Availability",
      content: "We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be notified 48 hours in advance.",
      penalty: "No compensation for downtime"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Terms of Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Our Legal Agreement
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Effective: January 15, 2024
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                Please Read Carefully
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-500">
                By using our services, you agree to these terms. These terms form a binding legal agreement between you and our company.
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
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <term.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{term.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {term.content}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span className="text-xs text-red-700 dark:text-red-400">
                        {term.penalty}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-card rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Governing Law</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  These terms are governed by the laws of [Your Country/State]. Any disputes shall be resolved through binding arbitration in [Your City].
                </p>
                <Link
                  href="mailto:legal@yourcompany.com"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  legal@yourcompany.com
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-xs text-muted-foreground"
          >
            <p>
              By continuing to use our services, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}