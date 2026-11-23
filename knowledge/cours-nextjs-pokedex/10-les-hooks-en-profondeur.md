# Chapitre 10 — Les hooks en profondeur

> Choisir le bon hook et écrire les vôtres · 150 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## À quoi servent les hooks

`l-h-1` · 25 min

Vous utilisez des hooks depuis le chapitre 4 : `useState`, `useEffect`, puis `useRouter`, `useSearchParams`, `useFavoris`. Ce chapitre les remet en ordre, présente tous les autres, et vous apprend à écrire les vôtres.

### Le problème que les hooks résolvent

Un composant est une fonction, et une fonction oublie tout entre deux appels. Or React rappelle votre composant à chaque affichage. Un **hook** est une fonction dont le nom commence par `use` et qui « accroche » le composant à une capacité de React :

- **se souvenir** d'une valeur d'un affichage à l'autre (`useState`, `useReducer`, `useRef`) ;
- **agir sur l'extérieur** après l'affichage (`useEffect`) ;
- **lire une valeur partagée** (`useContext`, un store Zustand, l'adresse de la page) ;
- **éviter du travail inutile** (`useMemo`, `useCallback`, `useTransition`).

### Pourquoi les deux règles existent

React ne connaît pas le nom de vos variables d'état. Il les retrouve par leur **ordre d'appel** : le premier `useState` du composant, le deuxième, et ainsi de suite. Si un hook est appelé dans un `if`, l'ordre change d'un affichage à l'autre et React mélange les valeurs.

```tsx
// Interdit : l’ordre des hooks dépend d’une condition
if (pokemon) {
  const [surnom, setSurnom] = useState("");
}

// Correct : le hook est toujours appelé, la condition vient après
const [surnom, setSurnom] = useState("");
if (!pokemon) return null;
```

> **Note** — Règle 1 : toujours au premier niveau du composant, jamais dans une condition, une boucle ou une fonction imbriquée. Règle 2 : uniquement dans un composant ou dans un autre hook. L'extension ESLint de Next.js signale les deux.

### La carte de tous les hooks de React

| Hook | Sert à | Fréquence |
| --- | --- | --- |
| `useState` | Mémoriser une valeur qui déclenche un affichage | Tous les jours |
| `useEffect` | Synchroniser avec l'extérieur après l'affichage | Tous les jours |
| `useRef` | Garder une valeur ou un élément du DOM sans réafficher | Souvent |
| `useContext` | Lire une valeur fournie par un Provider | Souvent |
| `useReducer` | Gérer un état à plusieurs champs par des actions nommées | Parfois |
| `useMemo` | Mémoriser le résultat d'un calcul coûteux | Parfois |
| `useCallback` | Garder la même fonction d'un affichage à l'autre | Parfois |
| `useId` | Produire un identifiant unique et stable | Parfois |
| `useTransition` | Marquer une mise à jour comme non urgente, savoir si elle est en cours | Parfois |
| `useDeferredValue` | Laisser une valeur « en retard » pour garder la saisie fluide | Parfois |
| `useOptimistic` | Afficher tout de suite le résultat espéré d'une action | Parfois |
| `useActionState` | Suivre l'état d'une action de formulaire | Avec les formulaires |
| `useFormStatus` | Savoir si le formulaire parent est en cours d'envoi | Avec les formulaires |
| `use` | Lire une promesse ou un contexte, même dans une condition | Parfois |
| `useLayoutEffect` | Mesurer le DOM avant que l'écran soit peint | Rare |
| `useSyncExternalStore` | S'abonner à une source externe (ce que Zustand fait pour vous) | Rare |
| `useImperativeHandle` | Exposer des méthodes d'un composant à son parent | Rare |
| `useInsertionEffect`, `useDebugValue` | Réservés aux auteurs de bibliothèques et au débogage | Très rare |

> **Piège** — Un hook ne fonctionne que dans un composant client. Dès qu'un fichier en appelle un, il lui faut `"use client"` en première ligne. Seule exception : `use` et `useId` fonctionnent aussi dans un composant serveur.

**Quiz** — Pourquoi ne peut-on pas appeler un hook dans un `if` ?

- Parce que TypeScript l'interdit
- Parce que ce serait trop lent
- ✅ Parce que React retrouve chaque hook par son ordre d'appel, qui doit rester identique à chaque affichage
- Parce qu'un hook ne peut pas lire une condition

> **Explication** — Un hook sauté décalerait tous les suivants : React rendrait la mauvaise valeur au mauvais hook.

**Quiz** — À quoi reconnaît-on un hook ?

- ✅ Son nom commence par `use` et il s'appelle depuis un composant ou un autre hook
- Il est toujours asynchrone
- Il renvoie toujours un tableau
- Il est fourni uniquement par React

> **Explication** — Next.js, Zustand et vous-même pouvez fournir des hooks. Le préfixe `use` est la convention qui permet aux outils de vérifier les règles.

## État, références et contexte

`l-h-2` · 30 min

### useState : deux subtilités

```tsx
// 1. Mise à jour à partir de la valeur précédente : passez une fonction
setCompteur((precedent) => precedent + 1);

// 2. Valeur initiale coûteuse : passez une fonction, elle ne s’exécute qu’une fois
const [grille, setGrille] = useState(() => construireGrilleInitiale());
```

Sans la forme fonctionnelle, deux appels `setCompteur(compteur + 1)` à la suite n'ajoutent qu'une unité : les deux lisent la même ancienne valeur.

### useReducer : quand l'état a plusieurs champs liés

Un **réducteur** est une fonction qui reçoit l'état et une **action**, et renvoie le nouvel état. Toute la logique de modification est regroupée et nommée.

`Exemple : un comparateur de deux Pokémon`

```tsx
import { useReducer } from "react";

type Etat = { gauche: string | null; droite: string | null };
type Action =
  | { type: "choisir"; cote: "gauche" | "droite"; nom: string }
  | { type: "inverser" }
  | { type: "vider" };

function reducteur(etat: Etat, action: Action): Etat {
  switch (action.type) {
    case "choisir":
      return { ...etat, [action.cote]: action.nom };
    case "inverser":
      return { gauche: etat.droite, droite: etat.gauche };
    case "vider":
      return { gauche: null, droite: null };
  }
}

const [etat, envoyer] = useReducer(reducteur, { gauche: null, droite: null });
envoyer({ type: "choisir", cote: "gauche", nom: "pikachu" });
```

> **Note** — `useState` pour une valeur simple, `useReducer` pour un état local à plusieurs champs, un store Zustand quand l'état est partagé entre des composants éloignés. Le store de la sacoche suit d'ailleurs la même idée : des données et des actions nommées.

### useRef : une boîte qui ne déclenche rien

`useRef` renvoie un objet `{ current }` conservé d'un affichage à l'autre. Le modifier ne réaffiche pas le composant. Deux usages.

```tsx
"use client";
import { useEffect, useRef } from "react";

export default function ChampRecherche() {
  // Usage 1 : accéder à un élément du DOM
  const champ = useRef<HTMLInputElement>(null);

  useEffect(() => {
    champ.current?.focus();
  }, []);

  // Usage 2 : garder une valeur qui n’est pas affichée (identifiant de minuteur, valeur précédente)
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  return <input ref={champ} type="search" />;
}
```

> **Piège** — Ne lisez ni n'écrivez `ref.current` pendant le rendu, seulement dans un effet ou un gestionnaire d'événement. Et si la valeur doit apparaître à l'écran, c'est un état, pas une référence.

### useId : relier un libellé à son champ

```tsx
import { useId } from "react";

function ChampSurnom() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Surnom</label>
      <input id={id} />
    </>
  );
}
```

L'identifiant est unique même si le composant est affiché six fois, et identique entre le serveur et le navigateur. N'utilisez pas `useId` pour les `key` d'une liste.

### useContext : lire une valeur fournie plus haut

```tsx
"use client";
import { createContext, useContext } from "react";

const ContexteDresseur = createContext<string>("Anonyme");

// Plus haut dans l’arbre : <ContexteDresseur.Provider value="Sacha">...</ContexteDresseur.Provider>

function Salutation() {
  const dresseur = useContext(ContexteDresseur);
  return <p>Bonjour {dresseur}</p>;
}
```

**Quiz** — Vous stockez l'identifiant d'un minuteur pour pouvoir l'annuler. Quel hook ?

- `useState`
- ✅ `useRef`
- `useMemo`
- `useId`

> **Explication** — La valeur doit survivre aux affichages, mais elle n'est pas affichée : la changer ne doit rien réafficher.

**Quiz** — Que fait `envoyer({ type: "vider" })` avec `useReducer` ?

- Il modifie directement l'état
- Il vide le `localStorage`
- Il appelle l'API
- ✅ Il passe l'action au réducteur, qui renvoie le nouvel état

> **Explication** — Le composant décrit ce qui s'est passé. Le réducteur décide comment l'état change.

#### Exercice — Le raccourci « / »

Dans `BarreRecherche`, faites en sorte qu'appuyer sur la touche `/` place le curseur dans le champ, sauf si l'utilisateur est déjà en train d'écrire quelque part.

<details><summary>Voir la correction</summary>

```tsx
const champ = useRef<HTMLInputElement>(null);

useEffect(() => {
  const ecouter = (evenement: KeyboardEvent) => {
    const cible = evenement.target as HTMLElement;
    if (evenement.key !== "/" || cible.tagName === "INPUT" || cible.tagName === "TEXTAREA") return;
    evenement.preventDefault();
    champ.current?.focus();
  };
  window.addEventListener("keydown", ecouter);
  return () => window.removeEventListener("keydown", ecouter);
}, []);

// puis : <input ref={champ} ... />
```

</details>

## Effets, performance et transitions

`l-h-3` · 35 min

### useEffect : en avez-vous vraiment besoin ?

Un effet sert à **synchroniser le composant avec quelque chose d'extérieur à React**. Beaucoup d'effets écrits par les débutants sont inutiles.

| Vous voulez | Un effet ? | À la place |
| --- | --- | --- |
| Calculer une valeur à partir des props ou de l'état | Non | Une simple variable dans le composant |
| Réagir à un clic ou à une saisie | Non | Le gestionnaire d'événement |
| Charger les données d'une page | Non | Un composant serveur `async` |
| Lire `localStorage`, écouter le clavier, lancer un minuteur | Oui |  |
| Charger des données connues du seul navigateur (favoris) | Oui |  |

```tsx
// Inutile : un état et un effet pour une valeur calculable
const [visibles, setVisibles] = useState<Pokemon[]>([]);
useEffect(() => {
  setVisibles(pokemons.filter((p) => p.nom.includes(texte)));
}, [pokemons, texte]);

// Correct : un calcul pendant le rendu
const visibles = pokemons.filter((p) => p.nom.includes(texte));
```

`useLayoutEffect` a la même forme que `useEffect`, mais s'exécute avant que le navigateur peigne l'écran. On le réserve à la mesure d'un élément (sa taille, sa position) pour éviter un saut visible.

### useMemo et useCallback : mémoriser

```tsx
// useMemo : ne refaire le calcul que si « equipe » change
const typesCouverts = useMemo(
  () => [...new Set(equipe.flatMap((membre) => membre.types))],
  [equipe]
);

// useCallback : garder la même fonction tant que « id » ne change pas
const retirerMembre = useCallback(() => retirer(id), [retirer, id]);
```

> **Piège** — Ne mémorisez pas par réflexe. Un filtre sur 24 éléments coûte moins cher que la mémorisation elle-même. Mesurez d'abord avec l'outil Profiler des React DevTools. Les versions récentes de React proposent un compilateur qui ajoute ces mémorisations tout seul.

### useTransition : garder l'interface réactive

Une transition marque une mise à jour comme non urgente. La saisie reste fluide, et `enAttente` indique si la mise à jour est encore en cours. Avec Next.js, c'est le moyen d'afficher un indicateur pendant une navigation.

```tsx
const [enAttente, demarrer] = useTransition();

const chercher = (texte: string) => {
  demarrer(() => {
    router.replace(`/?q=${encodeURIComponent(texte)}`);
  });
};

return <div className={enAttente ? "opacity-60 transition" : "transition"}>...</div>;
```

`useDeferredValue(valeur)` répond au même besoin quand vous ne contrôlez pas la mise à jour : il renvoie une copie de la valeur qui prend du retard pendant que l'utilisateur tape, et la liste lourde s'affiche à partir de cette copie.

### Les hooks de React 19

`useOptimistic : afficher sans attendre`

```tsx
const [favorisAffiches, ajouterTemporairement] = useOptimistic(
  favoris,
  (actuels, nom: string) => [...actuels, nom]
);
// Dans une action : ajouterTemporairement("mew") s’affiche tout de suite,
// puis React revient à la vraie valeur quand le serveur a répondu.
```

`useActionState et useFormStatus : les formulaires`

```tsx
"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function BoutonEnvoyer() {
  const { pending } = useFormStatus();          // lit l’état du formulaire parent
  return <button disabled={pending}>{pending ? "Envoi…" : "Envoyer"}</button>;
}

export default function FormulaireDresseur({ enregistrer }: Props) {
  const [message, action] = useActionState(enregistrer, "");
  return (
    <form action={action}>
      <input name="nom" />
      <BoutonEnvoyer />
      <p>{message}</p>
    </form>
  );
}
```

`use : lire une promesse`

```tsx
import { use } from "react";

function Evolutions({ promesse }: { promesse: Promise<string[]> }) {
  const noms = use(promesse);     // suspend le composant jusqu’à la réponse
  return <p>{noms.join(" → ")}</p>;
}
```

`use` est le seul à pouvoir être appelé dans une condition. Le composant qui l'utilise doit être entouré d'un `Suspense`.

**Quiz** — Vous affichez le nombre de Pokémon filtrés. Faut-il un `useEffect` ?

- ✅ Non : c'est une valeur calculée à partir de l'état, une variable suffit
- Oui, avec `[pokemons]` en dépendance
- Oui, avec un tableau de dépendances vide
- Oui, et un `useRef`

> **Explication** — Un effet qui ne fait que recalculer un état à partir d'un autre provoque un affichage de trop et des erreurs de synchronisation.

**Quiz** — Que vous apporte `useTransition` pendant une navigation ?

- Il met les données en cache
- Il annule la navigation
- ✅ Un booléen « en cours » pour afficher un indicateur, sans bloquer la saisie
- Il remplace `useRouter`

> **Explication** — La mise à jour est traitée comme non urgente, et le premier élément du tableau renvoyé indique si elle est en attente.

## Les hooks de Next.js

`l-h-4` · 20 min

Next.js fournit ses propres hooks, tous importés depuis `next/navigation`. Ils donnent accès à l'adresse de la page et à la navigation, uniquement dans un composant client.

| Hook | Renvoie | Exemple dans le Pokédex |
| --- | --- | --- |
| `useRouter()` | Un objet pour naviguer par le code | Aller à la fiche du Pokémon tiré au hasard |
| `usePathname()` | Le chemin courant, par exemple `/sacoche` | Surligner le lien actif de l'en-tête |
| `useSearchParams()` | Les paramètres de l'adresse, en lecture seule | Pré-remplir la barre de recherche |
| `useParams()` | Les segments dynamiques, par exemple `{ nom: "pikachu" }` | Connaître le Pokémon courant dans un composant client de la fiche |
| `useSelectedLayoutSegment()` | Le segment actif sous le layout | Onglets d'un layout |

`Les méthodes de useRouter`

```tsx
const router = useRouter();

router.push("/pokemon/mew");     // aller à une page, en ajoutant une entrée d’historique
router.replace("/?q=pika");      // changer d’adresse sans ajouter d’entrée
router.back();                   // équivalent du bouton Précédent
router.refresh();                // redemander les données serveur de la page courante
```

`components/LienNav.tsx`

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LienNav({ href, children }: { href: string; children: React.ReactNode }) {
  const chemin = usePathname();
  const actif = href === "/" ? chemin === "/" : chemin.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={actif ? "font-bold underline underline-offset-4" : "opacity-80 hover:opacity-100"}
    >
      {children}
    </Link>
  );
}
```

> **Piège** — Dans l'en-tête, entourez chaque `LienNav` d'un `<Suspense>`, avec le texte du lien en `fallback`. Sur une route dynamique comme `/pokemon/[nom]`, le chemin n'est connu qu'à la visite : sans `Suspense`, Next.js ne peut pas préparer l'en-tête à l'avance et le signale. `useSearchParams` demande toujours un `Suspense`.

> **Note** — Dans un composant serveur, pas de hook : la page reçoit `params` et `searchParams` en props, et redirige avec `redirect()`. Préférez un `Link` à `router.push` chaque fois que l'utilisateur clique sur quelque chose : c'est un vrai lien, préchargé et accessible.

**Quiz** — Quel hook choisir pour surligner l'onglet « Sacoche » quand on est sur `/sacoche` ?

- `useRouter`
- ✅ `usePathname`
- `useParams`
- `useState`

> **Explication** — `usePathname` renvoie le chemin courant et se met à jour à chaque navigation.

**Quiz** — Quelle différence entre `router.push` et `router.replace` ?

- `replace` recharge toute la page
- `push` ne fonctionne que sur le serveur
- Aucune
- ✅ `push` ajoute une entrée à l'historique, `replace` remplace l'entrée courante

> **Explication** — Pour une recherche qui change à chaque frappe, `replace` évite de remplir l'historique.

## Construire ses propres hooks

`l-h-5` · 40 min

Un **hook personnalisé** est une fonction dont le nom commence par `use` et qui appelle d'autres hooks. Rien de plus. Il sert à sortir d'un composant une logique que l'on veut **nommer**, **réutiliser** ou **tester** à part.

| Signe | Hook à extraire |
| --- | --- |
| Le même couple `useState` + `useEffect` est copié dans deux composants | Oui |
| Un composant contient trente lignes de logique avant son JSX | Oui |
| Une fonction utilitaire qui n'appelle aucun hook | Non : une fonction ordinaire dans `lib/` |

### Premier hook : temporiser une valeur

`hooks/useTemporisation.ts`

```ts
"use client";
import { useEffect, useState } from "react";

export function useTemporisation<T>(valeur: T, delai = 300): T {
  const [stable, setStable] = useState(valeur);

  useEffect(() => {
    const minuteur = setTimeout(() => setStable(valeur), delai);
    return () => clearTimeout(minuteur);
  }, [valeur, delai]);

  return stable;
}
```

```tsx
const [texte, setTexte] = useState("");
const texteStable = useTemporisation(texte, 300);   // ne change que 300 ms après la dernière frappe
```

La méthode : repérez dans le composant les lignes qui forment un tout, déplacez-les dans une fonction `useQuelqueChose`, passez en paramètres ce dont elles ont besoin, renvoyez ce que le composant utilise. Le générique `<T>` rend le hook utilisable avec n'importe quel type de valeur.

> **Piège** — Deux composants qui appellent le même hook personnalisé ne partagent pas son état. Chaque appel crée ses propres `useState`. Un hook partage de la **logique**. Pour partager des **données**, il faut un store ou un contexte.

### Un hook qui renvoie plusieurs choses

La page Favoris contient un chargement complet : état, effet, annulation. On le range dans un hook, et la page redevient lisible.

`hooks/usePokemons.ts`

```ts
"use client";
import { useEffect, useState } from "react";
import { chargerPokemon } from "@/lib/pokeapi-client";
import type { Pokemon } from "@/types/pokemon";

type Etat = "chargement" | "pret" | "erreur";

export function usePokemons(noms: string[]) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [etat, setEtat] = useState<Etat>("chargement");

  useEffect(() => {
    let annule = false;
    Promise.all(noms.map(chargerPokemon))
      .then((resultats) => {
        if (annule) return;
        setPokemons(resultats.filter((p): p is Pokemon => p !== null));
        setEtat("pret");
      })
      .catch(() => { if (!annule) setEtat("erreur"); });
    return () => { annule = true; };
  }, [noms]);

  return { pokemons, etat };
}
```

`app/favoris/page.tsx`

```tsx
"use client";
import GrillePokemons from "@/components/GrillePokemons";
import { usePokemons } from "@/hooks/usePokemons";
import { useFavoris } from "@/stores/favoris";

export default function PageFavoris() {
  const noms = useFavoris((etat) => etat.noms);
  const { pokemons, etat } = usePokemons(noms);

  if (etat === "erreur") return <p>Impossible de charger vos favoris.</p>;
  if (etat === "chargement") return <p>Chargement de vos favoris…</p>;
  if (pokemons.length === 0) return <p>Aucun favori pour le moment. Cliquez sur une étoile.</p>;
  return <GrillePokemons pokemons={pokemons} />;
}
```

Renvoyez un objet quand il y a plusieurs valeurs nommées, un tableau quand l'appelant voudra les renommer (comme `useState`), une valeur seule sinon. Le tableau `noms` doit garder la même référence d'un affichage à l'autre, ce qui est le cas quand il vient du store : sinon l'effet se relancerait sans fin.

### Un hook avancé : temporiser un appel

La barre de recherche du chapitre 9 a un défaut : après un clic sur « Précédent », son effet remet l'ancienne recherche dans l'adresse. La cause est d'avoir utilisé un effet pour réagir à une saisie. Ce hook temporise l'appel lui-même, directement depuis le gestionnaire d'événement.

`hooks/useRappelTemporise.ts`

```ts
"use client";
import { useCallback, useEffect, useRef } from "react";

export function useRappelTemporise<A extends unknown[]>(rappel: (...args: A) => void, delai = 300) {
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dernierRappel = useRef(rappel);

  useEffect(() => {
    dernierRappel.current = rappel;       // toujours la version la plus récente
  });

  useEffect(() => {
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);   // nettoyage à la disparition
    };
  }, []);

  return useCallback(
    (...args: A) => {
      if (minuteur.current) clearTimeout(minuteur.current);
      minuteur.current = setTimeout(() => dernierRappel.current(...args), delai);
    },
    [delai]
  );
}
```

Trois hooks de base, trois rôles : `useRef` garde le minuteur et la dernière version de la fonction sans réafficher, `useEffect` nettoie, `useCallback` renvoie une fonction stable.

`components/BarreRecherche.tsx — version finale`

```tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useRappelTemporise } from "@/hooks/useRappelTemporise";

export default function BarreRecherche() {
  const router = useRouter();
  const chemin = usePathname();
  const parametres = useSearchParams();
  const [texte, setTexte] = useState(parametres.get("q") ?? "");
  const [enAttente, demarrer] = useTransition();

  const naviguer = useRappelTemporise((valeur: string) => {
    const suivants = new URLSearchParams(parametres.toString());
    if (valeur) suivants.set("q", valeur);
    else suivants.delete("q");
    suivants.delete("page");
    demarrer(() => router.replace(`${chemin}?${suivants.toString()}`));
  });

  return (
    <div className="relative">
      <input
        type="search"
        value={texte}
        onChange={(e) => {
          setTexte(e.target.value);
          naviguer(e.target.value);
        }}
        placeholder="Rechercher un Pokémon"
        aria-label="Rechercher un Pokémon"
        className="w-full rounded-full border border-black/10 px-5 py-3"
      />
      {enAttente && <span className="absolute right-4 top-3 text-sm text-gray-500">Recherche…</span>}
    </div>
  );
}
```

Plus aucun `useEffect` dans le composant, et un indicateur de recherche en prime.

### Les hooks de votre boîte à outils

`hooks/useEstMonte.ts`

```ts
"use client";
import { useSyncExternalStore } from "react";

const sAbonner = () => () => {};

// Vaut false sur le serveur et pendant l’hydratation, true ensuite.
// Utile pour n’afficher qu’après l’hydratation ce qui dépend du navigateur.
export function useEstMonte(): boolean {
  return useSyncExternalStore(sAbonner, () => true, () => false);
}
```

`useSyncExternalStore` reçoit trois fonctions : comment s'abonner, la valeur dans le navigateur, la valeur sur le serveur. Ici rien ne change jamais, donc l'abonnement ne fait rien.

`hooks/useRaccourci.ts`

```ts
"use client";
import { useEffect } from "react";

export function useRaccourci(touche: string, action: () => void) {
  useEffect(() => {
    const ecouter = (evenement: KeyboardEvent) => {
      const cible = evenement.target as HTMLElement;
      if (evenement.key !== touche || cible.tagName === "INPUT" || cible.tagName === "TEXTAREA") return;
      evenement.preventDefault();
      action();
    };
    window.addEventListener("keydown", ecouter);
    return () => window.removeEventListener("keydown", ecouter);
  }, [touche, action]);
}
```

**Q : Un hook personnalisé peut-il renvoyer du JSX ?**

Il le peut, mais c'est rarement une bonne idée. Si la fonction renvoie de l'interface, c'est un composant. Un hook renvoie des données et des fonctions.

**Q : `useFavoris` et `useSacoche` sont-ils des hooks personnalisés ?**

Oui, fabriqués par Zustand. La différence avec les vôtres : ils lisent un store situé hors des composants, donc tous les composants voient les mêmes données.

**Q : Où ranger ses hooks ?**

Dans un dossier `hooks/` à la racine, un fichier par hook, portant le nom du hook. Ajoutez `"use client"` en tête : le fichier ne sera importé que par des composants client.

**Quiz** — Deux composants appellent `useTemporisation`. Partagent-ils la même valeur ?

- Oui, toujours
- Oui, s'ils sont dans la même page
- ✅ Non : chaque appel possède son propre état
- Seulement avec `"use client"`

> **Explication** — Un hook personnalisé réutilise de la logique, pas des données.

**Quiz** — Une fonction `formaterNumero(id)` qui n'appelle aucun hook doit-elle s'appeler `useFormaterNumero` ?

- ✅ Non : sans hook à l'intérieur, c'est une fonction ordinaire
- Oui, toutes les fonctions utilitaires commencent par `use`
- Oui, si elle est utilisée dans un composant
- Oui, pour être mise en cache

> **Explication** — Le préfixe `use` annonce « cette fonction obéit aux règles des hooks ». Le réserver aux vrais hooks évite des contraintes inutiles.

**Texte à trous** — Par quel préfixe le nom d'un hook personnalisé doit-il commencer ? `export function ____EstMonte() { … }`

> **Réponse** — `use`

---

**TP Pokédex**

#### Étape 17 — Ranger la logique dans des hooks

- [ ] Le dossier `hooks/` contient `usePokemons`, `useRappelTemporise` et `useRaccourci`
- [ ] La page Favoris utilise `usePokemons` et ne contient plus de `useEffect`
- [ ] `BarreRecherche` utilise `useRappelTemporise` et `useTransition`, avec un indicateur « Recherche… »
- [ ] Après une recherche, le bouton Précédent du navigateur revient bien à l'écran d'avant
- [ ] La touche `/` place le curseur dans la recherche, grâce à `useRaccourci` et `useRef`
- [ ] L'en-tête surligne la page courante avec `usePathname`
- [ ] Bonus : un hook `useTypesCouverts()` qui renvoie les types présents dans la sacoche

---
