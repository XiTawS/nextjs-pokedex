import { formaterNombre } from "@/lib/conversion";
import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";
import BarresStats from "./BarresStats";
import BoutonFavori from "./BoutonFavori";
import BoutonSacoche from "./BoutonSacoche";
import GrillePokemons from "./GrillePokemons";
import ImagePokemon from "./ImagePokemon";

export default function FichePokemon({
  pokemon,
  evolutions,
}: {
  pokemon: Pokemon;
  evolutions: Pokemon[];
}) {
  return (
    <article className="grid gap-8 md:grid-cols-2">
      {/* Le GIF de Showdown est petit (≈ 100 px) : agrandi en gardant des pixels nets. */}
      <ImagePokemon
        sources={[pokemon.sprite, pokemon.image]}
        alt={pokemon.nomAffiche}
        width={400}
        height={400}
        loading="eager"
        className="mx-auto h-72 w-auto object-contain [image-rendering:pixelated]"
      />
      <div>
        <p className="font-mono text-gray-500">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <h1 className="mb-2 text-4xl font-bold wrap-anywhere">
          {pokemon.nomAffiche}
        </h1>
        <div className="mb-4 flex gap-2">
          {pokemon.types.map((type) => (
            <BadgeType key={type} type={type} />
          ))}
        </div>
        <p className="mb-4">
          {formaterNombre(pokemon.taille)} m · {formaterNombre(pokemon.poids)}{" "}
          kg
        </p>
        <div className="mb-6 flex items-center gap-3">
          <BoutonSacoche pokemon={pokemon} />
          <BoutonFavori nom={pokemon.nom} libelle={pokemon.nomAffiche} />
        </div>
        <BarresStats stats={pokemon.stats} />
      </div>
      {evolutions.length > 0 && (
        <section className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Évolutions</h2>
          {evolutions.length === 1 ? (
            <p className="text-gray-500">{pokemon.nomAffiche} n’évolue pas.</p>
          ) : (
            <GrillePokemons pokemons={evolutions} />
          )}
        </section>
      )}
    </article>
  );
}
