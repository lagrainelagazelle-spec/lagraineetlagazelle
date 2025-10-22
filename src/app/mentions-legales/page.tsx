export const metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-widest text-brand-primary text-center">MENTIONS LÉGALES</h1>
        <div className="mt-6 space-y-6 text-brand-text/90">
          <section>
            <h2 className="text-lg font-bold text-brand-text">Éditeur du site</h2>
            <p>La Graine et La Gazelle<br />Email: lagrainelagazelle@gmail.com</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Hébergement</h2>
            <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Propriété intellectuelle</h2>
            <p>L’ensemble des contenus du site (textes, images, logos) est protégé. Toute reproduction non autorisée est interdite.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Responsabilité</h2>
            <p>Les informations publiées le sont à titre indicatif. La Graine et La Gazelle ne saurait être tenue responsable d’une mauvaise utilisation du site.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Contact</h2>
            <p>Pour toute question: lagrainelagazelle@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}


