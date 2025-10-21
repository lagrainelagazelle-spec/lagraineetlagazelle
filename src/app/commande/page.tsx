"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DropdownMenu from '@/components/DropdownMenu';
import CartSummaryButton from '@/components/CartSummaryButton';
import { productPricesCents, productLabels, formatEuroFromCents } from '@/lib/pricing';

export default function CommandePage() {
  type OrderItem = { product: string; quantity: number };
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    items: [] as OrderItem[],
    address: '',
    comments: '',
  });

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

  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/menu" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" />
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 whitespace-nowrap">
            <DropdownMenu />
            <CartSummaryButton />
          </nav>
        </div>
      </header>

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
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-brand-text">Adresse de livraison</label>
                <textarea id="address" name="address" rows={4} required value={formData.address} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="comments" className="block text-sm font-medium text-brand-text">Commentaires (optionnel)</label>
                <textarea id="comments" name="comments" rows={3} value={formData.comments} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link href="/panier" className="inline-flex items-center justify-center px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white text-sm font-semibold">← Retour au panier</Link>
              <div />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 hover:bg-[#1AA39A]/90 shadow-md hover:shadow-lg active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
              >
                Passer au paiement
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-brand-text/60">
          <p>&copy; {new Date().getFullYear()} La Graine et La Gazelle. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
