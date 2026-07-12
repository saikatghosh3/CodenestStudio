"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-lg mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-6 mx-auto">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-8xl sm:text-9xl font-bold text-foreground tracking-tighter mb-4">
            4<span className="text-primary">0</span>4
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Page Not Found</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
