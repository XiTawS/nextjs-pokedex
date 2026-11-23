"use client";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Petites briques animées utilisables depuis des composants serveur.
// Toutes respectent le réglage « réduire les animations » du système.

// Arrivée de l'image du Pokémon : un léger rebond, rejoué quand on change de Pokémon (clé).
export function Apparition({ cle, children, className }: { cle: string | number; children: ReactNode; className?: string }) {
  const reduit = useReducedMotion();
  return (
    <motion.div
      key={cle}
      className={className}
      initial={reduit ? false : { opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

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
