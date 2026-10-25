"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("zveno-theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="flex size-10 cursor-pointer items-center justify-center rounded-[9px] text-muted transition-colors hover:bg-hover hover:text-text"
    >
      <Sun size={17} className="only-light" />
      <Moon size={17} className="only-dark" />
    </button>
  );
}
