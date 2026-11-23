"use client";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";
import type { Pokemon } from "@/types/pokemon";

const BASE = "rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95";

export default function BoutonSacoche({ pokemon }: { pokemon: Pokemon }) {
  const dedans = useSacoche((etat) => etat.equipe.some((m) => m.id === pokemon.id));
  const pleine = useSacoche((etat) => etat.equipe.length >= TAILLE_SACOCHE);
  const ajouter = useSacoche((etat) => etat.ajouter);
  const retirer = useSacoche((etat) => etat.retirer);

  if (dedans) {
    return (
      <button onClick={() => retirer(pokemon.id)} className={`${BASE} border border-pokedex text-pokedex`}>
        Retirer de la sacoche
      </button>
    );
  }
  return (
    <button
      onClick={() => ajouter(pokemon)}
      disabled={pleine}
      className={`${BASE} bg-pokedex text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {pleine ? "Sacoche pleine" : "Ajouter à la sacoche"}
    </button>
  );
}
