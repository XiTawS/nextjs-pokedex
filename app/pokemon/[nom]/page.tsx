import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FichePokemon from "@/components/FichePokemon";
import {
  recupererDetails,
  recupererEvolutions,
  recupererPlusieurs,
  recupererPokemon,
  recupererTousLesNoms,
} from "@/lib/pokeapi";

type Props = {
  params: Promise<{ nom: string }>;
};

export async function generateStaticParams() {
  const noms = await recupererTousLesNoms();
  return noms.slice(0, 151).map((nom) => ({ nom }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) return { title: "Pokémon introuvable" };

  const titre = pokemon.nomAffiche;
  return {
    title: titre,
    description: `${titre} : types, statistiques et évolutions.`,
    openGraph: { images: [pokemon.image] },
  };
}

// Le squelette de loading.tsx s'affiche pendant le chargement, y compris d'un Pokémon à l'autre.
export default async function PageFiche({ params }: Props) {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) notFound();

  const [evolutions, details, tous] = await Promise.all([
    recupererEvolutions(pokemon.id).then(recupererPlusieurs),
    recupererDetails(pokemon.id),
    recupererTousLesNoms(),
  ]);
  // Voisins dans l'ordre du Pokédex (les formes, n° 10001 et plus, n'en ont pas).
  const rang = tous.indexOf(pokemon.nom);
  const precedent = rang > 0 ? tous[rang - 1] : null;
  const suivant = rang >= 0 && rang < tous.length - 1 ? tous[rang + 1] : null;

  return (
    <FichePokemon
      pokemon={pokemon}
      evolutions={evolutions}
      details={details}
      precedent={precedent}
      suivant={suivant}
    />
  );
}
