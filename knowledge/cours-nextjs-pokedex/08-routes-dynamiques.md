# Chapitre 8 — Routes dynamiques

> Construire la fiche d'un Pokémon · 160 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Une page par Pokémon

`l-8-1` · 50 min

On ne crée pas 1 025 dossiers. Un dossier entre crochets est un **segment dynamique** : `app/pokemon/[nom]/page.tsx` répond à `/pokemon/pikachu`, `/pokemon/mew`, et à tous les autres.

`app/pokemon/[nom]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { recupererPokemon } from "@/lib/pokeapi";

type Props = {
  params: Promise<{ nom: string }>;
};

export default function PageFiche({ params }: Props) {
  return (
    <Suspense fallback={<p>Chargement de la fiche…</p>}>
      <Fiche params={params} />
    </Suspense>
  );
}

async function Fiche({ params }: Props) {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) notFound();

  return <h1 className="text-3xl font-bold capitalize">{pokemon.nom}</h1>;
}
```

- `params` est une promesse : on écrit `await params`. Le nom entre crochets (`[nom]`) donne le nom de la propriété.
- Le nom demandé n'est connu qu'au moment de la visite. C'est une donnée propre à la requête : on la lit dans un composant placé sous `<Suspense>`. La page, elle, n'est pas `async` : elle transmet la promesse.

> **Piège** — Si vous écrivez `await params` directement dans la page, hors de tout `Suspense`, Next.js le signale en développement : la page ne pourrait plus être préparée à l'avance.

### Distinguer « introuvable » et « en panne »

`recupererPokemon` renvoie `null` pour un nom inconnu. Ce n'est pas une panne : l'utilisateur a tapé un mauvais nom. `notFound()` interrompt le rendu et affiche votre `not-found.tsx`. Une vraie panne de l'API lève une erreur, attrapée par `error.tsx`.

### Relier les cartes aux fiches

`components/CartePokemon.tsx`

```tsx
<Link href={`/pokemon/${pokemon.nom}`} className="block rounded-xl ...">
  ...
</Link>
```

**Quiz** — Pour l'adresse `/pokemon/mew` et le fichier `app/pokemon/[nom]/page.tsx`, que vaut `(await params).nom` ?

- `"pokemon"`
- ✅ `"mew"`
- `"[nom]"`
- `undefined`

> **Explication** — Le segment dynamique capture la partie correspondante de l'adresse.

**Quiz** — L'utilisateur visite `/pokemon/pikachuu`. Quelle est la bonne réaction ?

- Afficher l'écran d'erreur avec « Réessayer »
- Rediriger vers Pikachu
- ✅ Appeler `notFound()` pour afficher la page 404
- Afficher une page vide

> **Explication** — Réessayer ne changerait rien : la ressource n'existe pas. C'est un 404.

**Quiz** — Pourquoi lire `params` dans un composant sous `<Suspense>` ?

- Parce que `params` est un état React
- Pour le mettre en cache
- Parce que les hooks l'exigent
- ✅ Parce que sa valeur n'est connue qu'à la visite : le reste de la page peut être envoyé sans l'attendre

> **Explication** — Même règle que pour toute donnée propre à la requête.

## Construire la fiche détaillée

`l-8-2` · 70 min

La fiche affiche l'image en grand, les types, la taille, le poids, les six statistiques en barres, et la chaîne d'évolution.

### Des barres de statistiques

`components/BarresStats.tsx`

```tsx
import type { Statistique } from "@/types/pokemon";

const LIBELLES: Record<string, string> = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Attaque spé.",
  "special-defense": "Défense spé.",
  speed: "Vitesse",
};
const MAXIMUM = 255;

export default function BarresStats({ stats }: { stats: Statistique[] }) {
  return (
    <dl className="grid gap-2">
      {stats.map((stat) => (
        <div key={stat.nom} className="grid grid-cols-[7rem_2.5rem_1fr] items-center gap-2">
          <dt className="text-sm text-gray-500">{LIBELLES[stat.nom] ?? stat.nom}</dt>
          <dd className="text-right font-mono text-sm">{stat.valeur}</dd>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-pokedex"
              style={{ width: `${(stat.valeur / MAXIMUM) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </dl>
  );
}
```

> **Note** — La largeur de la barre est une valeur calculée, différente pour chaque statistique : c'est le cas légitime d'un attribut `style`. Tailwind ne peut pas connaître ces valeurs à l'avance.

### La chaîne d'évolution : deux appels et une récursion

L'évolution se trouve en deux étapes : l'espèce donne l'adresse de la chaîne, puis la chaîne est un **arbre**. Chaque maillon contient une espèce et la liste de ses évolutions, qui sont elles-mêmes des maillons. Pour parcourir un arbre, la fonction s'appelle elle-même.

`lib/pokeapi.ts — à ajouter`

```ts
type Maillon = {
  species: { name: string };
  evolves_to: Maillon[];
};

function aplatir(maillon: Maillon): string[] {
  return [maillon.species.name, ...maillon.evolves_to.flatMap(aplatir)];
}

export async function recupererEvolutions(id: number): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const espece = await appeler<{ evolution_chain: { url: string } }>(`/pokemon-species/${id}`);
  if (!espece) return [];
  const chaine = await appeler<{ chain: Maillon }>(espece.evolution_chain.url);
  return chaine ? aplatir(chaine.chain) : [];
}
```

Pour Salamèche, le résultat est `["charmander", "charmeleon", "charizard"]`. Pour Évoli, dont l'arbre a plusieurs branches, la liste contient Évoli et toutes ses évolutions.

### Assembler la page

`app/pokemon/[nom]/page.tsx — le composant Fiche`

```tsx
async function Fiche({ params }: Props) {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) notFound();

  const evolutions = await recupererPlusieurs(await recupererEvolutions(pokemon.id));

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <Image src={pokemon.image} alt={pokemon.nom} width={400} height={400} loading="eager" />
      <div>
        <p className="font-mono text-gray-500">#{String(pokemon.id).padStart(3, "0")}</p>
        <h1 className="mb-2 text-4xl font-bold capitalize">{pokemon.nom}</h1>
        <div className="mb-4 flex gap-2">
          {pokemon.types.map((type) => <BadgeType key={type} type={type} />)}
        </div>
        <p className="mb-6">{pokemon.taille} m · {pokemon.poids} kg</p>
        <BarresStats stats={pokemon.stats} />
      </div>
      <section className="md:col-span-2">
        <h2 className="mb-4 text-2xl font-bold">Évolutions</h2>
        <GrillePokemons pokemons={evolutions} />
      </section>
    </article>
  );
}
```

**Quiz** — Pourquoi `aplatir` s'appelle-t-elle elle-même ?

- ✅ Parce que chaque maillon contient d'autres maillons de même forme, sur une profondeur inconnue
- Pour aller plus vite
- Parce que `map` ne fonctionne pas sur les objets
- Pour mettre le résultat en cache

> **Explication** — Une structure en arbre se parcourt naturellement par récursion : traiter le nœud, puis appliquer la même fonction à ses enfants.

---

**TP Pokédex**

#### Étape 11 — La fiche complète

- [ ] Cliquer sur une carte ouvre `/pokemon/{nom}`
- [ ] La fiche affiche image, numéro, types, taille et poids
- [ ] Les six statistiques s'affichent en barres avec des libellés français
- [ ] La chaîne d'évolution s'affiche, et chaque évolution est cliquable
- [ ] `/pokemon/pikachuu` affiche la page 404
- [ ] Bonus : afficher le nom français, lu dans `names` de `/pokemon-species/{id}`

---

## Pages pré-générées et métadonnées dynamiques

`l-8-3` · 40 min

### Un titre par Pokémon

Pour une page dynamique, le titre dépend des données. On exporte une fonction `generateMetadata` à la place de l'objet `metadata`.

`app/pokemon/[nom]/page.tsx — à ajouter`

```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nom } = await params;
  const pokemon = await recupererPokemon(nom);
  if (!pokemon) return { title: "Pokémon introuvable" };

  const titre = pokemon.nom.charAt(0).toUpperCase() + pokemon.nom.slice(1);
  return {
    title: titre,
    description: `${titre} : types, statistiques et évolutions.`,
    openGraph: { images: [pokemon.image] },
  };
}
```

La fiche et `generateMetadata` appellent toutes deux `recupererPokemon`. Grâce au cache, l'API n'est interrogée qu'une fois.

### Générer des pages à l'avance

Avec `generateStaticParams`, vous donnez à Next.js une liste de valeurs pour `[nom]`. Ces fiches sont construites dès la mise en production et s'affichent instantanément. Pour les autres, Next.js envoie d'abord le `fallback` du `Suspense`, construit la fiche, puis la garde pour les visiteurs suivants.

`lib/pokeapi.ts — à ajouter`

```ts
export const TOTAL_POKEMONS = 1025;

export async function recupererTousLesNoms(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const page = await appeler<{ results: { name: string }[] }>(`/pokemon?limit=${TOTAL_POKEMONS}`);
  if (!page) throw new Error("La liste des Pokémon est introuvable");
  return page.results.map((p) => p.name);
}
```

`app/pokemon/[nom]/page.tsx — à ajouter`

```tsx
export async function generateStaticParams() {
  const noms = await recupererTousLesNoms();
  return noms.slice(0, 151).map((nom) => ({ nom }));
}
```

Les 151 premiers Pokémon sont pré-générés. `generateStaticParams` doit renvoyer au moins une valeur.

**Quiz** — Que renvoie `generateStaticParams` ?

- Du JSX
- Un objet de métadonnées
- ✅ Un tableau d'objets, un par page à pré-générer, avec les valeurs des segments dynamiques
- Une liste d'adresses complètes

> **Explication** — Ici `[{ nom: "bulbasaur" }, { nom: "ivysaur" }, …]` : la clé correspond au nom du dossier entre crochets.

---

**TP Pokédex**

#### Étape 12 — Des fiches rapides et bien référencées

- [ ] L'onglet d'une fiche affiche « Pikachu · Pokédex »
- [ ] Les 151 premiers Pokémon sont pré-générés
- [ ] `npm run build` réussit et liste les pages générées
- [ ] `npm start` lance la version de production : je compare la vitesse avec `npm run dev`

---
