"use client";
import { useMemo } from "react";
import { useSacoche } from "@/stores/sacoche";

// On lit `equipe` puis on calcule : un sélecteur qui fabriquerait un nouveau tableau
// à chaque appel ferait croire à Zustand à un changement permanent.
export function useTypesCouverts(): string[] {
  const equipe = useSacoche((etat) => etat.equipe);
  return useMemo(() => [...new Set(equipe.flatMap((membre) => membre.types))], [equipe]);
}
