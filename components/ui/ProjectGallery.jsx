"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="w-1 h-5 bg-primary rounded-full" />
        Project Gallery
      </h2>

      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-card border border-border">
        <div className="aspect-video">
          <img
            src={images[activeImage]}
            alt={`${title} screenshot ${activeImage + 1}`}
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              i === activeImage
                ? "border-primary ring-2 ring-primary/30"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="w-16 h-12 sm:w-20 sm:h-14 lg:w-24 lg:h-16">
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                width={96}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
