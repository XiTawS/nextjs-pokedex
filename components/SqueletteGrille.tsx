export default function SqueletteGrille({ nombre = 24 }: { nombre?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" aria-busy="true">
      {Array.from({ length: nombre }, (_, i) => (
        <li key={i} className="h-64 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
      ))}
    </ul>
  );
}
