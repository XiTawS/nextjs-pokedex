import HalftoneWordmarkFooter from "./HalftoneWordmarkFooter";

// Pied de page : le mot « pokédex » imprimé en trame de points, qui s'écartent sous le pointeur.
// Sur téléphone, une marge basse le garde au-dessus de la barre d'onglets.
export default function PiedDePage() {
  return (
    <HalftoneWordmarkFooter
      wordmark="pokédex"
      label="Pokédex"
      meta="1 025 Pokémon · Données PokéAPI"
      palette={{ warm: "#d2232f" }}
      columns={[
        {
          title: "Explorer",
          links: [
            { label: "Pokédex", href: "/" },
            { label: "Favoris", href: "/favoris" },
            { label: "Sacoche", href: "/sacoche" },
          ],
        },
        {
          title: "Données",
          links: [
            { label: "PokéAPI", href: "https://pokeapi.co" },
            { label: "Sprites Showdown", href: "https://github.com/PokeAPI/sprites" },
          ],
        },
        {
          title: "Projet",
          links: [
            { label: "À propos", href: "/a-propos" },
            { label: "Code source", href: "https://github.com/XiTawS/nextjs-pokedex" },
          ],
        },
      ]}
      backToTopLabel="Haut de page ↑"
      height="clamp(360px, 42vw, 520px)"
      className="mt-12 mb-[calc(4rem+env(safe-area-inset-bottom))] md:mb-0"
    />
  );
}
