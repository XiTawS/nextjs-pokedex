import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mars,
  Ruler,
  Sparkles,
  Venus,
  Weight,
} from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { formaterNombre } from "@/lib/conversion";
import { TYPES, teinteType, teinteVive } from "@/lib/types";
import type { DetailsPokemon, Pokemon } from "@/types/pokemon";
import { Apparition, Nombre, Remplissage } from "./Anime";
import BarresStats from "./BarresStats";
import BoutonCapture from "./BoutonCapture";
import BoutonFavori from "./BoutonFavori";
import IconeType from "./IconeType";
import ImagePokemon from "./ImagePokemon";

type Props = {
  pokemon: Pokemon;
  evolutions: Pokemon[];
  details: DetailsPokemon;
  precedent: string | null; // nom du Pokémon précédent dans le Pokédex
  suivant: string | null;
};

const PETIT_TITRE =
  "text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400";
const BOUTON_ROND =
  "absolute top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-900 shadow-lg shadow-black/10 transition hover:scale-105 active:scale-95 motion-reduce:transition-none";

export default function FichePokemon({
  pokemon,
  evolutions,
  details,
  precedent,
  suivant,
}: Props) {
  const teinte = {
    "--teinte": teinteType(pokemon.types[0]), // foncée : barres, texte
    "--vive": teinteVive(pokemon.types[0]), // vive : grands fonds
  } as CSSProperties;
  const femelles = details.pourcentageFemelles;

  return (
    <article style={teinte} className="mx-auto max-w-xl lg:max-w-none">
      {/* Sur grand écran : panneau coloré à gauche, informations à droite. Ce bloc borne le panneau
          collant : il cesse de suivre le défilement à la fin des informations, avant les évolutions. */}
      <div className="lg:grid lg:grid-cols-[5fr_6fr] lg:items-start lg:gap-12">
        {/* En-tête à la couleur du type principal, avec son icône en filigrane.
          top-20 : sous l'en-tête collant du site (≈ 57 px) plus une marge. */}
        <section className="relative -mx-4 -mt-6 h-80 sm:mx-0 sm:mt-0 lg:sticky lg:top-20 lg:h-[34rem]">
          <div
            aria-hidden
            className="absolute inset-0 overflow-hidden rounded-b-[50%_18%] bg-linear-to-br from-(--vive) to-(--vive)/75 sm:rounded-t-3xl lg:rounded-3xl"
          >
            <IconeType
              type={pokemon.types[0]}
              className="absolute left-1/2 top-8 size-52 -translate-x-1/2 text-white/30 lg:top-1/2 lg:size-96 lg:-translate-y-1/2"
            />
          </div>

          <div className="relative z-20 flex items-center justify-between px-4 pt-4">
            <Link
              href="/"
              aria-label="Retour au Pokédex"
              className="grid size-10 place-items-center rounded-full bg-white text-gray-900 shadow-md shadow-black/10 transition hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="size-6" />
            </Link>
            <BoutonCapture pokemon={pokemon} />
          </div>

          {precedent && (
            <Link
              href={`/pokemon/${precedent}`}
              aria-label="Pokémon précédent"
              className={`${BOUTON_ROND} left-3`}
            >
              <ChevronLeft className="size-6" />
            </Link>
          )}
          {suivant && (
            <Link
              href={`/pokemon/${suivant}`}
              aria-label="Pokémon suivant"
              className={`${BOUTON_ROND} right-3`}
            >
              <ChevronRight className="size-6" />
            </Link>
          )}

          <Apparition
            cle={pokemon.id}
            className="absolute inset-x-0 -bottom-6 z-10 flex justify-center lg:inset-y-0 lg:items-center"
          >
            {/* Le GIF de Showdown est petit (≈ 100 px) : agrandi en gardant des pixels nets. */}
            <ImagePokemon
              sources={[pokemon.sprite, pokemon.image]}
              alt={pokemon.nomAffiche}
              width={400}
              height={400}
              loading="eager"
              className="h-52 w-auto object-contain drop-shadow-xl [image-rendering:pixelated] lg:h-80"
            />
          </Apparition>
        </section>

        <div className="grid gap-6 px-1 pt-12 lg:pt-4">
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h1 className="text-4xl font-semibold tracking-tight wrap-anywhere">
                  {pokemon.nomAffiche}
                </h1>
                <BoutonFavori nom={pokemon.nom} libelle={pokemon.nomAffiche} />
              </div>
              <p className="font-mono text-gray-500 dark:text-gray-400">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
            </div>
            <Evolution details={details} evolue={evolutions.length > 1} />
          </header>

          <ul className="flex flex-wrap gap-3">
            {pokemon.types.map((type) => {
              const style = TYPES[type] ?? {
                libelle: type,
                classe: "bg-gray-500",
              };
              return (
                <li
                  key={type}
                  className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
                >
                  <span
                    className={`grid size-7 place-items-center rounded-full text-white ${style.classe}`}
                  >
                    <IconeType type={type} className="size-4" />
                  </span>
                  {style.libelle}
                </li>
              );
            })}
          </ul>

          {details.description && (
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {details.description}
            </p>
          )}

          <dl className="grid grid-cols-3 gap-4 border-t border-black/10 pt-6 dark:border-white/10">
            <Mesure icone={<Weight className="size-3.5" />} titre="Poids">
              <Nombre valeur={pokemon.poids} /> kg
            </Mesure>
            <Mesure icone={<Ruler className="size-3.5" />} titre="Taille">
              <Nombre valeur={pokemon.taille} /> m
            </Mesure>
            <Mesure icone={<Sparkles className="size-3.5" />} titre="Talent">
              {details.talent ?? "—"}
            </Mesure>
          </dl>

          <section aria-labelledby="titre-genre">
            <h2 id="titre-genre" className={`${PETIT_TITRE} text-center`}>
              Genre
            </h2>
            {femelles === null ? (
              <>
                <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                  Asexué
                </p>
              </>
            ) : (
              <>
                <div
                  role="img"
                  aria-label={`${formaterNombre(100 - femelles)} % de mâles, ${formaterNombre(femelles)} % de femelles`}
                  className="mt-2 flex h-2 overflow-hidden rounded-full bg-pink-400"
                >
                  <Remplissage
                    pourcentage={100 - femelles}
                    className="h-full bg-blue-700"
                  />
                </div>
                <div
                  aria-hidden
                  className="mt-1 flex justify-between text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="flex items-center gap-1">
                    <Mars className="size-4" /> {formaterNombre(100 - femelles)}{" "}
                    %
                  </span>
                  <span className="flex items-center gap-1">
                    <Venus className="size-4" /> {formaterNombre(femelles)} %
                  </span>
                </div>
              </>
            )}
          </section>

          <section aria-labelledby="titre-stats" className="grid gap-3">
            <h2 id="titre-stats" className={PETIT_TITRE}>
              Statistiques
            </h2>
            <BarresStats stats={pokemon.stats} />
          </section>

          {/* Dans la colonne d'informations : sur ordinateur, tout tient à droite du panneau, sans défiler. */}
          {evolutions.length > 1 && (
            <section aria-labelledby="titre-evolutions" className="grid gap-3">
              <h2 id="titre-evolutions" className={PETIT_TITRE}>
                Évolutions
              </h2>
              <ol className="grid grid-cols-[repeat(auto-fit,minmax(6.5rem,1fr))] gap-3">
                {evolutions.map((evolution) => (
                  <li key={evolution.id}>
                    <MiniEvolution
                      evolution={evolution}
                      estActuel={evolution.id === pokemon.id}
                    />
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

function Mesure({
  icone,
  titre,
  children,
}: {
  icone: ReactNode;
  titre: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className={`flex items-center gap-1 ${PETIT_TITRE}`}>
        {icone} {titre}
      </dt>
      <dd className="mt-1 text-xl font-medium wrap-anywhere">{children}</dd>
    </div>
  );
}

// À droite du nom : niveau d'évolution, ou ce qui en tient lieu.
function Evolution({
  details,
  evolue,
}: {
  details: DetailsPokemon;
  evolue: boolean;
}) {
  const etiquette = (lignes: [string, string]) => (
    <p className={`shrink-0 text-right leading-tight ${PETIT_TITRE}`}>
      {lignes[0]}
      <br />
      {lignes[1]}
    </p>
  );
  if (!evolue) return etiquette(["N’évolue", "pas"]);
  if (!details.evolueDUneAutreEspece) return etiquette(["Forme", "de base"]);
  if (details.niveauEvolution === null)
    return etiquette(["Évolution", "spéciale"]);
  return (
    <div className="shrink-0 text-right">
      <p className="leading-none">
        <span className="text-sm text-gray-500 dark:text-gray-400">niv. </span>
        <span className="text-4xl font-semibold">
          <Nombre valeur={details.niveauEvolution} />
        </span>
      </p>
      <p className={PETIT_TITRE}>Évolution</p>
    </div>
  );
}

function MiniEvolution({
  evolution,
  estActuel,
}: {
  evolution: Pokemon;
  estActuel: boolean;
}) {
  const teinte = { "--vive": teinteVive(evolution.types[0]) } as CSSProperties;
  return (
    <Link
      href={`/pokemon/${evolution.nom}`}
      aria-current={estActuel ? "page" : undefined}
      style={teinte}
      className={`flex h-full flex-col items-center gap-1 rounded-2xl bg-white p-2 text-center text-sm font-medium shadow-sm transition hover:-translate-y-0.5 motion-reduce:transition-none dark:bg-gray-900 ${
        estActuel
          ? "ring-2 ring-(--teinte)"
          : "ring-1 ring-black/5 hover:ring-black/20 dark:ring-white/10"
      }`}
    >
      <span className="grid size-16 place-items-center rounded-full bg-(--vive)/30">
        <ImagePokemon
          sources={[evolution.image]}
          alt=""
          width={96}
          height={96}
          className="size-14 object-contain"
        />
      </span>
      <span className="wrap-anywhere">{evolution.nomAffiche}</span>
    </Link>
  );
}
