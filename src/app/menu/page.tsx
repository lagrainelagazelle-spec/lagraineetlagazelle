"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from '@/components/DropdownMenu';
import QuantityCounter from '@/components/QuantityCounter';
// import CartIndicator from '@/components/CartIndicator';
// import CartTotal from '@/components/CartTotal';
import CartSummaryButton from '@/components/CartSummaryButton';
import MenuItemCard from '@/components/MenuItemCard';
// import Carousel from '@/components/Carousel';
import CheckoutCTA from '@/components/CheckoutCTA';

export default function MenuPage() {
  const decorativeImages = [
    '/images/graine.png',
    '/images/graine_1.png',
    '/images/graine_2.png',
    '/images/gazelle.png',
    '/images/gazelle_1.png',
    '/images/gazelle_corne.png',
  ];
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const firstBadgeRef = useRef<HTMLDivElement | null>(null);
  const [repeatCount, setRepeatCount] = useState<number>(4);
  const [paused, setPaused] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  useEffect(() => {
    // Ajuste repeatCount pour remplir au moins 3 largeurs d'écran
    const adjust = () => {
      const container = marqueeRef.current;
      const first = firstBadgeRef.current;
      if (!container || !first) return;
      const containerWidth = container.clientWidth;
      const itemWidth = first.clientWidth || 220;
      const itemsPerView = Math.max(1, Math.ceil(containerWidth / itemWidth));
      // On veut au moins 3x la largeur visible pour éviter les trous
      const needed = Math.max(3, Math.ceil((itemsPerView * 3) / decorativeImages.length));
      // Important: forcer un nombre pair pour que la 1ère moitié == 2ème moitié (boucle sans à-coup)
      const even = needed % 2 === 1 ? needed + 1 : needed;
      setRepeatCount(Math.max(4, even));
    };
    adjust();
    window.addEventListener('resize', adjust);
    return () => window.removeEventListener('resize', adjust);
  }, [decorativeImages.length]);

  // Auto-défilement continu avec recentrage à mi-piste (boucle fluide)
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const speed = 0.6; // px/frame
    let raf: number;
    const tick = () => {
      if (!el.isConnected) return;
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
  }, [paused, lightboxSrc, repeatCount]);

  return (
    <div className="bg-white text-brand-text min-h-screen">
      {/* Header global fourni par RootLayout */}

      {/* Bandeau d'incitation commande/livraison */}
      <section className="bg-brand-secondary/20 border-y border-brand-secondary/40">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-y-1 sm:gap-x-2 text-sm sm:text-base">
            <span className="font-semibold text-brand-text">Commande & livraison</span>
            <span className="hidden sm:inline">·</span>
            <span>Prévoir jusqu’à 48h selon disponibilité.</span>
            <span className="hidden sm:inline">·</span>
            <a href="tel:0692154474" className="font-bold text-brand-primary underline-offset-2 hover:underline">0692 15 44 74</a>
          </div>
        </div>
      </section>

      

      <main id="menu-top" className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* En-tête stylisée oriental */}
        <section className="text-center mb-12">
          {/* Titre déplacé au-dessus du carrousel */}
          <h2 className="text-2xl font-extrabold tracking-widest text-brand-primary">LA GRAINE</h2>
          {/* Bandeau défilant de motifs (graines & gazelles) */}
          <div className="mt-6 bg-brand-background/60 rounded-md p-2 relative">
            <div
              ref={marqueeRef}
              className="marquee-container overflow-x-auto"
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
            <div className="marquee-track">
                {Array.from({ length: repeatCount }).flatMap((_, repIdx) => (
                  decorativeImages.map((src, idx) => (
                    <div
                      key={`rep${repIdx}-img${idx}`}
                      className="ground-badge"
                      ref={repIdx === 0 && idx === 0 ? firstBadgeRef : undefined}
                    >
                      <button
                        type="button"
                        aria-label="Agrandir l'image"
                        onClick={() => openLightbox(src)}
                        onMouseEnter={() => {
                          try {
                            if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                              if (hoverTimer) window.clearTimeout(hoverTimer);
                              const t = window.setTimeout(() => openLightbox(src), 3000);
                              setHoverTimer(t);
                            }
                          } catch {}
                        }}
                        onMouseLeave={() => {
                          if (hoverTimer) {
                            window.clearTimeout(hoverTimer);
                            setHoverTimer(null);
                          }
                        }}
                        className="relative overflow-hidden rounded-md block"
                      >
                  <Image
                    src={src}
                    alt="Décor oriental"
                    width={220}
                    height={220}
                          className="decorative-image h-20 sm:h-24 md:h-28 w-auto select-none pointer-events-auto transition-transform duration-300 ease-out hover:scale-110"
                  />
                      </button>
                </div>
                  ))
                ))}
                </div>
            </div>
            {/* Flèches de contrôle sans interrompre l'animation */}
            <button
              type="button"
              aria-label="Image précédente"
              onClick={() => {
                if (marqueeRef.current) marqueeRef.current.scrollBy({ left: - (marqueeRef.current.clientWidth * 0.8), behavior: 'smooth' });
              }}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center h-9 w-9 rounded-full bg-white/90 border shadow hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Image suivante"
              onClick={() => {
                if (marqueeRef.current) marqueeRef.current.scrollBy({ left: (marqueeRef.current.clientWidth * 0.8), behavior: 'smooth' });
              }}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center h-9 w-9 rounded-full bg-white/90 border shadow hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          {/* Intro déplacée sous le carrousel */}
          <p className="mt-4 max-w-2xl mx-auto text-brand-text/90">
            Sélection raffinée inspirée des saveurs d’Orient.
          </p>
        </section>

        {/* Récapitulatif détaillé (issu de l'affiche) */}
        <section id="la-graine" className="mb-12 scroll-mt-24">
          <h2 className="text-center text-2xl font-extrabold tracking-widest text-brand-primary mb-6">LES COUSCOUS</h2>
          <div className="space-y-5">
            <MenuItemCard title="COUSCOUS ROYAL" description="Base végétarienne + poulet + merguez + boulettes" priceLabel="20,00 €" productId="couscous_royal" />
            <MenuItemCard title="COUSCOUS MERGUEZ" description="Base végétarienne + merguez" priceLabel="16,50 €" productId="couscous_merguez" />
            <MenuItemCard title="COUSCOUS POULET" description="Base végétarienne + poulet" priceLabel="16,50 €" productId="couscous_poulet" />
            <MenuItemCard title="COUSCOUS BOULETTES" description="Base végétarienne + boulettes" priceLabel="17,50 €" productId="couscous_boulettes" />
            <MenuItemCard title="COUSCOUS 2 VIANDES" description="Base végétarienne + 2 viandes au choix" priceLabel="18,50 €" productId="couscous_2_viandes" />
            <MenuItemCard title="COUSCOUS VÉGÉTARIEN" description="Semoule fine, légumes de saison, pois chiches, épices et aromates" priceLabel="14,00 €" productId="couscous_vegetarien" />
          </div>

          {/* Tajines */}
          <div id="les-tajines" className="mt-8 space-y-5 scroll-mt-24">
            <h3 className="text-center text-xl font-extrabold tracking-widest text-brand-primary mb-2">LES TAJINES</h3>
            <MenuItemCard title="TAJINE POULET ABRICOT" description="Base végétarienne + poulet + abricots confits et oignons confits" priceLabel="19,50 €" productId="tajine_poulet_abricot" />
            <MenuItemCard title="TAJINE POULET AMANDES" description="Base végétarienne + amandes et olives" priceLabel="19,50 €" productId="tajine_poulet_amandes" />
            <MenuItemCard title="TAJINE KEFTA PRUNEAUX" description="Base végétarienne + kefta + pruneaux et raisins confits" priceLabel="18,50 €" productId="tajine_kefta_pruneaux" />
            <MenuItemCard title="TAJINE VÉGÉTARIEN" description="Légumes de saison, pommes de terre, petits pois, piment doux" priceLabel="17,50 €" productId="tajine_vegetarien" />
          </div>

          <div className="mt-6">
            <div className="rounded-md border border-amber-200 bg-white p-4 text-sm">
              <p className="font-semibold text-brand-text">Allergènes</p>
              <p className="mt-1 text-brand-text/80">Gluten, céleri, graines de sésame, fruits à coque.</p>
            </div>
          </div>
        </section>

        {/* Section pâtisseries - La Gazelle */}
        <section id="la-gazelle" className="mb-12 scroll-mt-24">
          <h2 className="text-center text-2xl font-extrabold tracking-widest text-brand-primary mb-6">LA GAZELLE</h2>

          {/* Sous-section: Mignardises */}
          <div id="mignardises" className="space-y-5 scroll-mt-24">
            <h3 className="text-center text-xl font-extrabold tracking-widest text-brand-primary mb-2">LES MIGNARDISES</h3>
            <MenuItemCard title="CORNE DE GAZELLE (la pièce)" description="6 pièces: 12,50 € — 12 pièces: 23,90 €" priceLabel="2,50 €" productId="corne_gazelle_piece" />
            <MenuItemCard title="MACROUTS (la pièce)" description="6 pièces: 11 € — 12 pièces: 19,90 €" priceLabel="2,20 €" productId="macrouts_piece" />
            <MenuItemCard title="MONTECAOS CANNELLE (la pièce)" description="6 pièces: 10,50 € — 12 pièces: 19,90 €" priceLabel="2,00 €" productId="montecaos_cannelle_piece" />
            <MenuItemCard title="CAPRILU AL LEMON (la pièce)" description="6 pièces: 15,00 € — 12 pièces: 30,50 €" priceLabel="3,00 €" productId="caprilu_citron_piece" />
          </div>

          {/* Sous-section: Coffrets */}
          <div id="coffrets" className="mt-8 space-y-3 scroll-mt-24">
            <h3 className="text-center text-xl font-extrabold tracking-widest text-brand-primary mb-2">LES COFFRETS</h3>
            <MenuItemCard title="Mix 6 pièces" priceLabel="12,50 €" productId="coffret_mix_6" />
            <MenuItemCard title="Mix 12 pièces" priceLabel="24,90 €" productId="coffret_mix_12" />
            <MenuItemCard title="Mix 18 pièces" priceLabel="37,90 €" productId="coffret_mix_18" />
            <p className="text-lg text-brand-text/60 text-center">Quantité supérieure sur demande</p>
            <div className="rounded-md border border-amber-200 bg-white p-4 text-sm">
              <p className="font-semibold text-brand-text">Allergènes</p>
              <p className="mt-1 text-brand-text/80">gluten, fruits à coque et lait.</p>
            </div>
          </div>
        </section>

        {/* Séparateur motif géométrique discret */}
        <div className="relative mb-10">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
          <div className="absolute inset-0 flex justify-center -translate-y-1/2">
            <div className="px-4 bg-brand-background">
              <span className="inline-block text-brand-secondary">✧</span>
              <span className="mx-2 inline-block text-brand-secondary">۞</span>
              <span className="inline-block text-brand-secondary">✧</span>
            </div>
          </div>
        </div>

        {/* Grille précédente supprimée pour harmoniser la présentation avec l'affiche */}

        {/* CTA de commande */}
        <div className="mt-12 text-center">
          <CheckoutCTA />
        </div>
      </main>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={closeLightbox}
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
                src={lightboxSrc!}
                alt="Agrandissement"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer global déplacé dans RootLayout */}
    </div>
  );
}


