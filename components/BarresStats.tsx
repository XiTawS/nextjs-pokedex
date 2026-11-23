import type { Statistique } from "@/types/pokemon";
import { Remplissage } from "./Anime";

const LIBELLES: Record<string, string> = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Attaque spé.",
  "special-defense": "Défense spé.",
  speed: "Vitesse",
};
const MAXIMUM = 255;

export default function BarresStats({ stats }: { stats: Statistique[] }) {
  return (
    <dl className="grid gap-2">
      {stats.map((stat) => (
        <div key={stat.nom} className="grid grid-cols-[7rem_1fr] items-center gap-2">
          <dt className="text-sm text-gray-500 dark:text-gray-400">{LIBELLES[stat.nom] ?? stat.nom}</dt>
          {/* La barre vit dans le <dd> : un <dl> ne contient que des groupes <dt>/<dd>. */}
          <dd className="grid grid-cols-[2.5rem_1fr] items-center gap-2">
            <span className="text-right font-mono text-sm">{stat.valeur}</span>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
              {/* Couleur du type principal, transmise par la fiche (--teinte) ; rouge Pokédex sinon. */}
              <Remplissage
                pourcentage={(stat.valeur / MAXIMUM) * 100}
                className="h-2 rounded-full bg-(--teinte,var(--color-pokedex))"
              />
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
