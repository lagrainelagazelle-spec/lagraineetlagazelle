"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie-consent");
      setVisible(!stored);
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", "accepted"); } catch {}
    setVisible(false);
  };
  const reject = () => {
    try { localStorage.setItem("cookie-consent", "rejected"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="rounded-md border border-amber-200 bg-white/95 shadow-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-brand-text/90">
            Nous utilisons des cookies essentiels au bon fonctionnement du site et, avec votre consentement, des cookies de mesure anonymisés. <a href="/cookies" className="underline text-brand-primary hover:opacity-80">En savoir plus</a>.
          </p>
          <div className="flex gap-2">
            <button onClick={reject} className="px-3 py-2 text-sm rounded-md border bg-white hover:bg-brand-background transition">Refuser</button>
            <button onClick={accept} className="px-3 py-2 text-sm rounded-md bg-brand-primary text-white hover:opacity-90 transition">Accepter</button>
          </div>
        </div>
      </div>
    </div>
  );
}


