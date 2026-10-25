import type { CSSProperties } from "react";

// The Zveno mark, vector version from Zveno/design/Launch.dc.html.
export function Mark({ size = 32, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 125 120"
      width={size}
      height={(size * 120) / 125}
      className={className}
      style={style}
      role="img"
      aria-label="Zveno"
    >
      <g fill="currentColor" stroke="currentColor">
        <path d="M16 63 H40 M74 49 L106 20 M74 77 L99 101" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="63" r="19.5" strokeWidth="9.5" fill="none" />
        <circle cx="15" cy="63" r="10" stroke="none" />
        <circle cx="107" cy="18" r="11" stroke="none" />
        <circle cx="100" cy="102" r="10" stroke="none" />
      </g>
    </svg>
  );
}

export function Wordmark({ height = 26, className }: { height?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/zveno-wordmark.png"
      alt="Zveno"
      width={(height * 344) / 120}
      height={height}
      className={`logo-img ${className ?? ""}`}
    />
  );
}

export function WindowsIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
    </svg>
  );
}
