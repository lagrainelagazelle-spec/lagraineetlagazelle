import Link from 'next/link';
import Image from 'next/image';

export default function MenuPage() {
  const decorativeImages = [
    '/images/graine.png',
    '/images/graine_1.png',
    '/images/graine_2.png',
    '/images/gazelle.png',
    '/images/gazelle_1.png',
    '/images/gazelle_corne.png',
  ];
  return (
    <div className="bg-white text-brand-text min-h-screen">
      <header className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="p-1 rounded-full logo-ring">
              <img src="/images/logo_lglg.png" alt="La Graine et La Gazelle" className="h-12 w-12 object-cover rounded-full" />
            </div>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="text-sm font-bold px-4 py-2 rounded-md border-2 border-brand-primary border-[#1AA39A] text-brand-primary text-[#1AA39A] bg-transparent hover:bg-brand-primary hover:bg-[#1AA39A] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-brand-secondary">Accueil</Link>
            <Link href="/commande" className="text-sm font-bold px-4 py-2 rounded-md bg-brand-primary bg-[#1AA39A] text-white hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]">Commander</Link>
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

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* En-tête stylisée oriental */}
        <section className="text-center mb-12">
          <p className="mt-4 max-w-2xl mx-auto text-brand-text/90">
            Sélection raffinée inspirée des saveurs d’Orient.
          </p>
          {/* Bandeau défilant de motifs (graines & gazelles) */}
          <div className="mt-8 marquee-container py-4 bg-brand-background/60 rounded-md">
            <div className="marquee-track">
              {decorativeImages.map((src, idx) => (
                <div key={`seq1-${idx}`} className="ground-badge">
                  <Image
                    src={src}
                    alt="Décor oriental"
                    width={220}
                    height={220}
                    className="decorative-image h-20 sm:h-24 md:h-28 w-auto select-none pointer-events-none"
                  />
                </div>
              ))}
              {/* Séquence dupliquée pour boucle fluide */}
              {decorativeImages.map((src, idx) => (
                <div key={`seq2-${idx}`} className="ground-badge" aria-hidden="true">
                  <Image
                    src={src}
                    alt=""
                    width={220}
                    height={220}
                    className="decorative-image h-20 sm:h-24 md:h-28 w-auto select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Récapitulatif détaillé (issu de l'affiche) */}
        <section className="mb-12">
          <h2 className="text-center text-2xl font-extrabold tracking-widest text-brand-primary mb-6">LA GRAINE</h2>
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS ROYAL</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + poulet + merguez + boulettes</p>
              </div>
              <span className="font-bold text-brand-primary">20,00 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS MERGUEZ</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + merguez</p>
              </div>
              <span className="font-bold text-brand-primary">16,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS POULET</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + poulet</p>
              </div>
              <span className="font-bold text-brand-primary">16,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS BOULETTES</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + boulettes</p>
              </div>
              <span className="font-bold text-brand-primary">17,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS 2 VIANDES</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + 2 viandes au choix</p>
              </div>
              <span className="font-bold text-brand-primary">18,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">COUSCOUS VÉGÉTARIEN</p>
                <p className="text-sm text-brand-text/70">Semoule fine, légumes de saison, pois chiches, épices et aromates</p>
              </div>
              <span className="font-bold text-brand-primary">14,00 €</span>
            </div>
          </div>

          {/* Tajines */}
          <div className="mt-8 space-y-5">
            <h3 className="text-center text-xl font-extrabold tracking-widest text-brand-primary mb-2">TAJINES</h3>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">TAJINE POULET ABRICOT</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + poulet + abricots confits et oignons confits</p>
              </div>
              <span className="font-bold text-brand-primary">19,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">TAJINE POULET AMANDES</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + amandes et olives</p>
              </div>
              <span className="font-bold text-brand-primary">19,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">TAJINE KEFTA PRUNEAUX</p>
                <p className="text-sm text-brand-text/70">Base végétarienne + kefta + pruneaux et raisins confits</p>
              </div>
              <span className="font-bold text-brand-primary">18,50 €</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">TAJINE VÉGÉTARIEN</p>
                <p className="text-sm text-brand-text/70">Légumes de saison, pommes de terre, petits pois, piment doux</p>
              </div>
              <span className="font-bold text-brand-primary">17,50 €</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
              <p className="font-semibold text-brand-text">Allergènes</p>
              <p className="mt-1 text-brand-text/80">Gluten, céleri, graines de sésame, fruits à coque.</p>
            </div>
          </div>
        </section>

        {/* Section pâtisseries - La Gazelle */}
        <section className="mb-12">
          <h2 className="text-center text-2xl font-extrabold tracking-widest text-brand-primary mb-6">LA GAZELLE</h2>
          <div className="space-y-5">
            <div className="flex items-start justify-between bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">CORNE DE GAZELLE</p>
                <p className="text-sm text-brand-text/70">6 pièces: 12,50 € — 12 pièces: 23,90 €</p>
              </div>
              <span className="font-bold text-brand-primary">2,50 € / pièce</span>
            </div>
            <div className="flex items-start justify-between bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">MACROUTS</p>
                <p className="text-sm text-brand-text/70">6 pièces: 11 € — 12 pièces: 19,90 €</p>
              </div>
              <span className="font-bold text-brand-primary">2,20 € / pièce</span>
            </div>
            <div className="flex items-start justify-between bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">MONTECAOS CANNELLE</p>
                <p className="text-sm text-brand-text/70">6 pièces: 10,50 € — 12 pièces: 19,90 €</p>
              </div>
              <span className="font-bold text-brand-primary">2,00 € / pièce</span>
            </div>
            <div className="flex items-start justify-between bg-white rounded-md border border-gray-200 p-4 shadow-sm">
              <div>
                <p className="font-extrabold tracking-wide">CAPRILU AU CITRON</p>
                <p className="text-sm text-brand-text/70">6 pièces: 15,00 € — 12 pièces: 30,50 €</p>
              </div>
              <span className="font-bold text-brand-primary">3,00 € / pièce</span>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-semibold text-brand-text">Coffrets</p>
            <ul className="mt-1 text-brand-text/80 list-disc list-inside">
              <li>Mix 6 pièces: 12,50 €</li>
              <li>Mix 12 pièces: 24,90 €</li>
              <li>Mix 18 pièces: 37,90 €</li>
              <li>Quantité supérieure sur demande</li>
            </ul>
            <p className="mt-2 text-xs text-brand-text/60">Allergènes: gluten, fruits à coque et lait.</p>
          </div>
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

        {/* Grille précédente supprimée pour harmoniser la présentation avec l'affiche */}

        {/* CTA de commande */}
        <div className="mt-12 text-center">
          <Link
            href="/commande"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-brand-primary bg-[#1AA39A] hover:bg-brand-primary/90 shadow-md focus:outline-none focus:ring-2 focus:ring-brand-secondary border-2 border-brand-primary border-[#1AA39A]"
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


