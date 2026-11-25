import IconePokeball from "./IconePokeball";

const BLOC = "rounded-full bg-gray-200 dark:bg-gray-800";

// Silhouette de la fiche pendant le chargement du Pokémon suivant : mêmes blocs, mêmes places.
export default function SqueletteFiche() {
  return (
    <div
      aria-busy="true"
      aria-label="Chargement de la fiche"
      className="mx-auto max-w-xl animate-pulse motion-reduce:animate-none lg:grid lg:max-w-none lg:grid-cols-[5fr_6fr] lg:items-start lg:gap-12"
    >
      <div className="-mx-4 -mt-6 grid h-80 place-items-center rounded-b-[50%_18%] bg-gray-200 sm:mx-0 sm:mt-0 sm:rounded-t-3xl lg:h-[34rem] lg:rounded-3xl dark:bg-gray-800">
        <IconePokeball className="size-24 text-white/70 dark:text-white/10" />
      </div>
      <div className="grid gap-6 px-1 pt-12 lg:pt-4">
        <div className="grid gap-2">
          <div className={`h-10 w-48 ${BLOC}`} />
          <div className={`h-5 w-14 ${BLOC}`} />
        </div>
        <div className="flex gap-3">
          <div className={`h-9 w-28 ${BLOC}`} />
          <div className={`h-9 w-28 ${BLOC}`} />
        </div>
        <div className="grid gap-2">
          <div className={`h-3.5 ${BLOC}`} />
          <div className={`h-3.5 ${BLOC}`} />
          <div className={`h-3.5 w-2/3 ${BLOC}`} />
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-black/10 pt-6 dark:border-white/10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid gap-2">
              <div className={`h-3 w-12 ${BLOC}`} />
              <div className={`h-6 w-20 ${BLOC}`} />
            </div>
          ))}
        </div>
        <div className={`h-2 ${BLOC}`} />
        <div className="grid gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-3 ${BLOC}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
