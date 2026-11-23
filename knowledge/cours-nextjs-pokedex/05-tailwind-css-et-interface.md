# Chapitre 5 — Tailwind CSS et interface

> Concevoir une interface soignée et responsive · 220 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Le principe des classes utilitaires

`l-5-1` · 50 min

Avec Tailwind, vous n'écrivez presque plus de fichier CSS. Vous composez le style directement dans le JSX, avec de petites classes qui font chacune une seule chose.

```tsx
<article className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
  <span className="text-sm text-gray-500">#025</span>
  <h2 className="text-lg font-semibold capitalize">pikachu</h2>
</article>
```

| Famille | Exemples | Effet |
| --- | --- | --- |
| Espacement | `p-4` `px-6` `mt-2` `gap-4` | 1 unité = 4 px : `p-4` = 16 px |
| Taille | `w-full` `h-40` `max-w-5xl` | Largeur, hauteur, limites |
| Texte | `text-sm` `text-2xl` `font-bold` `capitalize` | Taille, graisse, casse |
| Couleur | `bg-red-600` `text-gray-500` `border-gray-200` | Nuances de 50 (clair) à 950 (foncé) |
| Forme | `rounded-xl` `rounded-full` `border` `shadow-sm` | Coins, bordure, ombre |

Lecture des préfixes : `p` = padding, `m` = margin, suivis de `x` (gauche et droite), `y` (haut et bas), `t`, `b`, `l`, `r`.

> **Note** — L'extension « Tailwind CSS IntelliSense » propose les classes pendant la frappe et affiche le CSS produit au survol.

**Quiz** — Que fait la classe `px-6` ?

- Une marge extérieure de 6 px partout
- Une largeur de 6 px
- ✅ Une marge intérieure de 24 px à gauche et à droite
- Une bordure de 6 px

> **Explication** — `p` = padding, `x` = axe horizontal, 6 × 4 px = 24 px.

#### Exercice — Traduire du CSS

Donnez les classes Tailwind équivalentes à : `padding: 8px 16px; border-radius: 9999px; font-weight: 700; font-size: 0.875rem; color: white;`

<details><summary>Voir la correction</summary>

`px-4 py-2 rounded-full font-bold text-sm text-white`

</details>

## Mise en page, responsive et états

`l-5-2` · 50 min

### Flex et Grid

```tsx
<header className="flex items-center justify-between gap-4 px-6 py-4">
  <span className="text-xl font-bold">Pokédex</span>
  <nav className="flex gap-4">...</nav>
</header>

<ul className="grid grid-cols-2 gap-4">...</ul>
```

### Responsive : penser mobile d'abord

Une classe sans préfixe s'applique à toutes les tailles. Un préfixe l'applique *à partir* d'une largeur.

| Préfixe | À partir de |
| --- | --- |
| `sm:` | 640 px |
| `md:` | 768 px |
| `lg:` | 1024 px |
| `xl:` | 1280 px |

```tsx
<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
```

Lecture : 2 colonnes sur téléphone, 3 à partir de 640 px, 4 à partir de 768 px, 6 à partir de 1024 px.

### États et thème sombre

```tsx
<a className="rounded-xl border p-4 transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2">
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
<button className="disabled:opacity-50" disabled={page === 1}>
```

**Quiz** — Avec `grid-cols-2 md:grid-cols-4`, combien de colonnes sur un écran de 700 px ?

- 4
- ✅ 2
- 1
- 6

> **Explication** — `md:` ne s'active qu'à partir de 768 px. En dessous, c'est la classe sans préfixe qui compte.

#### Exercice — Un en-tête responsive

Écrivez un en-tête dont le titre et la navigation sont empilés sur téléphone et sur une même ligne, aux deux extrémités, à partir de `sm`.

<details><summary>Voir la correction</summary>

```tsx
<header className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
  <span className="text-xl font-bold">Pokédex</span>
  <nav className="flex gap-4">...</nav>
</header>
```

</details>

## Thème personnalisé et couleurs par type

`l-5-3` · 70 min

Chaque type de Pokémon a sa couleur. Tailwind 4 se configure dans le CSS : le bloc `@theme` déclare des variables, et chaque variable `--color-xxx` crée les classes `bg-xxx`, `text-xxx`, `border-xxx`.

`app/globals.css`

```css
@import "tailwindcss";

@theme {
  --color-pokedex: #d2232f;
  --color-type-normal: #7b7b6c;
  --color-type-fire: #d2571c;
  --color-type-water: #2f6fd0;
  --color-type-electric: #9a7400;
  --color-type-grass: #3f8f3a;
  --color-type-ice: #2e8f93;
  --color-type-fighting: #a8322a;
  --color-type-poison: #8a3fa0;
  --color-type-ground: #9c7a2e;
  --color-type-flying: #5b78c9;
  --color-type-psychic: #d43d6c;
  --color-type-bug: #7c8a1a;
  --color-type-rock: #8f7d35;
  --color-type-ghost: #5a4a8c;
  --color-type-dragon: #5a3fd6;
  --color-type-dark: #50433a;
  --color-type-steel: #6d6d85;
  --color-type-fairy: #c2528f;
}
```

> **Piège** — Tailwind lit vos fichiers comme du texte et ne garde que les classes qu'il y trouve écrites en entier. `className={`bg-type-${type}`}` ne produit donc aucun style : la classe complète n'apparaît nulle part. La solution est une table de correspondance.

`lib/types.ts`

```ts
export const TYPES: Record<string, { libelle: string; classe: string }> = {
  normal: { libelle: "Normal", classe: "bg-type-normal" },
  fire: { libelle: "Feu", classe: "bg-type-fire" },
  water: { libelle: "Eau", classe: "bg-type-water" },
  electric: { libelle: "Électrik", classe: "bg-type-electric" },
  grass: { libelle: "Plante", classe: "bg-type-grass" },
  ice: { libelle: "Glace", classe: "bg-type-ice" },
  fighting: { libelle: "Combat", classe: "bg-type-fighting" },
  poison: { libelle: "Poison", classe: "bg-type-poison" },
  ground: { libelle: "Sol", classe: "bg-type-ground" },
  flying: { libelle: "Vol", classe: "bg-type-flying" },
  psychic: { libelle: "Psy", classe: "bg-type-psychic" },
  bug: { libelle: "Insecte", classe: "bg-type-bug" },
  rock: { libelle: "Roche", classe: "bg-type-rock" },
  ghost: { libelle: "Spectre", classe: "bg-type-ghost" },
  dragon: { libelle: "Dragon", classe: "bg-type-dragon" },
  dark: { libelle: "Ténèbres", classe: "bg-type-dark" },
  steel: { libelle: "Acier", classe: "bg-type-steel" },
  fairy: { libelle: "Fée", classe: "bg-type-fairy" },
};
```

> **Note** — La donnée reste en anglais (`fire`), comme l'API la fournit. On ne la traduit qu'à l'affichage. Les filtres et les appels d'API continuent d'utiliser la valeur d'origine.

---

**TP Pokédex**

#### Étape 5 — Un Pokédex qui a du style

`components/BadgeType.tsx`

```tsx
import { TYPES } from "@/lib/types";

export default function BadgeType({ type }: { type: string }) {
  const style = TYPES[type] ?? { libelle: type, classe: "bg-gray-500" };
  return (
    <span className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${style.classe}`}>
      {style.libelle}
    </span>
  );
}
```

- [ ] Les couleurs de type sont déclarées dans `globals.css`
- [ ] `BadgeType` affiche le libellé français sur la bonne couleur
- [ ] `CartePokemon` est stylisée : bordure, coins arrondis, effet au survol, nom en capitales initiales
- [ ] La grille passe de 2 à 6 colonnes selon la largeur
- [ ] L'interface reste lisible en thème sombre

<details><summary>Une proposition pour la carte</summary>

`components/CartePokemon.tsx`

```tsx
<article className="rounded-xl border border-gray-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
  <span className="block text-left font-mono text-sm text-gray-500">{numero}</span>
  <img src={pokemon.image} alt={pokemon.nom} width={160} height={160} className="mx-auto" />
  <h2 className="mb-2 text-lg font-semibold capitalize">{pokemon.nom}</h2>
  <div className="flex flex-wrap justify-center gap-1">
    {pokemon.types.map((type) => (
      <BadgeType key={type} type={type} />
    ))}
  </div>
</article>
```

</details>

---

**Quiz** — Pourquoi ``bg-type-${type}`` ne fonctionne-t-il pas ?

- ✅ Tailwind ne génère que les classes qu'il lit en entier dans le code source
- Les gabarits de chaîne sont interdits en JSX
- Il manque le préfixe `dark:`
- Les couleurs personnalisées ne marchent pas avec `bg-`

> **Explication** — La classe n'existe qu'à l'exécution, donc Tailwind ne l'a jamais vue. La table `TYPES` contient les noms complets.

## Concevoir une belle interface

`l-5-4` · 50 min

Une interface qui fonctionne n'est pas encore une interface réussie. Cette leçon donne une méthode pour passer d'une grille correcte à un Pokédex que l'on a envie de parcourir. Elle sera évaluée dans le projet final.

### Quatre principes à appliquer partout

| Principe | Question à se poser | Dans le Pokédex |
| --- | --- | --- |
| Hiérarchie | Que voit-on en premier ? | L'image, puis le nom, puis les types. Le numéro reste discret. |
| Espace | Les éléments respirent-ils ? | Une seule échelle d'espacement : 2, 4, 6, 8. Jamais de valeur au hasard. |
| Couleur | La couleur porte-t-elle une information ? | Chaque carte prend la teinte de son type principal. |
| Cohérence | Deux éléments semblables se ressemblent-ils ? | Mêmes arrondis, mêmes ombres, mêmes boutons sur toutes les pages. |

### Une teinte par carte, avec une variable CSS

La couleur du type existe déjà comme variable CSS (`--color-type-fire`), puisque Tailwind crée une variable pour chaque couleur du thème utilisée. On la transmet à la carte par une variable locale, puis les classes s'en servent avec la notation entre parenthèses.

`lib/types.ts — à ajouter`

```ts
export function teinteType(type: string): string {
  return type in TYPES ? `var(--color-type-${type})` : "var(--color-gray-500)";
}
```

`components/CartePokemon.tsx`

```tsx
import type { CSSProperties } from "react";
import type { Pokemon } from "@/types/pokemon";
import { teinteType } from "@/lib/types";
import BadgeType from "./BadgeType";

export default function CartePokemon({ pokemon }: { pokemon: Pokemon }) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  const teinte = { "--teinte": teinteType(pokemon.types[0]) } as CSSProperties;

  return (
    <article
      style={teinte}
      className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm
                 transition duration-300 hover:-translate-y-1 hover:shadow-xl
                 motion-reduce:transition-none motion-reduce:hover:translate-y-0
                 dark:border-white/10 dark:bg-gray-900"
    >
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-(--teinte)/25 to-transparent" />
      <span aria-hidden className="absolute right-3 top-1 text-5xl font-black text-(--teinte)/20">
        {numero}
      </span>
      <div className="relative text-center">
        <img
          src={pokemon.image}
          alt={pokemon.nom}
          width={160}
          height={160}
          className="mx-auto drop-shadow-lg transition duration-300 group-hover:scale-110"
        />
        <h2 className="mb-2 mt-1 text-lg font-bold capitalize tracking-tight">{pokemon.nom}</h2>
        <div className="flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <BadgeType key={type} type={type} />
          ))}
        </div>
      </div>
    </article>
  );
}
```

- `from-(--teinte)/25` : un dégradé qui part de la couleur du type à 25 % d'opacité. Une teinte légère suffit, le fond ne doit pas concurrencer l'image.
- `group` sur la carte et `group-hover:` sur l'image : survoler la carte fait réagir un de ses enfants.
- `relative` sur le contenu le place au-dessus des calques décoratifs positionnés en `absolute`.
- `aria-hidden` sur les éléments purement décoratifs : les lecteurs d'écran les ignorent.
- `motion-reduce:` respecte le réglage « réduire les animations » du système.

> **Piège** — Si le dégradé n'apparaît pas, ouvrez l'inspecteur du navigateur et vérifiez la valeur de `--teinte` sur la carte. La variable `--color-type-…` n'existe que si la couleur est déclarée dans `@theme` et utilisée quelque part, ce qui est le cas grâce à la table `TYPES`.

### Le mouvement : discret et utile

`app/globals.css — dans @theme`

```css
@theme {
  --animate-apparition: apparition 0.4s ease-out both;

  @keyframes apparition {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }
}
```

La classe `animate-apparition` est maintenant disponible. Une animation doit expliquer quelque chose (un élément arrive, un état change) et durer moins d'une demi-seconde. Animez `transform` et `opacity`, qui restent fluides, plutôt que la largeur ou la marge.

### Les détails qui font la différence

```tsx
{/* En-tête collant, légèrement translucide */}
<header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur dark:bg-gray-950/80">

{/* Un bouton avec tous ses états */}
<button className="rounded-full bg-pokedex px-4 py-2 font-semibold text-white transition
                   hover:brightness-110 active:scale-95
                   focus-visible:outline-2 focus-visible:outline-offset-2
                   disabled:cursor-not-allowed disabled:opacity-40">

{/* Un champ de recherche confortable */}
<input className="w-full rounded-full border border-black/10 bg-white px-5 py-3 shadow-sm
                  focus:border-pokedex focus:outline-none focus:ring-4 focus:ring-pokedex/20" />
```

| À faire | À éviter |
| --- | --- |
| Une couleur d'accent, plus les couleurs de type | Cinq couleurs vives qui se battent |
| Deux ou trois tailles de texte bien distinctes | Sept tailles presque identiques |
| Des ombres légères, plus fortes au survol | Des ombres noires et dures partout |
| Un état visible pour le survol, le focus et l'inactif | Un bouton qui ne réagit pas |
| Tester sur téléphone et en thème sombre | Ne regarder que son grand écran |

**Quiz** — À quoi sert la classe `group` posée sur la carte ?

- À regrouper les cartes dans une grille
- ✅ À permettre à un enfant de réagir au survol de la carte, avec `group-hover:`
- À appliquer le thème sombre
- À centrer le contenu

> **Explication** — Le parent porte `group`, l'enfant porte `group-hover:scale-110`.

**Quiz** — Quelles propriétés faut-il animer en priorité pour garder une animation fluide ?

- `width` et `height`
- `margin` et `padding`
- `top` et `left`
- ✅ `transform` et `opacity`

> **Explication** — Elles ne forcent pas le navigateur à recalculer la mise en page du reste de l'écran.

#### Exercice — Critique d'interface

Échangez votre écran avec un voisin. Notez trois points forts et trois défauts de sa grille, en vous appuyant sur les quatre principes. Corrigez ensuite les défauts relevés sur la vôtre.

<details><summary>Voir une grille de lecture</summary>

Plissez les yeux : ce qui ressort encore est-il bien l'image et le nom ? Les espaces entre les cartes sont-ils égaux aux marges de la page ? Le texte gris reste-t-il lisible ? Le survol est-il visible sans être brusque ? À 375 px de large, rien ne déborde-t-il ?

</details>

---

**TP Pokédex**

#### Étape 6 — Une carte digne d'un vrai Pokédex

- [ ] Chaque carte porte la teinte de son type principal
- [ ] Le numéro apparaît en filigrane, l'image a une ombre portée
- [ ] Au survol, la carte se soulève et l'image grossit légèrement
- [ ] Les cartes apparaissent avec `animate-apparition`
- [ ] Le rendu est soigné en thème sombre et à 375 px de large
- [ ] Les animations sont coupées quand le système demande de les réduire

---
