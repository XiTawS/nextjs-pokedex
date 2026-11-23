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
      className={`inline-flex items-center ${actif ? "font-bold underline underline-offset-4" : "opacity-80 hover:opacity-100"}`}
    >
      {children}
    </Link>
  );
}
