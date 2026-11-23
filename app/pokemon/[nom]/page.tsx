import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FichePokemon from "@/components/FichePokemon";
import {
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

  const titre = pokemon.nom.charAt(0).toUpperCase() + pokemon.nom.slice(1);
  return {
    title: titre,
    description: `${titre} : types, statistiques et évolutions.`,
    openGraph: { images: [pokemon.image] },
  };
}

export default function PageFiche({ params }: Props) {
  return (
    <Suspense fallback={<p>Chargement de la fiche…</p>}>
      <Fiche params={params} />
    </Suspense>
  );
}

async function Fiche({ params }: Props) {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) notFound();

  const evolutions = await recupererPlusieurs(await recupererEvolutions(pokemon.id));

  return <FichePokemon pokemon={pokemon} evolutions={evolutions} />;
}
