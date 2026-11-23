"use client";
import { Star } from "lucide-react";
import EtatVide from "@/components/EtatVide";
import GrillePokemons from "@/components/GrillePokemons";
import SqueletteGrille from "@/components/SqueletteGrille";
import { formaterNombre } from "@/lib/conversion";
import { usePokemons } from "@/hooks/usePokemons";
import { useFavoris } from "@/stores/favoris";

export default function PageFavoris() {
  const noms = useFavoris((etat) => etat.noms);
  const { pokemons, etat } = usePokemons(noms);

  let contenu;
  if (etat === "erreur")
    contenu = (
      <p className="text-gray-500">
        Impossible de charger vos favoris. Réessayez dans un instant.
      </p>
    );
  else if (etat === "chargement")
    contenu = <SqueletteGrille nombre={Math.max(noms.length, 1)} />;
  else if (pokemons.length === 0)
    contenu = (
      <EtatVide
        icone={<Star className="size-8" />}
        titre="Aucun favori pour le moment"
        texte="Touchez l’étoile d’un Pokémon, sur sa carte ou sur sa fiche, pour le retrouver ici."
      />
    );
  else contenu = <GrillePokemons pokemons={pokemons} />;

  return (
    <>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Mes favoris</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {noms.length > 0
            ? `${formaterNombre(noms.length)} Pokémon gardés de côté.`
            : "Vos Pokémon préférés, à portée de main."}
        </p>
      </header>
      {contenu}
    </>
  );
}
