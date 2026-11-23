"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoutonHasard() {
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

  return (
    <button onClick={tirer} disabled={enCours} className="opacity-80 hover:opacity-100 disabled:opacity-50">
      {enCours ? "Tirage…" : "Au hasard"}
    </button>
  );
}
