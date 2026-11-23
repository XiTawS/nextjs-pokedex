import type { Pokemon, PokemonApi } from "@/types/pokemon";

export const API = "https://pokeapi.co/api/v2";

export function versPokemon(brut: PokemonApi): Pokemon {
  return {
    id: brut.id,
    nom: brut.name,
    image:
      brut.sprites.other["official-artwork"].front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${brut.id}.png`,
    types: brut.types.map((t) => t.type.name),
    taille: brut.height / 10,
    poids: brut.weight / 10,
    stats: brut.stats.map((s) => ({ nom: s.stat.name, valeur: s.base_stat })),
  };
}
