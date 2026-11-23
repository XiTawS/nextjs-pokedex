import { create } from "zustand";
import { persist } from "zustand/middleware";

type EtatFavoris = {
  noms: string[];
  basculer: (nom: string) => void;
};

export const useFavoris = create<EtatFavoris>()(
  persist(
    (set) => ({
      noms: [],
      basculer: (nom) =>
        set((etat) => ({
          noms: etat.noms.includes(nom)
            ? etat.noms.filter((n) => n !== nom)
            : [...etat.noms, nom],
        })),
    }),
    { name: "pokedex-favoris", skipHydration: true }
  )
);
