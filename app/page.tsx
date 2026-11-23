import CartePokemon from "@/components/CartePokemon";
import type { Pokemon } from "@/types/pokemon";

const pikachu: Pokemon = {
  id: 25,
  nom: "pikachu",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  types: ["electric"],
  taille: 0.4,
  poids: 6,
  stats: [{ nom: "hp", valeur: 35 }],
};

export default function Accueil() {
  return (
    <main>
      <h1>Mon Pokédex</h1>
      <CartePokemon pokemon={pikachu} />
    </main>
  );
}
