import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";
import BarresStats from "./BarresStats";
import BoutonFavori from "./BoutonFavori";
import BoutonSacoche from "./BoutonSacoche";
import GrillePokemons from "./GrillePokemons";

export default function FichePokemon({ pokemon, evolutions }: { pokemon: Pokemon; evolutions: Pokemon[] }) {
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
      {evolutions.length > 0 && (
        <section className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Évolutions</h2>
          {evolutions.length === 1 ? (
            <p className="text-gray-500"><span className="capitalize">{pokemon.nom}</span> n’évolue pas.</p>
          ) : (
            <GrillePokemons pokemons={evolutions} />
          )}
        </section>
      )}
    </article>
  );
}
