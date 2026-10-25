import { Reveal } from "./Reveal";

// Two-tone heading: the claim in full colour, the continuation faint.
export function SectionHead({
  label,
  title,
  rest,
  center = false,
}: {
  label: string;
  title: string;
  rest?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="label">{label}</p>
      <h2 className="mt-3 text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
        {title} {rest && <span className="text-faint">{rest}</span>}
      </h2>
    </Reveal>
  );
}
