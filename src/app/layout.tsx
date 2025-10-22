import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Graine Et La Gazelle ",
  description: "Service de livraison de repas: Corne de gazelle, Couscous, Lasbanne, Montecaos... Plats et gourmandises kabyles artisanales et authentiques.",
  openGraph: {
    images: [
      {
        url: "https://lagraineetlagazelle.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "La Graine et La Gazelle – Aperçu",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderBar />
        {children}
        <footer className="bg-white">
          <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-brand-text/60">
            <p>&copy; {new Date().getFullYear()} La Graine et La Gazelle. Tous droits réservés.</p>
            <p className="mt-1">by <a href="https://tech-info-tuto.vercel.app" target="_blank" rel="noopener noreferrer" className="underline text-brand-primary hover:opacity-80">techinfotuto</a></p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a href="/mentions-legales" className="underline hover:opacity-80">Mentions légales</a>
              <a href="/politique-de-confidentialite" className="underline hover:opacity-80">Politique de confidentialité</a>
              <a href="/cookies" className="underline hover:opacity-80">Politique cookies</a>
            </div>
          </div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
