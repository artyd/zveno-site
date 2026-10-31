import type { ReactNode } from "react";

// One screen of the presentation. On desktop it is exactly 100svh and its body is scaled down by Deck
// if it ever would not fit; on phones and short windows it is a normal block.
export function Slide({
  id,
  className = "",
  bodyClassName = "",
  children,
}: {
  id: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`slide ${className}`}>
      <div className={`slide-body ${bodyClassName}`}>{children}</div>
    </section>
  );
}
