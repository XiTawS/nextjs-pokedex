import CartePokemon from "@/components/CartePokemon";
import { recupererPokemon } from "@/lib/pokeapi";

export default async function Accueil() {
  const pikachu = await recupererPokemon("pikachu");
  if (!pikachu) return <p>Pokémon introuvable.</p>;
  return <CartePokemon pokemon={pikachu} />;
}
