"use client";
import { useEffect, useRef } from "react";
import { useBasculerChromatique } from "@/stores/chromatique";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// ↑ ↑ ↓ ↓ ← → ← → B A : allume ou éteint le mode chromatique.
export default function CodeKonami() {
  const basculer = useBasculerChromatique();
  const rang = useRef(0);

  useEffect(() => {
    const ecouter = (e: KeyboardEvent) => {
      const touche = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (touche === KONAMI[rang.current]) rang.current++;
      // ↑ ↑ ↑ : les deux derniers ↑ comptent encore.
      else rang.current = touche === "ArrowUp" ? (rang.current === 2 ? 2 : 1) : 0;
      if (rang.current === KONAMI.length) {
        rang.current = 0;
        basculer();
      }
    };
    window.addEventListener("keydown", ecouter);
    return () => window.removeEventListener("keydown", ecouter);
  }, [basculer]);

  return null;
}
