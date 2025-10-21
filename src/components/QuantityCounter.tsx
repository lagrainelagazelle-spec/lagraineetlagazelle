"use client";

import { useEffect, useState } from 'react';

type CartItem = { product: string; quantity: number };

interface QuantityCounterProps {
  productId: string;
}

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem('cartItems');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  try {
    window.localStorage.setItem('cartItems', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  } catch {}
}

export default function QuantityCounter({ productId }: QuantityCounterProps) {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const items = readCart();
    const found = items.find((it) => it.product === productId);
    setQuantity(found ? Number(found.quantity || 0) : 0);
  }, [productId]);

  const updateQuantity = (next: number) => {
    const items = readCart();
    const idx = items.findIndex((it) => it.product === productId);
    if (next <= 0) {
      if (idx >= 0) {
        items.splice(idx, 1);
      }
    } else if (idx >= 0) {
      items[idx] = { product: productId, quantity: next };
    } else {
      items.push({ product: productId, quantity: next });
    }
    writeCart(items);
    setQuantity(next < 0 ? 0 : next);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Diminuer"
        className="group inline-flex items-center justify-center w-8 h-8 rounded-md border text-brand-text hover:bg-gray-100 active:scale-95 transition-transform"
        onClick={() => updateQuantity(quantity - 1)}
      >
        <span className="transition-transform group-hover:scale-110 text-base sm:text-lg">−</span>
      </button>
      <span className="min-w-6 text-center font-semibold select-none">{quantity}</span>
      <button
        type="button"
        aria-label="Augmenter"
        className="group inline-flex items-center justify-center w-8 h-8 rounded-md border text-brand-text hover:bg-gray-100 active:scale-95 transition-transform"
        onClick={() => updateQuantity(quantity + 1)}
      >
        <span className="transition-transform group-hover:scale-110 text-base sm:text-lg">+</span>
      </button>
    </div>
  );
}


