"use client";
import { House, Shuffle, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useTirage } from "@/hooks/useTirage";
import { useFavoris } from "@/stores/favoris";
import { useSacoche } from "@/stores/sacoche";
import IconePokeball from "./IconePokeball";

const ELEMENT = "flex flex-col items-center gap-0.5 py-2 text-[0.6875rem] font-medium transition";

// Barre d'onglets en bas de l'écran, sur téléphone (comme la maquette).
export default function NavigationMobile() {
  return <Barre chemin={usePathname()} />;
}

// Exportée pour servir de repli (sans onglet actif) pendant que le chemin se résout.
export function Barre({ chemin }: { chemin: string | null }) {
  const favoris = useFavoris((etat) => etat.noms.length);
  const equipe = useSacoche((etat) => etat.equipe.length);
  const { tirer, enCours } = useTirage();

  const onglet = (href: string, libelle: string, Icone: ComponentType<{ className?: string }>, compteur = 0) => {
    const actif = chemin !== null && (href === "/" ? chemin === "/" : chemin.startsWith(href));
    return (
      <li>
        <Link
          href={href}
          aria-current={actif ? "page" : undefined}
          className={`${ELEMENT} ${actif ? "text-pokedex" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="relative">
            <Icone className="size-6" />
            {compteur > 0 && (
              <span className="absolute -right-2 -top-1 grid min-w-4 place-items-center rounded-full bg-pokedex px-1 text-[0.625rem] font-bold leading-4 text-white">
                {compteur}
              </span>
            )}
          </span>
          {libelle}
        </Link>
      </li>
    );
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden dark:border-white/10 dark:bg-gray-950/90"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {onglet("/", "Pokédex", House)}
        {onglet("/favoris", "Favoris", Star, favoris)}
        {onglet("/sacoche", "Sacoche", IconePokeball, equipe)}
        <li>
          <button
            onClick={tirer}
            disabled={enCours}
            className={`${ELEMENT} w-full text-gray-500 disabled:opacity-50 dark:text-gray-400`}
          >
            <Shuffle className="size-6" />
            Au hasard
          </button>
        </li>
      </ul>
    </nav>
  );
}
