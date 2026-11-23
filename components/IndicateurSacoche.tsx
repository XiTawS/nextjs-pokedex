"use client";
import Link from "next/link";
import { TAILLE_SACOCHE, useSacoche } from "@/stores/sacoche";

export default function IndicateurSacoche() {
  const nombre = useSacoche((etat) => etat.equipe.length);
  return (
    <Link href="/sacoche" aria-label={`Sacoche : ${nombre} Pokémon sur ${TAILLE_SACOCHE}`} className="flex items-center gap-1">
      {Array.from({ length: TAILLE_SACOCHE }, (_, i) => (
        <span
          key={i}
          className={`size-3 rounded-full border border-white transition ${i < nombre ? "bg-white" : "bg-white/20"}`}
        />
      ))}
    </Link>
  );
}
