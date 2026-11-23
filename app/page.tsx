import GrillePokemons from "@/components/GrillePokemons";
import { exemples } from "@/data/exemples";

export default function Accueil() {
  return (
    <main className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <h1 className="mb-6 text-3xl font-bold">Mon Pokédex</h1>
      <GrillePokemons pokemons={exemples} />
    </main>
  );
}
