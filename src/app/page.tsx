import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="p-1 rounded-full logo-ring">
            <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 object-cover rounded-full" />
          </div>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/menu"
              className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
            >
              Menu
            </Link>
            <Link
              href="/commande"
              className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
            >
              Commander
            </Link>
          </nav>
        </div>
      </header>

      <main className="text-center py-20 px-4 sm:px-6 lg:px-8">
        <div 
          className="mx-auto max-w-5xl h-96 bg-cover bg-center rounded-lg shadow-xl" 
          style={{ backgroundImage: "url('/images/image.png')" }}
        >
          {/* L'image de fond est ici */}
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
              className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
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
