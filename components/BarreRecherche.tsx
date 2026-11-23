"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
      <input
        ref={champ}
        type="search"
        value={texte}
        onChange={(e) => {
          setTexte(e.target.value);
          naviguer(e.target.value);
        }}
        placeholder="Rechercher un Pokémon"
        aria-label="Rechercher un Pokémon"
        className="w-full rounded-full bg-white py-3 pl-12 pr-5 shadow-sm ring-1 ring-black/10 transition placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pokedex dark:bg-gray-900 dark:ring-white/15"
      />
      {enAttente ? (
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-sm text-gray-500">Recherche…</span>
      ) : (
        <kbd className="absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-md px-1.5 font-sans text-xs text-gray-400 ring-1 ring-black/10 md:block dark:ring-white/15">
          /
        </kbd>
      )}
    </div>
  );
}
