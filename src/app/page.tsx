import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-brand-background text-brand-text min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-auto" />
          <nav>
            <Link href="/commande" className="text-sm font-medium hover:text-brand-primary">
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
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-opacity-90 md:py-4 md:text-lg md:px-10"
            >
              Commencer ma précommande
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
