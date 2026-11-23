import GrillePokemons from "@/components/GrillePokemons";
import { exemples } from "@/data/exemples";

export default function Accueil() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Mon Pokédex</h1>
      <GrillePokemons pokemons={exemples} />
    </>
  );
}
