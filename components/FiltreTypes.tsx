import Link from "next/link";
import { TYPES } from "@/lib/types";

function adresse(q: string, type: string) {
  const parametres = new URLSearchParams();
  if (q) parametres.set("q", q);
  if (type) parametres.set("type", type);
  return `/?${parametres.toString()}`;
}

export default function FiltreTypes({ q, typeActif }: { q: string; typeActif: string }) {
  return (
    <nav className="mt-4 flex flex-wrap gap-2" aria-label="Filtrer par type">
      <Link href={adresse(q, "")} className={typeActif ? "opacity-60" : "font-bold underline"}>
        Tous
      </Link>
      {Object.entries(TYPES).map(([type, style]) => (
        <Link
          key={type}
          href={adresse(q, type)}
          aria-current={type === typeActif ? "true" : undefined}
          className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${style.classe} ${
            type === typeActif ? "ring-2 ring-offset-2" : "opacity-70"
          }`}
        >
          {style.libelle}
        </Link>
      ))}
    </nav>
  );
}
