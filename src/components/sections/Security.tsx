import { GitBranch, KeyRound, Laptop, LockKeyhole } from "lucide-react";
import { Reveal } from "../Reveal";
import { Slide } from "../Slide";

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
    <Slide id="security">
      <div className="glass-window rounded-[24px] p-6 sm:p-12 deck:p-[clamp(18px,4.2vh,48px)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 deck:gap-[clamp(20px,4vh,48px)] deck:lg:gap-[clamp(28px,5vw,64px)]">
          <Reveal>
            <p className="label">Security</p>
            <h2 className="mt-3 text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-balance sm:text-[44px] deck:mt-[clamp(4px,1vh,12px)] deck:text-[clamp(24px,4.7vh,44px)]">
              Your keys never leave your machine.
            </h2>
            <p className="mt-5 text-muted deck:mt-[clamp(8px,2vh,20px)] deck:text-[clamp(13px,1.9vh,15px)]">
              Zveno is a desktop app, not a cloud IDE. The work happens where your code already is. There is no Zveno
              account and no Zveno server between you and your provider.
            </p>
            <div className="card mt-8 rounded-[12px] p-4 font-mono text-[12px] leading-relaxed deck:mt-[clamp(10px,3vh,32px)]">
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
          <ul className="grid gap-4 self-center sm:grid-cols-2 deck:gap-[clamp(8px,1.8vh,16px)]">
            {POINTS.map(({ icon: Icon, ...p }, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="glass-panel rounded-[16px] p-5 deck:p-[clamp(12px,2.2vh,20px)]">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-accent-bg text-accent">
                  <Icon size={19} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em] deck:mt-[clamp(8px,1.8vh,16px)]">{p.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted deck:text-[clamp(12.5px,1.8vh,14px)]">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}
