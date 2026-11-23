import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";

type Props = {
  pokemon: Pokemon;
};

export default function CartePokemon({ pokemon }: Props) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  return (
    <article>
      <span>{numero}</span>
      <img src={pokemon.image} alt={pokemon.nom} width={160} height={160} />
      <h2>{pokemon.nom}</h2>
      <div>
        {pokemon.types.map((type) => (
          <BadgeType key={type} type={type} />
        ))}
      </div>
    </article>
  );
}
