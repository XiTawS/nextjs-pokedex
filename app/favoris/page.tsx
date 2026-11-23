"use client";
import GrillePokemons from "@/components/GrillePokemons";
import { usePokemons } from "@/hooks/usePokemons";
import { useFavoris } from "@/stores/favoris";

export default function PageFavoris() {
  const noms = useFavoris((etat) => etat.noms);
  const { pokemons, etat } = usePokemons(noms);

  let contenu;
  if (etat === "erreur") contenu = <p>Impossible de charger vos favoris.</p>;
  else if (etat === "chargement") contenu = <p>Chargement de vos favoris…</p>;
  else if (pokemons.length === 0) contenu = <p>Aucun favori pour le moment. Cliquez sur une étoile.</p>;
  else contenu = <GrillePokemons pokemons={pokemons} />;

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Mes favoris</h1>
      {contenu}
    </>
  );
}
