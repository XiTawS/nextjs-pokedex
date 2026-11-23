// Jeux de données pour /dev/pire-cas (break-ui). Valeurs réelles de la PokéAPI, sauf mention.
import type { Pokemon } from "@/types/pokemon";

export const demo: Pokemon[] = [
  {
    id: 1,
    nom: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    types: ["grass", "poison"],
    taille: 0.7,
    poids: 6.9,
    stats: [
      { nom: "hp", valeur: 45 },
      { nom: "attack", valeur: 49 },
      { nom: "defense", valeur: 49 },
      { nom: "special-attack", valeur: 65 },
      { nom: "special-defense", valeur: 65 },
      { nom: "speed", valeur: 45 },
    ],
  },
  {
    id: 4,
    nom: "charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["fire"],
    taille: 0.6,
    poids: 8.5,
    stats: [
      { nom: "hp", valeur: 39 },
      { nom: "attack", valeur: 52 },
      { nom: "defense", valeur: 43 },
      { nom: "special-attack", valeur: 60 },
      { nom: "special-defense", valeur: 50 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 7,
    nom: "squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    types: ["water"],
    taille: 0.5,
    poids: 9,
    stats: [
      { nom: "hp", valeur: 44 },
      { nom: "attack", valeur: 48 },
      { nom: "defense", valeur: 65 },
      { nom: "special-attack", valeur: 50 },
      { nom: "special-defense", valeur: 64 },
      { nom: "speed", valeur: 43 },
    ],
  },
  {
    id: 25,
    nom: "pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    types: ["electric"],
    taille: 0.4,
    poids: 6,
    stats: [
      { nom: "hp", valeur: 35 },
      { nom: "attack", valeur: 55 },
      { nom: "defense", valeur: 40 },
      { nom: "special-attack", valeur: 50 },
      { nom: "special-defense", valeur: 50 },
      { nom: "speed", valeur: 90 },
    ],
  },
  {
    id: 94,
    nom: "gengar",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    types: ["ghost", "poison"],
    taille: 1.5,
    poids: 40.5,
    stats: [
      { nom: "hp", valeur: 60 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 60 },
      { nom: "special-attack", valeur: 130 },
      { nom: "special-defense", valeur: 75 },
      { nom: "speed", valeur: 110 },
    ],
  },
  {
    id: 149,
    nom: "dragonite",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    types: ["dragon", "flying"],
    taille: 2.2,
    poids: 210,
    stats: [
      { nom: "hp", valeur: 91 },
      { nom: "attack", valeur: 134 },
      { nom: "defense", valeur: 95 },
      { nom: "special-attack", valeur: 100 },
      { nom: "special-defense", valeur: 100 },
      { nom: "speed", valeur: 80 },
    ],
  },
];

export const demoEvolutions: Pokemon[] = [
  {
    id: 4,
    nom: "charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    types: ["fire"],
    taille: 0.6,
    poids: 8.5,
    stats: [
      { nom: "hp", valeur: 39 },
      { nom: "attack", valeur: 52 },
      { nom: "defense", valeur: 43 },
      { nom: "special-attack", valeur: 60 },
      { nom: "special-defense", valeur: 50 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 5,
    nom: "charmeleon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    types: ["fire"],
    taille: 1.1,
    poids: 19,
    stats: [
      { nom: "hp", valeur: 58 },
      { nom: "attack", valeur: 64 },
      { nom: "defense", valeur: 58 },
      { nom: "special-attack", valeur: 80 },
      { nom: "special-defense", valeur: 65 },
      { nom: "speed", valeur: 80 },
    ],
  },
  {
    id: 6,
    nom: "charizard",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    types: ["fire", "flying"],
    taille: 1.7,
    poids: 90.5,
    stats: [
      { nom: "hp", valeur: 78 },
      { nom: "attack", valeur: 84 },
      { nom: "defense", valeur: 78 },
      { nom: "special-attack", valeur: 109 },
      { nom: "special-defense", valeur: 85 },
      { nom: "speed", valeur: 100 },
    ],
  },
];

export const pireCas: Pokemon[] = [
  {
    id: 931,
    nom: "squawkabilly-green-plumage",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/931.png",
    types: ["normal", "flying"],
    taille: 0.6,
    poids: 2.4,
    stats: [
      { nom: "hp", valeur: 82 },
      { nom: "attack", valeur: 96 },
      { nom: "defense", valeur: 51 },
      { nom: "special-attack", valeur: 45 },
      { nom: "special-defense", valeur: 51 },
      { nom: "speed", valeur: 92 },
    ],
  },
  {
    id: 151,
    nom: "mew",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    types: ["psychic"],
    taille: 0.4,
    poids: 4,
    stats: [
      { nom: "hp", valeur: 100 },
      { nom: "attack", valeur: 100 },
      { nom: "defense", valeur: 100 },
      { nom: "special-attack", valeur: 100 },
      { nom: "special-defense", valeur: 100 },
      { nom: "speed", valeur: 100 },
    ],
  },
  {
    id: 10034,
    nom: "charizard-mega-x",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    types: ["fire", "dragon"],
    taille: 1.7,
    poids: 110.5,
    stats: [
      { nom: "hp", valeur: 78 },
      { nom: "attack", valeur: 130 },
      { nom: "defense", valeur: 111 },
      { nom: "special-attack", valeur: 130 },
      { nom: "special-defense", valeur: 85 },
      { nom: "speed", valeur: 100 },
    ],
  },
  {
    id: 925,
    nom: "maushold-family-of-four",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/925.png",
    types: ["normal"],
    taille: 0.3,
    poids: 2.8,
    stats: [
      { nom: "hp", valeur: 74 },
      { nom: "attack", valeur: 75 },
      { nom: "defense", valeur: 70 },
      { nom: "special-attack", valeur: 65 },
      { nom: "special-defense", valeur: 75 },
      { nom: "speed", valeur: 111 },
    ],
  },
  {
    id: 250,
    nom: "ho-oh",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png",
    types: ["fire", "flying"],
    taille: 3.8,
    poids: 199,
    stats: [
      { nom: "hp", valeur: 106 },
      { nom: "attack", valeur: 130 },
      { nom: "defense", valeur: 90 },
      { nom: "special-attack", valeur: 110 },
      { nom: "special-defense", valeur: 154 },
      { nom: "speed", valeur: 90 },
    ],
  },
  {
    id: 982,
    nom: "dudunsparce-two-segment",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99999.png",
    types: ["normal"],
    taille: 3.6,
    poids: 39.2,
    stats: [
      { nom: "hp", valeur: 125 },
      { nom: "attack", valeur: 100 },
      { nom: "defense", valeur: 80 },
      { nom: "special-attack", valeur: 85 },
      { nom: "special-defense", valeur: 75 },
      { nom: "speed", valeur: 55 },
    ],
  },
  {
    id: 790,
    nom: "cosmoem",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/790.png",
    types: ["psychic"],
    taille: 0.1,
    poids: 999.9,
    stats: [
      { nom: "hp", valeur: 43 },
      { nom: "attack", valeur: 29 },
      { nom: "defense", valeur: 131 },
      { nom: "special-attack", valeur: 29 },
      { nom: "special-defense", valeur: 131 },
      { nom: "speed", valeur: 37 },
    ],
  },
];

export const pireCasEvolutions: Pokemon[] = [
  // la plus longue chaîne réelle
  {
    id: 133,
    nom: "eevee",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    types: ["normal"],
    taille: 0.3,
    poids: 6.5,
    stats: [
      { nom: "hp", valeur: 55 },
      { nom: "attack", valeur: 55 },
      { nom: "defense", valeur: 50 },
      { nom: "special-attack", valeur: 45 },
      { nom: "special-defense", valeur: 65 },
      { nom: "speed", valeur: 55 },
    ],
  },
  {
    id: 134,
    nom: "vaporeon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png",
    types: ["water"],
    taille: 1,
    poids: 29,
    stats: [
      { nom: "hp", valeur: 130 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 60 },
      { nom: "special-attack", valeur: 110 },
      { nom: "special-defense", valeur: 95 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 135,
    nom: "jolteon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
    types: ["electric"],
    taille: 0.8,
    poids: 24.5,
    stats: [
      { nom: "hp", valeur: 65 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 60 },
      { nom: "special-attack", valeur: 110 },
      { nom: "special-defense", valeur: 95 },
      { nom: "speed", valeur: 130 },
    ],
  },
  {
    id: 136,
    nom: "flareon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png",
    types: ["fire"],
    taille: 0.9,
    poids: 25,
    stats: [
      { nom: "hp", valeur: 65 },
      { nom: "attack", valeur: 130 },
      { nom: "defense", valeur: 60 },
      { nom: "special-attack", valeur: 95 },
      { nom: "special-defense", valeur: 110 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 196,
    nom: "espeon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png",
    types: ["psychic"],
    taille: 0.9,
    poids: 26.5,
    stats: [
      { nom: "hp", valeur: 65 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 60 },
      { nom: "special-attack", valeur: 130 },
      { nom: "special-defense", valeur: 95 },
      { nom: "speed", valeur: 110 },
    ],
  },
  {
    id: 197,
    nom: "umbreon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png",
    types: ["dark"],
    taille: 1,
    poids: 27,
    stats: [
      { nom: "hp", valeur: 95 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 110 },
      { nom: "special-attack", valeur: 60 },
      { nom: "special-defense", valeur: 130 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 470,
    nom: "leafeon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png",
    types: ["grass"],
    taille: 1,
    poids: 25.5,
    stats: [
      { nom: "hp", valeur: 65 },
      { nom: "attack", valeur: 110 },
      { nom: "defense", valeur: 130 },
      { nom: "special-attack", valeur: 60 },
      { nom: "special-defense", valeur: 65 },
      { nom: "speed", valeur: 95 },
    ],
  },
  {
    id: 471,
    nom: "glaceon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png",
    types: ["ice"],
    taille: 0.8,
    poids: 25.9,
    stats: [
      { nom: "hp", valeur: 65 },
      { nom: "attack", valeur: 60 },
      { nom: "defense", valeur: 110 },
      { nom: "special-attack", valeur: 130 },
      { nom: "special-defense", valeur: 95 },
      { nom: "speed", valeur: 65 },
    ],
  },
  {
    id: 700,
    nom: "sylveon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png",
    types: ["fairy"],
    taille: 1,
    poids: 23.5,
    stats: [
      { nom: "hp", valeur: 95 },
      { nom: "attack", valeur: 65 },
      { nom: "defense", valeur: 65 },
      { nom: "special-attack", valeur: 110 },
      { nom: "special-defense", valeur: 130 },
      { nom: "speed", valeur: 60 },
    ],
  },
];

export const unSeul: Pokemon[] = [
  // Tauros n'évolue pas : sa chaîne ne contient que lui
  {
    id: 128,
    nom: "tauros",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png",
    types: ["normal"],
    taille: 1.4,
    poids: 88.4,
    stats: [
      { nom: "hp", valeur: 75 },
      { nom: "attack", valeur: 100 },
      { nom: "defense", valeur: 95 },
      { nom: "special-attack", valeur: 40 },
      { nom: "special-defense", valeur: 70 },
      { nom: "speed", valeur: 110 },
    ],
  },
];
