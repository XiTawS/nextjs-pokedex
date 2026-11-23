import Link from "next/link";
import { Suspense } from "react";
import BoutonHasard from "./BoutonHasard";
import CompteurFavoris from "./CompteurFavoris";
import IconePokeball from "./IconePokeball";
import IndicateurSacoche from "./IndicateurSacoche";
import LienNav from "./LienNav";

// En-tête sur tablette et ordinateur ; sur téléphone, la barre d'onglets du bas prend le relais.
export default function EnTete() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-black/5 bg-white/85 backdrop-blur md:block dark:border-white/10 dark:bg-gray-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <IconePokeball className="size-7 text-pokedex" />
          Pokédex
        </Link>
        <nav aria-label="Navigation principale" className="flex items-center gap-6 whitespace-nowrap">
          <Suspense fallback={<span>Pokédex</span>}>
            <LienNav href="/">Pokédex</LienNav>
          </Suspense>
          <Suspense fallback={<span>Favoris</span>}>
            <LienNav href="/favoris">
              Favoris
              <CompteurFavoris />
            </LienNav>
          </Suspense>
          <Suspense fallback={<span>Sacoche</span>}>
            <LienNav href="/sacoche">
              Sacoche
              <IndicateurSacoche />
            </LienNav>
          </Suspense>
          <BoutonHasard />
        </nav>
      </div>
    </header>
  );
}
