import { Monitor, Smartphone } from "lucide-react";
import { DOWNLOAD } from "@/lib/site";
import { Mark, WindowsIcon } from "../Mark";
import { Reveal } from "../Reveal";

const PLATFORMS = [
  { name: "macOS", sub: "Apple silicon and Intel", icon: Monitor },
  { name: "Linux", sub: "AppImage and .deb", icon: Monitor },
  { name: "iOS and Android", sub: "Companion for decisions on the go", icon: Smartphone },
];

export function Download() {
  return (
    <section id="download" className="slide px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Mark size={88} className="mx-auto text-text" style={{ animation: "markPulse 1.6s ease-in-out infinite" }} />
        <h2 className="mt-8 text-[34px] leading-[1.08] font-semibold tracking-[-0.035em] text-balance sm:text-[56px]">
          Strong chains are built one link at a time.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">
          Install Zveno, connect Claude Code or Codex, and give the Orchestrator your first idea.
        </p>
        <a href={DOWNLOAD.windows} className="btn btn-strong mt-9 w-full !min-h-12 !px-7 !text-[15px] sm:w-auto">
          <WindowsIcon />
          Download for Windows
        </a>
        <p className="mt-4 font-mono text-[11.5px] text-faint">{DOWNLOAD.requirements}</p>
        <p className="mt-2 text-[13px] text-muted">macOS and Linux builds are coming.</p>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
        {PLATFORMS.map(({ icon: Icon, ...p }, i) => (
          <Reveal key={p.name} delay={i * 70} className="glass-panel flex items-center gap-3 rounded-[14px] p-4 sm:flex-col sm:items-start">
            <Icon size={18} className="shrink-0 text-faint" />
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold">{p.name}</span>
              <span className="block text-[13px] text-muted">{p.sub}</span>
            </span>
            <span className="rounded-[6px] bg-chip px-2 py-0.5 font-mono text-[10.5px] text-muted">coming</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
