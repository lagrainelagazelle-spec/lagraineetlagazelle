"use client";

import { useState } from 'react';

export default function CommandePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    product: '',
    quantity: 1,
    address: '',
    comments: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          <a href="/" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 object-cover rounded-full" />
            </div>
          </a>
          <nav className="flex items-center gap-3 sm:gap-4">
            <a href="/menu" className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary text-[#1AA39A] bg-transparent hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary transition">
              Menu
            </a>
            <a href="/" className="text-sm font-bold px-4 py-2 rounded-md bg-brand-primary bg-[#1AA39A] text-white hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]">
              Accueil
            </a>
          </nav>
        </div>
      </header>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-brand-text">
                  Choix du produit
                </label>
                <div className="mt-1">
                  <select
                    id="product"
                    name="product"
                    required
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                  >
                    <option value="">Sélectionnez un produit</option>
                    <option value="couscous_royal">Couscous Royal — 20,00 €</option>
                    <option value="couscous_merguez">Couscous Merguez — 16,50 €</option>
                    <option value="couscous_poulet">Couscous Poulet — 16,50 €</option>
                    <option value="couscous_boulettes">Couscous Boulettes — 17,50 €</option>
                    <option value="couscous_2_viandes">Couscous 2 Viandes — 18,50 €</option>
                    <option value="couscous_vegetarien">Couscous Végétarien — 14,00 €</option>
                  </select>
                  <p className="mt-2 text-xs text-brand-text/70">Pour "2 viandes", précisez vos choix (poulet, merguez, boulettes) dans les commentaires.</p>
                </div>
              </div>
               <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-brand-text">
                  Quantité
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="4"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                  />
                  <p className="mt-2 text-xs text-brand-text/70">Minimum 4 couscous par commande.</p>
                </div>
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
