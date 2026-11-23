# Pokédex

Un Pokédex des 1 025 Pokémon construit avec Next.js 16, React 19, Tailwind CSS 4 et Zustand, à partir des données de la [PokéAPI](https://pokeapi.co).

**En ligne : https://nextjs-pokedex-sepia.vercel.app** (déployé par Vercel à chaque fusion dans `main`, avec un aperçu pour chaque pull request).

Projet réalisé en suivant le cours « Next.js Pokédex » (contenu dans [`knowledge/cours-nextjs-pokedex`](knowledge/cours-nextjs-pokedex/README.md)).

## Fonctionnalités

- Grille paginée des 1 025 Pokémon, avec recherche par nom et filtre par type gardés dans l'adresse (`/?q=pika&type=electric&page=2`)
- Fiche de chaque Pokémon : image, types, taille, poids, statistiques et chaîne d'évolution ; les 151 premières sont pré-générées
- Favoris et sacoche du dresseur (six Pokémon, surnoms, types couverts), enregistrés dans le navigateur
- Route d'API `/api/aleatoire` et bouton « Au hasard »
- Squelettes de chargement, page d'erreur avec « Réessayer », page 404, thème sombre, raccourci `/` vers la recherche

## Démarrer

```bash
npm install      # installe aussi les hooks Git du projet
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Organisation

| Dossier | Contenu |
| --- | --- |
| `app/` | Pages, layouts, états (`loading`, `error`, `not-found`) et route d'API |
| `components/` | Composants d'interface ; ceux marqués `"use client"` sont interactifs |
| `lib/` | Accès aux données : `pokeapi.ts` (serveur, en cache), `pokeapi-client.ts` (navigateur), conversion et types de Pokémon |
| `stores/` | Stores Zustand : favoris et sacoche |
| `hooks/` | Hooks personnalisés |
| `types/` | Types TypeScript de l'API et de l'application |

## Contribuer

- `main` est protégée : chaque changement passe par une branche (`feat/…`, `fix/…`) et une pull request.
- Les messages de commit suivent le format conventionnel `type(portée): description` ; un hook Git le vérifie.
- La CI (« Checks ») lance le lint et le build sur chaque pull request ; elle doit être verte pour fusionner.
