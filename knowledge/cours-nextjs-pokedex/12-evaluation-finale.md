# Chapitre 12 — Évaluation finale

> Valider vos acquis · 60 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Grand QCM et questions ouvertes

`l-11-1` · 60 min

30 questions à choix multiple, puis 6 questions ouvertes. Répondez sans consulter le cours. Vos réponses sont enregistrées au fur et à mesure. Quand vous validez, le score et la correction s'affichent, et un bouton copie l'ensemble pour l'envoyer à votre formateur.

### Partie 1 — QCM (réponse marquée ✅)

1. Quel mot-clé déclare une variable qui ne pourra pas être réassignée ?
    - let
    - ✅ const
    - var
    - static

2. Que renvoie [1, 2, 3].map((n) => n * 2) ?
    - 6
    - [1, 2, 3, 1, 2, 3]
    - ✅ [2, 4, 6]
    - undefined

3. Que renvoie la méthode filter ?
    - ✅ Un nouveau tableau avec les éléments qui passent le test
    - Le premier élément qui passe le test
    - Un booléen
    - Le tableau d'origine modifié

4. Deux composants appellent le même hook personnalisé, qui contient un useState. Partagent-ils cet état ?
    - Oui, toujours
    - Oui, s'ils sont sur la même page
    - Seulement avec un Provider autour du hook
    - ✅ Non : chaque appel possède son propre état

5. Où peut-on utiliser le mot-clé await ?
    - Partout
    - ✅ Dans une fonction async (ou au premier niveau d'un module)
    - Uniquement dans useEffect
    - Uniquement avec fetch

6. L'API répond avec un statut 404. Que fait fetch ?
    - Il lève une erreur
    - Il renvoie null
    - ✅ Il renvoie une réponse dont la propriété ok vaut false
    - Il relance la requête

7. Avec Zustand, pourquoi lire le store avec un sélecteur, par exemple useSacoche((etat) => etat.equipe.length) ?
    - ✅ Le composant ne se réaffiche que si cette valeur change
    - C'est obligatoire pour que persist fonctionne
    - Cela rend le composant serveur
    - Cela chiffre les données

8. En TypeScript, que décrit string | null ?
    - Un champ optionnel
    - Un tableau
    - Une fonction
    - ✅ Une union : soit une chaîne, soit null

9. Où faut-il faire respecter la limite de six Pokémon dans la sacoche ?
    - Uniquement en désactivant le bouton
    - ✅ Dans l'action du store qui ajoute un Pokémon
    - Dans le fichier CSS
    - Dans le layout

10. Qu'est-ce qu'un composant React ?
    - Un fichier HTML
    - Une classe CSS
    - ✅ Une fonction qui renvoie du JSX
    - Une route d'API

11. Que peut-on dire des props ?
    - ✅ Elles sont fournies par le parent et en lecture seule
    - L'enfant peut les modifier librement
    - Elles sont stockées dans localStorage
    - Elles n'existent que côté serveur

12. À quoi sert la prop key dans une liste ?
    - À styliser l'élément
    - À trier la liste
    - À chiffrer les données
    - ✅ À permettre à React d'identifier chaque élément d'un affichage à l'autre

13. Que renvoie useState(0) ?
    - La valeur 0
    - ✅ Un tableau : la valeur et sa fonction de mise à jour
    - Une promesse
    - Un objet { state, setState }

14. Pourquoi favoris.push(nom) ne met-il pas l'affichage à jour ?
    - push est asynchrone
    - Il faut appeler render()
    - ✅ Le tableau garde la même référence : React ne détecte aucun changement
    - push n'existe pas en TypeScript

15. Quand s'exécute un useEffect dont le tableau de dépendances est [] ?
    - ✅ Une fois, après le premier affichage
    - À chaque affichage
    - Jamais
    - Avant le premier affichage

16. À quoi sert la fonction renvoyée par un effet ?
    - À déclarer les dépendances
    - À renvoyer le JSX
    - À mettre en cache
    - ✅ À nettoyer : arrêter un minuteur, ignorer une réponse devenue inutile

17. Avec Tailwind, à partir de quelle largeur md:grid-cols-4 s'applique-t-il ?
    - 640 px
    - ✅ 768 px
    - 1024 px
    - À toutes les largeurs

18. Pourquoi la classe `bg-type-${type}` ne produit-elle aucun style ?
    - Les couleurs personnalisées sont interdites
    - Il manque le préfixe dark:
    - ✅ Tailwind ne génère que les classes qu'il lit en entier dans le code source
    - Les gabarits de chaîne sont interdits en JSX

19. Quel hook garde une valeur d'un affichage à l'autre sans déclencher de nouvel affichage quand elle change ?
    - ✅ useRef
    - useState
    - useEffect
    - useId

20. Quel est le rôle de layout.tsx ?
    - Afficher les erreurs
    - Définir une route d'API
    - Charger les polices uniquement
    - ✅ Fournir l'enveloppe partagée, conservée d'une page à l'autre

21. Dans le dossier app, un composant est par défaut…
    - Un Client Component
    - ✅ Un Server Component
    - Un Route Handler
    - Un hook

22. Quand faut-il écrire "use client" ?
    - Dans toutes les pages
    - Pour utiliser fetch
    - ✅ Quand le composant utilise un état, un événement ou une API du navigateur
    - Pour utiliser Tailwind

23. Quel avantage a le composant Link sur une balise a pour un lien interne ?
    - ✅ Il navigue sans recharger toute la page et précharge la destination
    - Il ouvre un nouvel onglet
    - Il fonctionne hors connexion
    - Il masque l'adresse

24. À quoi correspond app/pokemon/[nom]/page.tsx ?
    - Une page nommée [nom]
    - Un layout
    - Un fichier ignoré par Next.js
    - ✅ Une route dynamique : une page pour chaque valeur de nom

25. Dans les versions récentes de Next.js, comment lit-on params dans une page ?
    - Avec useState
    - ✅ Avec await, car c'est une promesse
    - Avec localStorage
    - Avec document.location

26. Que fait Promise.all ?
    - Il exécute les promesses l'une après l'autre
    - Il renvoie la plus rapide
    - ✅ Il attend que toutes les promesses soient tenues et renvoie tous les résultats
    - Il ignore les erreurs

27. Dans Next.js 16, que faut-il faire d'une donnée lue sur le serveur ?
    - ✅ La mettre en cache avec "use cache" ou l'afficher sous un Suspense
    - La stocker dans un useState
    - La lire dans un useEffect
    - L'écrire dans localStorage

28. Quelle contrainte s'applique à error.tsx ?
    - Il doit être async
    - Il doit se trouver dans public/
    - Il doit exporter metadata
    - ✅ Il doit être un Client Component

29. Que fait l'appel notFound() ?
    - Il relance le fetch
    - ✅ Il affiche la page 404 (not-found.tsx)
    - Il vide le cache
    - Il redirige vers l'accueil

30. Pourquoi ranger la recherche dans l'adresse (?q=pika) plutôt que dans un useState seul ?
    - C'est obligatoire avec Tailwind
    - Cela évite TypeScript
    - ✅ Le résultat se partage par un lien, le bouton Précédent fonctionne et le serveur peut filtrer
    - Cela chiffre la recherche

### Partie 2 — Questions ouvertes

1. Expliquez la différence entre un Server Component et un Client Component. Donnez un exemple de chacun dans votre Pokédex, en justifiant le choix.
2. Décrivez le trajet complet d'une donnée, de la PokéAPI jusqu'à l'affichage d'une carte : fichiers traversés, conversions, composants.
3. Votre page d'accueil a besoin du détail de 24 Pokémon. Quelles techniques la rendent rapide, et pourquoi ?
4. Décrivez le store Zustand de la sacoche : ses données, ses actions, les règles qu'il fait respecter. Pourquoi le relit-on depuis localStorage dans un useEffect et non dès le premier affichage ?
5. Citez trois choix d'interface que vous avez faits pour rendre votre Pokédex agréable à utiliser, et justifiez-les.
6. Quelle a été votre principale difficulté pendant le projet, et comment l'avez-vous résolue ?
