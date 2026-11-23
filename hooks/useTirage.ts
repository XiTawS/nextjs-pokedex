"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Tire un Pokémon au hasard (/api/aleatoire) et ouvre sa fiche.
export function useTirage() {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);

  const tirer = async () => {
    setEnCours(true);
    try {
      const reponse = await fetch("/api/aleatoire");
      if (!reponse.ok) throw new Error("Tirage impossible");
      const pokemon = await reponse.json();
      router.push(`/pokemon/${pokemon.nom}`);
    } finally {
      setEnCours(false);
    }
  };

  return { tirer, enCours };
}
