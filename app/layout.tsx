import "./couches.css"; // en premier : déclare l'ordre des couches CSS
import "./globals.css";
import type { Metadata } from "next";
import CodeKonami from "@/components/CodeKonami";
import EcranDemarrage from "@/components/EcranDemarrage";
import EnTete from "@/components/EnTete";
import HydratationStores from "@/components/HydratationStores";
import NavigationMobile, { Barre } from "@/components/NavigationMobile";
import PiedDePage from "@/components/PiedDePage";
import { Theme } from "@astryxdesign/core/theme";
import { Suspense } from "react";
import { defaultThemeSlug, themes } from "@/astryx-themes";

export const metadata: Metadata = {
  title: { default: "Pokédex", template: "%s · Pokédex" },
  description: "Les 1 025 Pokémon, leurs types et leurs statistiques.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <EcranDemarrage />
        <Theme theme={themes[defaultThemeSlug]}>
          <HydratationStores />
          <CodeKonami />
          <EnTete />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
          <PiedDePage />
          <Suspense fallback={<Barre chemin={null} />}>
            <NavigationMobile />
          </Suspense>
        </Theme>
      </body>
    </html>
  );
}
