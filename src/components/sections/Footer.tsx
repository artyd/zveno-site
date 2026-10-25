import { NAV } from "@/lib/site";
import { Wordmark } from "../Mark";

export function Footer() {
  return (
    <footer className="px-4 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
        <div>
          <Wordmark height={22} />
          <p className="mt-2 text-[13px] text-faint">&ldquo;Zveno&rdquo; means &ldquo;link&rdquo;. Your team is the chain.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:ml-auto">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-[13.5px] text-muted hover:text-text">
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#download" className="text-[13.5px] text-muted hover:text-text">
              Download
            </a>
          </li>
        </ul>
        <p className="font-mono text-[11.5px] text-faint sm:ml-6">© 2026 Zveno</p>
      </div>
    </footer>
  );
}
