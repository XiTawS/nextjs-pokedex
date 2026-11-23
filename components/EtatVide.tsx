import Link from "next/link";
import type { ReactNode } from "react";

// Un état vide qui invite à agir : icône, phrase, lien vers le Pokédex.
export default function EtatVide({
  icone,
  titre,
  texte,
}: {
  icone: ReactNode;
  titre: string;
  texte: string;
}) {
  return (
    <div className="grid place-items-center gap-3 rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
      <span className="grid size-16 place-items-center rounded-full bg-pokedex/10 text-pokedex">
        {icone}
      </span>
      <h2 className="text-lg font-semibold">{titre}</h2>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {texte}
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-pokedex px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
      >
        Parcourir le Pokédex
      </Link>
    </div>
  );
}
