"use client";
import { Star } from "lucide-react";
import { useFavoris } from "@/stores/favoris";

export default function BoutonFavori({ nom, libelle = nom }: { nom: string; libelle?: string }) {
  const actif = useFavoris((etat) => etat.noms.includes(nom));
  const basculer = useFavoris((etat) => etat.basculer);

  return (
    <button
      onClick={() => basculer(nom)}
      aria-pressed={actif}
      aria-label={actif ? `Retirer ${libelle} des favoris` : `Ajouter ${libelle} aux favoris`}
      className="grid size-9 place-items-center rounded-full transition hover:bg-black/5 active:scale-90 dark:hover:bg-white/10"
    >
      <Star className={`size-5 ${actif ? "fill-amber-400 text-amber-500" : "text-gray-500 dark:text-gray-400"}`} />
    </button>
  );
}
