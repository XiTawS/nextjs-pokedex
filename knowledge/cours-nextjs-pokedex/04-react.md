# Chapitre 4 — React

> Écrire des composants, gérer l'état · 265 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Composants et JSX

`l-4-1` · 40 min

React découpe l'interface en **composants** : des fonctions qui renvoient ce qu'il faut afficher. On les assemble comme des briques. Le Pokédex sera fait d'une `CartePokemon`, d'un `BadgeType`, d'une `BarreRecherche`, et ainsi de suite.

`components/Titre.tsx`

```tsx
export default function Titre() {
  const total = 1025;
  return (
    <header>
      <h1 className="titre">Pokédex</h1>
      <p>{total} Pokémon à découvrir</p>
    </header>
  );
}
```

### Les règles du JSX

- Le nom d'un composant commence par une majuscule : `<Titre />`. En minuscule, React croit à une balise HTML.
- Un composant renvoie un seul élément racine. Pour grouper sans ajouter de balise, utilisez le fragment `<>…</>`.
- Les accolades insèrent du JavaScript : `{total}`, `{nom.toUpperCase()}`.
- `class` s'écrit `className`, `for` s'écrit `htmlFor`.
- Toute balise se ferme, y compris `<img />` et `<br />`.

`app/page.tsx`

```tsx
import Titre from "@/components/Titre";

export default function Accueil() {
  return (
    <main>
      <Titre />
      <p>Contenu de la page</p>
    </main>
  );
}
```

**Quiz** — Quel JSX est correct ?

- `<div class="carte">`
- `<img src="a.png">`
- ✅ `<p className="nom">{nom}</p>`
- `<carte />` pour utiliser le composant Carte

> **Explication** — En JSX : `className`, balises toujours fermées, composants avec une majuscule.

#### Exercice — Un pied de page

Créez un composant `PiedDePage` qui affiche « Données : PokéAPI », le mot PokéAPI étant un lien vers `https://pokeapi.co`. Affichez-le dans la page d'accueil.

<details><summary>Voir la correction</summary>

`components/PiedDePage.tsx`

```tsx
export default function PiedDePage() {
  return (
    <footer>
      Données : <a href="https://pokeapi.co">PokéAPI</a>
    </footer>
  );
}
```

</details>

## Props et composition

`l-4-2` · 60 min

Les **props** sont les paramètres d'un composant. Le parent les fournit, l'enfant les lit. Elles sont en lecture seule : un composant ne modifie jamais ses props.

`components/BadgeType.tsx`

```tsx
type Props = {
  type: string;
};

export default function BadgeType({ type }: Props) {
  return <span className="badge">{type}</span>;
}
```

```tsx
<BadgeType type="fire" />
<BadgeType type={pokemon.types[0]} />
```

### La prop spéciale children

Ce que vous placez entre la balise ouvrante et la balise fermante d'un composant arrive dans la prop `children`. Cela permet d'écrire des composants « conteneurs ».

`components/Section.tsx`

```tsx
type Props = {
  titre: string;
  children: React.ReactNode;
};

export default function Section({ titre, children }: Props) {
  return (
    <section>
      <h2>{titre}</h2>
      {children}
    </section>
  );
}
```

**Quiz** — Un composant enfant peut-il modifier une prop qu'il a reçue ?

- Oui, avec `props.nom = ...`
- ✅ Non, les props sont en lecture seule
- Oui, mais seulement les nombres
- Oui, avec `setProps`

> **Explication** — Les données descendent du parent vers l'enfant. Pour faire changer quelque chose, l'enfant appelle une fonction reçue en prop.

---

**TP Pokédex**

#### Étape 3 — La carte d'un Pokémon

Créez le dossier `components` à la racine, puis la carte. Elle reçoit un objet `Pokemon` complet. Pour l'instant, l'image est une balise `<img>` classique.

`components/CartePokemon.tsx`

```tsx
import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";

type Props = {
  pokemon: Pokemon;
};

export default function CartePokemon({ pokemon }: Props) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  return (
    <article>
      <span>{numero}</span>
      <img src={pokemon.image} alt={pokemon.nom} width={160} height={160} />
      <h2>{pokemon.nom}</h2>
      <BadgeType type={pokemon.types[0]} />
    </article>
  );
}
```

- [ ] `BadgeType.tsx` et `CartePokemon.tsx` sont créés
- [ ] La page d'accueil affiche une carte Pikachu avec un objet écrit à la main
- [ ] L'éditeur signale une erreur si j'oublie un champ de `Pokemon`

<details><summary>Un objet Pikachu pour tester</summary>

```tsx
const pikachu: Pokemon = {
  id: 25,
  nom: "pikachu",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  types: ["electric"],
  taille: 0.4,
  poids: 6,
  stats: [{ nom: "hp", valeur: 35 }],
};
```

</details>

---

## Listes, clés et affichage conditionnel

`l-4-3` · 60 min

### Afficher une liste

Pour afficher une liste, on transforme un tableau de données en tableau d'éléments avec `map`.

```tsx
<div>
  {pokemon.types.map((type) => (
    <BadgeType key={type} type={type} />
  ))}
</div>
```

> **Piège** — Chaque élément d'une liste porte une prop `key` unique et stable (un identifiant, un nom). React s'en sert pour savoir quel élément a bougé, été ajouté ou supprimé. N'utilisez pas l'index du tableau si la liste peut être triée ou filtrée.

### Afficher sous condition

```tsx
{/* Soit l’un, soit l’autre : ternaire */}
{pokemons.length > 0 ? <Grille pokemons={pokemons} /> : <p>Aucun résultat</p>}

{/* Afficher ou rien : && */}
{estFavori && <span>★</span>}
```

> **Piège** — `{pokemons.length && <Grille />}` affiche le chiffre `0` quand la liste est vide. Écrivez une vraie comparaison : `pokemons.length > 0 &&`.

**Quiz** — Quelle `key` choisir pour une liste de Pokémon filtrable ?

- L'index du tableau
- `Math.random()`
- Aucune, c'est facultatif
- ✅ `pokemon.id`

> **Explication** — L'identifiant est unique et ne change pas quand la liste est filtrée ou triée.

---

**TP Pokédex**

#### Étape 4 — La grille, avec des données écrites à la main

`components/GrillePokemons.tsx`

```tsx
import type { Pokemon } from "@/types/pokemon";
import CartePokemon from "./CartePokemon";

export default function GrillePokemons({ pokemons }: { pokemons: Pokemon[] }) {
  if (pokemons.length === 0) {
    return <p>Aucun Pokémon à afficher.</p>;
  }
  return (
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <CartePokemon pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}
```

- [ ] Un fichier `data/exemples.ts` exporte un tableau de 6 Pokémon écrits à la main
- [ ] `CartePokemon` affiche tous les types avec `map`
- [ ] La page d'accueil affiche la grille des 6 Pokémon
- [ ] Avec un tableau vide, le message « Aucun Pokémon » apparaît

---

## État et événements : useState

`l-4-4` · 60 min

Les props viennent du parent. L'**état** (state) est la mémoire propre d'un composant : une valeur qui change au fil du temps et qui, quand elle change, déclenche un nouvel affichage.

`components/Compteur.tsx`

```tsx
"use client";
import { useState } from "react";

export default function Compteur() {
  const [captures, setCaptures] = useState(0);

  return (
    <button onClick={() => setCaptures(captures + 1)}>
      Pokémon capturés : {captures}
    </button>
  );
}
```

- `useState(0)` renvoie une paire : la valeur actuelle et la fonction qui la remplace.
- Appeler `setCaptures` demande à React de réexécuter le composant avec la nouvelle valeur.
- `"use client"` en première ligne est obligatoire dans Next.js dès qu'un composant utilise un état ou un événement. Le chapitre 6 explique pourquoi.

> **Piège** — Modifier la variable directement (`captures = captures + 1`, ou `liste.push(x)`) ne déclenche aucun affichage. Passez toujours par la fonction de mise à jour, avec une nouvelle valeur.

### Un champ de saisie contrôlé

`components/Recherche.tsx`

```tsx
"use client";
import { useState } from "react";
import type { Pokemon } from "@/types/pokemon";
import GrillePokemons from "./GrillePokemons";

export default function Recherche({ pokemons }: { pokemons: Pokemon[] }) {
  const [texte, setTexte] = useState("");

  const visibles = pokemons.filter((p) => p.nom.includes(texte.toLowerCase()));

  return (
    <>
      <input
        value={texte}
        onChange={(evenement) => setTexte(evenement.target.value)}
        placeholder="Rechercher"
      />
      <p>{visibles.length} résultat(s)</p>
      <GrillePokemons pokemons={visibles} />
    </>
  );
}
```

> **Note** — `visibles` n'est pas un état : il se calcule à partir de `pokemons` et de `texte`. Ne stockez dans l'état que ce qui ne peut pas être recalculé.

### État tableau ou objet

```tsx
const [favoris, setFavoris] = useState<string[]>([]);

const basculer = (nom: string) => {
  setFavoris((actuels) =>
    actuels.includes(nom) ? actuels.filter((n) => n !== nom) : [...actuels, nom]
  );
};
```

**Quiz** — Que renvoie `useState("")` ?

- ✅ Un tableau : la valeur et la fonction de mise à jour
- Seulement la valeur
- Une promesse
- Un objet `{ value, onChange }`

> **Explication** — D'où l'écriture déstructurée `const [texte, setTexte] = useState("")`.

**Quiz** — Pourquoi `favoris.push("mew")` ne met-il pas l'écran à jour ?

- Parce que `push` n'existe pas sur les tableaux
- Parce qu'il manque `await`
- ✅ Parce que React compare les références : le tableau est le même, il ne voit aucun changement
- Parce que les favoris sont des props

> **Explication** — Il faut fournir un nouveau tableau à `setFavoris`.

#### Exercice — Un bouton favori

Créez `BoutonFavori` : un bouton qui affiche ☆ puis ★ quand on clique, et inversement. L'état est un booléen local.

<details><summary>Voir la correction</summary>

`components/BoutonFavori.tsx`

```tsx
"use client";
import { useState } from "react";

export default function BoutonFavori() {
  const [actif, setActif] = useState(false);
  return (
    <button onClick={() => setActif(!actif)} aria-pressed={actif}>
      {actif ? "★" : "☆"}
    </button>
  );
}
```

</details>

## Effets : useEffect et règles des hooks

`l-4-5` · 45 min

Un composant doit rester une fonction de calcul : des props et un état en entrée, du JSX en sortie. Tout ce qui touche à l'extérieur (réseau, minuteur, `localStorage`, titre de l'onglet) passe par un **effet**, exécuté après l'affichage.

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Horloge() {
  const [heure, setHeure] = useState("");

  useEffect(() => {
    const minuteur = setInterval(() => setHeure(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(minuteur);   // nettoyage
  }, []);                                   // dépendances

  return <p>{heure}</p>;
}
```

| Dépendances | L'effet s'exécute |
| --- | --- |
| `[]` | Une fois, après le premier affichage |
| `[nom]` | Après le premier affichage, puis à chaque changement de `nom` |
| Absentes | Après chaque affichage (rarement voulu) |

La fonction renvoyée par l'effet est le **nettoyage**. React l'appelle avant de relancer l'effet et quand le composant disparaît.

### Charger des données côté navigateur

```tsx
const [pokemon, setPokemon] = useState<PokemonApi | null>(null);
const [erreur, setErreur] = useState("");

useEffect(() => {
  let annule = false;
  fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`)
    .then((reponse) => {
      if (!reponse.ok) throw new Error("Pokémon introuvable");
      return reponse.json();
    })
    .then((donnees) => { if (!annule) setPokemon(donnees); })
    .catch((e) => { if (!annule) setErreur(e.message); });
  return () => { annule = true; };
}, [nom]);
```

> **Note** — Avec Next.js, la plupart des chargements se font côté serveur, sans `useEffect` (chapitre 7). Vous retrouverez ce modèle pour la page des favoris, dont la liste n'existe que dans le navigateur.

### Les règles des hooks

- Les hooks (`useState`, `useEffect`…) s'appellent au premier niveau du composant, jamais dans un `if`, une boucle ou une fonction imbriquée.
- Ils s'appellent uniquement dans un composant ou dans un hook personnalisé, dont le nom commence par `use`.

> **Note** — Le chapitre 10 passe tous les hooks en revue et vous apprend à écrire les vôtres.

**Quiz** — Quand s'exécute un effet dont les dépendances sont `[]` ?

- À chaque affichage
- ✅ Une seule fois, après le premier affichage
- Jamais
- Avant le premier affichage

> **Explication** — Un tableau vide signifie « ne dépend de rien » : l'effet n'a aucune raison de se relancer.

**Quiz** — À quoi sert la fonction renvoyée par un effet ?

- À renvoyer le JSX
- À déclarer les dépendances
- À relancer l'effet
- ✅ À nettoyer : arrêter un minuteur, ignorer une réponse devenue inutile

> **Explication** — Sans nettoyage, un minuteur continue de tourner après la disparition du composant.

#### Exercice — Le titre de l'onglet

Écrivez un compteur de captures dont la valeur s'affiche aussi dans le titre de l'onglet du navigateur, par exemple « 3 captures ». Quand le composant disparaît, l'onglet retrouve son titre d'origine.

<details><summary>Voir la correction</summary>

```tsx
"use client";
import { useEffect, useState } from "react";

export default function CompteurOnglet() {
  const [captures, setCaptures] = useState(0);

  useEffect(() => {
    const titreInitial = document.title;
    document.title = `${captures} captures`;
    return () => {
      document.title = titreInitial;
    };
  }, [captures]);

  return <button onClick={() => setCaptures(captures + 1)}>Capturer</button>;
}
```

Le titre de l'onglet est extérieur à React : le mettre à jour est le rôle d'un effet. À l'inverse, n'appelez pas `setState` directement dans le corps d'un effet : ESLint le refuse, car cela provoque un affichage de trop.

</details>
