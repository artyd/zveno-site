import { ArrowDown, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { DOWNLOAD } from "@/lib/site";
import { Mark, WindowsIcon } from "../Mark";
import { Slide } from "../Slide";

// Soft colour fields that drift behind the title. Radial gradients only, moved by transform.
function Glow() {
  const blob = (s: CSSProperties) => <span style={s} />;
  return (
    <div aria-hidden="true" className="cover-glow pointer-events-none absolute inset-0 overflow-hidden">
      {blob({
        width: "70vmax",
        height: "70vmax",
        left: "calc(50% - 35vmax)",
        top: "calc(46% - 35vmax)",
        background: "radial-gradient(closest-side, var(--glow-1), transparent)",
        "--dur": "24s",
        "--dx": "5%",
        "--dy": "-4%",
      } as CSSProperties)}
      {blob({
        width: "52vmax",
        height: "52vmax",
        left: "-14vmax",
        bottom: "-22vmax",
        background: "radial-gradient(closest-side, var(--glow-2), transparent)",
        "--dur": "30s",
        "--dx": "7%",
        "--dy": "-6%",
      } as CSSProperties)}
      {blob({
        width: "46vmax",
        height: "46vmax",
        right: "-12vmax",
        top: "-14vmax",
        background: "radial-gradient(closest-side, var(--glow-3), transparent)",
        "--dur": "27s",
        "--dx": "-6%",
        "--dy": "5%",
      } as CSSProperties)}
    </div>
  );
}

function ScrollHint() {
  return (
    <a
      href="#how"
      aria-label="Next: how it works"
      className="absolute bottom-[clamp(12px,3vh,32px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 rounded-full px-3 py-1 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase transition-colors hover:text-text max-md:hidden"
    >
      <span className="[@media(max-height:820px)]:hidden">Scroll</span>
      <ChevronDown size={16} className="hint-bob" />
    </a>
  );
}

export function Cover() {
  return (
    <Slide
      id="top"
      bodyClassName="max-w-[1800px] text-center"
      backdrop={
        <>
          <Glow />
          <ScrollHint />
        </>
      }
    >
      <div className="rise mx-auto mb-[clamp(20px,4.2vh,44px)] w-fit">
        <span className="pop-float glass-window flex size-[clamp(60px,8.4vh,80px)] items-center justify-center rounded-[clamp(18px,2.6vh,24px)] text-text">
          <Mark size={44} className="h-auto w-[56%]" />
        </span>
      </div>

      <h1
        className="rise mx-auto text-[44px] leading-[1] font-semibold tracking-[-0.045em] text-balance sm:text-[64px] sm:leading-[0.98] deck:text-[clamp(52px,min(10.4vh,7vw),148px)] deck:leading-[0.96]"
        style={{ animationDelay: "80ms" }}
      >
        The key link between
        <br className="max-sm:hidden" /> an idea and a product
        <br className="max-sm:hidden" /> <span className="text-accent">is you.</span>
      </h1>

      <p
        className="rise mx-auto mt-[clamp(18px,3.6vh,36px)] max-w-2xl text-[17px] leading-relaxed text-muted text-pretty sm:text-lg deck:text-[clamp(15px,2.3vh,21px)]"
        style={{ animationDelay: "160ms" }}
      >
        Zveno runs a team of AI coding agents on your own computer. You talk to the Orchestrator. It plans the work, hands it
        to Claude Code and Codex, and brings you only the decisions.
      </p>

      <div
        className="rise mt-[clamp(22px,4.4vh,44px)] flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ animationDelay: "240ms" }}
      >
        <a href={DOWNLOAD.windows} className="btn btn-strong w-full !min-h-[52px] !rounded-[12px] !px-7 !text-[15.5px] sm:w-auto">
          <WindowsIcon />
          Download for Windows
        </a>
        <a href="#how" className="btn btn-ghost w-full !min-h-[52px] !rounded-[12px] !px-7 !text-[15.5px] sm:w-auto">
          See how it works
          <ArrowDown size={16} />
        </a>
      </div>
      <p className="rise mt-[clamp(10px,1.8vh,18px)] font-mono text-[11.5px] text-faint" style={{ animationDelay: "300ms" }}>
        {DOWNLOAD.requirements} · macOS, Linux and phones coming
      </p>
    </Slide>
  );
}
