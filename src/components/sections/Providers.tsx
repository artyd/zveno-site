import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";

const PROVIDERS = [
  { name: "Claude Code", by: "Anthropic", models: "Opus · Sonnet · Haiku", plan: "Claude subscription or API key", on: true },
  { name: "Codex CLI", by: "OpenAI", models: "GPT-5 · GPT-5 Codex", plan: "ChatGPT subscription or API key", on: true },
  { name: "Gemini CLI", by: "Google", models: "Gemini 2.5 Pro · Antigravity", plan: "Google account or API key", on: false },
  { name: "Grok CLI", by: "xAI", models: "Grok 4", plan: "X account or API key", on: false },
];

export function Providers() {
  return (
    <section id="providers" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Providers"
          title="Works with the agents you already pay for."
          rest="Mix them in one team, per agent."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROVIDERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70} className={`glass-panel flex flex-col rounded-[18px] p-5 ${p.on ? "" : "opacity-80"}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-faint">{p.by}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-[6px] px-2 py-0.5 font-mono text-[10.5px] ${
                    p.on ? "bg-ok-bg text-ok" : "bg-chip text-muted"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${p.on ? "bg-ok" : "bg-current opacity-60"}`} />
                  {p.on ? "available" : "soon"}
                </span>
              </div>
              <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.02em]">{p.name}</h3>
              <p className="mt-1 font-mono text-[12px] text-muted">{p.models}</p>
              <p className="mt-6 border-t border-line pt-4 text-[13.5px] text-muted">{p.plan}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="glass-surface mt-4 flex flex-col gap-2 rounded-[14px] px-5 py-4 text-[14px] text-muted sm:flex-row sm:items-center sm:gap-6">
          <span className="label shrink-0">Limits</span>
          <span>
            When a subscription hits its limit, Zveno can fall back to your API key. The Orchestrator always runs on the newest model
            of the provider you choose.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
