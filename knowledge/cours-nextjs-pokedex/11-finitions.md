# Chapitre 11 — Finitions

> Créer sa propre route d'API, déployer · 95 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Créer sa propre route d'API, accessibilité et performance

`l-10-1` · 45 min

### Un Route Handler

Jusqu'ici vous avez consommé une API. Next.js permet aussi d'en **exposer** une : un fichier `route.ts` répond à des requêtes HTTP et renvoie du JSON. Exemple : un Pokémon au hasard.

`app/api/aleatoire/route.ts`

```ts
import { connection, NextResponse } from "next/server";
import { recupererPokemon, TOTAL_POKEMONS } from "@/lib/pokeapi";

export async function GET() {
  await connection();
  const id = Math.floor(Math.random() * TOTAL_POKEMONS) + 1;
  const pokemon = await recupererPokemon(String(id));
  if (!pokemon) {
    return NextResponse.json({ erreur: "Pokémon introuvable" }, { status: 404 });
  }
  return NextResponse.json(pokemon);
}
```

`await connection()` dit à Next.js d'attendre une vraie requête avant de continuer. Sans cette ligne, il tenterait de préparer la réponse à l'avance, et le tirage serait le même pour tout le monde.

Visitez `/api/aleatoire` : un Pokémon différent à chaque rechargement. Un Route Handler s'exécute sur le serveur. C'est là qu'on place ce qui doit rester secret, comme une clé d'API payante.

### Variables d'environnement

`.env.local`

```bash
# Lisible uniquement sur le serveur
CLE_API_SECRETE=abc123

# Le préfixe NEXT_PUBLIC_ rend la valeur visible dans le navigateur
NEXT_PUBLIC_NOM_DU_SITE=Pokédex
```

On les lit avec `process.env.CLE_API_SECRETE`. Le fichier `.env.local` ne se commite jamais : il est déjà dans `.gitignore`.

### Accessibilité : la liste de contrôle

- Toute l'application s'utilise au clavier (touche Tab, Entrée), et l'élément actif est visible.
- Chaque image a un `alt`, chaque champ un libellé ou un `aria-label`.
- Un seul `<h1>` par page, puis des `<h2>` dans l'ordre.
- Le texte se lit sur son fond : testez les badges de type clairs.
- Une action est un `<button>`, une navigation est un lien.

### Performance

Dans Chrome, ouvrez les outils de développement, onglet Lighthouse, et lancez un audit sur la version de production (`npm run build` puis `npm start`). Visez plus de 90 dans chaque catégorie. Les leviers habituels : `next/image`, l'attribut `loading="eager"` sur la grande image de la fiche, le cache, et peu de composants client.

**Quiz** — Une variable d'environnement sans préfixe `NEXT_PUBLIC_` est-elle lisible dans le navigateur ?

- Oui, toujours
- ✅ Non, seulement dans le code exécuté sur le serveur
- Oui, si on utilise `"use client"`
- Seulement en développement

> **Explication** — C'est ce qui protège vos secrets. Ne mettez jamais une clé privée dans une variable `NEXT_PUBLIC_`.

#### Exercice — Bouton « Au hasard »

Ajoutez dans l'en-tête un bouton qui appelle `/api/aleatoire` puis navigue vers la fiche du Pokémon reçu.

<details><summary>Voir la correction</summary>

`components/BoutonHasard.tsx`

```tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoutonHasard() {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);

  const tirer = async () => {
    setEnCours(true);
    try {
      const reponse = await fetch("/api/aleatoire");
      if (!reponse.ok) throw new Error("Tirage impossible");
      const pokemon = await reponse.json();
      router.push(`/pokemon/${pokemon.nom}`);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <button onClick={tirer} disabled={enCours} className="disabled:opacity-50">
      {enCours ? "Tirage…" : "Au hasard"}
    </button>
  );
}
```

</details>

## Mettre en ligne et finaliser le projet

`l-10-2` · 50 min

### Vérifier avant de publier

`Terminal`

```bash
npm run lint     # signale les erreurs de code
npm run build    # construit la version de production
npm start        # la lance en local pour un dernier test
```

Le `build` échoue sur une erreur TypeScript : corrigez-les toutes. Il affiche ensuite la liste des pages, avec un symbole indiquant si elles sont statiques ou construites à la demande.

### Déployer sur Vercel

1. Créez un dépôt sur GitHub et poussez-y votre code.
2. Sur vercel.com, connectez-vous avec GitHub puis choisissez « Add New… → Project ».
3. Sélectionnez le dépôt. Vercel reconnaît Next.js : gardez les réglages proposés et lancez le déploiement.
4. Vous obtenez une adresse publique. Chaque `git push` redéploie automatiquement.

`Terminal`

```bash
git add .
git commit -m "Pokédex : version finale"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/pokedex.git
git push -u origin main
```

---

**TP Pokédex**

#### Étape 18 — Le Pokédex en ligne

- [ ] `npm run lint` et `npm run build` passent sans erreur
- [ ] Le dépôt GitHub existe, avec un fichier README qui décrit le projet
- [ ] L'application est en ligne sur Vercel
- [ ] J'ai testé le site sur un téléphone
- [ ] L'audit Lighthouse dépasse 90 en accessibilité
- [ ] Favoris et sacoche fonctionnent sur la version en ligne

---

### Grille d'évaluation du projet

| Critère | Points |
| --- | --- |
| Liste paginée avec illustration, numéro et types | 3 |
| Fiche détaillée : statistiques et évolutions | 3 |
| Recherche et filtre par type, rangés dans l'adresse | 3 |
| Favoris et sacoche avec Zustand : règles respectées, conservés après rechargement | 4 |
| États de chargement, d'erreur et page 404 | 2 |
| Code : types, couche d'accès aux données, découpage en composants | 2 |
| Qualité de l'interface : hiérarchie, cohérence, responsive, thème sombre, accessibilité | 2 |
| Application déployée | 1 |
| **Total** | **20** |

### Pour aller plus loin

- Afficher les noms en français, à partir de `/pokemon-species`.
- Un comparateur : deux Pokémon côte à côte, statistiques en regard.
- Un combat simulé entre deux sacoches, à partir des statistiques.
- Réordonner la sacoche par glisser-déposer.
- Un quiz « Qui est ce Pokémon ? » à partir de la silhouette (`brightness-0` en Tailwind).
- Le tri par nom, par numéro ou par statistique.
- Le défilement infini à la place de la pagination.
