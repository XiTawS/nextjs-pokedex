# Chapitre 1 — Rappels web

> Expliquer HTTP, JSON, HTML et CSS · 100 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Comment fonctionne le web

`l-1-1` · 50 min

Une application web repose sur un échange : un **client** (le navigateur) envoie une **requête**, un **serveur** renvoie une **réponse**. Le protocole de cet échange s'appelle HTTP.

### Anatomie d'une requête

`Une adresse d’API`

```text
https://pokeapi.co/api/v2/pokemon?limit=20&offset=40
└─┬─┘   └────┬───┘└──────┬──────┘└────────┬────────┘
protocole  domaine     chemin        paramètres
```

La **méthode** dit l'intention : `GET` pour lire, `POST` pour créer, `PUT` ou `PATCH` pour modifier, `DELETE` pour supprimer. La PokéAPI ne propose que de la lecture : vous n'utiliserez que `GET`.

### Les codes de statut

| Code | Signification | Dans le Pokédex |
| --- | --- | --- |
| 200 | Tout va bien | Le Pokémon est renvoyé |
| 404 | Ressource introuvable | Le nom demandé n'existe pas |
| 429 | Trop de requêtes | Vous appelez l'API trop vite |
| 500 | Erreur du serveur | L'API est en panne |

### Le format JSON

La réponse d'une API arrive presque toujours en JSON : du texte structuré en objets (accolades) et en listes (crochets).

`Réponse simplifiée de /pokemon/pikachu`

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    { "slot": 1, "type": { "name": "electric" } }
  ]
}
```

#### Exercice — Lire une réponse réelle

Ouvrez `https://pokeapi.co/api/v2/pokemon/pikachu` dans votre navigateur. Cherchez : la taille, le poids, le nom du premier type, et l'adresse de l'image « official-artwork ».

<details><summary>Voir la correction</summary>

`height` vaut 4 (en décimètres, soit 40 cm), `weight` vaut 60 (en hectogrammes, soit 6 kg), le type est `electric`. L'image se trouve dans `sprites.other["official-artwork"].front_default`.

</details>

**Quiz** — Vous demandez `/pokemon/pikachuu` (avec une faute). Quel code recevez-vous ?

- 200
- ✅ 404
- 500
- 301

> **Explication** — 404 : le serveur fonctionne, mais la ressource demandée n'existe pas.

**Quiz** — En JSON, que délimitent les crochets `[ ]` ?

- ✅ Une liste de valeurs
- Un objet avec des clés
- Un commentaire
- Une chaîne de caractères

> **Explication** — Les crochets délimitent une liste, les accolades un objet.

## HTML sémantique et CSS essentiel

`l-1-2` · 50 min

React produit du HTML et Tailwind produit du CSS. Il faut donc connaître les deux pour comprendre ce que vous écrirez.

### HTML : donner du sens

`structure.html`

```html
<header>
  <nav><a href="/">Accueil</a> <a href="/favoris">Favoris</a></nav>
</header>
<main>
  <h1>Pokédex</h1>
  <ul>
    <li><article><h2>Pikachu</h2><img src="pikachu.png" alt="Pikachu"></article></li>
  </ul>
</main>
<footer>Données : PokéAPI</footer>
```

Choisissez la balise selon le rôle du contenu : `<button>` pour une action, `<a>` pour aller ailleurs, `<h1>` à `<h3>` pour les titres, `<ul>` pour une liste. Les lecteurs d'écran et les moteurs de recherche s'appuient dessus. Une image porte toujours un attribut `alt`.

### CSS : le modèle de boîte

Chaque élément est une boîte : le contenu, puis le `padding` (marge intérieure), la `border`, et le `margin` (marge extérieure).

### Flexbox et Grid

`styles.css`

```css
/* Flexbox : aligner sur une ligne */
.entete { display: flex; justify-content: space-between; align-items: center; gap: 16px; }

/* Grid : une grille de cartes */
.grille { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

/* Responsive : 2 colonnes sur petit écran */
@media (max-width: 640px) {
  .grille { grid-template-columns: repeat(2, 1fr); }
}
```

> **Note** — Flexbox range des éléments sur un axe (une ligne ou une colonne). Grid range des éléments sur deux axes. Pour la grille du Pokédex, vous utiliserez Grid. Pour l'en-tête, Flexbox.

**Quiz** — Quelle propriété ajoute de l'espace *à l'intérieur* d'une boîte, entre sa bordure et son contenu ?

- `margin`
- `gap`
- `border`
- ✅ `padding`

> **Explication** — `padding` est intérieur, `margin` est extérieur, `gap` sépare les enfants d'un conteneur flex ou grid.

#### Exercice — Une carte en HTML et CSS

Dans un fichier `carte.html`, écrivez une carte Pokémon : un numéro, une image, un nom, et deux étiquettes de type côte à côte. La carte a une bordure, des coins arrondis et 16 px de marge intérieure.

<details><summary>Voir la correction</summary>

`carte.html`

```html
<article class="carte">
  <span>#006</span>
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="Dracaufeu">
  <h2>Dracaufeu</h2>
  <div class="types"><span>Feu</span><span>Vol</span></div>
</article>
<style>
  .carte { border: 1px solid #ccc; border-radius: 12px; padding: 16px; width: 180px; text-align: center; }
  .types { display: flex; gap: 8px; justify-content: center; }
  .types span { background: #eee; border-radius: 999px; padding: 2px 10px; }
</style>
```

</details>
