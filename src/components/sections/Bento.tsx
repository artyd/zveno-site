import Image from "next/image";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

const CARDS = [
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
    wide: true,
  },
];

export function Bento() {
  return (
    <section id="more" className="slide px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead label="And the rest of the day" title="Plan, track, roll back." rest="Without opening five other tools." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.shot}
              delay={(i % 2) * 70}
              className={`glass-panel flex flex-col overflow-hidden rounded-[18px] ${c.wide ? "md:col-span-2 md:grid md:grid-cols-[300px_1fr] md:items-center" : ""}`}
            >
              <div className="p-5 pb-4 md:p-6 md:pb-4">
                <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-1 text-[14px] text-muted">{c.body}</p>
              </div>
              <div className={`mx-5 mt-auto mb-5 overflow-hidden rounded-[12px] border border-line md:mx-6 md:mb-6 ${c.wide ? "md:mt-6 md:ml-0" : ""}`}>
                {(["light", "dark"] as const).map((t) => (
                  <Image
                    key={t}
                    src={`/shots/${t}-${c.shot}-crop.webp`}
                    alt={c.alt}
                    width={c.w}
                    height={c.h}
                    sizes={c.wide ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 768px) 560px, 100vw"}
                    quality={90}
                    className={`${t === "light" ? "only-light" : "only-dark"} h-auto w-full rounded-[11px]`}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
