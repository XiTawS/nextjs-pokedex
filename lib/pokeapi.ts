import { cacheLife } from "next/cache";
import type { Pokemon, PokemonApi } from "@/types/pokemon";
import { API, versPokemon } from "./conversion";

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

// Les 1 025 noms français en une seule requête GraphQL (l'API REST demanderait un appel par espèce).
// Clé : nom de l'API (« charizard »), valeur : nom français (« Dracaufeu »).
export async function recupererNomsFrancais(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("days");
  const reponse = await fetch(GRAPHQL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: REQUETE_NOMS }),
  });
  if (!reponse.ok) throw new Error(`L'API GraphQL de la PokéAPI a répondu ${reponse.status}`);
  const { data } = (await reponse.json()) as EspecesGraphql;
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
