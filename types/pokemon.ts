export type Statistique = {
  nom: string;
  valeur: number;
};

export type Pokemon = {
  id: number;
  nom: string;          // nom de l'API, sert dans les adresses : « mr-mime »
  nomAffiche: string;   // nom français officiel : « M. Mime »
  image: string;        // illustration officielle
  sprite: string | null; // GIF animé de Pokémon Showdown, absent pour certains Pokémon récents
  types: string[];
  taille: number;   // en mètres
  poids: number;    // en kilogrammes
  stats: Statistique[];
};

export type PokemonApi = {
  id: number;
  name: string;
  height: number;   // en décimètres
  weight: number;   // en hectogrammes
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    other: {
      "official-artwork": { front_default: string | null };
      showdown?: { front_default: string | null };
    };
  };
};
