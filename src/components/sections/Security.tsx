import { GitBranch, KeyRound, Laptop, LockKeyhole } from "lucide-react";
import { Reveal } from "../Reveal";

const POINTS = [
  {
    icon: Laptop,
    title: "Agents run on your computer",
    body: "Every agent is a provider CLI started on your machine, in your project folder. Code goes only to the model provider you chose, never through Zveno servers.",
  },
  {
    icon: KeyRound,
    title: "Keys live in the system keychain",
    body: "API keys go to Windows Credential Manager, macOS Keychain or libsecret. Never into plain files.",
  },
  {
    icon: LockKeyhole,
    title: "Sign-in stays with the provider",
    body: "Subscriptions sign in inside the provider's own CLI. Zveno runs the CLI and never sees your password.",
  },
  {
    icon: GitBranch,
    title: "Nothing ships without your OK",
    body: "Agents save versions locally. Pushes to GitHub and releases to production wait for your approval.",
  },
];

export function Security() {
  return (
    <section id="security" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="glass-window mx-auto max-w-6xl rounded-[24px] p-6 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="label">Security</p>
            <h2 className="mt-3 text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-balance sm:text-[44px]">
              Your keys never leave your machine.
            </h2>
            <p className="mt-5 text-muted">
              Zveno is a desktop app, not a cloud IDE. The work happens where your code already is. Review links and the phone
              companion go through an end-to-end encrypted relay that never holds your keys.
            </p>
            <div className="card mt-8 rounded-[12px] p-4 font-mono text-[12px] leading-relaxed">
              <p className="text-faint">Settings · Models & keys</p>
              <p className="mt-2">
                Anthropic · Claude Code <span className="float-right text-ok">keychain</span>
              </p>
              <p className="text-muted">sk-ant-••••••••••••••••3f1a</p>
              <p className="mt-2">
                OpenAI · Codex CLI <span className="float-right text-ok">subscription</span>
              </p>
              <p className="text-muted">signed in with codex login</p>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, ...p }, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="glass-panel rounded-[16px] p-5">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent-bg text-accent">
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
