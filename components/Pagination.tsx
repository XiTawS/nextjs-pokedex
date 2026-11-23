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

export default function Pagination(props: Props) {
  const { page, nombrePages } = props;
  if (nombrePages <= 1) return null;
  const style = "rounded-lg border px-4 py-2 font-semibold";

  return (
    <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={adresse(props, page - 1)} className={style}>Précédent</Link>
      ) : (
        <span className={`${style} opacity-40`}>Précédent</span>
      )}
      <span className="text-sm">Page {page} sur {nombrePages}</span>
      {page < nombrePages ? (
        <Link href={adresse(props, page + 1)} className={style}>Suivant</Link>
      ) : (
        <span className={`${style} opacity-40`}>Suivant</span>
      )}
    </nav>
  );
}
