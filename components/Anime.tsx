"use client";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "motion/react";

// Petites briques animées utilisables depuis des composants serveur.
// Toutes respectent le réglage « réduire les animations » du système.

// Une barre qui se remplit jusqu'à `pourcentage`.
export function Remplissage({ pourcentage, className }: { pourcentage: number; className?: string }) {
  const reduit = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduit ? false : { width: 0 }}
      animate={{ width: `${pourcentage}%` }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

// Un nombre qui défile quand il change (passage d'un Pokémon au suivant).
export function Nombre({ valeur }: { valeur: number }) {
  return <NumberFlow value={valeur} locales="fr-FR" format={{ maximumFractionDigits: 1, useGrouping: false }} />;
}
