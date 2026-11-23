import Link from "next/link";
import CompteurFavoris from "./CompteurFavoris";

export default function EnTete() {
  return (
    <header className="bg-pokedex text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Pokédex
        </Link>
        <nav className="flex gap-4">
          <Link href="/">Tous</Link>
          <Link href="/favoris" className="flex items-center">
            Favoris
            <CompteurFavoris />
          </Link>
        </nav>
      </div>
    </header>
  );
}
