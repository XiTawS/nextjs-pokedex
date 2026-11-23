import { cacheLife } from "next/cache";
import type { Pokemon, PokemonApi } from "@/types/pokemon";
import { API, versPokemon } from "./conversion";

async function appeler<T>(adresse: string): Promise<T | null> {
  const reponse = await fetch(adresse.startsWith("http") ? adresse : `${API}${adresse}`);
  if (reponse.status === 404) return null;
  if (!reponse.ok) {
    throw new Error(`La PokéAPI a répondu ${reponse.status} pour ${adresse}`);
  }
  return reponse.json() as Promise<T>;
}

export async function recupererPokemon(nom: string): Promise<Pokemon | null> {
  "use cache";
  cacheLife("days");
  const brut = await appeler<PokemonApi>(`/pokemon/${encodeURIComponent(nom.toLowerCase())}`);
  return brut ? versPokemon(brut) : null;
}

export async function recupererPlusieurs(noms: string[]): Promise<Pokemon[]> {
  const pokemons = await Promise.all(noms.map(recupererPokemon));
  return pokemons.filter((p): p is Pokemon => p !== null);
}

export async function recupererListe(limite = 24, decalage = 0): Promise<Pokemon[]> {
  "use cache";
  cacheLife("days");
  const page = await appeler<{ results: { name: string }[] }>(
    `/pokemon?limit=${limite}&offset=${decalage}`
  );
  return page ? recupererPlusieurs(page.results.map((p) => p.name)) : [];
}
