"use client";
import { useEffect, useState } from "react";
import { chargerPokemon } from "@/lib/pokeapi-client";
import type { Pokemon } from "@/types/pokemon";

type Etat = "chargement" | "pret" | "erreur";
type Resultat = { noms: string[]; pokemons: Pokemon[]; etat: Exclude<Etat, "chargement"> };

export function usePokemons(noms: string[]): { pokemons: Pokemon[]; etat: Etat } {
  // Le résultat retient la liste de noms qu'il concerne : tant qu'il ne correspond pas
  // à la liste actuelle (premier affichage, relecture du localStorage), on est en chargement.
  const [resultat, setResultat] = useState<Resultat | null>(null);

  useEffect(() => {
    let annule = false;
    Promise.all(noms.map(chargerPokemon))
      .then((liste) => {
        if (annule) return;
        setResultat({ noms, pokemons: liste.filter((p): p is Pokemon => p !== null), etat: "pret" });
      })
      .catch(() => { if (!annule) setResultat({ noms, pokemons: [], etat: "erreur" }); });
    return () => { annule = true; };
  }, [noms]);

  if (resultat?.noms !== noms) return { pokemons: [], etat: "chargement" };
  return { pokemons: resultat.pokemons, etat: resultat.etat };
}
