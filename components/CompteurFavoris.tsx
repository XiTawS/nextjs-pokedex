"use client";
import { useFavoris } from "@/stores/favoris";

export default function CompteurFavoris() {
  const nombre = useFavoris((etat) => etat.noms.length);
  if (nombre === 0) return null;
  return (
    <span className="ml-1.5 rounded-full bg-pokedex px-1.5 text-xs font-bold text-white" aria-label={`${nombre} favoris`}>
      {nombre}
    </span>
  );
}
