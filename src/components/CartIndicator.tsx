"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CartItem = { product: string; quantity: number };

function readCartCount(): number {
  try {
    const raw = window.localStorage.getItem('cartItems');
    const items: CartItem[] = raw ? JSON.parse(raw) : [];
    return items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);
  } catch {
    return 0;
  }
}

export default function CartIndicator() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const update = () => setCount(readCartCount());
    update();
    window.addEventListener('storage', update);
    window.addEventListener('cart:updated', update as EventListener);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('cart:updated', update as EventListener);
    };
  }, []);

  return (
    <Link href="/commande" className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border hover:bg-gray-50" aria-label="Panier">
      {/* Icône chariot */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </svg>
      {/* Badge compteur */}
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#1AA39A] text-white text-[10px] font-bold">
        {count}
      </span>
    </Link>
  );
}


