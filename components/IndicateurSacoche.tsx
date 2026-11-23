"use client";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";

// Six pastilles : une pleine par Pokémon dans la sacoche.
export default function IndicateurSacoche() {
  const nombre = useSacoche((etat) => etat.equipe.length);
  return (
    <span role="img" aria-label={`${nombre} Pokémon sur ${TAILLE_SACOCHE}`} className="ml-2 flex items-center gap-0.5">
      {Array.from({ length: TAILLE_SACOCHE }, (_, i) => (
        <span
          key={i}
          className={`size-2 rounded-full border border-pokedex transition ${i < nombre ? "bg-pokedex" : "bg-transparent"}`}
        />
      ))}
    </span>
  );
}
