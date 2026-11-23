import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BadgeType from "@/components/BadgeType";
import BarresStats from "@/components/BarresStats";
import BoutonFavori from "@/components/BoutonFavori";
import BoutonSacoche from "@/components/BoutonSacoche";
import GrillePokemons from "@/components/GrillePokemons";
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

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <Image src={pokemon.image} alt={pokemon.nom} width={400} height={400} loading="eager" />
      <div>
        <p className="font-mono text-gray-500">#{String(pokemon.id).padStart(3, "0")}</p>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-4xl font-bold capitalize">{pokemon.nom}</h1>
          <BoutonFavori nom={pokemon.nom} />
        </div>
        <div className="mb-4 flex gap-2">
          {pokemon.types.map((type) => <BadgeType key={type} type={type} />)}
        </div>
        <p className="mb-4">{pokemon.taille} m · {pokemon.poids} kg</p>
        <div className="mb-6">
          <BoutonSacoche pokemon={pokemon} />
        </div>
        <BarresStats stats={pokemon.stats} />
      </div>
      <section className="md:col-span-2">
        <h2 className="mb-4 text-2xl font-bold">Évolutions</h2>
        <GrillePokemons pokemons={evolutions} />
      </section>
    </article>
  );
}
