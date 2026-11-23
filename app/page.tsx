import { Suspense } from "react";
import BarreRecherche from "@/components/BarreRecherche";
import FiltreTypes from "@/components/FiltreTypes";
import GrillePokemons from "@/components/GrillePokemons";
import Pagination from "@/components/Pagination";
import SqueletteGrille from "@/components/SqueletteGrille";
import {
  recupererNomsFrancais,
  recupererNomsParType,
  recupererPlusieurs,
  recupererTousLesNoms,
} from "@/lib/pokeapi";
import { estType } from "@/lib/types";

type Parametres = { q?: string; type?: string; page?: string };

type Props = {
  searchParams: Promise<Parametres>;
};

const PAR_PAGE = 24;

// « Évoli » → « evoli » : la recherche ignore accents et majuscules.
function normaliser(texte: string) {
  return texte.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function Accueil({ searchParams }: Props) {
  return (
    <>
      <h1 className="mb-6 text-4xl font-black">Pokédex</h1>
      <Suspense fallback={<input disabled placeholder="Rechercher un Pokémon" aria-label="Rechercher un Pokémon" className="w-full rounded-full border border-black/10 px-5 py-3" />}>
        <BarreRecherche />
      </Suspense>
      <Suspense fallback={<SqueletteGrille />}>
        <ResultatsSelonAdresse searchParams={searchParams} />
      </Suspense>
    </>
  );
}

// La clé change avec l'adresse : le Suspense repart de zéro et affiche le squelette
// à chaque nouvelle page ou recherche, au lieu de garder l'ancienne grille à l'écran.
async function ResultatsSelonAdresse({ searchParams }: Props) {
  const parametres = await searchParams;
  return (
    <Suspense key={JSON.stringify(parametres)} fallback={<SqueletteGrille />}>
      <Resultats parametres={parametres} />
    </Suspense>
  );
}

async function Resultats({ parametres }: { parametres: Parametres }) {
  const { q = "", type = "", page = "1" } = parametres;

  let noms = estType(type) ? await recupererNomsParType(type) : await recupererTousLesNoms();
  const texte = normaliser(q.trim());
  if (texte) {
    // Recherche sur le nom anglais de l'API et sur le nom français.
    const francais: Record<string, string> = await recupererNomsFrancais().catch(() => ({}));
    noms = noms.filter((nom) => nom.includes(texte) || normaliser(francais[nom] ?? "").includes(texte));
  }

  const nombrePages = Math.max(1, Math.ceil(noms.length / PAR_PAGE));
  const pageCourante = Math.min(Math.max(1, Number(page) || 1), nombrePages);
  const visibles = noms.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);
  const pokemons = await recupererPlusieurs(visibles);

  return (
    <>
      <FiltreTypes q={q} typeActif={estType(type) ? type : ""} />
      <p className="my-4 text-sm text-gray-500">{noms.length} Pokémon</p>
      <GrillePokemons pokemons={pokemons} />
      <Pagination page={pageCourante} nombrePages={nombrePages} q={q} type={estType(type) ? type : ""} />
    </>
  );
}
