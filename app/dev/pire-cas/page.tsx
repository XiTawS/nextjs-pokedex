// Banc d'essai break-ui : affiche la grille et la fiche avec plusieurs jeux de données.
// Réservé au développement : 404 en production.
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FichePokemon from "@/components/FichePokemon";
import GrillePokemons from "@/components/GrillePokemons";
import {
  demo,
  demoEvolutions,
  detailsAsexue,
  detailsDemo,
  detailsPireCas,
  detailsUnSeul,
  pireCas,
  pireCasEvolutions,
  unSeul,
} from "@/data/fixtures-pokemon";

const JEUX = {
  demo: { libelle: "Démo", grille: demo, fiche: demo[1], evolutions: demoEvolutions, details: detailsDemo },
  pire: { libelle: "Pire cas", grille: pireCas, fiche: pireCas[0], evolutions: pireCasEvolutions, details: detailsPireCas },
  vide: { libelle: "Vide", grille: [], fiche: pireCas[6], evolutions: [], details: detailsAsexue },
  un: { libelle: "Un seul", grille: unSeul, fiche: unSeul[0], evolutions: unSeul, details: detailsUnSeul },
};

type Props = { searchParams: Promise<{ data?: string }> };

export default function PagePireCas({ searchParams }: Props) {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <Suspense>
      <Contenu searchParams={searchParams} />
    </Suspense>
  );
}

async function Contenu({ searchParams }: Props) {
  const { data = "demo" } = await searchParams;
  const cle = (Object.hasOwn(JEUX, data) ? data : "demo") as keyof typeof JEUX;
  const jeu = JEUX[cle];

  return (
    <div className="grid gap-12 pb-20">
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Grille</h2>
        <GrillePokemons pokemons={jeu.grille} />
      </section>
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Fiche</h2>
        <FichePokemon
          pokemon={jeu.fiche}
          evolutions={jeu.evolutions}
          details={jeu.details}
          precedent="bulbasaur"
          suivant="ivysaur"
        />
      </section>
      <nav
        aria-label="Jeu de données"
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-gray-200 p-1 font-sans text-xs shadow"
      >
        {Object.entries(JEUX).map(([valeur, { libelle }]) => (
          <Link
            key={valeur}
            href={`/dev/pire-cas?data=${valeur}`}
            className={`whitespace-nowrap rounded-full px-3 py-1 ${valeur === cle ? "bg-white text-black shadow-sm" : "text-gray-600"}`}
          >
            {libelle}
          </Link>
        ))}
      </nav>
    </div>
  );
}
