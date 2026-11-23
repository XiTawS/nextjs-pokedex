export default function IconePokeball({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h7m6 0h7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
