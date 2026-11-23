import Link from "next/link";
import type { CSSProperties } from "react";
import { teinteVive } from "@/lib/types";
import type { Pokemon } from "@/types/pokemon";
import BadgeType from "./BadgeType";
import BoutonFavori from "./BoutonFavori";
import IconeType from "./IconeType";
import ImagePokemon from "./ImagePokemon";

// Une carte de la grille, dans l'esprit de la fiche : haut coloré et arrondi, icône du type en filigrane.
export default function CartePokemon({ pokemon }: { pokemon: Pokemon }) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  const teinte = { "--vive": teinteVive(pokemon.types[0]) } as CSSProperties;

  return (
    <div className="relative h-full">
      <Link
        href={`/pokemon/${pokemon.nom}`}
        className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pokedex"
      >
        <article
          style={teinte}
          className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl bg-white px-3 pb-4 pt-3 shadow-sm ring-1 ring-black/5
                     transition duration-300 hover:-translate-y-1 hover:shadow-xl
                     motion-reduce:transition-none motion-reduce:hover:translate-y-0
                     dark:bg-gray-900 dark:ring-white/10"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-36 rounded-b-[50%_30%] bg-linear-to-br from-(--vive) to-(--vive)/65"
          >
            <IconeType type={pokemon.types[0]} className="absolute left-1/2 top-3 size-28 -translate-x-1/2 text-white/30" />
          </div>
          <span className="relative self-start rounded-full bg-white/85 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700 dark:bg-gray-900/85 dark:text-gray-200">
            {numero}
          </span>
          <ImagePokemon
            sources={[pokemon.image]}
            alt={pokemon.nomAffiche}
            width={160}
            height={160}
            className="relative -mt-2 size-32 object-contain drop-shadow-lg transition duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <h2 className="relative mt-1 text-center text-base font-semibold tracking-tight wrap-anywhere">
            {pokemon.nomAffiche}
          </h2>
          <div className="relative mt-2 flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <BadgeType key={type} type={type} />
            ))}
          </div>
        </article>
      </Link>
      <div className="absolute right-2 top-2 z-10 rounded-full bg-white/85 dark:bg-gray-900/85">
        <BoutonFavori nom={pokemon.nom} libelle={pokemon.nomAffiche} />
      </div>
    </div>
  );
}
