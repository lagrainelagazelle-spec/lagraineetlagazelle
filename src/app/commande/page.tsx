"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DropdownMenu from '@/components/DropdownMenu';
import CartIndicator from '@/components/CartIndicator';
import CartTotal from '@/components/CartTotal';
import CartSummaryButton from '@/components/CartSummaryButton';

export default function CommandePage() {
  type OrderItem = { product: string; quantity: number };
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    items: [{ product: '', quantity: 4 }] as OrderItem[],
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
      return { ...prev, items: updated };
    });
  };

  const addItemRow = () => {
    setFormData((prev) => ({ ...prev, items: [...prev.items, { product: '', quantity: 1 }] }));
  };

  const removeItemRow = (index: number) => {
    setFormData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Validation: au moins 4 plats (clés qui commencent par "couscous_")
      const couscousCount = formData.items
        .filter((it) => it.product.startsWith('couscous_'))
        .reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
      if (couscousCount < 4) {
        alert('Minimum 4 couscous pour valider la commande.');
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

  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/menu" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" />
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
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
            <span>À partir de 4 plats. Prévoir jusqu’à 48h selon disponibilité.</span>
            <span className="hidden sm:inline">·</span>
            <a href="tel:0692154474" className="font-bold text-brand-primary underline-offset-2 hover:underline">0692 15 44 74</a>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-extrabold text-brand-primary mb-2">Passez votre précommande</h1>
          <p className="text-brand-text/80 mb-8">Remplissez les informations ci-dessous pour valider votre commande.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-brand-text">
                Nom complet
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fullName"
                  id="full-name"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-text">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-text">
                Numéro de téléphone
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                />
              </div>
            </div>
            
            {/* Lignes d'articles */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-brand-text">Articles</label>
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-8">
                    <label className="text-xs text-brand-text/70">Produit</label>
                    <select
                      value={item.product}
                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                      required
                    >
                      <option value="">Sélectionnez un produit</option>
                      <optgroup label="La Graine - Couscous">
                        <option value="couscous_royal">Couscous Royal — 20,00 €</option>
                        <option value="couscous_merguez">Couscous Merguez — 16,50 €</option>
                        <option value="couscous_poulet">Couscous Poulet — 16,50 €</option>
                        <option value="couscous_boulettes">Couscous Boulettes — 17,50 €</option>
                        <option value="couscous_2_viandes">Couscous 2 Viandes — 18,50 €</option>
                        <option value="couscous_vegetarien">Couscous Végétarien — 14,00 €</option>
                      </optgroup>
                      <optgroup label="La Gazelle - Pâtisseries">
                        <option value="corne_gazelle_piece">Corne de gazelle — 2,50 € / pièce</option>
                        <option value="macrouts_piece">Macrouts — 2,20 € / pièce</option>
                        <option value="montecaos_cannelle_piece">Montecaos cannelle — 2,00 € / pièce</option>
                        <option value="caprilu_citron_piece">Caprilu au citron — 3,00 € / pièce</option>
                        <option value="coffret_mix_6">Coffret mix 6 pièces — 12,50 €</option>
                        <option value="coffret_mix_12">Coffret mix 12 pièces — 24,90 €</option>
                        <option value="coffret_mix_18">Coffret mix 18 pièces — 37,90 €</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-xs text-brand-text/70">Quantité</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      className="w-full px-3 py-2 rounded-md border text-sm text-brand-text hover:bg-gray-50"
                      aria-label="Supprimer l'article"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={addItemRow}
                  className="px-4 py-2 rounded-md border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white text-sm font-semibold"
                >
                  + Ajouter un article
                </button>
                <p className="mt-2 text-xs text-brand-text/70">Minimum 4 couscous au total pour la commande.</p>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-brand-text">
                Adresse de livraison
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-brand-text">
                Commentaires (optionnel)
              </label>
              <div className="mt-1">
                <textarea
                  id="comments"
                  name="comments"
                  rows={3}
                  value={formData.comments}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                ></textarea>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
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
