import { Reveal } from "./Reveal";

// Two-tone heading: the claim in full colour, the continuation faint.
export function SectionHead({
  label,
  title,
  rest,
  center = false,
  className = "",
}: {
  label: string;
  title: string;
  rest?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <p className="label">{label}</p>
      <h2 className="mt-3 text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-balance sm:text-[44px] deck:mt-[clamp(4px,1vh,12px)] deck:text-[clamp(24px,4.7vh,44px)]">
        {title} {rest && <span className="text-faint">{rest}</span>}
      </h2>
    </Reveal>
  );
}
