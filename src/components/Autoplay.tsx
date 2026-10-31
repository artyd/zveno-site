"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";

const subscribeMotion = (cb: () => void) => {
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useInView(ref: RefObject<HTMLElement | null>, threshold: number) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= threshold), {
      threshold: [0, threshold, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(document.visibilityState === "visible");
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

// Autoplay index for a carousel. Plays only while the carousel is on screen, the browser tab is visible and
// neither the pointer nor the keyboard focus is inside; never under prefers-reduced-motion. The timer is a CSS
// animation on the progress bar, so pausing keeps the exact progress and resuming continues from it.
export function useAutoplay(count: number, ref: RefObject<HTMLElement | null>) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const reduced = useReducedMotion();
  const inView = useInView(ref, 0.5);
  const pageVisible = usePageVisible();
  const playing = !reduced && inView && pageVisible && !hover && !focus;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i + count - 1) % count), [count]);

  const bind = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHover(true);
    },
    onPointerLeave: () => setHover(false),
    onFocus: (e: FocusEvent) => setFocus((e.target as HTMLElement).matches(":focus-visible")),
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
    },
  };
  return { index, setIndex, next, prev, playing, reduced, bind };
}

// Story-style progress: one segment per item, the past ones full, the current one filling up over `ms`. Finishing it
// moves the carousel on. Each segment is a tab; click jumps, Left and Right move between them.
export function StoryBars({
  labels,
  index,
  ms,
  playing,
  reduced,
  onDone,
  onSelect,
  label,
  controls,
  showLabels = false,
  className = "",
}: {
  labels: readonly string[];
  index: number;
  ms: number;
  playing: boolean;
  reduced: boolean;
  onDone: () => void;
  onSelect: (i: number) => void;
  label: string;
  controls?: string;
  showLabels?: boolean;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = labels.length;
    const to = (index + (e.key === "ArrowRight" ? 1 : n - 1)) % n;
    onSelect(to);
    refs.current[to]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className={`flex gap-1.5 ${className}`}>
      {labels.map((l, i) => {
        const on = i === index;
        return (
          <button
            key={l}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={controls}
            aria-label={l}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            className="group min-w-0 flex-1 cursor-pointer py-2.5 !outline-offset-0"
          >
            <span className="relative block h-[3px] overflow-hidden rounded-full bg-line-strong transition-colors group-hover:bg-[var(--faint)]">
              {i < index && <span className="absolute inset-0 rounded-full bg-[var(--faint)]" />}
              {on &&
                (reduced ? (
                  <span className="absolute inset-0 rounded-full bg-accent" />
                ) : (
                  <span
                    key={index}
                    className="autoplay-bar absolute inset-0 rounded-full bg-accent"
                    style={{ "--ms": `${ms}ms`, animationPlayState: playing ? "running" : "paused" } as CSSProperties}
                    onAnimationEnd={onDone}
                  />
                ))}
            </span>
            {showLabels && (
              <span
                className={`mt-2 block truncate text-center font-mono text-[10.5px] tracking-[0.04em] uppercase transition-colors ${
                  on ? "text-text" : "text-faint group-hover:text-muted"
                }`}
              >
                {l}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
