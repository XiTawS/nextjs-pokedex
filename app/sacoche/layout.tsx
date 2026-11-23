// La page Sacoche est un composant client : son titre est déclaré ici, côté serveur.
export const metadata = { title: "Sacoche" };

export default function LayoutSacoche({ children }: LayoutProps<"/sacoche">) {
  return children;
}
