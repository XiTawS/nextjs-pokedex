# Chapitre 9 — Interactivité avancée

> Recherche, filtres, pagination, Zustand, sacoche du dresseur · 230 min · source : https://claude.ai/artifact/J6VJ7b5TNAbH6pUCtxauJn

## Recherche et filtres dans l'adresse

`l-9-1` · 60 min

Où ranger le texte de la recherche ? Le réflexe est `useState`. Il existe mieux : **l'adresse de la page**, par exemple `/?q=pika&type=electric`.

- Le lien se partage et se met en favori, recherche comprise.
- Le bouton « Précédent » du navigateur fonctionne.
- Le serveur lit les paramètres et fait le filtrage : le navigateur reçoit directement le bon résultat.

### Chercher parmi 1 025 Pokémon

La PokéAPI n'a pas de recherche par nom. La stratégie : récupérer une fois la liste de tous les noms (`recupererTousLesNoms`, écrite à la leçon 8.3 et mise en cache), filtrer cette liste, puis ne charger le détail que des 24 Pokémon à afficher.

`lib/pokeapi.ts — à ajouter`

```ts
export async function recupererNomsParType(type: string): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const [tous, donnees] = await Promise.all([
    recupererTousLesNoms(),
    appeler<{ pokemon: { pokemon: { name: string } }[] }>(`/type/${type}`),
  ]);
  if (!donnees) return [];
  const duType = new Set(donnees.pokemon.map((p) => p.pokemon.name));
  return tous.filter((nom) => duType.has(nom));
}
```

### La page lit les paramètres

`app/page.tsx`

```tsx
type Props = {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
};

const PAR_PAGE = 24;

export default function Accueil({ searchParams }: Props) {
  return (
    <>
      <h1 className="mb-6 text-4xl font-black">Pokédex</h1>
      <Suspense fallback={<input disabled placeholder="Rechercher un Pokémon" />}>
        <BarreRecherche />
      </Suspense>
      <Suspense fallback={<SqueletteGrille />}>
        <Resultats searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Resultats({ searchParams }: Props) {
  const { q = "", type = "", page = "1" } = await searchParams;

  let noms = type in TYPES ? await recupererNomsParType(type) : await recupererTousLesNoms();
  const texte = q.trim().toLowerCase();
  if (texte) noms = noms.filter((nom) => nom.includes(texte));

  const nombrePages = Math.max(1, Math.ceil(noms.length / PAR_PAGE));
  const pageCourante = Math.min(Math.max(1, Number(page) || 1), nombrePages);
  const visibles = noms.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);
  const pokemons = await recupererPlusieurs(visibles);

  return (
    <>
      <FiltreTypes q={q} typeActif={type in TYPES ? type : ""} />
      <p className="my-4 text-sm text-gray-500">{noms.length} Pokémon</p>
      <GrillePokemons pokemons={pokemons} />
    </>
  );
}
```

Les paramètres de l'adresse ne sont connus qu'à la visite. La page transmet donc la promesse `searchParams` au composant `Resultats`, placé sous `<Suspense>`. Le titre et la barre de recherche s'affichent tout de suite, la grille arrive ensuite, précédée de son squelette.

> **Piège** — Tout ce qui vient de l'adresse est saisi par l'utilisateur, donc non fiable. Le code vérifie que `type` existe dans `TYPES` et que `page` est un nombre dans les bornes.

### La barre de recherche écrit dans l'adresse

`components/BarreRecherche.tsx`

```tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BarreRecherche() {
  const router = useRouter();
  const chemin = usePathname();
  const parametres = useSearchParams();
  const actuel = parametres.get("q") ?? "";
  const [texte, setTexte] = useState(actuel);

  useEffect(() => {
    if (texte === actuel) return;
    const minuteur = setTimeout(() => {
      const suivants = new URLSearchParams(parametres.toString());
      if (texte) suivants.set("q", texte);
      else suivants.delete("q");
      suivants.delete("page");
      router.replace(`${chemin}?${suivants.toString()}`);
    }, 300);
    return () => clearTimeout(minuteur);
  }, [texte, actuel, parametres, chemin, router]);

  return (
    <input
      type="search"
      value={texte}
      onChange={(e) => setTexte(e.target.value)}
      placeholder="Rechercher un Pokémon"
      aria-label="Rechercher un Pokémon"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
    />
  );
}
```

- **Temporisation (debounce)** : l'adresse n'est mise à jour que 300 ms après la dernière frappe. Le nettoyage de l'effet annule le minuteur précédent. Sans cela, chaque lettre déclencherait une requête.
- `router.replace` change l'adresse sans empiler une entrée d'historique par lettre.
- Changer la recherche supprime `page` : on repart de la première page.
- Un composant qui utilise `useSearchParams` se place dans un `<Suspense>`.

### Le filtre par type : de simples liens

`components/FiltreTypes.tsx`

```tsx
import Link from "next/link";
import { TYPES } from "@/lib/types";

function adresse(q: string, type: string) {
  const parametres = new URLSearchParams();
  if (q) parametres.set("q", q);
  if (type) parametres.set("type", type);
  return `/?${parametres.toString()}`;
}

export default function FiltreTypes({ q, typeActif }: { q: string; typeActif: string }) {
  return (
    <nav className="mt-4 flex flex-wrap gap-2" aria-label="Filtrer par type">
      <Link href={adresse(q, "")} className={typeActif ? "opacity-60" : "font-bold underline"}>
        Tous
      </Link>
      {Object.entries(TYPES).map(([type, style]) => (
        <Link
          key={type}
          href={adresse(q, type)}
          aria-current={type === typeActif ? "true" : undefined}
          className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${style.classe} ${
            type === typeActif ? "ring-2 ring-offset-2" : "opacity-70"
          }`}
        >
          {style.libelle}
        </Link>
      ))}
    </nav>
  );
}
```

> **Note** — Ce filtre est un composant serveur, sans aucun JavaScript côté navigateur. Un état rangé dans l'adresse se modifie avec un lien.

**Quiz** — Quel est l'intérêt principal de ranger la recherche dans l'adresse ?

- C'est plus court à coder
- Cela évite d'utiliser TypeScript
- Cela chiffre la recherche
- ✅ Le résultat se partage par un lien, le bouton Précédent fonctionne, et le serveur peut filtrer

> **Explication** — L'adresse est un état que tout le monde peut lire : l'utilisateur, le serveur et les autres personnes à qui on envoie le lien.

**Quiz** — À quoi sert la temporisation de 300 ms ?

- À ralentir l'utilisateur
- ✅ À attendre la fin de la frappe avant de lancer la recherche, pour éviter une requête par lettre
- À laisser le cache expirer
- À afficher une animation

> **Explication** — Chaque nouvelle frappe annule le minuteur précédent. Seule la dernière déclenche la navigation.

---

**TP Pokédex**

#### Étape 13 — Recherche et filtres

- [ ] La recherche par nom porte sur les 1 025 Pokémon
- [ ] Le filtre par type fonctionne, et se combine avec la recherche
- [ ] L'adresse reflète la recherche : je la copie dans un autre onglet et retrouve le même écran
- [ ] Une recherche sans résultat affiche un message clair
- [ ] Un type inventé dans l'adresse (`?type=licorne`) ne fait rien planter

---

## Pagination

`l-9-2` · 50 min

La page calcule déjà `pageCourante` et `nombrePages`. Il reste à afficher les liens, en conservant la recherche et le type dans l'adresse.

`components/Pagination.tsx`

```tsx
import Link from "next/link";

type Props = {
  page: number;
  nombrePages: number;
  q: string;
  type: string;
};

function adresse({ q, type }: Props, page: number) {
  const parametres = new URLSearchParams();
  if (q) parametres.set("q", q);
  if (type) parametres.set("type", type);
  if (page > 1) parametres.set("page", String(page));
  return `/?${parametres.toString()}`;
}

export default function Pagination(props: Props) {
  const { page, nombrePages } = props;
  if (nombrePages <= 1) return null;
  const style = "rounded-lg border px-4 py-2 font-semibold";

  return (
    <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={adresse(props, page - 1)} className={style}>Précédent</Link>
      ) : (
        <span className={`${style} opacity-40`}>Précédent</span>
      )}
      <span className="text-sm">Page {page} sur {nombrePages}</span>
      {page < nombrePages ? (
        <Link href={adresse(props, page + 1)} className={style}>Suivant</Link>
      ) : (
        <span className={`${style} opacity-40`}>Suivant</span>
      )}
    </nav>
  );
}
```

> **Note** — Un composant qui renvoie `null` n'affiche rien. C'est la façon habituelle de masquer un composant quand il n'a pas lieu d'être.

Le composant `Pagination` s'affiche à la fin de `Resultats`, qui connaît déjà `pageCourante`, `nombrePages`, `q` et `type`.

**Quiz** — 42 résultats, 24 par page. Combien de pages ?

- ✅ 2, soit `Math.ceil(42 / 24)`
- 1
- 1,75
- 3

> **Explication** — `Math.ceil` arrondit à l'entier supérieur : la deuxième page contient les 18 restants.

---

**TP Pokédex**

#### Étape 14 — Parcourir tout le Pokédex

- [ ] Les liens Précédent et Suivant fonctionnent et gardent la recherche et le type
- [ ] Le lien Précédent est inactif en page 1, Suivant en dernière page
- [ ] `?page=9999` ou `?page=abc` dans l'adresse ne font rien planter
- [ ] Le squelette de la grille apparaît pendant le chargement d'une nouvelle page

---

## État global avec Zustand : les favoris

`l-9-3` · 60 min

Les favoris doivent être connus de composants éloignés les uns des autres : chaque bouton étoile, le compteur de l'en-tête, la page Favoris. Les faire descendre de prop en prop serait pénible. On les range donc dans un **store** : un état placé hors des composants, auquel chacun s'abonne. **Zustand** est une bibliothèque très légère qui fait exactement cela.

`Terminal`

```bash
npm install zustand
```

### Créer un store

Un store contient des données et les **actions** qui les modifient. `create` renvoie un hook.

`stores/favoris.ts`

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type EtatFavoris = {
  noms: string[];
  basculer: (nom: string) => void;
};

export const useFavoris = create<EtatFavoris>()(
  persist(
    (set) => ({
      noms: [],
      basculer: (nom) =>
        set((etat) => ({
          noms: etat.noms.includes(nom)
            ? etat.noms.filter((n) => n !== nom)
            : [...etat.noms, nom],
        })),
    }),
    { name: "pokedex-favoris", skipHydration: true }
  )
);
```

- `set` reçoit l'état actuel et renvoie la partie à remplacer. Comme avec `useState`, on renvoie un nouveau tableau, on ne modifie pas l'ancien.
- `persist` enregistre le store dans `localStorage` sous la clé indiquée, et le relit au chargement.
- Aucun Provider à installer dans le layout : le store est un simple module importé là où il sert.

### Lire le store avec un sélecteur

`components/BoutonFavori.tsx`

```tsx
"use client";
import { useFavoris } from "@/stores/favoris";

export default function BoutonFavori({ nom }: { nom: string }) {
  const actif = useFavoris((etat) => etat.noms.includes(nom));
  const basculer = useFavoris((etat) => etat.basculer);

  return (
    <button
      onClick={() => basculer(nom)}
      aria-pressed={actif}
      aria-label={actif ? `Retirer ${nom} des favoris` : `Ajouter ${nom} aux favoris`}
      className="text-xl transition active:scale-90"
    >
      {actif ? "★" : "☆"}
    </button>
  );
}
```

La fonction passée au hook est un **sélecteur** : elle choisit la valeur qui intéresse le composant. Le composant ne se réaffiche que si cette valeur change. Avec 24 cartes à l'écran, cliquer sur une étoile ne réaffiche que le bouton concerné.

> **Piège** — Un sélecteur ne doit pas fabriquer un nouvel objet ou un nouveau tableau à chaque appel, par exemple `(etat) => ({ noms: etat.noms })` : Zustand croirait à un changement permanent et l'affichage tournerait en boucle. Sélectionnez une valeur à la fois, quitte à appeler le hook deux fois.

### Le piège de l'hydratation

Le serveur n'a pas de `localStorage` : il produit le HTML avec une liste de favoris vide. Si le navigateur relisait le stockage dès le premier affichage, son HTML serait différent de celui du serveur, et React signalerait une erreur d'hydratation. L'option `skipHydration` retarde cette lecture, et on la déclenche soi-même dans un effet, donc après le premier affichage.

`components/HydratationStores.tsx`

```tsx
"use client";
import { useEffect } from "react";
import { useFavoris } from "@/stores/favoris";

export default function HydratationStores() {
  useEffect(() => {
    useFavoris.persist.rehydrate();
  }, []);
  return null;
}
```

`app/layout.tsx`

```tsx
<body>
  <HydratationStores />
  <EnTete />
  <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
</body>
```

> **Piège** — Un bouton placé à l'intérieur d'un lien pose un problème d'accessibilité et de clic. Dans la carte, sortez le bouton du `Link` : `relative` sur la carte, `absolute left-2 top-2 z-10` sur le bouton.

### La page Favoris : un chargement côté navigateur

Le serveur ne connaît pas vos favoris. Cette page charge donc ses données dans le navigateur, avec le modèle de la leçon 4.5. Les fonctions de `lib/pokeapi.ts` portent `"use cache"` et ne s'exécutent que sur le serveur : il faut une fonction prévue pour le navigateur. Elle réutilise la même conversion.

`lib/pokeapi-client.ts`

```ts
import type { Pokemon, PokemonApi } from "@/types/pokemon";
import { API, versPokemon } from "./conversion";

export async function chargerPokemon(nom: string): Promise<Pokemon | null> {
  const reponse = await fetch(`${API}/pokemon/${encodeURIComponent(nom)}`);
  if (reponse.status === 404) return null;
  if (!reponse.ok) throw new Error(`La PokéAPI a répondu ${reponse.status} pour ${nom}`);
  return versPokemon((await reponse.json()) as PokemonApi);
}
```

`app/favoris/page.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";
import GrillePokemons from "@/components/GrillePokemons";
import { chargerPokemon } from "@/lib/pokeapi-client";
import { useFavoris } from "@/stores/favoris";
import type { Pokemon } from "@/types/pokemon";

export default function PageFavoris() {
  const noms = useFavoris((etat) => etat.noms);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [etat, setEtat] = useState<"chargement" | "pret" | "erreur">("chargement");

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

  if (etat === "erreur") return <p>Impossible de charger vos favoris.</p>;
  if (etat === "chargement") return <p>Chargement de vos favoris…</p>;
  if (pokemons.length === 0) return <p>Aucun favori pour le moment. Cliquez sur une étoile.</p>;
  return <GrillePokemons pokemons={pokemons} />;
}
```

**Q : Quelle différence avec le Context de React ?**

Le Context est intégré à React et convient pour une valeur qui change rarement (thème, langue). Mais tous les composants qui le lisent se réaffichent à chaque changement, et il faut un Provider. Zustand ajoute les sélecteurs, la persistance et se passe de Provider.

**Q : Faut-il tout mettre dans un store ?**

Non. Un état utilisé par un seul composant reste dans `useState`. La recherche et la page restent dans l'adresse. Les données de l'API restent côté serveur. Le store ne garde que ce qui est partagé et propre à l'utilisateur.

**Quiz** — Pourquoi écrire `useFavoris((etat) => etat.noms.includes(nom))` plutôt que lire tout le store ?

- ✅ Le composant ne se réaffiche que si cette valeur précise change
- C'est la seule écriture acceptée par TypeScript
- Cela enregistre la valeur dans localStorage
- Cela rend le composant serveur

> **Explication** — Le sélecteur limite l'abonnement du composant à ce dont il a besoin.

**Quiz** — Que fait le middleware `persist` ?

- Il envoie le store au serveur
- Il met les appels d'API en cache
- ✅ Il enregistre le store dans le stockage du navigateur et le relit au chargement
- Il empêche de modifier le store

> **Explication** — Par défaut il utilise `localStorage`, sous la clé donnée dans `name`.

**Quiz** — Pourquoi appeler `rehydrate()` dans un `useEffect` ?

- Pour aller plus vite
- ✅ Pour que le premier affichage du navigateur soit identique au HTML du serveur, puis charger les favoris ensuite
- Parce que `localStorage` est asynchrone
- Parce que Zustand l'exige dans tous les projets

> **Explication** — Les effets ne s'exécutent que dans le navigateur, après l'hydratation.

---

**TP Pokédex**

#### Étape 15 — Les favoris avec Zustand

- [ ] Zustand est installé et `stores/favoris.ts` existe
- [ ] Chaque carte et chaque fiche a un bouton étoile
- [ ] Les favoris survivent au rechargement de la page
- [ ] L'en-tête affiche le nombre de favoris, lu avec un sélecteur
- [ ] La page `/favoris` gère le chargement, l'erreur et la liste vide
- [ ] Aucune erreur d'hydratation dans la console

---

## La sacoche du dresseur

`l-9-4` · 60 min

Dernière grande fonctionnalité : le dresseur compose son équipe. La sacoche obéit à des **règles métier**, et c'est le store qui les fait respecter, pas les boutons.

- Six Pokémon au maximum.
- Pas deux fois le même Pokémon.
- Chaque membre peut recevoir un surnom.
- La sacoche est conservée d'une visite à l'autre.

### Le store

`stores/sacoche.ts`

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pokemon } from "@/types/pokemon";

export const TAILLE_SACOCHE = 6;

export type Membre = Pick<Pokemon, "id" | "nom" | "image" | "types"> & { surnom: string };

type EtatSacoche = {
  equipe: Membre[];
  ajouter: (pokemon: Pokemon) => void;
  retirer: (id: number) => void;
  renommer: (id: number, surnom: string) => void;
  vider: () => void;
};

export const useSacoche = create<EtatSacoche>()(
  persist(
    (set) => ({
      equipe: [],
      ajouter: (pokemon) =>
        set((etat) => {
          const dejaPresent = etat.equipe.some((membre) => membre.id === pokemon.id);
          if (dejaPresent || etat.equipe.length >= TAILLE_SACOCHE) return etat;
          const { id, nom, image, types } = pokemon;
          return { equipe: [...etat.equipe, { id, nom, image, types, surnom: "" }] };
        }),
      retirer: (id) =>
        set((etat) => ({ equipe: etat.equipe.filter((membre) => membre.id !== id) })),
      renommer: (id, surnom) =>
        set((etat) => ({
          equipe: etat.equipe.map((membre) => (membre.id === id ? { ...membre, surnom } : membre)),
        })),
      vider: () => set({ equipe: [] }),
    }),
    { name: "pokedex-sacoche", skipHydration: true }
  )
);
```

- `Pick<Pokemon, "id" | "nom" | …>` construit un type à partir de quelques champs d'un autre. On ne garde que ce qu'il faut pour afficher un membre, pas les statistiques.
- `ajouter` renvoie l'état inchangé si la règle n'est pas respectée. Même si un bouton oublie de se désactiver, la sacoche ne dépassera jamais six.
- `renommer` utilise `map` pour remplacer un seul membre par une copie modifiée.

Ajoutez `useSacoche.persist.rehydrate()` dans `HydratationStores`, à côté de celui des favoris.

> **Note** — Ce qui se calcule ne se stocke pas. « La sacoche est-elle pleine ? » et « quels types sont couverts ? » se déduisent de `equipe` : on les calcule dans un sélecteur ou dans le composant.

### Le bouton d'ajout

`components/BoutonSacoche.tsx`

```tsx
"use client";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";
import type { Pokemon } from "@/types/pokemon";

const BASE = "rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95";

export default function BoutonSacoche({ pokemon }: { pokemon: Pokemon }) {
  const dedans = useSacoche((etat) => etat.equipe.some((m) => m.id === pokemon.id));
  const pleine = useSacoche((etat) => etat.equipe.length >= TAILLE_SACOCHE);
  const ajouter = useSacoche((etat) => etat.ajouter);
  const retirer = useSacoche((etat) => etat.retirer);

  if (dedans) {
    return (
      <button onClick={() => retirer(pokemon.id)} className={`${BASE} border border-pokedex text-pokedex`}>
        Retirer de la sacoche
      </button>
    );
  }
  return (
    <button
      onClick={() => ajouter(pokemon)}
      disabled={pleine}
      className={`${BASE} bg-pokedex text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {pleine ? "Sacoche pleine" : "Ajouter à la sacoche"}
    </button>
  );
}
```

La fiche (composant serveur) passe l'objet `pokemon` à ce composant client. C'est permis : un objet de données simples traverse la frontière serveur-client.

### L'indicateur de l'en-tête

`components/IndicateurSacoche.tsx`

```tsx
"use client";
import Link from "next/link";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";

export default function IndicateurSacoche() {
  const nombre = useSacoche((etat) => etat.equipe.length);
  return (
    <Link href="/sacoche" aria-label={`Sacoche : ${nombre} Pokémon sur ${TAILLE_SACOCHE}`} className="flex items-center gap-1">
      {Array.from({ length: TAILLE_SACOCHE }, (_, i) => (
        <span
          key={i}
          className={`size-3 rounded-full border border-white transition ${i < nombre ? "bg-white" : "bg-white/20"}`}
        />
      ))}
    </Link>
  );
}
```

Six pastilles, pleines ou vides. Le sélecteur renvoie un nombre : l'indicateur ne se réaffiche que lorsque la taille de l'équipe change, pas quand on modifie un surnom.

### La page Sacoche

`app/sacoche/page.tsx`

```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import BadgeType from "@/components/BadgeType";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";

export default function PageSacoche() {
  const equipe = useSacoche((etat) => etat.equipe);
  const retirer = useSacoche((etat) => etat.retirer);
  const renommer = useSacoche((etat) => etat.renommer);

  const typesCouverts = [...new Set(equipe.flatMap((membre) => membre.types))];
  const emplacementsLibres = TAILLE_SACOCHE - equipe.length;

  return (
    <>
      <h1 className="text-3xl font-bold">Ma sacoche</h1>
      <p className="mb-6 text-gray-500">
        {equipe.length} / {TAILLE_SACOCHE} Pokémon · {typesCouverts.length} type(s) couvert(s)
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipe.map((membre) => (
          <li
            key={membre.id}
            className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900"
          >
            <Image src={membre.image} alt={membre.nom} width={96} height={96} className="drop-shadow" />
            <div className="min-w-0 flex-1">
              <input
                value={membre.surnom}
                onChange={(e) => renommer(membre.id, e.target.value)}
                placeholder={membre.nom}
                maxLength={12}
                aria-label={`Surnom de ${membre.nom}`}
                className="mb-2 w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-lg font-bold capitalize hover:border-black/10 focus:border-pokedex focus:outline-none"
              />
              <div className="flex flex-wrap gap-1">
                {membre.types.map((type) => (
                  <BadgeType key={type} type={type} />
                ))}
              </div>
            </div>
            <button
              onClick={() => retirer(membre.id)}
              aria-label={`Retirer ${membre.nom} de la sacoche`}
              className="size-9 rounded-full text-gray-400 transition hover:bg-black/5 hover:text-pokedex"
            >
              ✕
            </button>
          </li>
        ))}

        {Array.from({ length: emplacementsLibres }, (_, i) => (
          <li key={`libre-${i}`}>
            <Link
              href="/"
              className="grid min-h-32 place-items-center rounded-2xl border-2 border-dashed border-black/15 text-gray-400 transition hover:border-pokedex hover:text-pokedex dark:border-white/15"
            >
              Emplacement libre
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
```

Les emplacements libres sont dessinés, pas cachés : l'utilisateur voit d'un coup d'œil combien de places il reste, et chaque case vide le ramène à la liste. Un état vide bien conçu donne envie de le remplir.

**Quiz** — Où faut-il faire respecter la limite de six Pokémon ?

- Uniquement en désactivant le bouton
- Dans le CSS
- ✅ Dans l'action `ajouter` du store, et le bouton reflète cet état
- Dans la page d'accueil

> **Explication** — La règle vit à un seul endroit, près des données. L'interface peut l'afficher, elle ne doit pas en être la seule gardienne.

**Quiz** — Faut-il stocker `estPleine` dans le store ?

- ✅ Non : cela se calcule à partir de `equipe.length`
- Oui, pour aller plus vite
- Oui, sinon `persist` ne fonctionne pas
- Oui, dans un second store

> **Explication** — Stocker une valeur déductible crée deux sources de vérité qui finissent par se contredire.

**Quiz** — L'utilisateur tape un surnom. Quel composant se réaffiche parmi ceux-ci ?

- `IndicateurSacoche`, qui lit `equipe.length`
- Tous les `BoutonFavori`
- Toute l'application
- ✅ La page Sacoche, qui lit `equipe`

> **Explication** — Le tableau `equipe` est remplacé, donc la page se réaffiche. Sa longueur n'a pas changé : l'indicateur reste tranquille.

#### Exercice — Vider la sacoche, avec confirmation

Ajoutez un bouton « Vider la sacoche » qui demande confirmation : au premier clic il affiche « Confirmer ? », au second il vide. Il n'apparaît que si la sacoche contient au moins un Pokémon.

<details><summary>Voir la correction</summary>

`components/BoutonVider.tsx`

```tsx
"use client";
import { useState } from "react";
import { useSacoche } from "@/stores/sacoche";

export default function BoutonVider() {
  const nombre = useSacoche((etat) => etat.equipe.length);
  const vider = useSacoche((etat) => etat.vider);
  const [aConfirmer, setAConfirmer] = useState(false);

  if (nombre === 0) return null;
  return (
    <button
      onClick={() => {
        if (aConfirmer) vider();
        setAConfirmer(!aConfirmer);
      }}
      onBlur={() => setAConfirmer(false)}
      className="rounded-full border px-4 py-2 text-sm font-semibold"
    >
      {aConfirmer ? "Confirmer ?" : "Vider la sacoche"}
    </button>
  );
}
```

L'état « à confirmer » ne concerne que ce bouton : il reste dans un `useState`, pas dans le store.

</details>

---

**TP Pokédex**

#### Étape 16 — La sacoche

- [ ] `stores/sacoche.ts` existe, avec ses quatre actions
- [ ] La fiche d'un Pokémon propose d'ajouter ou de retirer de la sacoche
- [ ] Impossible de dépasser six Pokémon ou d'ajouter un doublon
- [ ] L'en-tête affiche six pastilles et un lien vers `/sacoche`
- [ ] La page Sacoche affiche les membres avec image, surnom modifiable et types, plus les emplacements libres
- [ ] La sacoche survit au rechargement, sans erreur d'hydratation
- [ ] Bonus : afficher les types couverts sous forme de badges, et un ajout rapide depuis les cartes de la liste

---
