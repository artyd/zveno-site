import { Box, Clapperboard, Database, Download as DownloadIcon, KeyRound, LayoutDashboard, Server, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import { Slide } from "../Slide";

// The skills that ship with Zveno (packages/core/src/skills/catalog.ts), grouped by category.
const BUILT_IN = [
  { id: "grill-me", source: "mattpocock/skills", category: "Planning", desc: "A relentless interview in rounds until nothing about the plan is assumed." },
  { id: "grill-with-docs", source: "mattpocock/skills", category: "Planning", desc: "The same interview checked against the codebase. Keeps a glossary and decision records in the repo." },
  { id: "to-spec", source: "mattpocock/skills", category: "Planning", desc: "Turns a finished interview into a spec the Orchestrator can split." },
  { id: "wayfinder", source: "mattpocock/skills", category: "Planning", desc: "Maps a large effort and runs interviews inside each part." },
  { id: "orchestrate-plan", source: "zveno", category: "Planning", desc: "Splits a spec into tasks per agent, with dependencies and models." },
  { id: "prototype", source: "mattpocock/skills", category: "Design", desc: "Builds a throwaway version for questions that talking cannot settle." },
  { id: "frontend-design", source: "anthropics/skills", category: "Design", desc: "Pushes UI work toward a distinct, production-grade look instead of generic layouts." },
  { id: "webapp-testing", source: "anthropics/skills", category: "Testing", desc: "Drives a real browser with Playwright to check web apps after changes." },
  { id: "mcp-builder", source: "anthropics/skills", category: "Engineering", desc: "Guides building and testing MCP servers." },
  { id: "skill-creator", source: "anthropics/skills", category: "Engineering", desc: "Helps write and test new skills." },
  { id: "deploy-gate", source: "zveno", category: "Engineering", desc: "Holds production deploys until you approve them." },
  { id: "compact-context", source: "zveno", category: "Engineering", desc: "Summarizes long sessions when context reaches 80%." },
];

const SOON: { name: string; note: string; icon: LucideIcon }[] = [
  { name: "Backend", note: "APIs and services", icon: Server },
  { name: "Frontend", note: "Components and accessibility", icon: LayoutDashboard },
  { name: "Databases", note: "Schemas and migrations", icon: Database },
  { name: "Auth and sign-up", note: "Sessions, providers, recovery", icon: KeyRound },
  { name: "Motion video", note: "Scripted clips and product videos", icon: Clapperboard },
  { name: "3D models", note: "Scenes and assets for the web", icon: Box },
];

type Skill = (typeof BUILT_IN)[number];

function SkillCard({ s }: { s: Skill }) {
  return (
    <article className="glass-panel mr-4 flex h-[clamp(128px,20vh,172px)] w-[280px] shrink-0 flex-col rounded-[16px] p-4 sm:w-[300px]">
      <div className="flex items-center justify-between">
        <span className="label">{s.category}</span>
        <span className="rounded-[6px] bg-ok-bg px-2 py-0.5 font-mono text-[10.5px] text-ok">Built in</span>
      </div>
      <h3 className="mt-[clamp(6px,1.4vh,14px)] font-mono text-[15px] font-semibold tracking-[-0.01em]">{s.id}</h3>
      <p className="font-mono text-[11px] text-faint">{s.source}</p>
      <p className="mt-[clamp(4px,1vh,10px)] text-[12.5px] leading-snug text-muted">{s.desc}</p>
    </article>
  );
}

// Two copies of the row side by side; the track slides by exactly one copy and loops without a seam.
function MarqueeRow({ items, reverse, seconds, label }: { items: Skill[]; reverse?: boolean; seconds: number; label: string }) {
  return (
    <div className="marquee py-1" role="group" aria-label={label} style={{ "--dur": `${seconds}s`, "--dir": reverse ? "reverse" : "normal" } as React.CSSProperties}>
      <div className="marquee-track">
        <div className="flex">
          {items.map((s) => (
            <SkillCard key={s.id} s={s} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {items.map((s) => (
            <SkillCard key={s.id} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const rowB = [...BUILT_IN.slice(6), ...BUILT_IN.slice(0, 6)];
  return (
    <Slide id="skills" bodyClassName="max-w-none">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHead label="Skills Library" title="Agents work better with good skills." rest="Zveno ships a Library. Add more." />
        <Reveal delay={80} className="max-w-xs md:pb-1">
          <span className="rounded-[6px] bg-ok-bg px-2 py-0.5 font-mono text-[10.5px] text-ok">Built in</span>
          <p className="mt-2 text-[17px] leading-tight font-semibold tracking-[-0.02em]">12 skills ready on day one.</p>
          <p className="mt-1 text-[13.5px] text-muted">Agents read a skill before any task that matches it.</p>
        </Reveal>
      </div>

      <Reveal delay={120} className="-mx-4 mt-6 sm:-mx-6 deck:mt-[clamp(10px,2.4vh,28px)]">
        <div className="space-y-3 deck:space-y-[clamp(6px,1.4vh,14px)]">
          <MarqueeRow items={BUILT_IN} seconds={90} label="Built-in skills, moving left" />
          <MarqueeRow items={rowB} seconds={100} reverse label="Built-in skills, moving right" />
        </div>
      </Reveal>

      <div className="mx-auto mt-6 max-w-6xl deck:mt-[clamp(10px,2.4vh,28px)]">
        <Reveal delay={180} className="flex items-center gap-3">
          <p className="label shrink-0">Packs, soon</p>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </Reveal>
        <Reveal stagger={60} className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6 deck:mt-[clamp(6px,1.4vh,12px)]">
          {SOON.map(({ icon: Icon, ...s }) => (
            <div key={s.name} className="glass-panel flex items-center gap-3 rounded-[14px] p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-chip text-muted">
                <Icon size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] leading-tight font-semibold">{s.name}</span>
                <span className="block text-[11.5px] leading-snug text-faint">{s.note}</span>
              </span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={260} className="glass-surface mt-3 flex items-center gap-3 rounded-[14px] px-4 py-3 deck:mt-[clamp(6px,1.4vh,12px)]">
          <DownloadIcon size={18} className="shrink-0 text-accent" />
          <p className="min-w-0 text-[14px] text-muted">
            <span className="font-semibold text-text">Import any SKILL.md from GitHub.</span> Paste a link in the Library. Pause or remove a
            skill per project.
          </p>
        </Reveal>
      </div>
    </Slide>
  );
}
