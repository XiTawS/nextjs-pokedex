import GrillePokemons from "@/components/GrillePokemons";
import { recupererListe } from "@/lib/pokeapi";

export default async function Accueil() {
  const pokemons = await recupererListe(24);
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Pokédex</h1>
      <GrillePokemons pokemons={pokemons} />
    </>
  );
}
