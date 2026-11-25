const CONTOUR = "#1f2937";
const HAUT = "M4 50a46 46 0 0 1 92 0z"; // moitié haute de la Poké Ball

// Au lancement du site : une Poké Ball se remplit de rouge en tremblant, comme pendant une capture, puis
// l'écran s'efface (animations dans globals.css). Rendu par le serveur et animé en CSS, il s'affiche dès
// la première image, sans attendre JavaScript. Une fois par onglet : le script le masque aux visites suivantes.
export default function EcranDemarrage() {
  return (
    <>
      <div
        id="demarrage"
        aria-hidden
        suppressHydrationWarning // le script peut ajouter « hidden » avant l'hydratation
        className="demarrage fixed inset-0 z-100 grid place-items-center bg-background motion-reduce:hidden"
      >
        <svg viewBox="0 0 100 100" className="size-28">
          <defs>
            <clipPath id="demarrage-haut">
              <path d={HAUT} />
            </clipPath>
          </defs>
          <g className="demarrage-balle">
            <circle cx="50" cy="50" r="46" fill="#fff" />
            <path d={HAUT} fill="#e5e7eb" />
            {/* Découpe sur le groupe, pas sur le rectangle : sinon elle s'étirerait avec lui. */}
            <g clipPath="url(#demarrage-haut)">
              <rect className="demarrage-remplissage" width="100" height="50" fill="#d2232f" />
            </g>
            <circle cx="50" cy="50" r="46" fill="none" stroke={CONTOUR} strokeWidth="5" />
            <path d="M4 50h92" stroke={CONTOUR} strokeWidth="5" />
            <circle cx="50" cy="50" r="12" fill="#fff" stroke={CONTOUR} strokeWidth="5" />
            <circle className="demarrage-bouton" cx="50" cy="50" r="5" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var e=document.getElementById("demarrage");if(sessionStorage.getItem("pokedex-demarrage"))e.hidden=true;else sessionStorage.setItem("pokedex-demarrage","1")}catch(_){}`,
        }}
      />
    </>
  );
}
