import GrillePokemons from "@/components/GrillePokemons";
import { exemples } from "@/data/exemples";

export default function Accueil() {
  return (
    <main>
      <h1>Mon Pokédex</h1>
      <GrillePokemons pokemons={exemples} />
    </main>
  );
}
