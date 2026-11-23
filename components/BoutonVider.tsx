"use client";
import { useState } from "react";
import { useSacoche } from "@/stores/sacoche";

export default function BoutonVider() {
  const nombre = useSacoche((etat) => etat.equipe.length);
  const vider = useSacoche((etat) => etat.vider);
  const [aConfirmer, setAConfirmer] = useState(false);

  if (nombre === 0) return null;
  return (
    <button
      onClick={() => {
        if (aConfirmer) vider();
        setAConfirmer(!aConfirmer);
      }}
      onBlur={() => setAConfirmer(false)}
      className="rounded-full border px-4 py-2 text-sm font-semibold"
    >
      {aConfirmer ? "Confirmer ?" : "Vider la sacoche"}
    </button>
  );
}
