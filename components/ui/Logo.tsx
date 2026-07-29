type LogoProps = {
  /** Affiche le mot-symbole à côté du carré. */
  wordmark?: boolean;
  className?: string;
};

/** Logo BAGRAIN : carré bleu, dôme blanc, mot-symbole. */
export default function Logo({ wordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="34" height="34" rx="3" fill="var(--color-bagrain)" />
        <path d="M7 22.5a10 10 0 0 1 20 0Z" fill="var(--color-mist)" />
        <rect x="7" y="24" width="20" height="1.6" fill="var(--color-mist)" />
      </svg>
      {wordmark && (
        <span
          className="font-display text-[19px] tracking-tight"
          style={{ fontStretch: "116%" }}
        >
          <b className="font-extrabold">BAG</b>
          <span className="font-medium">RAIN</span>
          <sup className="ml-0.5 text-[9px] font-normal opacity-70">®</sup>
        </span>
      )}
    </span>
  );
}
