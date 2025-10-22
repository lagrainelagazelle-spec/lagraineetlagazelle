"use client";

import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import DropdownMenu from "@/components/DropdownMenu";
import CartSummaryButton from "@/components/CartSummaryButton";

export default function HeaderBar() {
  return (
    <div className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
      {/* Barre supérieure - réseaux sociaux */}
      <div className="max-w-5xl mx-auto py-1 px-4 sm:px-6 lg:px-8 flex justify-end">
        <SocialLinks />
      </div>
      {/* En-tête principal */}
      <div className="max-w-5xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/menu" className="flex items-center" aria-label="Aller à l’accueil">
          <div className="p-1 rounded-full logo-ring">
            <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full" />
          </div>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 whitespace-nowrap">
          <DropdownMenu />
          <CartSummaryButton />
        </nav>
      </div>
    </div>
  );
}


