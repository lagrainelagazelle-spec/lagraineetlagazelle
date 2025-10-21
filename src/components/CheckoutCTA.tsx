"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutCTA() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer) {
        window.clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  const handleClick = () => {
    try {
      const raw = window.localStorage.getItem('cartItems');
      const items: Array<{ quantity?: number }> = raw ? JSON.parse(raw) : [];
      const hasItems = Array.isArray(items) && items.reduce((s: number, it) => s + Number(it?.quantity || 0), 0) > 0;
      if (!hasItems) {
        setShowToast(true);
        setToastVisible(false);
        requestAnimationFrame(() => setToastVisible(true));
        const t = window.setTimeout(() => {
          setToastVisible(false);
          window.setTimeout(() => setShowToast(false), 300);
        }, 2500);
        setToastTimer(t);
        return;
      }
      router.push('/commande');
    } catch {
      setShowToast(true);
      setToastVisible(false);
      requestAnimationFrame(() => setToastVisible(true));
      const t = window.setTimeout(() => {
        setToastVisible(false);
        window.setTimeout(() => setShowToast(false), 300);
      }, 2500);
      setToastTimer(t);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 hover:bg-[#1AA39A]/90 shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
      >
        Commander maintenant
      </button>
      {showToast && (
        <div className="fixed z-[60] px-4 sm:px-0 inset-x-0 top-6 sm:inset-x-auto sm:top-auto sm:bottom-6 sm:right-6 flex justify-center sm:justify-end">
          <div
            className={`relative max-w-sm w-full rounded-md shadow-2xl ring-2 ring-white/50 border-2 border-[#1AA39A] bg-[#1AA39A] text-white px-4 py-4 transition-all duration-300 ease-out transform ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => { setToastVisible(false); window.setTimeout(() => setShowToast(false), 300); }}
              className="absolute top-2 right-2 text-white/90 hover:text-white"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
              </div>
              <div>
                <p className="text-base sm:text-lg font-extrabold tracking-wide">Panier vide</p>
                <p className="mt-1 text-sm sm:text-base font-semibold">Ajoutez des articles avant de continuer.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


