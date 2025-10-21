"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { productPricesCents, productLabels, formatEuroFromCents, getLineTotalCents } from '@/lib/pricing';
import QuantityCounter from '@/components/QuantityCounter';

type CartItem = { product: keyof typeof productPricesCents; quantity: number };

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem('cartItems');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function PanierPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const load = () => setItems(readCart());
    load();
    window.addEventListener('storage', load);
    window.addEventListener('cart:updated', load as EventListener);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener('cart:updated', load as EventListener);
    };
  }, []);

  const totalCents = useMemo(() => items.reduce((s, it) => s + getLineTotalCents(it.product, Number(it.quantity || 0)), 0), [items]);

  const removeLine = (idx: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      try {
        window.localStorage.setItem('cartItems', JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('cart:updated'));
      } catch {}
      return next;
    });
  };

  const clearCart = () => {
    try {
      window.localStorage.removeItem('cartItems');
      window.dispatchEvent(new CustomEvent('cart:updated'));
    } catch {}
    setItems([]);
  };

  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/menu" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" />
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-brand-primary mb-4">Votre panier</h1>

        {items.length === 0 ? (
          <div className="rounded-md border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-2xl font-extrabold text-brand-primary">Votre panier est vide</p>
            <p className="mt-2 text-brand-text/80">Ajoutez des articles depuis le menu pour continuer.</p>
            <Link href="/menu" className="mt-5 inline-flex items-center justify-center px-6 py-2 rounded-md text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 hover:bg-[#1AA39A]/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A] text-sm font-bold">Aller au menu</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="divide-y border rounded-md">
              {items.map((it, idx) => {
                const unit = productPricesCents[it.product] || 0;
                const line = getLineTotalCents(it.product, Number(it.quantity || 0));
                return (
                  <div key={`${it.product}-${idx}`} className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{productLabels[it.product]}</p>
                        <p className="text-xs text-brand-text/70">{formatEuroFromCents(unit)} / unité</p>
                      </div>
                      <div className="text-right font-semibold whitespace-nowrap">{formatEuroFromCents(line)}</div>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-center sm:justify-end gap-2 sm:gap-3">
                      <QuantityCounter productId={it.product} />
                      {(() => {
                        const regular = (productPricesCents[it.product] || 0) * Number(it.quantity || 0);
                        const save = Math.max(0, regular - line);
                        return save > 0 ? (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 rounded px-2 py-0.5">Remise: - {formatEuroFromCents(save)}</span>
                        ) : null;
                      })()}
                      <button type="button" onClick={() => removeLine(idx)} className="px-3 py-1.5 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white text-sm font-semibold" aria-label="Supprimer">Supprimer</button>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-b-md">
                <span className="font-semibold">Total</span>
                <span className="font-extrabold text-brand-primary">{formatEuroFromCents(totalCents)}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link href="/menu" className="px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white text-sm font-semibold">← Retour au menu</Link>
                <button type="button" onClick={clearCart} className="px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white text-sm font-semibold">Vider le panier</button>
              </div>
              <Link href="/commande" className="inline-flex items-center justify-center px-6 py-2 rounded-md text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 hover:bg-[#1AA39A]/90 shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A] font-bold">Valider mon panier</Link>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white">
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-brand-text/60">
          <p>&copy; {new Date().getFullYear()} La Graine et La Gazelle. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}


