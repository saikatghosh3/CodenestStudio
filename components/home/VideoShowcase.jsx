"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, AlertTriangle, Film } from "lucide-react";

const DEFAULT_VIDEOS = [
  {
    _id: "default",
    title: "Project Showreel",
    videoUrl: "https://drive.google.com/file/d/1WkV-Se3bpsmCyZfwk9nQEFCA2vmkqvTh/preview",
    fallbackImage: "",
  },
];

function getVideoImage(video) {
  return video.fallbackImage || video.thumbnail || "";
}

export default function VideoShowcase({ initialVideos = [] }) {
  const [videos, setVideos] = useState(() =>
    initialVideos.length > 0
      ? initialVideos.map((v) => ({ ...v, fallbackImage: getVideoImage(v) }))
      : DEFAULT_VIDEOS
  );
  const [activeVideo, setActiveVideo] = useState(null);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/video-showcase");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.length > 0) {
            setVideos(data.map((v) => ({ ...v, fallbackImage: getVideoImage(v) })));
          }
        }
      } catch {
        // keep existing state
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeVideo]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setActiveVideo(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openPlayer = useCallback((video) => {
    setActiveVideo(video);
    setIframeError(false);
  }, []);

  return (
    <section id="showreel" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-5 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Video Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Our Work in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Motion
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-lg leading-relaxed">
            See our projects come to life through these quick walkthroughs.
          </p>
        </motion.div>

        {videos.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/30">
            <p className="text-muted-foreground">No showcase videos available yet.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          >
            {videos.map((video, idx) => (
              <VideoCard
                key={video._id}
                video={video}
                index={idx}
                onPlay={openPlayer}
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            video={activeVideo}
            iframeError={iframeError}
            setIframeError={setIframeError}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

const VideoCard = memo(function VideoCard({ video, index, onPlay }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imageUrl = getVideoImage(video);
  const hasImage = Boolean(imageUrl) && !imgError;

  const handleClick = useCallback(() => onPlay(video), [onPlay, video]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative rounded-xl overflow-hidden border border-border/60 bg-card hover:shadow-xl hover:shadow-black/5 hover:border-primary/20 transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={video.title || "Video thumbnail"}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          ) : null}

          <div className={`absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-purple-600/15 ${hasImage && imgLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-500`} />

          {hasImage && !imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:bg-primary/90 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 ml-0.5 fill-white text-white" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white text-sm font-semibold truncate drop-shadow-lg">
              {video.title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const VideoModal = memo(function VideoModal({ video, iframeError, setIframeError, onClose }) {
  const handleBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl"
      >
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {iframeError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card gap-4">
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-muted-foreground text-sm">This video could not be loaded.</p>
              <button
                onClick={() => setIframeError(false)}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <iframe
              title={video.title}
              src={video.videoUrl}
              allow="autoplay; encrypted-media"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              onError={() => setIframeError(true)}
            />
          )}
        </div>

        <div className="px-5 py-4 border-t border-border/60">
          <p className="font-semibold text-foreground">{video.title}</p>
        </div>
      </motion.div>
    </motion.div>
  );
});
