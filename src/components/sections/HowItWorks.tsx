import { Check, FileText, Pencil, SquareTerminal } from "lucide-react";
import { Bug, ORCH_LOOK } from "../Bug";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

function Orchestrate() {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2.5">
        <Bug look={ORCH_LOOK} mood="still" size={30} />
        <div className="card rounded-[12px] rounded-tl-[4px] px-3 py-2 text-[13px]">Who opens this CRM every day?</div>
      </div>
      <div className="flex flex-wrap gap-1.5 pl-10">
        {["Sales reps", "Founders", "Support"].map((o, i) => (
          <span
            key={o}
            className={`rounded-[7px] px-2 py-1 text-[12px] ${i === 0 ? "bg-accent-bg font-semibold text-accent" : "bg-chip text-muted"}`}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function Build() {
  const rows = [
    { icon: FileText, c: "text-accent", t: "Read", target: "src/panels/tokens.tsx", r: "2.1k" },
    { icon: Pencil, c: "text-ok", t: "Edit", target: "src/app.tsx", d: true, r: "1.9k" },
    { icon: SquareTerminal, c: "text-muted", t: "Run", target: "vitest · 14 passed", r: "1.1k" },
  ];
  return (
    <div className="card overflow-hidden rounded-[12px]">
      {rows.map(({ icon: Icon, ...s }) => (
        <div key={s.t} className="flex items-center gap-2 border-b border-line px-3 py-2 font-mono text-[11.5px] last:border-0">
          <Icon size={13} className={s.c} />
          <span className="font-semibold text-text">{s.t}</span>
          <span className="min-w-0 truncate text-muted">{s.target}</span>
          {s.d && (
            <span className="shrink-0">
              <span className="text-ok">+4</span> <span className="text-err">−1</span>
            </span>
          )}
          <span className="ml-auto shrink-0 text-faint">{s.r}</span>
        </div>
      ))}
    </div>
  );
}

function Review() {
  return (
    <div className="card rounded-[12px] p-3">
      <div className="flex items-center gap-2">
        <Bug look={{ hue: 160, pat: "chevron" }} mood="waiting" size={22} />
        <span className="font-mono text-[10.5px] font-semibold tracking-wider text-answer">QUESTION · Q4</span>
      </div>
      <p className="mt-2 text-[13px] font-medium">SQLite file for now, or a hosted database?</p>
      <div className="mt-2.5 flex gap-1.5">
        <span className="rounded-[7px] bg-strong px-2.5 py-1 text-[12px] font-semibold text-strong-text">Send answer</span>
        <span className="rounded-[7px] border border-line-strong px-2.5 py-1 text-[12px] font-semibold">Skip</span>
      </div>
    </div>
  );
}

function Ship() {
  const envs = [
    { n: "Preview", s: "v42", st: "live" },
    { n: "Staging", s: "v41", st: "live" },
    { n: "Production", s: "v40", st: "waits for you" },
  ];
  return (
    <div className="card overflow-hidden rounded-[12px]">
      {envs.map((e) => (
        <div key={e.n} className="flex items-center gap-2 border-b border-line px-3 py-2 text-[12.5px] last:border-0">
          <span className={`size-2 rounded-full ${e.st === "live" ? "bg-ok" : "bg-warn"}`} />
          <span className="font-semibold">{e.n}</span>
          <span className="font-mono text-[11px] text-faint">{e.s}</span>
          <span className={`ml-auto font-mono text-[11px] ${e.st === "live" ? "text-ok" : "text-warn"}`}>
            {e.st === "live" ? (
              <span className="inline-flex items-center gap-1">
                <Check size={12} /> tests passed
              </span>
            ) : (
              e.st
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Tell the Orchestrator the idea",
    body: "It interviews you until nothing is assumed, writes the spec, picks the stack and splits the work into tasks with token budgets.",
    visual: <Orchestrate />,
  },
  {
    n: "02",
    title: "A team of agents builds it",
    body: "Each agent is a real CLI on your machine with its own model and effort. Every Read, Edit, Run and Test shows up in its feed.",
    visual: <Build />,
  },
  {
    n: "03",
    title: "You make the decisions",
    body: "Questions, deploy approvals and budget limits wait in one inbox. Diffs come grouped by agent, then by file.",
    visual: <Review />,
  },
  {
    n: "04",
    title: "Ship when tests pass",
    body: "Agents save a version only when tests pass. Promote from preview to staging to production, or roll back to any version.",
    visual: <Ship />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="slide px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead label="How it works" title="One person, a whole team." rest="You set the direction; the agents do the typing." />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* the chain that links the steps */}
          <div
            aria-hidden="true"
            className="absolute top-[34px] right-[12%] left-[12%] hidden border-t-2 border-dashed border-line-strong xl:block"
          />
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="glass-panel relative flex flex-col rounded-[18px] p-5">
              <span className="glass-surface relative flex size-10 items-center justify-center rounded-full font-mono text-[12px] font-semibold text-accent">
                {s.n}
              </span>
              <h3 className="mt-5 text-[17px] leading-snug font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{s.body}</p>
              <div className="mt-auto pt-6">{s.visual}</div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
