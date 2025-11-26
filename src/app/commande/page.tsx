"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { productPricesCents, productLabels, formatEuroFromCents } from '@/lib/pricing';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import MinimumOrderBanner from '@/components/MinimumOrderBanner';

export default function CommandePage() {
  type OrderItem = { product: string; quantity: number };
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    items: [] as OrderItem[],
    houseNumber: '',
    streetLine1: '',
    streetLine2: '',
    postcode: '',
    city: '',
    comments: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<number | null>(null);

  const totalItems = useMemo(() => (
    Array.isArray(formData.items)
      ? formData.items.reduce((s, it) => s + Number(it?.quantity || 0), 0)
      : 0
  ), [formData.items]);

  // Préremplissage depuis localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const cart: OrderItem[] = raw ? JSON.parse(raw) : [];
      if (Array.isArray(cart) && cart.length > 0) {
        setFormData((prev) => ({ ...prev, items: cart }));
      }
    } catch {}
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      if (field === 'quantity') {
        updated[index] = { ...updated[index], quantity: Number(value) };
      } else {
        updated[index] = { ...updated[index], product: value };
      }
      try {
        window.localStorage.setItem('cartItems', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('cart:updated'));
      } catch {}
      return { ...prev, items: updated };
    });
  };

  const addItemRow = () => {
    setFormData((prev) => ({ ...prev, items: [...prev.items, { product: '', quantity: 1 }] }));
  };

  const removeItemRow = (index: number) => {
    setFormData((prev) => {
      const updated = prev.items.filter((_, i) => i !== index);
      try {
        window.localStorage.setItem('cartItems', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('cart:updated'));
      } catch {}
      return { ...prev, items: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (totalItems <= 0) {
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
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('La requête a échoué');
      }

      const { url } = await response.json();
      if (url) {
        try {
          // vider le panier dès que stripe prend le relais
          window.localStorage.removeItem('cartItems');
        } catch {}
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erreur lors de la redirection vers Stripe:', error);
      // Gérer l'erreur, par exemple afficher un message à l'utilisateur
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimer) {
        window.clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  return (
    <div className="bg-white text-brand-text min-h-screen">

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

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-extrabold text-brand-primary mb-2">Informations de livraison</h1>
          <p className="text-brand-text/80 mb-8">Renseignez vos coordonnées pour finaliser la commande.</p>

          <div className="mb-6">
            <MinimumOrderBanner />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Le récapitulatif est maintenant sur /panier */}

            {/* Coordonnées */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-brand-text">Nom complet</label>
                <input type="text" name="fullName" id="full-name" autoComplete="name" required value={formData.fullName} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-text">Adresse email</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-brand-text">Numéro de téléphone</label>
                <input type="tel" name="phone" id="phone" autoComplete="tel" required value={formData.phone} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-brand-text">N°</label>
                <input id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="streetLine1" className="block text-sm font-medium text-brand-text">Adresse (n° et rue)</label>
                <div className="mt-1">
                  <AddressAutocomplete
                    id="streetLine1"
                    value={formData.streetLine1}
                    onChange={(addr) => setFormData((prev) => ({ ...prev, streetLine1: addr }))}
                    onSelect={(props) => setFormData((prev) => ({
                      ...prev,
                      houseNumber: props.housenumber || prev.houseNumber,
                      streetLine1: props.label,
                      postcode: props.postcode || prev.postcode,
                      city: props.city || prev.city,
                    }))}
                    placeholder="Ex: 10 rue de la Paix, Paris"
                  />
                </div>
                <p className="mt-1 text-xs text-brand-text/70">Autocomplétion par API Adresse data.gouv.fr</p>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="streetLine2" className="block text-sm font-medium text-brand-text">Complément d’adresse (optionnel)</label>
                <input id="streetLine2" name="streetLine2" value={formData.streetLine2} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-brand-text">Code postal</label>
                <input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-brand-text">Ville</label>
                <input id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="comments" className="block text-sm font-medium text-brand-text">Commentaires (optionnel)</label>
                <textarea id="comments" name="comments" rows={3} value={formData.comments} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link href="/panier" className="inline-flex items-center justify-center px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white text-sm font-semibold">← Retour au panier</Link>
              <div />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 hover:bg-[#1AA39A]/90 shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
              >
                Passer au paiement
              </button>
              {totalItems <= 0 && (
                <p className="mt-2 text-center text-xs text-red-600">Votre panier est vide. Ajoutez des articles depuis le menu avant de payer.</p>
              )}
            </div>
          </form>
        </div>
      </main>
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
                <p className="mt-1 text-sm sm:text-base font-semibold">Ajoutez des articles avant de continuer au paiement.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer global géré par RootLayout */}
    </div>
  );
}
