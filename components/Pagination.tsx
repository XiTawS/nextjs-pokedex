import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  page: number;
  nombrePages: number;
  q: string;
  type: string;
};

function adresse({ q, type }: Props, page: number) {
  const parametres = new URLSearchParams();
  if (q) parametres.set("q", q);
  if (type) parametres.set("type", type);
  if (page > 1) parametres.set("page", String(page));
  return `/?${parametres.toString()}`;
}

const BOUTON =
  "flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5 transition dark:bg-gray-900 dark:ring-white/10";

export default function Pagination(props: Props) {
  const { page, nombrePages } = props;
  if (nombrePages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
      {page > 1 ? (
        <Link href={adresse(props, page - 1)} className={`${BOUTON} hover:ring-black/20`}>
          <ChevronLeft className="size-4" /> Précédent
        </Link>
      ) : (
        <span aria-disabled="true" className={`${BOUTON} opacity-40`}>
          <ChevronLeft className="size-4" /> Précédent
        </span>
      )}
      <span className="px-2 text-sm tabular-nums text-gray-600 dark:text-gray-300">
        {page} / {nombrePages}
      </span>
      {page < nombrePages ? (
        <Link href={adresse(props, page + 1)} className={`${BOUTON} hover:ring-black/20`}>
          Suivant <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span aria-disabled="true" className={`${BOUTON} opacity-40`}>
          Suivant <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
