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
