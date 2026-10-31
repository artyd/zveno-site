"use client";

import { ArrowLeft, ArrowRight, Download as DownloadIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

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

const SOON = [
  { name: "Backend", note: "APIs and services" },
  { name: "Frontend", note: "Components and accessibility" },
  { name: "Databases", note: "Schemas and migrations" },
  { name: "Auth and sign-up", note: "Sessions, providers, recovery" },
  { name: "Motion video", note: "Scripted clips and product videos" },
  { name: "3D models", note: "Scenes and assets for the web" },
];

const CARD = "glass-panel flex h-[212px] w-[272px] shrink-0 flex-col rounded-[18px] p-5 sm:w-[300px]";

export function Skills() {
  const railRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Mouse drag; touch and trackpad scroll natively.
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !railRef.current) return;
    drag.current = { x: e.clientX, left: railRef.current.scrollLeft };
  };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || !railRef.current) return;
    const dx = e.clientX - d.x;
    if (!dragging && Math.abs(dx) > 4) setDragging(true);
    railRef.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const mask = `linear-gradient(to right, ${edge.start ? "#000" : "transparent"} 0, #000 56px, #000 calc(100% - 56px), ${edge.end ? "#000" : "transparent"} 100%)`;

  return (
    <section id="skills" className="slide px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHead label="Skills Library" title="Agents work better with good skills." rest="Zveno ships a Library. Add more." />
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => page(dir)}
              disabled={dir === -1 ? edge.start : edge.end}
              aria-label={dir === -1 ? "Scroll skills left" : "Scroll skills right"}
              className="glass-panel flex size-11 cursor-pointer items-center justify-center rounded-full text-text transition-opacity hover:bg-sel disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
            >
              {dir === -1 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-10 w-full max-w-[1400px] min-w-0">
        <div
          ref={railRef}
          role="region"
          aria-label="Skills, scrolls sideways"
          tabIndex={0}
          onScroll={measure}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
          className={`rail flex gap-4 overflow-x-auto py-3${dragging ? "cursor-grabbing select-none" : "md:cursor-grab"}`}
          style={{ maskImage: mask, WebkitMaskImage: mask, scrollSnapType: dragging ? "none" : undefined }}
        >
          <div className="flex w-[240px] shrink-0 flex-col justify-center pr-2 sm:w-[260px]">
            <span className="w-fit rounded-[6px] bg-ok-bg px-2 py-0.5 font-mono text-[10.5px] text-ok">Built in</span>
            <p className="mt-4 text-[22px] leading-tight font-semibold tracking-[-0.02em]">12 skills ready on day one.</p>
            <p className="mt-2 text-[14px] text-muted">Agents read a skill before any task that matches it.</p>
          </div>

          {BUILT_IN.map((s) => (
            <article key={s.id} className={CARD}>
              <div className="flex items-center justify-between">
                <span className="label">{s.category}</span>
                <span className="rounded-[6px] bg-ok-bg px-2 py-0.5 font-mono text-[10.5px] text-ok">Built in</span>
              </div>
              <h3 className="mt-5 font-mono text-[16px] font-semibold tracking-[-0.01em]">{s.id}</h3>
              <p className="mt-1 font-mono text-[11.5px] text-faint">{s.source}</p>
              <p className="mt-3 text-[13.5px] leading-snug text-muted">{s.desc}</p>
            </article>
          ))}

          {SOON.map((s) => (
            <article key={s.name} className={`${CARD} opacity-80`}>
              <div className="flex items-center justify-between">
                <span className="label">Pack</span>
                <span className="rounded-[6px] bg-chip px-2 py-0.5 font-mono text-[10.5px] text-muted">Soon</span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-2 text-[13.5px] text-muted">{s.note}</p>
            </article>
          ))}

          <article className={`${CARD} glass-surface`}>
            <DownloadIcon size={20} className="text-accent" />
            <h3 className="mt-4 text-[20px] leading-tight font-semibold tracking-[-0.02em]">Import any SKILL.md from GitHub</h3>
            <p className="mt-2 text-[13.5px] text-muted">Paste a link in the Library. Pause or remove a skill per project.</p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
