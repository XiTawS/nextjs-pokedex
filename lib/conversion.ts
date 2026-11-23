import type { Pokemon, PokemonApi } from "@/types/pokemon";

export const API = "https://pokeapi.co/api/v2";

// Repli quand le nom français manque (formes comme « charizard-mega-x ») : « Charizard Mega X ».
export function formaterNom(nom: string): string {
  return nom.split("-").map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1)).join(" ");
}

export function versPokemon(brut: PokemonApi, nomFrancais?: string): Pokemon {
  return {
    id: brut.id,
    nom: brut.name,
    nomAffiche: nomFrancais ?? formaterNom(brut.name),
    image:
      brut.sprites.other["official-artwork"].front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${brut.id}.png`,
    types: brut.types.map((t) => t.type.name),
    taille: brut.height / 10,
    poids: brut.weight / 10,
    stats: brut.stats.map((s) => ({ nom: s.stat.name, valeur: s.base_stat })),
  };
}
