"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import MinimumOrderBanner from '@/components/MinimumOrderBanner';

export default function ConfirmationPage() {
  useEffect(() => {
    try {
      window.localStorage.removeItem('cartItems');
    } catch {}
  }, []);
  return (
    <div className="bg-brand-background text-brand-text min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/menu" className="flex items-center">
            <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-16 w-auto" />
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            {/* Liens sociaux dans le header global via layout.tsx */}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 text-left">
          <MinimumOrderBanner showTotal={false} />
        </div>
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-xl">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="mt-6 text-3xl font-extrabold text-brand-primary">Merci pour votre commande !</h1>
          <p className="mt-4 text-gray-600">Votre précommande a été validée avec succès.</p>
          <p className="mt-2 text-gray-600">Vous recevrez bientôt un email de confirmation contenant les détails de votre commande.</p>
          <div className="mt-8">
            <Link
              href="/menu"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-opacity-90"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>

       <footer className="bg-white">
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} La Graine et La Gazelle. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
