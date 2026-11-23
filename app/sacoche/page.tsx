"use client";
import Link from "next/link";
import BadgeType from "@/components/BadgeType";
import BoutonVider from "@/components/BoutonVider";
import ImagePokemon from "@/components/ImagePokemon";
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Ma sacoche</h1>
        <BoutonVider />
      </div>
      <p className="mb-2 text-gray-500">
        {equipe.length} / {TAILLE_SACOCHE} Pokémon · {typesCouverts.length}{" "}
        {typesCouverts.length > 1 ? "types couverts" : "type couvert"}
      </p>
      <div className="mb-6 flex flex-wrap gap-1">
        {typesCouverts.map((type) => (
          <BadgeType key={type} type={type} />
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipe.map((membre) => {
          const nomAffiche = membre.nomAffiche ?? formaterNom(membre.nom);
          return (
            <li
              key={membre.id}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900"
            >
              <ImagePokemon
                sources={[membre.image]}
                alt={nomAffiche}
                width={96}
                height={96}
                className="drop-shadow"
              />
              <div className="min-w-0 flex-1">
                <input
                  value={membre.surnom}
                  onChange={(e) => renommer(membre.id, e.target.value)}
                  placeholder={nomAffiche}
                  maxLength={12}
                  aria-label={`Surnom de ${nomAffiche}`}
                  className="mb-2 w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-lg font-bold hover:border-black/10 focus:border-pokedex focus:outline-none"
                />
                <div className="flex flex-wrap gap-1">
                  {membre.types.map((type) => (
                    <BadgeType key={type} type={type} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => retirer(membre.id)}
                aria-label={`Retirer ${nomAffiche} de la sacoche`}
                className="size-9 rounded-full text-gray-500 transition hover:bg-black/5 hover:text-pokedex"
              >
                ✕
              </button>
            </li>
          );
        })}

        {Array.from({ length: emplacementsLibres }, (_, i) => (
          <li key={`libre-${i}`}>
            <Link
              href="/"
              className="grid min-h-32 place-items-center rounded-2xl border-2 border-dashed border-black/15 text-gray-500 transition hover:border-pokedex hover:text-pokedex dark:border-white/15"
            >
              Emplacement libre
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
