"use client";

import { useEffect, useMemo, useState } from "react";
import { productPricesCents, getLineTotalCents, formatEuroFromCents } from "@/lib/pricing";

type CartItem = { product: keyof typeof productPricesCents; quantity: number };

function readCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem("cartItems");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function MinimumOrderBanner({ showTotal = true }: { showTotal?: boolean }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const load = () => setItems(readCart());
    load();
    window.addEventListener("storage", load);
    window.addEventListener("cart:updated", load as EventListener);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("cart:updated", load as EventListener);
    };
  }, []);

  const totalCents = useMemo(
    () => items.reduce((s, it) => s + getLineTotalCents(it.product, Number(it.quantity || 0)), 0),
    [items]
  );
  const minimumCents = 4000;
  const missingCents = Math.max(0, minimumCents - totalCents);

  return (
    <div className="rounded-md border-2 border-[#1AA39A] bg-[#1AA39A]/10 px-4 py-3 flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5 text-[#1AA39A]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v5M12 16h.01" />
        </svg>
      </div>
      <div className="text-sm">
        <p className="font-extrabold text-brand-primary">Minimum de commande: {formatEuroFromCents(minimumCents)}</p>
        {showTotal ? (
          <p className="mt-0.5 text-brand-text/80">
            Total actuel: <span className="font-semibold">{formatEuroFromCents(totalCents)}</span>
            {missingCents > 0 ? (
              <> — il manque <span className="font-semibold">{formatEuroFromCents(missingCents)}</span> pour valider la commande.</>
            ) : (
              <> — minimum atteint.</>
            )}
          </p>
        ) : null}
      </div>
    </div>
  );
}


