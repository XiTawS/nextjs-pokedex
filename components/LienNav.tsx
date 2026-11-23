"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LienNav({ href, children }: { href: string; children: React.ReactNode }) {
  const chemin = usePathname();
  const actif = href === "/" ? chemin === "/" : chemin.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={`inline-flex items-center text-sm font-medium transition ${actif ? "text-pokedex" : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}`}
    >
      {children}
    </Link>
  );
}
