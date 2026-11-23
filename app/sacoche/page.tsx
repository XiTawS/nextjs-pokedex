"use client";
import { X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import BadgeType from "@/components/BadgeType";
import BoutonVider from "@/components/BoutonVider";
import IconePokeball from "@/components/IconePokeball";
import ImagePokemon from "@/components/ImagePokemon";
import { teinteVive } from "@/lib/types";
import { useTypesCouverts } from "@/hooks/useTypesCouverts";
import { formaterNom } from "@/lib/conversion";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";

export default function PageSacoche() {
  const equipe = useSacoche((etat) => etat.equipe);
  const retirer = useSacoche((etat) => etat.retirer);
  const renommer = useSacoche((etat) => etat.renommer);

  const typesCouverts = useTypesCouverts();
  const emplacementsLibres = TAILLE_SACOCHE - equipe.length;

  return (
    <>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Ma sacoche</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {equipe.length} / {TAILLE_SACOCHE} Pokémon · {typesCouverts.length}{" "}
            {typesCouverts.length > 1 ? "types couverts" : "type couvert"}
          </p>
        </div>
        <BoutonVider />
      </header>
      {typesCouverts.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {typesCouverts.map((type) => (
            <BadgeType key={type} type={type} />
          ))}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipe.map((membre) => {
          const nomAffiche = membre.nomAffiche ?? formaterNom(membre.nom);
          const teinte = {
            "--vive": teinteVive(membre.types[0]),
          } as CSSProperties;
          return (
            <li
              key={membre.id}
              style={teinte}
              className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
            >
              <Link
                href={`/pokemon/${membre.nom}`}
                aria-label={`Fiche de ${nomAffiche}`}
                className="grid size-20 shrink-0 place-items-center rounded-full bg-(--vive)/30 transition hover:scale-105"
              >
                <ImagePokemon
                  sources={[membre.image]}
                  alt=""
                  width={96}
                  height={96}
                  className="size-16 object-contain drop-shadow"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <input
                  value={membre.surnom}
                  onChange={(e) => renommer(membre.id, e.target.value)}
                  placeholder={nomAffiche}
                  maxLength={12}
                  aria-label={`Surnom de ${nomAffiche}`}
                  className="mb-1 w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-lg font-semibold placeholder:text-gray-900 hover:border-black/10 focus:border-pokedex focus:outline-none dark:placeholder:text-gray-100 dark:hover:border-white/15"
                />
                <div className="flex flex-wrap gap-1 px-2">
                  {membre.types.map((type) => (
                    <BadgeType key={type} type={type} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => retirer(membre.id)}
                aria-label={`Retirer ${nomAffiche} de la sacoche`}
                className="grid size-9 shrink-0 place-items-center rounded-full text-gray-500 transition hover:bg-black/5 hover:text-pokedex dark:hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </li>
          );
        })}

        {Array.from({ length: emplacementsLibres }, (_, i) => (
          <li key={`libre-${i}`}>
            <Link
              href="/"
              className="flex min-h-28 h-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-black/15 text-sm font-medium text-gray-500 transition hover:border-pokedex hover:text-pokedex dark:border-white/15 dark:text-gray-400"
            >
              <IconePokeball className="size-5" />
              Emplacement libre
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
