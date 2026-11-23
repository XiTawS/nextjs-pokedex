import type { Metadata } from "next";
import { Inter } from "next/font/google";
import EnTete from "@/components/EnTete";
import HydratationStores from "@/components/HydratationStores";
import PiedDePage from "@/components/PiedDePage";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Pokédex", template: "%s · Pokédex" },
  description: "Les 1 025 Pokémon, leurs types et leurs statistiques.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <HydratationStores />
        <EnTete />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <PiedDePage />
      </body>
    </html>
  );
}
