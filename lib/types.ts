export const TYPES: Record<string, { libelle: string; classe: string }> = {
  normal: { libelle: "Normal", classe: "bg-type-normal" },
  fire: { libelle: "Feu", classe: "bg-type-fire" },
  water: { libelle: "Eau", classe: "bg-type-water" },
  electric: { libelle: "Électrik", classe: "bg-type-electric" },
  grass: { libelle: "Plante", classe: "bg-type-grass" },
  ice: { libelle: "Glace", classe: "bg-type-ice" },
  fighting: { libelle: "Combat", classe: "bg-type-fighting" },
  poison: { libelle: "Poison", classe: "bg-type-poison" },
  ground: { libelle: "Sol", classe: "bg-type-ground" },
  flying: { libelle: "Vol", classe: "bg-type-flying" },
  psychic: { libelle: "Psy", classe: "bg-type-psychic" },
  bug: { libelle: "Insecte", classe: "bg-type-bug" },
  rock: { libelle: "Roche", classe: "bg-type-rock" },
  ghost: { libelle: "Spectre", classe: "bg-type-ghost" },
  dragon: { libelle: "Dragon", classe: "bg-type-dragon" },
  dark: { libelle: "Ténèbres", classe: "bg-type-dark" },
  steel: { libelle: "Acier", classe: "bg-type-steel" },
  fairy: { libelle: "Fée", classe: "bg-type-fairy" },
};

// Object.hasOwn plutôt que `in` : "constructor" ou "__proto__" (venus de l'adresse) ne sont pas des types.
export function estType(type: string): boolean {
  return Object.hasOwn(TYPES, type);
}

// Couleur vive du type, pour les grands fonds décoratifs (le texte blanc n'y est pas lisible).
export function teinteVive(type: string): string {
  return estType(type) ? `var(--color-vif-${type})` : "var(--color-gray-400)";
}

export function teinteType(type: string): string {
  return estType(type) ? `var(--color-type-${type})` : "var(--color-gray-500)";
}
