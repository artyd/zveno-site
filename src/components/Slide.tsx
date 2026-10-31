import type { ReactNode } from "react";

// One screen of the presentation. On desktop it is exactly 100svh and its body is scaled down by Deck
// if it ever would not fit; on phones and short windows it is a normal block. `backdrop` sits behind the body
// and is never scaled: background glows, a scroll hint.
export function Slide({
  id,
  className = "",
  bodyClassName = "",
  backdrop,
  children,
}: {
  id: string;
  className?: string;
  bodyClassName?: string;
  backdrop?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`slide ${className}`}>
      {backdrop}
      <div className={`slide-body relative ${bodyClassName}`}>{children}</div>
    </section>
  );
}
