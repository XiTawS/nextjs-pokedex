// La page Favoris est un composant client : son titre est déclaré ici, côté serveur.
export const metadata = { title: "Favoris" };

export default function LayoutFavoris({ children }: LayoutProps<"/favoris">) {
  return children;
}
