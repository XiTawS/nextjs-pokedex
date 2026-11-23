"use client";
import { useEffect, useState } from "react";
import GrillePokemons from "@/components/GrillePokemons";
import { chargerPokemon } from "@/lib/pokeapi-client";
import { useFavoris } from "@/stores/favoris";
import type { Pokemon } from "@/types/pokemon";

type Resultat = { noms: string[] } & ({ pokemons: Pokemon[] } | { erreur: true });

export default function PageFavoris() {
  const noms = useFavoris((etat) => etat.noms);
  // Le résultat retient la liste de noms qu'il concerne : tant qu'il ne correspond pas
  // à la liste actuelle (premier affichage, relecture du localStorage), on est en chargement.
  const [resultat, setResultat] = useState<Resultat | null>(null);

  useEffect(() => {
    let annule = false;
    Promise.all(noms.map(chargerPokemon))
      .then((liste) => {
        if (!annule) setResultat({ noms, pokemons: liste.filter((p): p is Pokemon => p !== null) });
      })
      .catch(() => { if (!annule) setResultat({ noms, erreur: true }); });
    return () => { annule = true; };
  }, [noms]);

  let contenu;
  if (resultat?.noms !== noms) contenu = <p>Chargement de vos favoris…</p>;
  else if ("erreur" in resultat) contenu = <p>Impossible de charger vos favoris.</p>;
  else if (resultat.pokemons.length === 0) contenu = <p>Aucun favori pour le moment. Cliquez sur une étoile.</p>;
  else contenu = <GrillePokemons pokemons={resultat.pokemons} />;

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Mes favoris</h1>
      {contenu}
    </>
  );
}
