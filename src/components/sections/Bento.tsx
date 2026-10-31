"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { ProgressBar, useAutoplay } from "../Autoplay";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import { Slide } from "../Slide";

type Card = { shot: string; w: number; h: number; title: string; body: string; alt: string };

const GRID: Card[] = [
  {
    shot: "brief",
    w: 1878,
    h: 1000,
    title: "Morning brief",
    body: "What the agents finished overnight, what waits for you, and how much of each plan is left.",
    alt: "Morning brief: yesterday's finished tasks per project, decisions for today, limits and spend.",
  },
  {
    shot: "architecture",
    w: 1757,
    h: 1060,
    title: "Architecture map",
    body: "How the parts connect, what is built, and what the agents suggest adding.",
    alt: "Architecture diagram of a project with parts grouped by layer and live data flows.",
  },
  {
    shot: "roadmap",
    w: 1714,
    h: 1123,
    title: "Roadmap to MVP",
    body: "Numbered steps with the agent on each, plus time and agent cost until MVP.",
    alt: "Roadmap: a numbered stepper with done, current and next steps and an MVP divider.",
  },
];

const CAROUSEL: Card[] = [
  {
    shot: "terminal",
    w: 1714,
    h: 950,
    title: "A real terminal",
    body: "PowerShell, zsh or SSH. Explain any error in plain words and send the fix to an agent.",
    alt: "Terminal tab: a failing test with a Zveno explanation and a Send to backend-api button.",
  },
  {
    shot: "versions",
    w: 1714,
    h: 691,
    title: "Versions",
    body: "Agents save a version when tests pass. Bring the project back to any version, compare it with now, or undo one agent.",
    alt: "Versions: the rule that agents save a version when tests pass, and a timeline of versions with restore actions.",
  },
];

const INTERVAL = 3000;

// Both themes' crops; CSS shows the one for the current theme. Sized by height so the card never outgrows the slide.
function Crop({ c, sizes }: { c: Card; sizes: string }) {
  return (
    <div className="fit-w" style={{ "--ar": c.w / c.h } as CSSProperties}>
      {(["light", "dark"] as const).map((t) => (
        <Image
          key={t}
          src={`/shots/${t}-${c.shot}-crop.webp`}
          alt={c.alt}
          width={c.w}
          height={c.h}
          sizes={sizes}
          quality={90}
          className={`${t === "light" ? "only-light" : "only-dark"} h-auto w-full rounded-[10px] border border-line`}
        />
      ))}
    </div>
  );
}

export function Bento() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { index: active, setIndex, next, playing, reduced, bind } = useAutoplay(CAROUSEL.length, rootRef);

  return (
    <Slide id="more">
      <SectionHead label="And the rest of the day" title="Plan, track, roll back." rest="Without opening five other tools." />

      <div
        className="mt-6 grid gap-4 md:grid-cols-3 deck:mt-[clamp(10px,2.2vh,28px)] deck:gap-[clamp(10px,1.8vh,16px)]"
        style={{ "--fit-h-deck": "calc(22svh)" } as CSSProperties}
      >
        {GRID.map((c, i) => (
          <Reveal
            key={c.shot}
            delay={i * 70}
            className="glass-panel flex flex-col overflow-hidden rounded-[18px] p-4 deck:p-[clamp(10px,1.8vh,16px)]"
          >
            <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{c.title}</h3>
            <p className="mt-1 text-[13.5px] text-muted deck:text-[clamp(12px,1.75vh,13.5px)]">{c.body}</p>
            <div className="mt-3 flex flex-1 items-end deck:mt-[clamp(6px,1.4vh,12px)]">
              <Crop c={c} sizes="(min-width: 1200px) 400px, (min-width: 768px) 33vw, 100vw" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-4 deck:mt-[clamp(10px,1.8vh,16px)]">
        <div
          ref={rootRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="More tools"
          aria-live={playing ? "off" : "polite"}
          {...bind}
          className="glass-panel grid gap-4 overflow-hidden rounded-[18px] p-4 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-8 deck:p-[clamp(10px,1.8vh,16px)]"
          style={{ "--fit-h-deck": "calc(26svh)" } as CSSProperties}
        >
          <div>
            <div role="tablist" aria-label="More tools" className="glass-surface inline-flex rounded-[10px] p-0.5">
              {CAROUSEL.map((c, i) => (
                <button
                  key={c.shot}
                  type="button"
                  role="tab"
                  id={`more-tab-${c.shot}`}
                  aria-selected={i === active}
                  aria-controls={`more-panel-${c.shot}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    e.preventDefault();
                    const to = (active + (e.key === "ArrowRight" ? 1 : CAROUSEL.length - 1)) % CAROUSEL.length;
                    setIndex(to);
                    document.getElementById(`more-tab-${CAROUSEL[to].shot}`)?.focus();
                  }}
                  className={`relative min-h-9 cursor-pointer rounded-[8px] px-4 pb-1 text-[13px] font-medium transition-[color,background-color,box-shadow] duration-300 ${
                    i === active ? "bg-sel text-text shadow-[var(--sel-shadow)]" : "text-muted hover:text-text"
                  }`}
                >
                  {c.title}
                  {i === active && <ProgressBar index={active} ms={INTERVAL} playing={playing} reduced={reduced} onDone={next} />}
                </button>
              ))}
            </div>
            <div className="mt-3 grid">
              {CAROUSEL.map((c, i) => (
                <div
                  key={c.shot}
                  className={`col-start-1 row-start-1 transition-opacity duration-[600ms] ease-in-out ${i === active ? "visible opacity-100" : "invisible opacity-0"}`}
                >
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-1 text-[13.5px] text-muted deck:text-[clamp(12px,1.75vh,13.5px)]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid overflow-x-clip">
            {CAROUSEL.map((c, i) => (
              <div
                key={c.shot}
                role="tabpanel"
                id={`more-panel-${c.shot}`}
                aria-labelledby={`more-tab-${c.shot}`}
                className={`col-start-1 row-start-1 flex items-center justify-center transition-[opacity,transform,visibility] duration-[600ms] ease-in-out ${
                  i === active ? "visible translate-x-0 opacity-100" : `invisible opacity-0 ${i < active ? "-translate-x-6" : "translate-x-6"}`
                }`}
              >
                <Crop c={c} sizes="(min-width: 1200px) 800px, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Slide>
  );
}
