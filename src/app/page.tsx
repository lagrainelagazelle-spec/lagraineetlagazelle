import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="p-1 rounded-full logo-ring">
            <Image src="/images/logo_lglg.png" alt="La Graine et La Gazelle" width={48} height={48} className="h-12 w-12 object-cover rounded-full" />
          </div>
          <nav className="flex items-center gap-3 sm:gap-4">
            <details className="relative">
              <summary className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary text-[#1AA39A] bg-transparent hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary cursor-pointer select-none">Menu</summary>
              <div className="dropdown-panel absolute left-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                <div className="py-2">
                  <Link href="/menu#menu-top" className="block px-3 py-2 text-sm font-semibold hover:bg-gray-50">La Graine</Link>
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rubriques</div>
                  <Link href="/menu#la-graine" className="block px-3 py-2 text-sm hover:bg-gray-50">Couscous</Link>
                  <Link href="/menu#les-tajines" className="block px-3 py-2 text-sm hover:bg-gray-50">Tajines</Link>
                  <div className="mt-2 border-t" />
                  <Link href="/menu#la-gazelle" className="block px-3 py-2 text-sm font-semibold hover:bg-gray-50">La Gazelle</Link>
                </div>
              </div>
            </details>
            <Link
              href="/commande"
              className="text-sm font-bold px-4 py-2 rounded-md bg-brand-primary bg-[#1AA39A] text-white hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
            >
              Commander
            </Link>
          </nav>
        </div>
      </header>

      {/* Bandeau d'incitation commande/livraison */}
      <section className="bg-brand-secondary/20 border-y border-brand-secondary/40">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-y-1 sm:gap-x-2 text-sm sm:text-base">
            <span className="font-semibold text-brand-text">Commande & livraison</span>
            <span className="hidden sm:inline">·</span>
            <span>À partir de 4 couscous. Prévoir jusqu’à 48h selon disponibilité.</span>
            <span className="hidden sm:inline">·</span>
            <a href="tel:0692154474" className="font-bold text-brand-primary underline-offset-2 hover:underline">0692 15 44 74</a>
          </div>
        </div>
      </section>

      <main className="text-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Image
            src="/images/acceuil.png"
            alt="La Graine et La Gazelle - visuel d'accueil"
            width={1530}
            height={900}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>

        <h1 className="mt-12 text-4xl font-extrabold text-brand-primary sm:text-5xl md:text-6xl">
          La Graine et La Gazelle
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Bienvenue sur notre site. Découvrez nos produits et passez votre précommande en quelques clics.
        </p>
        <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href="/commande"
              className="text-sm font-bold px-6 py-3 rounded-md bg-brand-primary bg-[#1AA39A] text-white hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
            >
              Commencer ma précommande
            </Link>
          </div>
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
