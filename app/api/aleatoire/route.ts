import { connection, NextResponse } from "next/server";
import { recupererPokemon, TOTAL_POKEMONS } from "@/lib/pokeapi";

export async function GET() {
  await connection();
  const id = Math.floor(Math.random() * TOTAL_POKEMONS) + 1;
  const pokemon = await recupererPokemon(String(id));
  if (!pokemon) {
    return NextResponse.json({ erreur: "Pokémon introuvable" }, { status: 404 });
  }
  return NextResponse.json(pokemon);
}
