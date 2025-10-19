import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialLinks from "@/components/SocialLinks";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-white text-brand-text shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-end">
            <SocialLinks />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
