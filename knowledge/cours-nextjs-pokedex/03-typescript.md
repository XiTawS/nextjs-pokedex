# Chapitre 3 — TypeScript

> Typer les données du Pokédex · 100 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Les types essentiels

`l-3-1` · 45 min

TypeScript est du JavaScript auquel on ajoute des **types**. L'éditeur signale alors les erreurs pendant que vous tapez, et propose l'autocomplétion. Les types disparaissent à la compilation : le navigateur reçoit du JavaScript ordinaire.

`exemples.ts`

```ts
let nom: string = "pikachu";
let id: number = 25;
let capture: boolean = false;
let types: string[] = ["electric"];

// Le plus souvent, TypeScript devine le type tout seul
let poids = 60;          // number
poids = "lourd";         // erreur signalée dans l’éditeur

// Typer une fonction : paramètres et valeur de retour
function formaterNumero(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}
```

### Décrire un objet

```ts
type Statistique = {
  nom: string;
  valeur: number;
};

type Pokemon = {
  id: number;
  nom: string;
  types: string[];
  stats: Statistique[];
  surnom?: string;              // ? : champ optionnel
  image: string | null;         // union : l’un ou l’autre
};

type Vue = "grille" | "liste";  // union de valeurs précises
```

> **Note** — `type` et `interface` décrivent tous deux la forme d'un objet. Ce cours utilise `type` partout, pour rester simple.

### Les valeurs peut-être absentes

```ts
function longueurSurnom(p: Pokemon): number {
  // return p.surnom.length;      erreur : surnom peut être undefined
  return p.surnom?.length ?? 0;   // correct
}
```

**Quiz** — Que signifie `image: string | null` ?

- image est facultatif
- ✅ image vaut soit une chaîne, soit `null`
- image est une liste
- image vaut toujours `null`

> **Explication** — La barre verticale forme une union. TypeScript vous oblige ensuite à traiter le cas `null`.

**Quiz** — Comment déclarer un champ `surnom` facultatif ?

- `surnom: optional`
- `surnom!: string`
- `surnom: string = ""`
- ✅ `surnom?: string`

> **Explication** — Le point d'interrogation après le nom du champ le rend optionnel.

#### Exercice — Typer une fonction

Typez `rechercher` de la leçon 2.4 : elle reçoit une liste de `Pokemon` et un texte, et renvoie une liste de `Pokemon`.

<details><summary>Voir la correction</summary>

```ts
function rechercher(pokemons: Pokemon[], texte: string): Pokemon[] {
  return pokemons.filter((p) => p.nom.includes(texte.trim().toLowerCase()));
}
```

</details>

## Typer les données de l'API

`l-3-2` · 55 min

La PokéAPI renvoie des objets énormes, en anglais, très imbriqués. Une bonne pratique consiste à définir **deux types** : celui de la réponse brute (seulement les champs utiles), et celui que votre application manipule, simple et à plat. Une fonction convertit l'un en l'autre. Si l'API change un jour, un seul endroit du code est à corriger.

### Les génériques, en bref

Un type générique prend un autre type en paramètre, entre chevrons. Vous en lirez souvent : `Promise<Pokemon>` est une promesse qui donnera un Pokémon, `Array<string>` équivaut à `string[]`, `Record<string, number>` est un objet dont les clés sont des chaînes et les valeurs des nombres.

```ts
async function appeler<T>(url: string): Promise<T> {
  const reponse = await fetch(url);
  return reponse.json() as Promise<T>;
}

const liste = await appeler<{ results: { name: string }[] }>("https://pokeapi.co/api/v2/pokemon");
liste.results[0].name;   // l’éditeur connaît la forme de la réponse
```

---

**TP Pokédex**

#### Étape 2 — Les types du Pokédex

Dans le projet Next.js, créez le dossier `types` et ce fichier.

`types/pokemon.ts`

```ts
export type Statistique = {
  nom: string;
  valeur: number;
};

export type Pokemon = {
  id: number;
  nom: string;
  image: string;
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
  sprites: { other: { "official-artwork": { front_default: string | null } } };
};
```

- [ ] Le fichier `types/pokemon.ts` existe
- [ ] J'ai comparé `PokemonApi` avec la vraie réponse de l'API dans le navigateur
- [ ] Je sais expliquer pourquoi il y a deux types

---

**Quiz** — Pourquoi convertir `PokemonApi` en `Pokemon` plutôt que d'utiliser la réponse brute partout ?

- ✅ Pour isoler l'application de la forme de l'API et manipuler des données simples
- Parce que TypeScript l'exige
- Pour que l'application soit plus rapide
- Parce que l'API interdit d'utiliser ses champs

> **Explication** — La conversion se fait à un seul endroit. Les composants reçoivent des données propres, dans les unités voulues.
