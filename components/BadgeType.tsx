import { TYPES } from "@/lib/types";

export default function BadgeType({ type }: { type: string }) {
  const style = TYPES[type] ?? { libelle: type, classe: "bg-gray-500" };
  return (
    <span className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${style.classe}`}>
      {style.libelle}
    </span>
  );
}
