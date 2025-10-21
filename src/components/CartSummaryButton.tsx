"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { productPricesCents, formatEuroFromCents } from '@/lib/pricing';

type CartItem = { product: keyof typeof productPricesCents; quantity: number };

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem('cartItems');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function CartSummaryButton() {
  const [count, setCount] = useState<number>(0);
  const [totalCents, setTotalCents] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const compute = () => {
      const items = readCart();
      const nextCount = items.reduce((s, it) => s + Number(it.quantity || 0), 0);
      const nextTotal = items.reduce((s, it) => s + (productPricesCents[it.product] || 0) * Number(it.quantity || 0), 0);
      setCount(nextCount);
      setTotalCents(nextTotal);
    };
    compute();
    window.addEventListener('storage', compute);
    window.addEventListener('cart:updated', compute as EventListener);
    return () => {
      window.removeEventListener('storage', compute);
      window.removeEventListener('cart:updated', compute as EventListener);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link
      href="/commande"
      className={`group inline-flex items-center gap-2 rounded-full border-2 border-[#1AA39A] text-[#1AA39A] px-3 py-1.5 sm:px-4 sm:py-2 bg-white hover:bg-[#1AA39A] hover:text-white transition-colors ${scrolled ? 'shadow-md ring-1 ring-[#1AA39A]/30' : ''}`}
      aria-label="Aller à la commande"
    >
      <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full border">
        {/* Icône chariot */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="17" cy="19" r="1" />
        </svg>
        {/* Badge compteur */}
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#1AA39A] text-white text-[10px] font-bold group-hover:bg-white group-hover:text-[#1AA39A]">
          {count}
        </span>
      </span>
      <span className="text-xs sm:text-sm font-bold">Commander</span>
      <span className="text-xs sm:text-sm font-semibold opacity-80 group-hover:opacity-100">{formatEuroFromCents(totalCents)}</span>
    </Link>
  );
}


