import { ArrowDown } from "lucide-react";
import { DOWNLOAD } from "@/lib/site";
import { Bug, ORCH_LOOK, type Badge, type Look, type Mood } from "../Bug";
import { WindowsIcon } from "../Mark";
import { Shot, WindowFrame } from "../Shot";

const ROSTER: { name: string; meta: string; look: Look; mood: Mood; badge?: Badge; status: string; tone: string }[] = [
  { name: "Orchestrator", meta: "plans and assigns", look: ORCH_LOOK, mood: "idle", status: "lead", tone: "text-answer bg-answer-bg" },
  { name: "frontend", meta: "Claude Code · sonnet", look: { hue: 250, pat: "dots" }, mood: "working", status: "working", tone: "text-ok bg-ok-bg" },
  { name: "backend-api", meta: "Codex · gpt-5-codex", look: { hue: 160, pat: "chevron" }, mood: "waiting", badge: "q", status: "asks you", tone: "text-warn bg-warn-bg" },
  { name: "tests", meta: "Claude Code · haiku", look: { hue: 330, pat: "spots" }, mood: "queued", status: "queued", tone: "text-accent bg-accent-bg" },
];

export function Hero() {
  return (
    <section id="top" className="relative px-4 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <p className="rise glass-surface mx-auto inline-flex items-center gap-2 rounded-full py-1 pr-3.5 pl-1.5 font-mono text-[11.5px] text-muted">
          <Bug look={{ hue: 250, pat: "dots" }} mood="working" size={20} />
          Desktop app · Windows first
        </p>
        <h1
          className="rise mt-6 text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-[60px] lg:text-[72px]"
          style={{ animationDelay: "60ms" }}
        >
          The key link between an idea and a product <span className="text-accent">is you.</span>
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted text-pretty sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          Zveno runs a team of AI coding agents on your own computer. You talk to the Orchestrator. It plans the work,
          hands it to Claude Code and Codex, and brings you only the decisions.
        </p>
        <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
          <a href={DOWNLOAD.windows} className="btn btn-strong w-full !min-h-12 !px-6 !text-[15px] sm:w-auto">
            <WindowsIcon />
            Download for Windows
          </a>
          <a href="#how" className="btn btn-ghost w-full !min-h-12 !px-6 !text-[15px] sm:w-auto">
            See how it works
            <ArrowDown size={16} />
          </a>
        </div>
        <p className="rise mt-4 font-mono text-[11.5px] text-faint" style={{ animationDelay: "220ms" }}>
          {DOWNLOAD.requirements} · macOS, Linux and phones coming
        </p>
      </div>

      <div className="rise relative mx-auto mt-14 max-w-6xl sm:mt-20" style={{ animationDelay: "280ms" }}>
        <WindowFrame>
          <Shot
            name="feed"
            alt="Zveno main window: the frontend agent's feed with plan, read, edit and test steps, the agent list on the left and token usage on the right."
            priority
          />
        </WindowFrame>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:contents">
          <div className="glass-window rounded-[16px] p-3 text-left lg:absolute lg:-bottom-10 lg:left-4 xl:-left-6 lg:w-[300px]">
            <p className="label px-2 pt-1 pb-2">Your team</p>
            <ul className="space-y-0.5">
              {ROSTER.map((a) => (
                <li key={a.name} className="flex items-center gap-3 rounded-[10px] px-2 py-1.5">
                  <Bug look={a.look} mood={a.mood} badge={a.badge} size={34} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] leading-tight font-semibold">{a.name}</span>
                    <span className="block truncate font-mono text-[11px] text-faint">{a.meta}</span>
                  </span>
                  <span className={`rounded-[6px] px-1.5 py-0.5 font-mono text-[10.5px] ${a.tone}`}>{a.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-window rounded-[16px] p-4 text-left lg:absolute lg:right-4 lg:-bottom-8 xl:-right-6 lg:w-[320px]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] font-semibold tracking-wider text-warn">DEPLOY</span>
              <span className="font-mono text-[11px] text-faint">deploy-bot · waiting 24 min</span>
            </div>
            <p className="mt-2 text-[14px] font-semibold">Release v0.4.0 to production?</p>
            <ul className="mt-2 space-y-0.5 font-mono text-[11.5px] text-muted">
              <li><span className="text-ok">✓</span> CI green on #212 · 41 tests</li>
              <li><span className="text-ok">✓</span> Staging checked by tests agent</li>
            </ul>
            <div className="mt-3 flex gap-2">
              <span className="rounded-[8px] bg-strong px-3 py-1.5 text-[12.5px] font-semibold text-strong-text">Approve Y</span>
              <span className="rounded-[8px] border border-line-strong px-3 py-1.5 text-[12.5px] font-semibold">Reject N</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
