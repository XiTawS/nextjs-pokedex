import { useToast } from "@astryxdesign/core/Toast";
import { useCallback } from "react";
import { create } from "zustand";

// Œuf de Pâques : en mode chromatique (« shiny »), chaque image passe à sa version aux couleurs rares.
// Pas de persistance : le mode s'éteint au rechargement, comme un secret.
export const useChromatique = create<{ actif: boolean }>(() => ({ actif: false }));

export function useBasculerChromatique() {
  const afficherToast = useToast();
  return useCallback(() => {
    const actif = !useChromatique.getState().actif;
    useChromatique.setState({ actif });
    afficherToast({
      body: actif ? "✨ Mode chromatique : les Pokémon brillent !" : "Mode chromatique désactivé",
      uniqueID: "chromatique",
    });
  }, [afficherToast]);
}

// « …/official-artwork/25.png » → « …/official-artwork/shiny/25.png » (même règle pour les GIF de Showdown).
export const versChromatique = (adresse: string) => adresse.replace(/\/(\d+\.(?:png|gif))$/, "/shiny/$1");
