import Link from "next/link";
import { TYPES } from "@/lib/types";
import IconeType from "./IconeType";

function adresse(q: string, type: string) {
  const parametres = new URLSearchParams();
  if (q) parametres.set("q", q);
  if (type) parametres.set("type", type);
  return `/?${parametres.toString()}`;
}

const PASTILLE =
  "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full py-1 pl-1 pr-3 text-sm font-medium shadow-sm ring-1 transition";

// Sur téléphone, une seule ligne qui défile horizontalement ; à partir de la tablette, les pastilles passent à la ligne.
export default function FiltreTypes({ q, typeActif }: { q: string; typeActif: string }) {
  return (
    <nav aria-label="Filtrer par type" className="-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:overflow-visible md:px-0">
      <ul className="flex gap-2 md:flex-wrap">
        <li>
          <Link
            href={adresse(q, "")}
            aria-current={typeActif ? undefined : "true"}
            className={`${PASTILLE} pl-3 ${
              typeActif
                ? "bg-white text-gray-700 ring-black/5 hover:ring-black/20 dark:bg-gray-900 dark:text-gray-200 dark:ring-white/10"
                : "bg-gray-900 text-white ring-gray-900 dark:bg-white dark:text-gray-900"
            }`}
          >
            Tous
          </Link>
        </li>
        {Object.entries(TYPES).map(([type, style]) => {
          const actif = type === typeActif;
          return (
            <li key={type}>
              <Link
                href={adresse(q, type)}
                aria-current={actif ? "true" : undefined}
                className={`${PASTILLE} ${
                  actif
                    ? `${style.classe} text-white ring-transparent`
                    : "bg-white text-gray-700 ring-black/5 hover:ring-black/20 dark:bg-gray-900 dark:text-gray-200 dark:ring-white/10"
                }`}
              >
                <span className={`grid size-6 place-items-center rounded-full text-white ${actif ? "bg-white/20" : style.classe}`}>
                  <IconeType type={type} className="size-3.5" />
                </span>
                {style.libelle}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
