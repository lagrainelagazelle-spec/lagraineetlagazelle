export const metadata = { title: "Politique cookies" };

export default function CookiesPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-widest text-brand-primary text-center">POLITIQUE COOKIES</h1>
        <div className="mt-6 space-y-6 text-brand-text/90">
          <section>
            <h2 className="text-lg font-bold text-brand-text">Ce que nous utilisons</h2>
            <ul className="list-disc ml-5">
              <li>Cookies essentiels (sécurité, panier)</li>
              <li>Mesure d’audience anonymisée (optionnelle, avec consentement)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-text">Gérer vos préférences</h2>
            <p>Acceptez ou refusez depuis le bandeau cookies. Vous pouvez aussi effacer vos préférences via les réglages du navigateur.</p>
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


