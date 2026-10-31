"use client";

import { Check } from "lucide-react";
import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { ProgressBar, useAutoplay } from "../Autoplay";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import { Shot, WindowFrame } from "../Shot";
import { Slide } from "../Slide";

const TABS = [
  {
    id: "feed",
    label: "Feed",
    shot: "feed-open",
    title: "Every step, in plain sight.",
    body: "Each agent has a feed of chat messages and CLI actions. Open any step to see the diff, the command output or the plan.",
    facts: ["Rewind an agent to just before any step", "Model and effort per message", "Plain-language explanations if you have never coded"],
    alt: "Feed tab: an agent's messages with expandable Plan, Read, Edit and Run steps.",
  },
  {
    id: "board",
    label: "Board",
    shot: "board",
    title: "All tasks across the team.",
    body: "A board of every task: queued, working, waiting, done. The Orchestrator sets a token budget for each one.",
    facts: ["Progress and budget on every card", "A task pauses at its budget and asks you", "Drag tasks between columns"],
    alt: "Board tab: a kanban board of tasks with agent mascots, models, progress and budgets.",
  },
  {
    id: "inbox",
    label: "Decisions",
    shot: "inbox",
    title: "One inbox for what needs you.",
    body: "Questions from agents, deploy approvals and budget limits arrive as a stack of cards. Answer with one key.",
    facts: ["Y to approve, N to reject, R to reply", "CI checks shown on deploy cards", "Toasts and a tray badge when you are away"],
    alt: "Decision inbox: a deploy approval card with CI checks and Approve, Reject and Reply buttons.",
  },
  {
    id: "project",
    label: "Project",
    shot: "project",
    title: "Know how close you are to MVP.",
    body: "Agents read the project and report readiness: what is missing, what can wait, the stack and the roadmap.",
    facts: ["Readiness score with must, should and later items", "Architecture map and step-by-step roadmap", "Checklist for security, speed, tests and launch"],
    alt: "Project tab: readiness for MVP ring, items to reach MVP and what can wait.",
  },
  {
    id: "preview",
    label: "Preview",
    shot: "preview",
    title: "See the app as it is built.",
    body: "Run the project on desktop, tablet and phone sizes. Click an element, say what to change, send it to an agent.",
    facts: ["Web, iOS simulator and Android emulator", "Runtime errors go straight to an agent", "Share a review link with a client"],
    alt: "Preview tab: the app running in a desktop device frame with zoom and device controls.",
  },
  {
    id: "library",
    label: "Library",
    shot: "library",
    title: "Skills your agents follow.",
    body: "Add SKILL.md folders from a GitHub link or write your own. Agents read a skill before tasks that match it.",
    facts: ["Skills suggested for each project", "See which agents used a skill and when", "Pause or remove a skill per project"],
    alt: "Library tab: active skills in the project with usage, agents and toggles.",
  },
] as const;

const INTERVAL = 3000;

export function FeatureTour() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { index: active, setIndex, next, playing, reduced, bind } = useAutoplay(TABS.length, rootRef);

  // Left and right only: up and down still page the presentation.
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const to = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setIndex(to);
    tabsRef.current[to]?.focus();
    tabsRef.current[to]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <Slide id="tour" bodyClassName="max-w-6xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between deck:gap-[clamp(10px,2vh,20px)]">
        <SectionHead className="lg:!max-w-[640px]" label="Product" title="Built for watching a team work." rest="And stepping in only when it matters." />
        <Reveal delay={80} className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:shrink-0 lg:overflow-visible lg:pb-0">
          <div
            role="tablist"
            aria-label="Product tour"
            onKeyDown={onKey}
            className="glass-panel relative inline-flex rounded-[12px] p-1"
          >
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`relative min-h-10 cursor-pointer rounded-[9px] px-4 pb-1 text-[13.5px] font-medium transition-[color,background-color,box-shadow] duration-300 sm:min-w-[92px] ${
                  i === active ? "bg-sel text-text shadow-[var(--sel-shadow)]" : "text-muted hover:text-text"
                }`}
              >
                {t.label}
                {i === active && <ProgressBar index={active} ms={INTERVAL} playing={playing} reduced={reduced} onDone={next} />}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={140}
        className="mt-5 deck:mt-[clamp(10px,2.2vh,24px)]"
      >
        <div
          ref={rootRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product tour slides"
          aria-live={playing ? "off" : "polite"}
          {...bind}
          className="grid overflow-x-clip"
          style={{ "--fit-h-deck": "calc(87svh - 210px)" } as CSSProperties}
        >
          {TABS.map((tab, i) => {
            const on = i === active;
            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                className={`col-start-1 row-start-1 grid items-center gap-5 transition-[opacity,transform,visibility] ease-in-out lg:grid-cols-[1fr_300px] lg:gap-10 ${
                  on
                    ? "visible translate-x-0 opacity-100 duration-[600ms]"
                    : `invisible opacity-0 duration-[600ms] ${i < active ? "-translate-x-6" : "translate-x-6"}`
                }`}
              >
                <WindowFrame className="fit-w !mx-auto lg:!mx-0 lg:justify-self-center" style={{ "--ar": 1.6 } as CSSProperties}>
                  <Shot name={tab.shot} alt={tab.alt} sizes="(min-width: 1200px) 900px, 100vw" />
                </WindowFrame>
                <div>
                  <h3 className="text-[22px] leading-snug font-semibold tracking-[-0.02em]">{tab.title}</h3>
                  <p className="mt-3 text-muted">{tab.body}</p>
                  <ul className="mt-5 space-y-3">
                    {tab.facts.map((f) => (
                      <li key={f} className="flex gap-3 text-[14px]">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ok-bg text-ok">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Slide>
  );
}
