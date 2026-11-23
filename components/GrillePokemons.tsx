import type { Pokemon } from "@/types/pokemon";
import CartePokemon from "./CartePokemon";

export default function GrillePokemons({ pokemons }: { pokemons: Pokemon[] }) {
  if (pokemons.length === 0) {
    return <p>Aucun Pokémon à afficher.</p>;
  }
  return (
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <CartePokemon pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}
