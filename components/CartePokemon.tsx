import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";

type Props = {
  pokemon: Pokemon;
};

export default function CartePokemon({ pokemon }: Props) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <span className="block text-left font-mono text-sm text-gray-500">{numero}</span>
      <img src={pokemon.image} alt={pokemon.nom} width={160} height={160} className="mx-auto" />
      <h2 className="mb-2 text-lg font-semibold capitalize">{pokemon.nom}</h2>
      <div className="flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => (
          <BadgeType key={type} type={type} />
        ))}
      </div>
    </article>
  );
}
