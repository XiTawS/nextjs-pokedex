# Chapitre 6 — Next.js

> Créer des pages, des layouts, naviguer · 190 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## L'App Router : un dossier, une page

`l-6-1` · 50 min

React seul n'a ni pages, ni navigation, ni serveur. Next.js apporte tout cela. Son principe : **l'arborescence du dossier `app` définit les adresses du site**.

`Dossiers et adresses`

```text
app/page.tsx                    →  /
app/favoris/page.tsx            →  /favoris
app/a-propos/page.tsx           →  /a-propos
app/pokemon/[nom]/page.tsx      →  /pokemon/pikachu, /pokemon/mew, ...
```

Un dossier ne devient une adresse que s'il contient un fichier `page.tsx`, dont l'export par défaut est le composant de la page.

### Les fichiers au nom réservé

| Fichier | Rôle |
| --- | --- |
| `page.tsx` | Le contenu de l'adresse |
| `layout.tsx` | L'enveloppe partagée par le dossier et ses sous-dossiers |
| `loading.tsx` | Ce qui s'affiche pendant le chargement |
| `error.tsx` | Ce qui s'affiche si une erreur survient |
| `not-found.tsx` | La page 404 |
| `route.ts` | Un point d'API (chapitre 11) |

### Le layout racine

`app/layout.tsx`

```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header>Pokédex</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

Le layout reçoit la page courante dans `children`. Quand on change de page, il reste en place : seul `children` est remplacé.

**Quiz** — Quel fichier crée l'adresse `/favoris` ?

- `app/favoris.tsx`
- `pages/favoris/index.html`
- ✅ `app/favoris/page.tsx`
- `app/favoris/layout.tsx`

> **Explication** — Un dossier par segment d'adresse, et un fichier `page.tsx` dedans.

#### Exercice — Deux nouvelles pages

Créez les pages `/favoris` et `/a-propos`, chacune avec un simple titre. Vérifiez les adresses dans le navigateur.

<details><summary>Voir la correction</summary>

`app/favoris/page.tsx`

```tsx
export default function PageFavoris() {
  return <h1>Mes favoris</h1>;
}
```

</details>

## Navigation, images et polices

`l-6-2` · 50 min

### Le composant Link

Une balise `<a>` recharge toute la page. Le composant `Link` ne remplace que ce qui change, et précharge la page de destination quand le lien devient visible.

`components/EnTete.tsx`

```tsx
import Link from "next/link";

export default function EnTete() {
  return (
    <header className="bg-pokedex text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">Pokédex</Link>
        <nav className="flex gap-4">
          <Link href="/">Tous</Link>
          <Link href="/favoris">Favoris</Link>
        </nav>
      </div>
    </header>
  );
}
```

### Le composant Image

`next/image` redimensionne l'image, la convertit dans un format léger et ne la charge que lorsqu'elle approche de l'écran. Pour une image hébergée ailleurs, il faut autoriser son domaine.

`next.config.ts — ajouter la clé images, garder le reste`

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com" }],
  },
  // ... le bloc turbopack généré reste en place
};
```

```tsx
import Image from "next/image";

<Image src={pokemon.image} alt={pokemon.nom} width={160} height={160} />
```

> **Note** — `width` et `height` sont obligatoires : le navigateur réserve la place avant l'arrivée de l'image, et la page ne « saute » pas. Redémarrez `npm run dev` après avoir modifié `next.config.ts`.

### Les polices

`app/layout.tsx`

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// puis : <body className={inter.className}>
```

**Quiz** — Quel avantage a `<Link>` sur `<a>` pour un lien interne ?

- Il fonctionne sans JavaScript uniquement
- ✅ Il navigue sans recharger toute la page et précharge la destination
- Il ouvre un nouvel onglet
- Il chiffre l'adresse

> **Explication** — Le layout reste en place, seul le contenu de la page est remplacé.

---

**TP Pokédex**

#### Étape 7 — La coque de l'application

- [ ] `EnTete` et `PiedDePage` sont affichés par `app/layout.tsx` sur toutes les pages
- [ ] Le contenu est centré avec `mx-auto max-w-6xl px-4 py-6`
- [ ] La navigation entre « Tous » et « Favoris » ne recharge pas la page
- [ ] `CartePokemon` utilise `next/image` et le domaine est autorisé
- [ ] La balise `<html>` porte `lang="fr"`

---

## Composants serveur et composants client

`l-6-3` · 50 min

C'est la notion la plus importante de Next.js. Dans le dossier `app`, un composant est par défaut un **Server Component** : il s'exécute sur le serveur, et le navigateur ne reçoit que le HTML produit. Son code JavaScript n'est pas envoyé au visiteur.

|  | Server Component (par défaut) | Client Component (`"use client"`) |
| --- | --- | --- |
| S'exécute | Sur le serveur | Sur le serveur pour le premier HTML, puis dans le navigateur |
| Peut être `async` et faire `await fetch` | Oui | Non |
| `useState`, `useEffect` | Non | Oui |
| `onClick`, `onChange` | Non | Oui |
| `window`, `localStorage` | Non | Oui, dans un effet |
| Dans le Pokédex | Pages, grille, carte, badge | Barre de recherche, bouton favori |

### Comment les combiner

`components/CartePokemon.tsx (serveur)`

```tsx
import BoutonFavori from "./BoutonFavori";   // composant client

export default function CartePokemon({ pokemon }: Props) {
  return (
    <article>
      <h2>{pokemon.nom}</h2>
      <BoutonFavori nom={pokemon.nom} />
    </article>
  );
}
```

- Un composant serveur peut afficher un composant client. Les props qu'il lui passe doivent être des données simples (texte, nombres, objets, tableaux), pas des fonctions.
- `"use client"` s'écrit sur la première ligne du fichier. Tout ce que ce fichier importe devient aussi du code client.
- Règle pratique : restez côté serveur, et isolez l'interactivité dans de petits composants client placés le plus bas possible dans l'arbre.

**Quiz** — Lequel de ces composants doit porter `"use client"` ?

- Une page qui charge la liste des Pokémon avec `await`
- Un `BadgeType` qui affiche un libellé
- Le layout racine
- ✅ Un champ de recherche avec `useState` et `onChange`

> **Explication** — État et événements n'existent que dans le navigateur.

**Quiz** — Vous ajoutez `useState` dans `app/page.tsx` sans `"use client"`. Que se passe-t-il ?

- ✅ Next.js affiche une erreur expliquant que ce hook exige un composant client
- Rien, cela fonctionne
- L'état est partagé entre tous les visiteurs
- La page devient statique

> **Explication** — Le message d'erreur vous invite à ajouter la directive. Mieux : déplacez la partie interactive dans un petit composant client.

**Q : Un composant client est-il rendu uniquement dans le navigateur ?**

Non. Next.js produit aussi son HTML sur le serveur pour le premier affichage, puis le navigateur le « réveille » (hydratation). C'est pourquoi `localStorage` ne se lit que dans un effet.

**Q : Pourquoi ne pas mettre `"use client"` partout ?**

Vous perdriez le chargement des données côté serveur, et tout le code partirait vers le navigateur : pages plus lourdes et plus lentes.

## Métadonnées et page 404

`l-6-4` · 40 min

### Titre et description des pages

`app/layout.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Pokédex", template: "%s · Pokédex" },
  description: "Les 1 025 Pokémon, leurs types et leurs statistiques.",
};
```

`app/favoris/page.tsx`

```tsx
export const metadata = { title: "Favoris" };   // onglet : « Favoris · Pokédex »
```

Ces informations alimentent l'onglet du navigateur, les moteurs de recherche et l'aperçu quand on partage un lien. L'export `metadata` n'est possible que dans un composant serveur.

### Une page 404 soignée

`app/not-found.tsx`

```tsx
import Link from "next/link";

export default function Introuvable() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Ce Pokémon s’est enfui</h1>
      <p className="my-4 text-gray-500">La page demandée n’existe pas.</p>
      <Link href="/" className="rounded-lg bg-pokedex px-4 py-2 font-semibold text-white">
        Retour au Pokédex
      </Link>
    </div>
  );
}
```

**Quiz** — Avec le gabarit `"%s · Pokédex"`, que montre l'onglet d'une page dont le titre est `"Favoris"` ?

- Pokédex
- ✅ Favoris · Pokédex
- %s · Pokédex
- Favoris

> **Explication** — `%s` est remplacé par le titre de la page.

#### Exercice — Vérifier

Créez `app/not-found.tsx`, puis visitez `/nimporte-quoi`. Donnez un titre à la page À propos et vérifiez l'onglet.

<details><summary>Voir la correction</summary>

La page 404 personnalisée s'affiche, enveloppée par le layout (en-tête et pied de page restent visibles). L'onglet affiche « À propos · Pokédex ».

</details>
