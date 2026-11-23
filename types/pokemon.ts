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

export type DetailsPokemon = {
  description: string | null;        // texte du jeu le plus récent, en français
  talent: string | null;             // premier talent non caché : « Brasier »
  pourcentageFemelles: number | null; // null : asexué
  evolueDUneAutreEspece: boolean;
  niveauEvolution: number | null;    // niveau auquel il apparaît, si c'est par le niveau
};
