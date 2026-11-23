# Chapitre 2 — JavaScript moderne

> Manipuler des données et appeler une API · 260 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Variables, types et conditions

`l-2-1` · 30 min

Pour tester les exemples de ce chapitre, créez un fichier `labo.mjs` hors du projet et lancez-le avec `node labo.mjs`.

### Déclarer

`labo.mjs`

```js
const nom = "Pikachu";   // const : ne peut pas être réassignée
let niveau = 5;          // let : peut changer
niveau = niveau + 1;

const estLegendaire = false;   // booléen
const evolution = null;        // absence voulue de valeur
let surnom;                    // undefined : pas encore de valeur
```

> **Note** — Utilisez `const` par défaut, `let` seulement si la valeur change. N'utilisez plus `var`.

### Chaînes à gabarit

```js
const id = 25;
const message = `Le Pokémon n°${id} s’appelle ${nom}`;
const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
```

### Conditions et comparaisons

```js
if (niveau >= 16) {
  console.log("Peut évoluer");
} else {
  console.log("Trop jeune");
}

const etiquette = niveau >= 16 ? "Évolué" : "De base";   // ternaire

const affichage = surnom ?? nom;      // ?? : valeur de secours si null ou undefined
const longueur = surnom?.length;      // ?. : ne plante pas si surnom est undefined
```

> **Piège** — Comparez toujours avec `===` et `!==`. Le double égal `==` convertit les types en silence : `"25" == 25` vaut vrai.

**Quiz** — Que vaut `surnom ?? "Inconnu"` si `surnom` vaut `undefined` ?

- `undefined`
- ✅ `"Inconnu"`
- Une erreur
- `null`

> **Explication** — L'opérateur `??` renvoie la valeur de droite quand celle de gauche est `null` ou `undefined`.

**Texte à trous** — Quel mot-clé déclare une variable qui ne sera jamais réassignée ? `____ api = "https://pokeapi.co/api/v2";`

> **Réponse** — `const`

#### Exercice — Formater un numéro

Écrivez une expression qui transforme l'identifiant `7` en `"#007"` et `150` en `"#150"`. Indice : la méthode `padStart` des chaînes.

<details><summary>Voir la correction</summary>

```js
const numero = `#${String(id).padStart(3, "0")}`;
```

</details>

## Fonctions et fonctions fléchées

`l-2-2` · 30 min

Une fonction reçoit des paramètres et renvoie une valeur. En React, un composant *est* une fonction : cette leçon est donc centrale.

`labo.mjs`

```js
// Déclaration classique
function formaterNumero(id) {
  return `#${String(id).padStart(3, "0")}`;
}

// Fonction fléchée, équivalente
const formaterNumero2 = (id) => {
  return `#${String(id).padStart(3, "0")}`;
};

// Fléchée courte : une seule expression, le return est implicite
const enMetres = (decimetres) => decimetres / 10;

// Valeur par défaut d’un paramètre
const urlListe = (limite = 20, decalage = 0) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${decalage}`;

console.log(formaterNumero(7));   // #007
console.log(urlListe());          // ...?limit=20&offset=0
```

### Les fonctions sont des valeurs

On peut passer une fonction en argument d'une autre. C'est ce que vous ferez avec `map`, `filter` et les gestionnaires d'événements.

```js
const appliquer = (valeur, transformation) => transformation(valeur);
appliquer(4, enMetres);            // 0.4
appliquer(4, (n) => n * 100);      // 400
```

**Quiz** — Que renvoie `const double = (n) => { n * 2 };` quand on appelle `double(4)` ?

- 8
- 4
- ✅ `undefined`
- Une erreur

> **Explication** — Avec des accolades, il faut écrire `return`. Sans accolades, `(n) => n * 2` renvoie bien 8.

#### Exercice — Deux utilitaires du Pokédex

Écrivez `capitaliser("pikachu")` qui renvoie `"Pikachu"`, et `enKilos(60)` qui convertit des hectogrammes en kilogrammes.

<details><summary>Voir la correction</summary>

```js
const capitaliser = (texte) => texte.charAt(0).toUpperCase() + texte.slice(1);
const enKilos = (hectogrammes) => hectogrammes / 10;
```

</details>

## Objets, tableaux et déstructuration

`l-2-3` · 50 min

`labo.mjs`

```js
const pikachu = {
  id: 25,
  nom: "pikachu",
  types: ["electric"],
  stats: { pv: 35, attaque: 55 },
};

pikachu.nom;            // "pikachu"
pikachu.stats.pv;       // 35
pikachu.types[0];       // "electric"
pikachu["nom"];         // même chose, utile si la clé est dans une variable
```

### Déstructurer

La déstructuration extrait des valeurs en une ligne. React l'utilise partout : pour les props et pour `useState`.

```js
const { id, nom, types } = pikachu;          // objet
const [premierType, secondType] = types;     // tableau
const { stats: { pv } } = pikachu;           // imbriquée

// Directement dans les paramètres d’une fonction
const presenter = ({ nom, id }) => `${nom} (#${id})`;
presenter(pikachu);                          // "pikachu (#25)"
```

### Copier avec l'opérateur de décomposition

```js
const favoris = ["pikachu", "evoli"];
const plusUn = [...favoris, "mewtwo"];             // nouveau tableau, l’ancien est intact
const raichu = { ...pikachu, id: 26, nom: "raichu" };   // copie avec deux champs remplacés
```

> **Note** — En React, on ne modifie jamais un tableau ou un objet d'état. On en crée une copie modifiée. Les trois points servent à cela.

**Quiz** — Après `const [a, b] = ["feu", "vol"];`, que vaut `b` ?

- ✅ `"vol"`
- `"feu"`
- `["feu", "vol"]`
- `undefined`

> **Explication** — La déstructuration d'un tableau suit l'ordre des éléments.

**Quiz** — Quelle ligne ajoute `"mew"` aux favoris *sans modifier* le tableau d'origine ?

- `favoris.push("mew")`
- `favoris[favoris.length] = "mew"`
- ✅ `const suite = [...favoris, "mew"]`
- `favoris = "mew"`

> **Explication** — `push` modifie le tableau existant. La décomposition en crée un nouveau.

#### Exercice — Extraire depuis l'API

À partir de l'objet ci-dessous, obtenez en une seule déstructuration les variables `name`, `height` et `premierType` (qui vaut `"fire"`).

```js
const brut = { name: "charizard", height: 17, types: [{ type: { name: "fire" } }, { type: { name: "flying" } }] };
```

<details><summary>Voir la correction</summary>

```js
const { name, height, types: [{ type: { name: premierType } }] } = brut;
```

</details>

## Transformer des listes : map, filter, find, reduce

`l-2-4` · 50 min

Un Pokédex, c'est une liste que l'on transforme, filtre et trie. Ces méthodes renvoient toutes un nouveau résultat sans toucher au tableau d'origine.

`labo.mjs`

```js
const pokemons = [
  { id: 1, nom: "bulbizarre", types: ["grass", "poison"], poids: 69 },
  { id: 4, nom: "salameche", types: ["fire"], poids: 85 },
  { id: 6, nom: "dracaufeu", types: ["fire", "flying"], poids: 905 },
  { id: 25, nom: "pikachu", types: ["electric"], poids: 60 },
];

// map : transformer chaque élément (même longueur)
const noms = pokemons.map((p) => p.nom);
// ["bulbizarre", "salameche", "dracaufeu", "pikachu"]

// filter : garder ceux qui passent le test
const feu = pokemons.filter((p) => p.types.includes("fire"));

// find : le premier qui passe le test, ou undefined
const pika = pokemons.find((p) => p.nom === "pikachu");

// some / every : au moins un / tous
const unLourd = pokemons.some((p) => p.poids > 500);   // true

// reduce : réduire la liste à une seule valeur
const poidsTotal = pokemons.reduce((somme, p) => somme + p.poids, 0);   // 1119

// sort modifie le tableau : on trie une copie
const parPoids = [...pokemons].sort((a, b) => b.poids - a.poids);

// Enchaîner
const nomsFeu = pokemons
  .filter((p) => p.types.includes("fire"))
  .map((p) => p.nom.toUpperCase());
```

| Méthode | Renvoie | Usage dans le Pokédex |
| --- | --- | --- |
| `map` | Un tableau de même longueur | Transformer chaque Pokémon en carte |
| `filter` | Un tableau plus court ou égal | Recherche, filtre par type |
| `find` | Un élément ou `undefined` | Retrouver une statistique par son nom |
| `slice` | Une portion du tableau | Pagination |

**Quiz** — Que renvoie `[60, 85, 905].filter((p) => p > 100)` ?

- `[false, false, true]`
- ✅ `[905]`
- `905`
- `[60, 85]`

> **Explication** — `filter` renvoie toujours un tableau, contenant les éléments pour lesquels le test est vrai.

**Quiz** — Vous voulez afficher une carte par Pokémon. Quelle méthode ?

- `filter`
- `find`
- `reduce`
- ✅ `map`

> **Explication** — `map` transforme chaque élément : ici chaque Pokémon devient une carte.

#### Exercice — Mini-moteur de recherche

Écrivez `rechercher(pokemons, texte)` qui renvoie les Pokémon dont le nom contient le texte, sans tenir compte des majuscules, triés par nom.

<details><summary>Voir la correction</summary>

```js
const rechercher = (pokemons, texte) =>
  pokemons
    .filter((p) => p.nom.includes(texte.trim().toLowerCase()))
    .sort((a, b) => a.nom.localeCompare(b.nom));
```

`filter` renvoie déjà un nouveau tableau, on peut donc le trier directement.

</details>

## Modules : import et export

`l-2-5` · 30 min

Un projet réel répartit le code dans de nombreux fichiers. Chaque fichier est un **module** : il exporte ce qu'il offre, et importe ce dont il a besoin.

`outils.mjs`

```js
// Exports nommés : autant qu’on veut par fichier
export const API = "https://pokeapi.co/api/v2";
export function formaterNumero(id) {
  return `#${String(id).padStart(3, "0")}`;
}

// Export par défaut : un seul par fichier
export default function capitaliser(texte) {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}
```

`labo.mjs`

```js
import capitaliser, { API, formaterNumero } from "./outils.mjs";

console.log(capitaliser("pikachu"), formaterNumero(25), API);
```

> **Note** — Dans Next.js, les pages et composants utilisent l'export par défaut. Les fonctions utilitaires et les types utilisent des exports nommés. L'alias `@/` désigne la racine du projet : `import { API } from "@/lib/pokeapi"`.

**Quiz** — Comment importer un export *nommé* `formaterNumero` ?

- ✅ `import { formaterNumero } from "./outils.mjs"`
- `import formaterNumero from "./outils.mjs"`
- `require formaterNumero`
- `import * from "./outils.mjs"`

> **Explication** — Les accolades désignent un export nommé. Sans accolades, on importe l'export par défaut.

## Asynchrone : promesses, async/await et fetch

`l-2-6` · 70 min

Un appel réseau prend du temps. JavaScript ne s'arrête pas pour attendre : il reçoit une **promesse**, un objet qui représente un résultat à venir. Une promesse est en attente, puis tenue (avec une valeur) ou rejetée (avec une erreur).

### async et await

`labo.mjs`

```js
async function recupererPokemon(nom) {
  const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`);
  const donnees = await reponse.json();
  return donnees;
}

const pikachu = await recupererPokemon("pikachu");
console.log(pikachu.id, pikachu.name, pikachu.height);
```

- `fetch(url)` renvoie une promesse de réponse.
- `await` met la fonction en pause jusqu'au résultat, sans bloquer le reste du programme.
- `reponse.json()` lit le corps et le convertit en objet. C'est aussi une promesse.
- Une fonction `async` renvoie toujours une promesse.

### Gérer les erreurs

> **Piège** — `fetch` ne lève pas d'erreur sur un 404 ou un 500. Il ne rejette que si le réseau est coupé. Vous devez tester `reponse.ok` vous-même.

```js
async function recupererPokemon(nom) {
  const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`);
  if (!reponse.ok) {
    throw new Error(`La PokéAPI a répondu ${reponse.status} pour ${nom}`);
  }
  return reponse.json();
}

try {
  const inconnu = await recupererPokemon("pikachuu");
  console.log(inconnu.name);
} catch (erreur) {
  console.error("Échec :", erreur.message);
}
```

### Plusieurs appels en parallèle

```js
// Lent : chaque appel attend la fin du précédent
const a = await recupererPokemon("bulbasaur");
const b = await recupererPokemon("charmander");

// Rapide : les deux appels partent en même temps
const [c, d] = await Promise.all([
  recupererPokemon("bulbasaur"),
  recupererPokemon("charmander"),
]);
```

**Quiz** — Que contient `const r = fetch(url);` (sans `await`) ?

- Les données JSON
- La réponse HTTP
- ✅ Une promesse
- `undefined`

> **Explication** — Sans `await`, vous tenez la promesse, pas son résultat.

**Quiz** — L'API répond 404. Que fait `await fetch(url)` ?

- Il lève une erreur
- ✅ Il renvoie une réponse dont `ok` vaut `false`
- Il renvoie `null`
- Il réessaie tout seul

> **Explication** — La requête a abouti du point de vue du réseau. À vous de vérifier `reponse.ok` ou `reponse.status`.

**Texte à trous** — Complétez : `const donnees = ____ reponse.json();`

> **Réponse** — `await`

---

**TP Pokédex**

#### Étape 1 — Premier contact avec la PokéAPI

Toujours dans `labo.mjs`, hors du projet Next.js :

- [ ] Appeler `/pokemon?limit=10` et afficher les 10 noms
- [ ] Récupérer le détail des 10 Pokémon avec `Promise.all`
- [ ] Afficher pour chacun une ligne du type `#001 bulbasaur — grass, poison`
- [ ] Provoquer une erreur 404 et l'attraper proprement

<details><summary>Voir la correction</summary>

`labo.mjs`

```js
const API = "https://pokeapi.co/api/v2";

async function appeler(chemin) {
  const reponse = await fetch(`${API}${chemin}`);
  if (!reponse.ok) throw new Error(`Erreur ${reponse.status} sur ${chemin}`);
  return reponse.json();
}

const liste = await appeler("/pokemon?limit=10");
const details = await Promise.all(liste.results.map((p) => appeler(`/pokemon/${p.name}`)));

for (const p of details) {
  const numero = `#${String(p.id).padStart(3, "0")}`;
  const types = p.types.map((t) => t.type.name).join(", ");
  console.log(`${numero} ${p.name} — ${types}`);
}

try {
  await appeler("/pokemon/pikachuu");
} catch (erreur) {
  console.error(erreur.message);
}
```

</details>

---
