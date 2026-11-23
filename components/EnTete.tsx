import Link from "next/link";
import { Suspense } from "react";
import CompteurFavoris from "./CompteurFavoris";
import IndicateurSacoche from "./IndicateurSacoche";
import LienNav from "./LienNav";

export default function EnTete() {
  return (
    <header className="bg-pokedex text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Pokédex
        </Link>
        <nav className="flex items-center gap-4">
          <Suspense fallback={<span>Tous</span>}>
            <LienNav href="/">Tous</LienNav>
          </Suspense>
          <Suspense fallback={<span>Favoris</span>}>
            <LienNav href="/favoris">
              Favoris
              <CompteurFavoris />
            </LienNav>
          </Suspense>
          <IndicateurSacoche />
        </nav>
      </div>
    </header>
  );
}
