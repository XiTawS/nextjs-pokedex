# Chapitre 0 — Démarrage

> Installer les outils et créer le projet · 60 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Bienvenue et objectif du cours

`l-0-1` · 20 min

Ce cours dure 35 heures. Vous partez des bases du langage JavaScript et vous arrivez à une application web complète, déployée en ligne : un Pokédex qui affiche les 1 025 Pokémon, avec leurs illustrations officielles, recherche, filtres par type, fiches détaillées, favoris et une sacoche de dresseur où composer son équipe de six.

Trois outils portent le projet : **React** pour construire l'interface en composants, **Next.js** pour les pages, la navigation et les appels de données, **Tailwind CSS** pour le style. **Zustand** gère l'état partagé : les favoris et la sacoche. Les données viennent de la **PokéAPI**, une API publique et gratuite, sans compte ni clé.

### Ce que vous allez construire

Voici une maquette qui fonctionne, sur 12 Pokémon. Cherchez un nom, filtrez par type, ajoutez des Pokémon à la sacoche (six au maximum) : c'est ce que vous coderez au chapitre 9, sur l'ensemble des Pokémon. Dans votre application, les pastilles seront remplacées par les illustrations officielles fournies par l'API.

*(Maquette interactive sur la page d'origine.)*

### Comment suivre le cours

- Chaque leçon alterne une notion, un exemple de code, un quiz et une mise en pratique.
- Les encadrés jaunes **TP Pokédex** font avancer l'application, étape par étape. Cochez chaque tâche terminée.
- Les encadrés bleus **Exercice** sont des entraînements courts, avec une correction repliée. Cherchez avant d'ouvrir.
- En bas de chaque leçon, le bouton « Marquer comme terminée » enregistre votre avancement.
- Le dernier chapitre est une évaluation : 30 questions à choix multiple et 6 questions ouvertes. Un bouton copie toutes vos réponses pour les envoyer au formateur.

### Le plan des 35 heures

Voir le plan détaillé dans [README.md](README.md).

## Installer les outils et créer le projet

`l-0-2` · 40 min

### Les trois outils à installer

- **Node.js**, version LTS (20 ou plus récente), depuis nodejs.org. Node exécute du JavaScript hors du navigateur et fournit `npm`, le gestionnaire de paquets.
- **Visual Studio Code**, avec les extensions « Tailwind CSS IntelliSense », « ESLint » et « Prettier ».
- **Git**, pour versionner le code et le déployer.

Vérifiez l'installation dans un terminal :

`Terminal`

```bash
node -v    # doit afficher v20 ou plus
npm -v
git --version
```

### Créer l'application

`Terminal`

```bash
npx create-next-app@latest pokedex
```

L'assistant pose quelques questions. Elles varient un peu selon la version, répondez ainsi :

| Question | Réponse |
| --- | --- |
| TypeScript ? | Oui |
| ESLint ? | Oui |
| Tailwind CSS ? | Oui |
| Dossier `src/` ? | Non |
| App Router ? | Oui |
| Alias d'import `@/*` ? | Oui, valeur par défaut |

`Terminal`

```bash
cd pokedex
npm run dev
```

Ouvrez `http://localhost:3000`. La page d'accueil de Next.js s'affiche.

> **Note** — Ce cours suit Next.js 16. Le fichier `next.config.ts` généré contient `cacheComponents: true` et `partialPrefetching: true` : ne supprimez pas ces lignes, tout le chapitre 7 repose dessus.

### Lire la structure du projet

`pokedex/`

```text
app/
  layout.tsx      enveloppe commune à toutes les pages
  page.tsx        la page d’accueil, adresse /
  globals.css     styles globaux, où Tailwind est chargé
public/           fichiers servis tels quels (images, icônes)
next.config.ts    configuration de Next.js
package.json      dépendances et commandes du projet
tsconfig.json     configuration de TypeScript
```

**Quiz** — Quelle commande lance le serveur de développement ?

- `npm start`
- `node app/page.tsx`
- ✅ `npm run dev`
- `npx create-next-app`

> **Explication** — `npm run dev` exécute le script « dev » de package.json. Le serveur recharge la page à chaque enregistrement de fichier.

---

**TP Pokédex**

#### Étape 0 — Le projet vide

Remplacez tout le contenu de `app/page.tsx` par ceci, puis vérifiez le résultat dans le navigateur.

`app/page.tsx`

```tsx
export default function Accueil() {
  return (
    <main>
      <h1>Mon Pokédex</h1>
      <p>Bientôt 1 025 Pokémon ici.</p>
    </main>
  );
}
```

- [ ] Node, VS Code et Git sont installés
- [ ] Le projet `pokedex` est créé
- [ ] `npm run dev` affiche « Mon Pokédex »
- [ ] J'ai fait un premier commit Git

---
