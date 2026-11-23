import { cacheLife } from "next/cache";
import type { DetailsPokemon, Pokemon, PokemonApi } from "@/types/pokemon";
import { API, formaterNom, versPokemon } from "./conversion";

// Le build pré-génère 151 fiches en parallèle : la PokéAPI refuse parfois une connexion
// ou répond 429/503. On réessaie deux fois avant d'abandonner.
async function appeler<T>(adresse: string, essaisRestants = 2): Promise<T | null> {
  const reessayer = async () => {
    await new Promise((fin) => setTimeout(fin, 1000));
    return appeler<T>(adresse, essaisRestants - 1);
  };
  let reponse: Response;
  try {
    reponse = await fetch(adresse.startsWith("http") ? adresse : `${API}${adresse}`);
  } catch (erreur) {
    if (essaisRestants > 0) return reessayer();
    throw erreur;
  }
  if ((reponse.status === 429 || reponse.status === 503) && essaisRestants > 0) return reessayer();
  if (reponse.status === 404) return null;
  if (!reponse.ok) {
    throw new Error(`La PokéAPI a répondu ${reponse.status} pour ${adresse}`);
  }
  return reponse.json() as Promise<T>;
}

const GRAPHQL = "https://graphql.pokeapi.co/v1beta2";
const REQUETE_NOMS = `query {
  pokemonspecies(order_by: { id: asc }) {
    pokemons(where: { is_default: { _eq: true } }) { name }
    pokemonspeciesnames(where: { language_id: { _eq: 5 } }) { name }
  }
}`;

type EspecesGraphql = {
  data: { pokemonspecies: { pokemons: { name: string }[]; pokemonspeciesnames: { name: string }[] }[] };
};

// L'API GraphQL de la PokéAPI limite le nombre d'appels (429) : on réessaie deux fois, puis on abandonne.
async function appelerGraphql<T>(query: string, essaisRestants = 2): Promise<T> {
  const reponse = await fetch(GRAPHQL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (reponse.status === 429 && essaisRestants > 0) {
    await new Promise((fin) => setTimeout(fin, 3000));
    return appelerGraphql<T>(query, essaisRestants - 1);
  }
  if (!reponse.ok) throw new Error(`L'API GraphQL de la PokéAPI a répondu ${reponse.status}`);
  return reponse.json() as Promise<T>;
}

// Les 1 025 noms français en une seule requête GraphQL (l'API REST demanderait un appel par espèce).
// Clé : nom de l'API (« charizard »), valeur : nom français (« Dracaufeu »).
export async function recupererNomsFrancais(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("days");
  const { data } = await appelerGraphql<EspecesGraphql>(REQUETE_NOMS);
  return Object.fromEntries(
    data.pokemonspecies.flatMap((espece) =>
      espece.pokemons[0] && espece.pokemonspeciesnames[0]
        ? [[espece.pokemons[0].name, espece.pokemonspeciesnames[0].name]]
        : []
    )
  );
}

export async function recupererPokemon(nom: string): Promise<Pokemon | null> {
  "use cache";
  const [brut, nomsFrancais] = await Promise.all([
    appeler<PokemonApi>(`/pokemon/${encodeURIComponent(nom.toLowerCase())}`),
    recupererNomsFrancais().catch(() => null),
  ]);
  // Sans les noms français (GraphQL en panne), le résultat ne reste en cache que quelques minutes.
  if (nomsFrancais) cacheLife("days");
  else cacheLife("minutes");
  return brut ? versPokemon(brut, nomsFrancais?.[brut.name]) : null;
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

type Maillon = {
  species: { name: string; url: string };
  evolves_to: Maillon[];
};

// Renvoie les numéros d'espèce, lus dans species.url (".../pokemon-species/710/").
// Le nom d'espèce ne suffit pas : pour 37 espèces (pumpkaboo, giratina…), /pokemon/{nom} répond 404,
// alors que /pokemon/{numéro} renvoie toujours la forme par défaut.
function aplatir(maillon: Maillon): string[] {
  const numero = maillon.species.url.split("/").filter(Boolean).at(-1)!;
  return [numero, ...maillon.evolves_to.flatMap(aplatir)];
}

export async function recupererEvolutions(id: number): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const espece = await appeler<{ evolution_chain: { url: string } }>(`/pokemon-species/${id}`);
  if (!espece) return [];
  const chaine = await appeler<{ chain: Maillon }>(espece.evolution_chain.url);
  return chaine ? aplatir(chaine.chain) : [];
}

export const TOTAL_POKEMONS = 1025;

export async function recupererTousLesNoms(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const page = await appeler<{ results: { name: string }[] }>(`/pokemon?limit=${TOTAL_POKEMONS}`);
  if (!page) throw new Error("La liste des Pokémon est introuvable");
  return page.results.map((p) => p.name);
}

export async function recupererNomsParType(type: string): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const [tous, donnees] = await Promise.all([
    recupererTousLesNoms(),
    appeler<{ pokemon: { pokemon: { name: string } }[] }>(`/type/${type}`),
  ]);
  if (!donnees) return [];
  const duType = new Set(donnees.pokemon.map((p) => p.pokemon.name));
  return tous.filter((nom) => duType.has(nom));
}

// filtre : une condition GraphQL écrite par ce fichier (jamais une saisie de l'utilisateur).
const requeteDetails = (filtre: string) => `query {
  pokemon(where: ${filtre}, order_by: { id: asc }) {
    id
    pokemonabilities(where: { is_hidden: { _eq: false } }, order_by: { slot: asc }, limit: 1) {
      ability { name abilitynames(where: { language_id: { _eq: 5 } }) { name } }
    }
    pokemonspecy {
      gender_rate
      evolves_from_species_id
      pokemonspeciesflavortexts(where: { language_id: { _eq: 5 } }, order_by: { version_id: desc }, limit: 1) { flavor_text }
      pokemonevolutions(limit: 1) { min_level }
    }
  }
}`;

type PokemonDetailsGraphql = {
  id: number;
  pokemonabilities: { ability: { name: string; abilitynames: { name: string }[] } }[];
  pokemonspecy: {
    gender_rate: number;
    evolves_from_species_id: number | null;
    pokemonspeciesflavortexts: { flavor_text: string }[];
    pokemonevolutions: { min_level: number | null }[];
  } | null;
};
type DetailsGraphql = { data: { pokemon: PokemonDetailsGraphql[] } };

const DETAILS_VIDES: DetailsPokemon = {
  description: null,
  talent: null,
  pourcentageFemelles: null,
  evolueDUneAutreEspece: false,
  niveauEvolution: null,
};

function versDetails(pokemon: PokemonDetailsGraphql): DetailsPokemon {
  const espece = pokemon.pokemonspecy;
  const talent = pokemon.pokemonabilities[0]?.ability;
  const texte = espece?.pokemonspeciesflavortexts[0]?.flavor_text;
  return {
    // Les textes du jeu contiennent des retours à la ligne et des espaces fines insécables.
    description: texte ? texte.replace(/\s+/g, " ").replace(/\u202f/g, "\u00a0") : null,
    talent: talent ? (talent.abilitynames[0]?.name ?? formaterNom(talent.name)) : null,
    // gender_rate : huitièmes de femelles, -1 pour un Pokémon asexué.
    pourcentageFemelles: !espece || espece.gender_rate < 0 ? null : (espece.gender_rate / 8) * 100,
    evolueDUneAutreEspece: Boolean(espece?.evolves_from_species_id),
    niveauEvolution: espece?.pokemonevolutions[0]?.min_level ?? null,
  };
}

// Les détails des 1 025 Pokémon en une requête (≈ 370 ko, 4 s), mise en cache plusieurs jours.
// Une requête par fiche dépassait la limite de l'API au build (151 fiches → 429).
async function recupererTousLesDetails(): Promise<Record<number, DetailsPokemon>> {
  "use cache";
  cacheLife("days");
  const { data } = await appelerGraphql<DetailsGraphql>(requeteDetails(`{ id: { _lte: ${TOTAL_POKEMONS} } }`));
  return Object.fromEntries(data.pokemon.map((pokemon) => [pokemon.id, versDetails(pokemon)]));
}

// Ce que la fiche montre en plus des données de base : description, talent, genre, évolution.
export async function recupererDetails(id: number): Promise<DetailsPokemon> {
  "use cache";
  cacheLife("days");
  if (id <= TOTAL_POKEMONS) return (await recupererTousLesDetails())[id] ?? DETAILS_VIDES;
  // Formes (Méga, Gigamax…, n° 10001 et plus) : rares, demandées une à une.
  const { data } = await appelerGraphql<DetailsGraphql>(requeteDetails(`{ id: { _eq: ${Math.trunc(id)} } }`));
  return data.pokemon[0] ? versDetails(data.pokemon[0]) : DETAILS_VIDES;
}
