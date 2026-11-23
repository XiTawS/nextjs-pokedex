"use client";
import { Shuffle } from "lucide-react";
import { useTirage } from "@/hooks/useTirage";

export default function BoutonHasard() {
  const { tirer, enCours } = useTirage();
  return (
    <button
      onClick={tirer}
      disabled={enCours}
      className="flex items-center gap-1.5 rounded-full bg-pokedex px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95 disabled:opacity-60"
    >
      <Shuffle className="size-4" />
      {enCours ? "Tirage…" : "Au hasard"}
    </button>
  );
}
