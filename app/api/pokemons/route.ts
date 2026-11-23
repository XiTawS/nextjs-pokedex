import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { recupererPlusieurs } from "@/lib/pokeapi";

const MAXIMUM = 100;

// GET /api/pokemons?noms=pikachu,mew — pour les pages qui ne connaissent leurs Pokémon
// que dans le navigateur (favoris). Passe par le cache du serveur et ses noms français.
export async function GET(requete: NextRequest) {
  const noms = (requete.nextUrl.searchParams.get("noms") ?? "").split(",").filter(Boolean);
  if (noms.length > MAXIMUM || noms.some((nom) => !/^[a-z0-9-]{1,40}$/.test(nom))) {
    return NextResponse.json({ erreur: "Paramètre noms invalide" }, { status: 400 });
  }
  return NextResponse.json(await recupererPlusieurs(noms));
}
