import { useId, type CSSProperties, type ReactNode } from "react";

// React port of bugEl() from Zveno/design/Zveno.dc.html: the agent mascot.
export type Look = { hue: number; pat?: "dots" | "stripes" | "chevron" | "spots" };
export type Mood = "working" | "waiting" | "queued" | "idle" | "paused" | "error" | "still";
export type Badge = "q" | "done" | "err";

const SHIFT: Record<string, number> = { dots: 34, stripes: -34, chevron: 46, spots: -46 };

export const ORCH_LOOK: Look = { hue: 285, pat: "spots" };

const an = (name: string, dur: string, origin = "center"): CSSProperties => ({
  animation: `${name} ${dur} infinite`,
  transformBox: "fill-box",
  transformOrigin: origin,
});

export function Bug({
  look,
  mood = "still",
  size = 32,
  badge,
  className,
}: {
  look: Look;
  mood?: Mood;
  size?: number;
  badge?: Badge;
  className?: string;
}) {
  const W = mood === "working",
    Q = mood === "waiting",
    X = mood === "error",
    P = mood === "paused",
    U = mood === "queued",
    I = mood === "idle";
  const h = look.hue;
  const h2 = h + (look.pat ? SHIFT[look.pat] : 60);
  const ch = P ? 0.2 : 1;
  const ink = `oklch(0.22 0.04 ${h})`;
  const c1 = `oklch(0.97 ${0.04 * ch} ${h})`,
    c2 = `oklch(0.8 ${0.14 * ch} ${h})`,
    c3 = `oklch(0.56 ${0.17 * ch} ${h + 12})`,
    ac = `oklch(0.82 ${0.16 * ch} ${h2})`;
  // Per-instance ids: a shared id breaks when its first copy sits in a display:none subtree.
  const id = `orb${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ln = {
    fill: "none",
    stroke: ink,
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const EX = [12.7, 19.3],
    EY = Q ? 16.4 : 17.4;

  let eyes: ReactNode;
  if (I) eyes = EX.map((x) => <path key={x} d={`M${x - 1.6} ${EY} q1.6 1.5 3.2 0`} {...ln} />);
  else if (P) eyes = EX.map((x) => <path key={x} d={`M${x - 1.3} ${EY} h2.6`} {...ln} opacity={0.6} />);
  else if (X)
    eyes = (
      <>
        <path d="M11.5 16 L13.9 17.4 L11.5 18.8" {...ln} />
        <path d="M20.5 16 L18.1 17.4 L20.5 18.8" {...ln} />
      </>
    );
  else
    eyes = EX.map((x) => (
      <g key={x}>
        <ellipse cx={x} cy={EY} rx={1.35} ry={2.1} fill={ink} />
        <circle cx={x + 0.45} cy={EY - 0.9} r={0.45} fill="#fff" />
      </g>
    ));

  const blink = W || Q || U || mood === "still" ? an("bubBlink", Q ? "2.8s" : W ? "3.9s" : "4.6s") : undefined;
  const bob = W
    ? an("bubSquish", ".9s ease-in-out", "50% 100%")
    : Q
      ? an("bubFloat", "2.4s ease-in-out")
      : U
        ? an("bubFloat", "3.2s ease-in-out")
        : I
          ? an("bubFloat", "4.6s ease-in-out")
          : undefined;

  let badgeEl: ReactNode = null;
  if (badge) {
    const BC = { q: "oklch(0.8 0.15 85)", done: "oklch(0.68 0.15 150)", err: "oklch(0.62 0.19 25)" }[badge];
    const gl = { fill: "none", stroke: "#fff", strokeWidth: 1.15, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    badgeEl = (
      <g style={badge === "q" ? an("bubPop", "1.6s ease-in-out") : badge === "err" ? an("bubPop", "1.1s ease-in-out") : undefined}>
        <circle cx={26} cy={6.8} r={4.3} fill={BC} stroke="#fff" strokeWidth={0.9} />
        {badge === "q" ? (
          <text x={26.1} y={8.95} fontSize={6.2} fontWeight={800} fill="#fff" textAnchor="middle" fontFamily="Geist, sans-serif">
            ?
          </text>
        ) : badge === "done" ? (
          <path d="M24.1 7.1l1.35 1.35 2.5-2.7" {...gl} />
        ) : (
          <path d="M24.6 5.4l2.8 2.8M27.4 5.4l-2.8 2.8" {...gl} />
        )}
      </g>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      style={{ display: "block", overflow: "visible", flex: "none" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}b`} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="48%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </radialGradient>
        <radialGradient id={`${id}a`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ac} stopOpacity={0.95} />
          <stop offset="100%" stopColor={ac} stopOpacity={0} />
        </radialGradient>
        <clipPath id={`${id}c`}>
          <circle cx={16} cy={17} r={12} />
        </clipPath>
      </defs>
      <g style={X ? an("bubShake", "2.6s ease-in-out") : undefined}>
        <ellipse cx={16} cy={30.6} rx={7.5} ry={1.05} fill={c3} opacity={0.22} />
        {W && <circle cx={16} cy={17} r={13.4} fill="none" stroke={ac} strokeWidth={1.2} style={an("orbGlow", "1.8s ease-in-out")} />}
        <g style={bob}>
          <circle cx={16} cy={17} r={12} fill={`url(#${id}b)`} />
          <g clipPath={`url(#${id}c)`}>
            <circle cx={23} cy={24} r={10} fill={`url(#${id}a)`} />
            <circle cx={7} cy={25} r={6} fill={`url(#${id}a)`} opacity={0.5} />
          </g>
          <circle cx={16} cy={17} r={11.6} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={0.7} />
          <ellipse cx={11.2} cy={10.6} rx={4.2} ry={2.4} fill="#fff" opacity={0.75} transform="rotate(-30 11.2 10.6)" />
          <circle cx={8.2} cy={14.6} r={0.9} fill="#fff" opacity={0.6} />
          <g style={W ? an("bubLook", "3.4s steps(1)") : undefined}>
            <g style={blink}>{eyes}</g>
          </g>
          {badgeEl}
        </g>
      </g>
    </svg>
  );
}
