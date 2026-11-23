import { Suspense } from "react";
import BarreRecherche from "@/components/BarreRecherche";
import FiltreTypes from "@/components/FiltreTypes";
import GrillePokemons from "@/components/GrillePokemons";
import SqueletteGrille from "@/components/SqueletteGrille";
import { recupererNomsParType, recupererPlusieurs, recupererTousLesNoms } from "@/lib/pokeapi";
import { estType } from "@/lib/types";

type Props = {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
};

const PAR_PAGE = 24;

export default function Accueil({ searchParams }: Props) {
  return (
    <>
      <h1 className="mb-6 text-4xl font-black">Pokédex</h1>
      <Suspense fallback={<input disabled placeholder="Rechercher un Pokémon" />}>
        <BarreRecherche />
      </Suspense>
      <Suspense fallback={<SqueletteGrille />}>
        <Resultats searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Resultats({ searchParams }: Props) {
  const { q = "", type = "", page = "1" } = await searchParams;

  let noms = estType(type) ? await recupererNomsParType(type) : await recupererTousLesNoms();
  const texte = q.trim().toLowerCase();
  if (texte) noms = noms.filter((nom) => nom.includes(texte));

  const nombrePages = Math.max(1, Math.ceil(noms.length / PAR_PAGE));
  const pageCourante = Math.min(Math.max(1, Number(page) || 1), nombrePages);
  const visibles = noms.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);
  const pokemons = await recupererPlusieurs(visibles);

  return (
    <>
      <FiltreTypes q={q} typeActif={estType(type) ? type : ""} />
      <p className="my-4 text-sm text-gray-500">{noms.length} Pokémon</p>
      <GrillePokemons pokemons={pokemons} />
    </>
  );
}
