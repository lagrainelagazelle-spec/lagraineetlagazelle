"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: string[];
  alt?: string;
  imageHeightClass?: string; // e.g., "h-20 sm:h-24 md:h-28"
}

export default function Carousel({ images, alt = "", imageHeightClass = "h-24 sm:h-28 md:h-32" }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const scrollByAmount = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Auto défilement façon bandeau, en boucle (pause si lightbox ouverte ou interaction)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const speed = 0.6; // pixels par frame
    let raf: number;
    const tick = () => {
      if (!el.isConnected) return; // sécurité si démonté
      if (!paused && !lightboxSrc) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = window.requestAnimationFrame(tick);
      rafRef.current = raf;
    };
    raf = window.requestAnimationFrame(tick);
    rafRef.current = raf;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images, paused, lightboxSrc]);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <div className="relative group">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-2"
        onScroll={() => {
          setPaused(true);
          if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = window.setTimeout(() => setPaused(false), 1200);
        }}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => {
          if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = window.setTimeout(() => setPaused(false), 800);
        }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => {
          if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = window.setTimeout(() => setPaused(false), 800);
        }}
      >
          {[...images, ...images].map((src, idx) => (
            <div key={`${src}-${idx}`} className="shrink-0 snap-start">
            <button
              type="button"
              aria-label="Agrandir l'image"
              onClick={() => openLightbox(src)}
              onMouseEnter={() => {
                try {
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
                    hoverTimerRef.current = window.setTimeout(() => openLightbox(src), 3000);
                  }
                } catch {}
              }}
                onMouseLeave={() => {
                  if (hoverTimerRef.current) {
                    window.clearTimeout(hoverTimerRef.current);
                    hoverTimerRef.current = null;
                  }
                }}
              className="relative overflow-hidden rounded-md block"
            >
              <Image
                src={src}
                alt={alt || "Décor"}
                width={260}
                height={260}
                className={`${imageHeightClass} w-auto select-none pointer-events-auto transition-transform duration-300 ease-out hover:scale-110`}
              />
            </button>
            </div>
          ))}
        </div>
      {/* Controls */}
      <button
        type="button"
        aria-label="Image précédente"
        onClick={() => scrollByAmount(-1)}
        className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-9 w-9 rounded-full bg-white/90 border shadow hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Image suivante"
        onClick={() => scrollByAmount(1)}
        className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-9 w-9 rounded-full bg-white/90 border shadow hover:bg-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-3xl w-full">
            <button
              type="button"
              aria-label="Fermer"
              className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white text-brand-text shadow"
              onClick={closeLightbox}
            >
              ×
            </button>
            <div className="overflow-hidden rounded-md shadow-2xl">
              <Image
                src={lightboxSrc as string}
                alt={alt || 'Agrandissement'}
                width={1200}
                height={800}
                className="w-full h-auto transition-transform duration-300 ease-out"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


