"use client";
import { useCallback, useEffect, useRef } from "react";

export function useRappelTemporise<A extends unknown[]>(rappel: (...args: A) => void, delai = 300) {
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dernierRappel = useRef(rappel);

  useEffect(() => {
    dernierRappel.current = rappel;       // toujours la version la plus récente
  });

  useEffect(() => {
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);   // nettoyage à la disparition
    };
  }, []);

  return useCallback(
    (...args: A) => {
      if (minuteur.current) clearTimeout(minuteur.current);
      minuteur.current = setTimeout(() => dernierRappel.current(...args), delai);
    },
    [delai]
  );
}
