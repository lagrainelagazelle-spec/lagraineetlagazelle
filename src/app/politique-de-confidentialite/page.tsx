export const metadata = { title: "Politique de confidentialité" };

export default function ConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-widest text-brand-primary text-center">POLITIQUE DE CONFIDENTIALITÉ</h1>
        <div className="mt-6 space-y-6 text-brand-text/90">
          <section>
            <h2 className="text-lg font-bold text-brand-text">Données collectées</h2>
            <ul className="list-disc ml-5">
              <li>Coordonnées: nom, email, téléphone</li>
              <li>Adresse de livraison</li>
              <li>Contenu du panier et informations de paiement via Stripe</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Finalités</h2>
            <ul className="list-disc ml-5">
              <li>Traitement des commandes et livraison</li>
              <li>Facturation et obligations légales</li>
              <li>Amélioration du service</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Base légale</h2>
            <p>Exécution d’un contrat (commande) et obligations légales.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Destinataires</h2>
            <p>Prestataires: Stripe (paiement), Google Sheets (suivi), Resend (emails).</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Durée de conservation</h2>
            <p>Durée nécessaire au traitement puis archivage légal.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Vos droits</h2>
            <p>Accès, rectification, effacement, opposition. Contact: lagrainelagazelle@gmail.com</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Sécurité</h2>
            <p>Mesures raisonnables pour protéger les données.</p>
          </section>
        </div>
      </div>
    </main>
  );
}


