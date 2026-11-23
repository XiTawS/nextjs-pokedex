import Link from "next/link";

export default function Introuvable() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Ce Pokémon s’est enfui</h1>
      <p className="my-4 text-gray-500">La page demandée n’existe pas.</p>
      <Link href="/" className="rounded-lg bg-pokedex px-4 py-2 font-semibold text-white">
        Retour au Pokédex
      </Link>
    </div>
  );
}
