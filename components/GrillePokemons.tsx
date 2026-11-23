import type { Pokemon } from "@/types/pokemon";
import CartePokemon from "./CartePokemon";

export default function GrillePokemons({ pokemons }: { pokemons: Pokemon[] }) {
  if (pokemons.length === 0) {
    return <p>Aucun Pokémon à afficher.</p>;
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <CartePokemon pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}
