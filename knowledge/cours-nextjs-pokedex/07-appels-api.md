# Chapitre 7 — Appels API

> Charger, mettre en cache, gérer les erreurs · 210 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Explorer la PokéAPI

`l-7-1` · 35 min

Avant de coder, on lit la documentation (pokeapi.co/docs/v2) et on teste les adresses dans le navigateur. Voici celles dont le Pokédex a besoin.

| Adresse | Renvoie | Servira pour |
| --- | --- | --- |
| `/pokemon?limit=24&offset=0` | Une page de noms et d'adresses | La liste |
| `/pokemon/{nom ou id}` | Le détail : types, stats, images | Les cartes et la fiche |
| `/type/{nom}` | Tous les Pokémon d'un type | Le filtre par type |
| `/pokemon-species/{id}` | L'espèce : adresse de la chaîne d'évolution, noms traduits | La fiche |
| `/evolution-chain/{id}` | L'arbre des évolutions | La fiche |

### Une liste paginée

`GET /pokemon?limit=2&offset=0`

```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=2&limit=2",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

`limit` est la taille de la page, `offset` le nombre d'éléments à sauter. La page 3 de 24 éléments s'obtient avec `limit=24&offset=48`.

> **Piège** — La liste ne donne que des noms. Pour afficher l'image et les types de 24 Pokémon, il faut 1 appel pour la liste, puis 24 appels de détail. Vous verrez à la leçon 7.3 comment garder cela rapide.

> **Note** — Bon usage d'une API gratuite : ne la bombardez pas. La PokéAPI demande de mettre les réponses en cache, ce que Next.js fait très bien.

**Quiz** — Quelle adresse renvoie les Pokémon n° 49 à 72 ?

- `/pokemon?limit=72&offset=49`
- `/pokemon?page=3`
- ✅ `/pokemon?limit=24&offset=48`
- `/pokemon?limit=48&offset=24`

> **Explication** — On saute les 48 premiers, puis on en prend 24.

#### Exercice — Enquête dans l'API

Dans le navigateur, trouvez : combien de Pokémon ont le type `dragon`, et comment s'appelle Pikachu en français (dans `/pokemon-species/25`, tableau `names`).

<details><summary>Voir la correction</summary>

`/type/dragon` contient un tableau `pokemon` : sa longueur donne le nombre. Dans `names`, l'entrée dont `language.name` vaut `"fr"` donne « Pikachu ». Essayez avec le n° 1 : « Bulbizarre ».

</details>

## Charger des données dans un composant serveur

`l-7-2` · 65 min

Dans Next.js, un composant serveur peut être une fonction `async` et attendre ses données directement. Pas de `useEffect`, pas d'état de chargement à gérer à la main.

> **Note** — La règle de Next.js 16 : toute donnée lue sur le serveur est soit **mise en cache** avec `"use cache"`, soit **affichée sous un `<Suspense>`**. Sinon Next.js signale une erreur en développement, car la page ne pourrait pas s'afficher instantanément. Cette leçon utilise le cache. Le `Suspense` arrive à la leçon 7.4.

`app/page.tsx — première version`

```tsx
async function recupererNoms(): Promise<string[]> {
  "use cache";
  const reponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24");
  const donnees = await reponse.json();
  return donnees.results.map((p: { name: string }) => p.name);
}

export default async function Accueil() {
  const noms = await recupererNoms();

  return (
    <ul>
      {noms.map((nom) => (
        <li key={nom}>{nom}</li>
      ))}
    </ul>
  );
}
```

La directive `"use cache"`, en première ligne d'une fonction `async`, demande à Next.js de mémoriser son résultat. Au prochain appel avec les mêmes arguments, l'API n'est pas interrogée de nouveau.

### Une couche d'accès aux données

On ne laisse pas d'adresses d'API éparpillées dans les pages. Deux fichiers : l'un convertit les données, l'autre les charge. Les pages demandent « donne-moi ce Pokémon », sans savoir d'où il vient.

`lib/conversion.ts`

```ts
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
```

`lib/pokeapi.ts`

```ts
import { cacheLife } from "next/cache";
import type { Pokemon, PokemonApi } from "@/types/pokemon";
import { API, versPokemon } from "./conversion";

async function appeler<T>(adresse: string): Promise<T | null> {
  const reponse = await fetch(adresse.startsWith("http") ? adresse : `${API}${adresse}`);
  if (reponse.status === 404) return null;
  if (!reponse.ok) {
    throw new Error(`La PokéAPI a répondu ${reponse.status} pour ${adresse}`);
  }
  return reponse.json() as Promise<T>;
}

export async function recupererPokemon(nom: string): Promise<Pokemon | null> {
  "use cache";
  cacheLife("days");
  const brut = await appeler<PokemonApi>(`/pokemon/${encodeURIComponent(nom.toLowerCase())}`);
  return brut ? versPokemon(brut) : null;
}
```

- `appeler` parle au réseau. Un 404 n'est pas une panne, c'est « ça n'existe pas » : elle renvoie `null`. Tout autre échec lève une erreur.
- `versPokemon` convertit la réponse brute vers votre type, dans les bonnes unités.
- `recupererPokemon` est ce que le reste de l'application utilise. Son type de retour `Pokemon | null` oblige l'appelant à traiter le cas « introuvable ».

`app/page.tsx`

```tsx
import CartePokemon from "@/components/CartePokemon";
import { recupererPokemon } from "@/lib/pokeapi";

export default async function Accueil() {
  const pikachu = await recupererPokemon("pikachu");
  if (!pikachu) return <p>Pokémon introuvable.</p>;
  return <CartePokemon pokemon={pikachu} />;
}
```

**Quiz** — Pourquoi une page serveur n'a-t-elle pas besoin de `useEffect` pour charger ses données ?

- Parce que les données sont dans `localStorage`
- ✅ Parce qu'elle peut être `async` et attendre les données avant de produire le HTML
- Parce que Next.js appelle `useEffect` à sa place
- Parce que `fetch` est synchrone sur le serveur

> **Explication** — Le composant serveur s'exécute sur le serveur et peut utiliser `await` directement.

**Quiz** — Que fait `"use cache"` en première ligne d'une fonction `async` ?

- Elle transforme la fonction en composant client
- Elle enregistre le résultat dans `localStorage`
- ✅ Elle mémorise le résultat : les appels suivants avec les mêmes arguments ne refont pas le travail
- Elle rend la fonction plus rapide à écrire

> **Explication** — Les arguments servent de clé : `recupererPokemon("pikachu")` et `recupererPokemon("mew")` ont chacun leur entrée.

---

**TP Pokédex**

#### Étape 8 — De vraies données

- [ ] `lib/conversion.ts` et `lib/pokeapi.ts` existent
- [ ] La page d'accueil affiche la carte de Pikachu chargée depuis l'API
- [ ] Avec un nom inexistant, la page affiche « Pokémon introuvable »
- [ ] Je retire `"use cache"` un instant et je lis le message de Next.js, puis je le remets
- [ ] Le fichier `data/exemples.ts` n'est plus utilisé, je le supprime

---

## Appels en parallèle et cache

`l-7-3` · 60 min

### Charger 24 Pokémon d'un coup

`lib/pokeapi.ts — à ajouter`

```ts
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
```

`map` lance les 24 appels sans attendre, et produit 24 promesses. `Promise.all` attend qu'elles soient toutes tenues et renvoie les 24 résultats dans l'ordre. Avec une boucle `for` et un `await` à chaque tour, les appels se suivraient : 24 fois plus long. Le `filter` écarte les éventuels `null`, et son écriture `(p): p is Pokemon` l'indique à TypeScript.

> **Piège** — Si une seule promesse échoue, `Promise.all` échoue en entier. C'est le comportement voulu ici : mieux vaut une erreur claire qu'une grille à trous.

### Régler la durée du cache

Les données d'un Pokémon ne changent presque jamais. `cacheLife`, appelée juste après `"use cache"`, dit combien de temps le résultat reste valable.

| Profil | Pour quelles données |
| --- | --- |
| `cacheLife("seconds")` | Presque du temps réel : un score en direct |
| `cacheLife("minutes")` | Un fil d'actualité |
| `cacheLife("hours")` | Un stock, des prix |
| `cacheLife("days")` | Un catalogue, des articles, des Pokémon |
| `cacheLife("max")` | Des données figées |

| La donnée est | Ce que fait Next.js | Où la placer |
| --- | --- | --- |
| En cache (`"use cache"`) | La calcule une fois, l'inclut dans la page préparée à l'avance | N'importe où |
| Sans cache | La recharge à chaque visite | Dans un composant sous `<Suspense>` |
| Propre à la requête (paramètres de l'adresse, cookies) | La lit à chaque visite | Dans un composant sous `<Suspense>` |

> **Note** — Une fonction `"use cache"` ne s'utilise que sur le serveur. Elle reçoit et renvoie des données simples : texte, nombres, objets, tableaux.

**Quiz** — Que fait `Promise.all` avec un tableau de 24 promesses ?

- ✅ Il attend qu'elles soient toutes tenues et renvoie les 24 résultats dans l'ordre
- Il renvoie le premier résultat arrivé
- Il les exécute l'une après l'autre
- Il ignore celles qui échouent

> **Explication** — Les appels partent ensemble, et l'ordre des résultats suit celui du tableau de départ.

**Quiz** — Pour les données d'un Pokémon, quel réglage de cache convient ?

- Aucun cache : tout redemander à chaque visite
- `cacheLife("seconds")`
- ✅ `cacheLife("days")`
- Un `useState`

> **Explication** — Ces données sont stables. Le cache rend le site rapide et ménage l'API.

---

**TP Pokédex**

#### Étape 9 — La grille complète

`app/page.tsx`

```tsx
import GrillePokemons from "@/components/GrillePokemons";
import { recupererListe } from "@/lib/pokeapi";

export default async function Accueil() {
  const pokemons = await recupererListe(24);
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Pokédex</h1>
      <GrillePokemons pokemons={pokemons} />
    </>
  );
}
```

- [ ] La page d'accueil affiche 24 Pokémon réels, avec image et types
- [ ] Les appels partent en parallèle avec `Promise.all`
- [ ] `recupererPokemon` et `recupererListe` sont en cache pour plusieurs jours
- [ ] Je recharge la page : le deuxième affichage est nettement plus rapide

---

## États de chargement et d'erreur

`l-7-4` · 50 min

Un appel réseau a trois issues : il est en cours, il a réussi, il a échoué. Une application sérieuse prévoit un écran pour chacune.

### Suspense : afficher la page sans attendre

Un `<Suspense>` entoure un composant `async` et affiche son `fallback` en attendant. Next.js envoie tout de suite le reste de la page, puis complète la zone quand les données arrivent. C'est la place obligatoire de tout ce qui n'est pas en cache ou dépend de la requête.

```tsx
import { Suspense } from "react";

export default function Accueil() {
  return (
    <>
      <h1>Pokédex</h1>                       {/* affiché immédiatement */}
      <Suspense fallback={<SqueletteGrille />}>
        <ListeChargee />                     {/* composant serveur async */}
      </Suspense>
    </>
  );
}
```

Le `fallback` idéal est un **squelette** : des blocs gris à la forme du contenu à venir, pour que la page ne saute pas.

`components/SqueletteGrille.tsx`

```tsx
export default function SqueletteGrille({ nombre = 24 }: { nombre?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" aria-busy="true">
      {Array.from({ length: nombre }, (_, i) => (
        <li key={i} className="h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
      ))}
    </ul>
  );
}
```

### loading.tsx

Placé à côté d'une page, ce fichier est un `Suspense` automatique autour de la page entière.

`app/loading.tsx`

```tsx
import SqueletteGrille from "@/components/SqueletteGrille";

export default function Chargement() {
  return <SqueletteGrille />;
}
```

### error.tsx

Ce fichier attrape les erreurs levées pendant le rendu de la page. Il doit être un composant client, et reçoit l'erreur ainsi qu'une fonction `retry` pour recharger la zone en échec.

`app/error.tsx`

```tsx
"use client";

export default function Erreur({ error, retry }: { error: unknown; retry: () => void }) {
  const message = error instanceof Error ? error.message : "Erreur inconnue";
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">Le Pokédex ne répond plus</h2>
      <p className="my-4 text-gray-500">{message}</p>
      <button onClick={() => retry()} className="rounded-full bg-pokedex px-5 py-2 font-semibold text-white">
        Réessayer
      </button>
    </div>
  );
}
```

L'erreur est typée `unknown` : en JavaScript on peut lever n'importe quelle valeur. Le test `instanceof Error` permet de lire son message sans risque.

**Quiz** — Pourquoi `error.tsx` doit-il être un composant client ?

- Pour accéder à la base de données
- Pour être mis en cache
- Ce n'est pas obligatoire
- ✅ Parce qu'il réagit à un clic (réessayer) et attrape aussi les erreurs survenues dans le navigateur

> **Explication** — La fonction `retry` et le bouton demandent de l'interactivité.

**Quiz** — Un composant serveur lit une donnée sans cache. Où doit-il se trouver ?

- ✅ Sous un `<Suspense>`, avec un `fallback`
- Dans le layout racine
- Dans un composant client
- N'importe où

> **Explication** — Next.js peut ainsi envoyer le reste de la page immédiatement et compléter la zone ensuite.

---

**TP Pokédex**

#### Étape 10 — Prévoir l'attente et la panne

- [ ] `SqueletteGrille` et `app/loading.tsx` existent
- [ ] `app/error.tsx` affiche un message et un bouton « Réessayer »
- [ ] Je teste l'erreur en mettant une fausse adresse dans `API`, puis je la rétablis
- [ ] Je teste le chargement en ralentissant le réseau dans les outils du navigateur

---
