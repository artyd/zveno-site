import { NAV } from "@/lib/site";
import { Wordmark } from "../Mark";

// The footer is the bottom of the last slide.
export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:gap-6 deck:pt-[clamp(10px,2vh,24px)]">
        <div>
          <Wordmark height={22} />
          <p className="mt-1.5 text-[13px] text-faint">&ldquo;Zveno&rdquo; means &ldquo;link&rdquo;. Your team is the chain.</p>
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
        <p className="font-mono text-[11.5px] text-faint sm:ml-2">© 2026 Zveno</p>
      </div>
    </footer>
  );
}
