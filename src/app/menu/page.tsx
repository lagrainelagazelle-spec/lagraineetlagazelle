import Link from 'next/link';

export default function MenuPage() {
  return (
    <div className="bg-brand-background text-brand-text min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 object-cover rounded-full" />
            </div>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="text-sm font-semibold px-3 py-2 sm:px-4 rounded-md bg-white border-2 border-brand-primary text-brand-primary shadow hover:bg-brand-primary hover:text-white transition focus:outline-none focus:ring-2 focus:ring-brand-secondary">Accueil</Link>
            <Link href="/commande" className="text-sm font-semibold px-3 py-2 sm:px-4 rounded-md bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary">Commander</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* En-tête stylisée oriental */}
        <section className="text-center mb-12">
          <div className="mx-auto inline-block relative">
            <div className="absolute inset-0 -skew-x-6 rounded-full blur-md opacity-20 bg-gradient-to-r from-brand-secondary to-brand-primary" />
            <h1 className="relative text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-wider">
              Menu
            </h1>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-brand-text/90">
            Sélection raffinée inspirée des saveurs d’Orient, présentée avec élégance.
          </p>
        </section>

        {/* Séparateur motif géométrique discret */}
        <div className="relative mb-10">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
          <div className="absolute inset-0 flex justify-center -translate-y-1/2">
            <div className="px-4 bg-brand-background">
              <span className="inline-block text-brand-secondary">✧</span>
              <span className="mx-2 inline-block text-brand-secondary">۞</span>
              <span className="inline-block text-brand-secondary">✧</span>
            </div>
          </div>
        </div>

        {/* Grille du menu */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Entrées */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Entrées</h2>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Briouates aux amandes</p>
                  <p className="text-sm text-brand-text/70">Feuilletés dorés, miel et fleur d’oranger</p>
                </div>
                <span className="text-brand-secondary font-semibold">4,50 €</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Houmous crémeux</p>
                  <p className="text-sm text-brand-text/70">Pois chiches, tahini, huile d’olive</p>
                </div>
                <span className="text-brand-secondary font-semibold">5,90 €</span>
              </li>
            </ul>
          </div>

          {/* Plats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Plats</h2>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Tajine de légumes</p>
                  <p className="text-sm text-brand-text/70">Carottes, courgettes, abricots secs, épices douces</p>
                </div>
                <span className="text-brand-secondary font-semibold">12,90 €</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Couscous poulet</p>
                  <p className="text-sm text-brand-text/70">Semoule fine, pois chiches, bouillon safrané</p>
                </div>
                <span className="text-brand-secondary font-semibold">13,90 €</span>
              </li>
            </ul>
          </div>

          {/* Pâtisseries */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Pâtisseries</h2>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Cornes de gazelle</p>
                  <p className="text-sm text-brand-text/70">Pâte fine, amandes, fleur d’oranger</p>
                </div>
                <span className="text-brand-secondary font-semibold">2,50 €</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Baklava pistache</p>
                  <p className="text-sm text-brand-text/70">Filo croustillante, miel, pistaches</p>
                </div>
                <span className="text-brand-secondary font-semibold">3,20 €</span>
              </li>
            </ul>
          </div>

          {/* Boissons */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">Boissons</h2>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Thé à la menthe</p>
                  <p className="text-sm text-brand-text/70">Traditionnel, servi bien chaud</p>
                </div>
                <span className="text-brand-secondary font-semibold">2,90 €</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Limonade au citron confit</p>
                  <p className="text-sm text-brand-text/70">Notes d’agrume et de fleur d’oranger</p>
                </div>
                <span className="text-brand-secondary font-semibold">3,50 €</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA de commande */}
        <div className="mt-12 text-center">
          <Link
            href="/commande"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-brand-primary hover:bg-opacity-90 shadow-md"
          >
            Commander maintenant
          </Link>
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


