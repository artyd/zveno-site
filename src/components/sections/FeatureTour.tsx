"use client";

import { Check } from "lucide-react";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import { Shot, WindowFrame } from "../Shot";

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

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [plate, setPlate] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const el = tabsRef.current[active];
      if (el) setPlate({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    tabsRef.current[next]?.focus();
    tabsRef.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const tab = TABS[active];

  return (
    <section id="tour" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead label="Product" title="Built for watching a team work." rest="And stepping in only when it matters." />

        <Reveal className="mt-10 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Product tour"
            onKeyDown={onKey}
            className="glass-panel relative inline-flex rounded-[12px] p-1"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-[9px] bg-sel"
              style={{
                left: plate.left,
                width: plate.width,
                boxShadow: "var(--sel-shadow)",
                transition: "left .45s cubic-bezier(.34,1.42,.5,1), width .45s cubic-bezier(.34,1.42,.5,1)",
              }}
            />
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
                onClick={() => setActive(i)}
                className={`relative min-h-10 cursor-pointer rounded-[9px] px-4 text-[13.5px] font-medium transition-colors sm:min-w-[96px] ${
                  i === active ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_300px] lg:gap-10"
        >
          <WindowFrame key={tab.id} className="rise">
            <Shot name={tab.shot} alt={tab.alt} sizes="(min-width: 1200px) 820px, 100vw" />
          </WindowFrame>
          <div key={`${tab.id}-text`} className="rise lg:pt-4">
            <h3 className="text-[22px] leading-snug font-semibold tracking-[-0.02em]">{tab.title}</h3>
            <p className="mt-3 text-muted">{tab.body}</p>
            <ul className="mt-6 space-y-3">
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
      </div>
    </section>
  );
}
