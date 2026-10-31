"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { id: "top", label: "Start" },
  { id: "how", label: "How it works" },
  { id: "tour", label: "Product" },
  { id: "more", label: "The rest of the day" },
  { id: "skills", label: "Skills" },
  { id: "providers", label: "Providers" },
  { id: "security", label: "Security" },
  { id: "download", label: "Download" },
];

// Slim right-edge progress dots, one per section. Hidden below md.
export function SideDots() {
  const [current, setCurrent] = useState("top");

  useEffect(() => {
    const els = SLIDES.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const update = () => {
      // The current slide is the last one whose top has passed the middle of the screen.
      const mid = window.innerHeight * 0.45;
      let id = els[0]?.id ?? "top";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) id = el.id;
      setCurrent(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:block">
      <ul className="glass-panel flex flex-col items-center gap-1 rounded-full px-1.5 py-2">
        {SLIDES.map((s) => {
          const on = s.id === current;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={on ? "true" : undefined}
                title={s.label}
                className="group flex size-5 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on ? "h-4 w-1.5 bg-accent" : "size-1.5 bg-muted opacity-60 group-hover:opacity-100"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
