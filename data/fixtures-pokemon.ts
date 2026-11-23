// Jeux de données pour /dev/pire-cas (break-ui). Valeurs réelles de la PokéAPI, sauf mention.
import type { DetailsPokemon, Pokemon } from "@/types/pokemon";

export const demo: Pokemon[] = [
  {
    id: 1,
    nom: "bulbasaur",
    nomAffiche: "Bulbizarre",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif",
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
    nomAffiche: "Salamèche",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif",
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
    nomAffiche: "Carapuce",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif",
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
    nomAffiche: "Pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif",
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
    nomAffiche: "Ectoplasma",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/94.gif",
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
    nomAffiche: "Dracolosse",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/149.gif",
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
    nomAffiche: "Salamèche",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif",
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
    nomAffiche: "Reptincel",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/5.gif",
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
    nomAffiche: "Dracaufeu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif",
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
    nomAffiche: "Tapatoès",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/931.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/931.gif",
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
    nomAffiche: "Mew",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/151.gif",
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
    nomAffiche: "Charizard Mega X",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10034.gif",
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
    nomAffiche: "Famignol",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/925.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/925.gif",
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
    nomAffiche: "Ho-Oh",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/250.gif",
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
    nomAffiche: "Deusolourdo",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99999.png",
    sprite: null,
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
    nomAffiche: "Cosmovum",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/790.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/790.gif",
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
    nomAffiche: "Évoli",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/133.gif",
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
    nomAffiche: "Aquali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/134.gif",
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
    nomAffiche: "Voltali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/135.gif",
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
    nomAffiche: "Pyroli",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/136.gif",
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
    nomAffiche: "Mentali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/196.gif",
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
    nomAffiche: "Noctali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/197.gif",
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
    nomAffiche: "Phyllali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/470.gif",
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
    nomAffiche: "Givrali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/471.gif",
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
    nomAffiche: "Nymphali",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/700.gif",
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
    nomAffiche: "Tauros",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/128.gif",
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

// Détails de fiche (valeurs réelles, sauf le pire cas)
export const detailsDemo: DetailsPokemon = {
  description: "La flamme de sa queue symbolise sa vitalité. Elle est intense quand il est en pleine forme.",
  talent: "Brasier",
  pourcentageFemelles: 12.5,
  evolueDUneAutreEspece: false,
  niveauEvolution: null,
};

// Pire cas : texte long, talent au nom long, évolution par un moyen autre que le niveau.
export const detailsPireCas: DetailsPokemon = {
  description:
    "Il imite la voix des autres Pokémon et des humains pour défendre son territoire. Les individus au plumage vert sont les plus agressifs de tous, et on raconte qu’ils n’hésitent pas à s’en prendre aux Dresseurs qui s’approchent trop de leur nid.",
  talent: "Querelleur Intimidant",
  pourcentageFemelles: 50,
  evolueDUneAutreEspece: true,
  niveauEvolution: null,
};

export const detailsAsexue: DetailsPokemon = {
  description: "Il ne bouge pas du tout. Il semble attendre que son enveloppe se craquelle.",
  talent: "Fermeté",
  pourcentageFemelles: null,
  evolueDUneAutreEspece: true,
  niveauEvolution: 43,
};

export const detailsUnSeul: DetailsPokemon = {
  description: "Dès qu’il choisit un adversaire, il fonce droit sur lui en fouettant son corps de ses trois queues.",
  talent: "Intimidation",
  pourcentageFemelles: 0,
  evolueDUneAutreEspece: false,
  niveauEvolution: null,
};
