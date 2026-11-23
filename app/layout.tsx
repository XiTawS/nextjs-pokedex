import "./couches.css"; // en premier : déclare l'ordre des couches CSS
import "./globals.css";
import type { Metadata } from "next";
import EnTete from "@/components/EnTete";
import HydratationStores from "@/components/HydratationStores";
import PiedDePage from "@/components/PiedDePage";
import { Theme } from "@astryxdesign/core/theme";
import { defaultThemeSlug, themes } from "@/astryx-themes";

export const metadata: Metadata = {
  title: { default: "Pokédex", template: "%s · Pokédex" },
  description: "Les 1 025 Pokémon, leurs types et leurs statistiques.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Theme theme={themes[defaultThemeSlug]}>
          <HydratationStores />
          <EnTete />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
          <PiedDePage />
        </Theme>
      </body>
    </html>
  );
}
