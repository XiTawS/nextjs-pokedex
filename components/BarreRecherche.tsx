"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";
import { useRaccourci } from "@/hooks/useRaccourci";
import { useRappelTemporise } from "@/hooks/useRappelTemporise";

export default function BarreRecherche() {
  const router = useRouter();
  const chemin = usePathname();
  const parametres = useSearchParams();
  const [texte, setTexte] = useState(parametres.get("q") ?? "");
  const [enAttente, demarrer] = useTransition();
  const champ = useRef<HTMLInputElement>(null);

  useRaccourci("/", useCallback(() => champ.current?.focus(), []));

  const naviguer = useRappelTemporise((valeur: string) => {
    const suivants = new URLSearchParams(parametres.toString());
    if (valeur) suivants.set("q", valeur);
    else suivants.delete("q");
    suivants.delete("page");
    demarrer(() => router.replace(`${chemin}?${suivants.toString()}`));
  });

  return (
    <div className="relative">
      <input
        ref={champ}
        type="search"
        value={texte}
        onChange={(e) => {
          setTexte(e.target.value);
          naviguer(e.target.value);
        }}
        placeholder="Rechercher un Pokémon (touche /)"
        aria-label="Rechercher un Pokémon"
        className="w-full rounded-full border border-black/10 px-5 py-3 dark:border-white/15 dark:bg-gray-900"
      />
      {enAttente && <span className="absolute right-12 top-3 text-sm text-gray-500">Recherche…</span>}
    </div>
  );
}
