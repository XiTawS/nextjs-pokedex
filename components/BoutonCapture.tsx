"use client";
import { useToast } from "@astryxdesign/core/Toast";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";
import type { Pokemon } from "@/types/pokemon";
import IconePokeball from "./IconePokeball";

// La Poké Ball de la fiche : ajoute le Pokémon à la sacoche ou l'en retire, et le confirme d'un toast.
export default function BoutonCapture({ pokemon }: { pokemon: Pokemon }) {
  const dedans = useSacoche((etat) => etat.equipe.some((m) => m.id === pokemon.id));
  const pleine = useSacoche((etat) => etat.equipe.length >= TAILLE_SACOCHE);
  const ajouter = useSacoche((etat) => etat.ajouter);
  const retirer = useSacoche((etat) => etat.retirer);
  const afficherToast = useToast();

  const basculer = () => {
    if (dedans) {
      retirer(pokemon.id);
      afficherToast({ body: `${pokemon.nomAffiche} a quitté la sacoche`, uniqueID: "sacoche" });
    } else if (pleine) {
      afficherToast({ body: `La sacoche est pleine (${TAILLE_SACOCHE} Pokémon)`, type: "error", uniqueID: "sacoche" });
    } else {
      ajouter(pokemon);
      afficherToast({ body: `${pokemon.nomAffiche} rejoint la sacoche`, uniqueID: "sacoche" });
    }
  };

  return (
    <button
      onClick={basculer}
      aria-pressed={dedans}
      aria-label={dedans ? `Retirer ${pokemon.nomAffiche} de la sacoche` : `Ajouter ${pokemon.nomAffiche} à la sacoche`}
      className={`grid size-10 place-items-center rounded-full transition active:scale-90 ${
        dedans ? "bg-pokedex text-white shadow-md shadow-black/10" : "bg-white text-gray-900 shadow-md shadow-black/10 hover:scale-105"
      }`}
    >
      <IconePokeball className="size-6" />
    </button>
  );
}
