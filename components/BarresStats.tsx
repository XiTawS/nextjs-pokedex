import type { Statistique } from "@/types/pokemon";

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
          <dt className="text-sm text-gray-500">{LIBELLES[stat.nom] ?? stat.nom}</dt>
          {/* La barre vit dans le <dd> : un <dl> ne contient que des groupes <dt>/<dd>. */}
          <dd className="grid grid-cols-[2.5rem_1fr] items-center gap-2">
            <span className="text-right font-mono text-sm">{stat.valeur}</span>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-pokedex"
                style={{ width: `${(stat.valeur / MAXIMUM) * 100}%` }}
              />
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
