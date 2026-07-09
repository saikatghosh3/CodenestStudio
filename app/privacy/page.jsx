"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Eye, Database, Mail, Globe, ArrowLeft, Clock, Server, Users } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, including your name, email address, phone number, company name, and payment information when you register, make a purchase, or contact us.",
      date: "Updated: Jan 2024"
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: "We use your information to provide and improve our services, process transactions, communicate with you, send updates, and personalize your experience.",
      date: "Updated: Jan 2024"
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement SSL encryption, firewalls, and regular security audits to protect your data. However, no method of transmission over the internet is 100% secure.",
      date: "Updated: Jan 2024"
    },
    {
      icon: Globe,
      title: "Cookies & Tracking",
      content: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can disable cookies in your browser settings.",
      date: "Updated: Jan 2024"
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: "We never sell your personal data. We may share information with trusted partners who assist in our operations, subject to confidentiality agreements.",
      date: "Updated: Jan 2024"
    },
    {
      icon: Server,
      title: "Data Retention",
      content: "We retain your information as long as your account is active or as needed to provide services. You may request deletion of your data at any time.",
      date: "Updated: Jan 2024"
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
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last updated: January 15, 2024
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">{section.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20 text-center"
          >
            <h3 className="font-semibold mb-2">Questions About Privacy?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Contact our Data Protection Officer
            </p>
            <Link
              href="mailto:privacy@yourcompany.com"
              className="text-primary hover:underline text-sm font-medium"
            >
              privacy@yourcompany.com
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}