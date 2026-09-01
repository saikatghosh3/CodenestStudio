"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCw, ExternalLink, Loader2 } from "lucide-react";

export default function ProjectDemoModal({ isOpen, onClose, url, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);

  // Reset loading state when URL changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIframeKey((prev) => prev + 1);
    }
  }, [url, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.classList.add("demo-modal-open");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("demo-modal-open");
    };
  }, [isOpen, onClose]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  if (!isOpen || !url) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full h-full max-w-7xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/30">
            <div className="flex flex-col min-w-0">
              <h3 className="text-lg font-bold text-foreground truncate">
                {title || "Project Live Demo"}
              </h3>
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                {url}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleReload}
                title="Reload Demo"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="w-px h-6 bg-border mx-1" />
              <button
                onClick={onClose}
                title="Close"
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Iframe Content Container */}
          <div className="flex-1 w-full bg-background relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 text-foreground z-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-sm font-medium animate-pulse">Loading live preview...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={url}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
