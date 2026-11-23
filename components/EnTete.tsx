import Link from "next/link";
import { Suspense } from "react";
import BoutonHasard from "./BoutonHasard";
import CompteurFavoris from "./CompteurFavoris";
import IndicateurSacoche from "./IndicateurSacoche";
import LienNav from "./LienNav";

export default function EnTete() {
  return (
    <header className="bg-pokedex text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold">
          Pokédex
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 whitespace-nowrap">
          <Suspense fallback={<span>Tous</span>}>
            <LienNav href="/">Tous</LienNav>
          </Suspense>
          <Suspense fallback={<span>Favoris</span>}>
            <LienNav href="/favoris">
              Favoris
              <CompteurFavoris />
            </LienNav>
          </Suspense>
          <BoutonHasard />
          <IndicateurSacoche />
        </nav>
      </div>
    </header>
  );
}
