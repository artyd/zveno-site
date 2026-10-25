"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DOWNLOAD, NAV } from "@/lib/site";
import { Wordmark, WindowsIcon } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-4 sm:top-4">
      <nav
        aria-label="Main"
        className="glass-window mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-[16px] pr-2 pl-4 sm:pl-5"
      >
        <a href="#top" className="mr-auto flex items-center rounded-md py-1" aria-label="Zveno home">
          <Wordmark height={24} />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-[8px] px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-hover hover:text-text"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
        <a href={DOWNLOAD.windows} className="btn btn-strong hidden !min-h-10 !px-4 !text-[13.5px] sm:inline-flex">
          <WindowsIcon size={13} />
          Download
        </a>
        <button
          type="button"
          className="flex size-10 cursor-pointer items-center justify-center rounded-[9px] text-muted hover:bg-hover md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      {open && (
        <div className="glass-window mx-auto mt-2 max-w-6xl rounded-[16px] p-2 md:hidden">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-[10px] px-3 font-medium text-text hover:bg-hover"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={DOWNLOAD.windows} onClick={() => setOpen(false)} className="btn btn-strong mt-2 w-full">
            <WindowsIcon size={13} />
            Download for Windows
          </a>
        </div>
      )}
    </header>
  );
}
