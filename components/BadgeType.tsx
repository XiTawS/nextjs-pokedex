import { TYPES } from "@/lib/types";
import IconeType from "./IconeType";

export default function BadgeType({ type }: { type: string }) {
  const style = TYPES[type] ?? { libelle: type, classe: "bg-gray-500" };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full py-0.5 pl-1.5 pr-2.5 text-xs font-semibold text-white ${style.classe}`}
    >
      <IconeType type={type} className="size-3.5" />
      {style.libelle}
    </span>
  );
}
