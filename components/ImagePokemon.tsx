"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { useChromatique, versChromatique } from "@/stores/chromatique";

type Props = Omit<ImageProps, "src" | "alt"> & {
  sources: (string | null)[]; // essayées dans l'ordre
  alt: string;
};

// Passe à la source suivante quand une image ne se charge pas ; si aucune ne se charge,
// affiche un emplacement neutre plutôt que l'icône d'image cassée et le texte alternatif en vrac.
export default function ImagePokemon({ sources, alt, width, height, className, ...props }: Props) {
  const [echecs, setEchecs] = useState<string[]>([]);
  const chromatique = useChromatique((etat) => etat.actif);
  const essais = chromatique ? sources.flatMap((s) => (s ? [versChromatique(s), s] : [])) : sources;
  const src = essais.find((source): source is string => !!source && !echecs.includes(source));

  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width }} // la hauteur suit la largeur (aspect-square) : reste rond si la carte rétrécit
        className="mx-auto grid aspect-square max-w-full place-items-center rounded-full bg-black/5 text-5xl font-black text-black/20 dark:bg-white/5 dark:text-white/20"
      >
        ?
      </div>
    );
  }
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setEchecs((actuels) => [...actuels, src])}
    />
  );
}
