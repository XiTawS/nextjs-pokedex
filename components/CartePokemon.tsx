import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Pokemon } from "@/types/pokemon";
import { teinteType } from "@/lib/types";
import BadgeType from "./BadgeType";
import BoutonFavori from "./BoutonFavori";

export default function CartePokemon({ pokemon }: { pokemon: Pokemon }) {
  const numero = `#${String(pokemon.id).padStart(3, "0")}`;
  const teinte = { "--teinte": teinteType(pokemon.types[0]) } as CSSProperties;

  return (
    <div className="relative">
      <Link
        href={`/pokemon/${pokemon.nom}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pokedex"
      >
        <article
          style={teinte}
          className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm
                   transition duration-300 hover:-translate-y-1 hover:shadow-xl
                   motion-reduce:transition-none motion-reduce:hover:translate-y-0
                   dark:border-white/10 dark:bg-gray-900"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-(--teinte)/25 to-transparent"
          />
          <span
            aria-hidden
            className="absolute right-3 top-1 text-5xl font-black text-(--teinte)/20"
          >
            {numero}
          </span>
          <div className="relative text-center">
            <Image
              src={pokemon.image}
              alt={pokemon.nomAffiche}
              width={160}
              height={160}
              className="mx-auto drop-shadow-lg transition duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <h2 className="mb-2 mt-1 text-lg font-bold capitalize tracking-tight">
              {pokemon.nomAffiche}
            </h2>
            <div className="flex flex-wrap justify-center gap-1">
              {pokemon.types.map((type) => (
                <BadgeType key={type} type={type} />
              ))}
            </div>
          </div>
        </article>
      </Link>
      <div className="absolute left-2 top-2 z-10">
        <BoutonFavori nom={pokemon.nom} libelle={pokemon.nomAffiche} />
      </div>
    </div>
  );
}
