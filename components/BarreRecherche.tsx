"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BarreRecherche() {
  const router = useRouter();
  const chemin = usePathname();
  const parametres = useSearchParams();
  const actuel = parametres.get("q") ?? "";
  const [texte, setTexte] = useState(actuel);

  useEffect(() => {
    if (texte === actuel) return;
    const minuteur = setTimeout(() => {
      const suivants = new URLSearchParams(parametres.toString());
      if (texte) suivants.set("q", texte);
      else suivants.delete("q");
      suivants.delete("page");
      router.replace(`${chemin}?${suivants.toString()}`);
    }, 300);
    return () => clearTimeout(minuteur);
  }, [texte, actuel, parametres, chemin, router]);

  return (
    <input
      type="search"
      value={texte}
      onChange={(e) => setTexte(e.target.value)}
      placeholder="Rechercher un Pokémon"
      aria-label="Rechercher un Pokémon"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
    />
  );
}
