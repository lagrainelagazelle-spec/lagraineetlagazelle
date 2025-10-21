"use client";

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

export default function CartTotal() {
  const [totalCents, setTotalCents] = useState<number>(0);

  useEffect(() => {
    const compute = () => {
      const items = readCart();
      const sum = items.reduce((acc, it) => acc + (productPricesCents[it.product] || 0) * Number(it.quantity || 0), 0);
      setTotalCents(sum);
    };
    compute();
    window.addEventListener('storage', compute);
    window.addEventListener('cart:updated', compute as EventListener);
    return () => {
      window.removeEventListener('storage', compute);
      window.removeEventListener('cart:updated', compute as EventListener);
    };
  }, []);

  return (
    <span className="text-sm font-semibold whitespace-nowrap">{formatEuroFromCents(totalCents)}</span>
  );
}


