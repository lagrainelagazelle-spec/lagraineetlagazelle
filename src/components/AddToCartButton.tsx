"use client";

import { useState } from 'react';

type CartItem = { product: string; quantity: number };

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
}

export default function AddToCartButton({ productId, quantity = 1 }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const current: CartItem[] = raw ? JSON.parse(raw) : [];
      const index = current.findIndex((it) => it.product === productId);
      if (index >= 0) {
        const updated = [...current];
        updated[index] = {
          product: productId,
          quantity: Number(updated[index].quantity || 0) + Number(quantity || 1),
        };
        window.localStorage.setItem('cartItems', JSON.stringify(updated));
      } else {
        const updated = [...current, { product: productId, quantity: Number(quantity || 1) }];
        window.localStorage.setItem('cartItems', JSON.stringify(updated));
      }
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1200);
    } catch (e) {
      // no-op; localStorage indisponible
    }
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="ml-2 inline-flex items-center px-3 py-1.5 rounded-md border-2 border-brand-primary text-xs font-semibold text-brand-primary hover:bg-brand-primary hover:text-white"
      aria-label="Ajouter au panier"
    >
      {added ? 'Ajouté ✓' : 'Ajouter'}
    </button>
  );
}


