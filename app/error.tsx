"use client";

export default function Erreur({ error, retry }: { error: unknown; retry: () => void }) {
  const message = error instanceof Error ? error.message : "Erreur inconnue";
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">Le Pokédex ne répond plus</h2>
      <p className="my-4 text-gray-500">{message}</p>
      <button onClick={() => retry()} className="rounded-full bg-pokedex px-5 py-2 font-semibold text-white">
        Réessayer
      </button>
    </div>
  );
}
