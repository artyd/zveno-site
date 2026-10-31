"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
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
  return { index, setIndex, next, playing, reduced, bind };
}

// The thin bar under the active tab. Finishing it moves the carousel on.
export function ProgressBar({
  index,
  ms,
  playing,
  reduced,
  onDone,
}: {
  index: number;
  ms: number;
  playing: boolean;
  reduced: boolean;
  onDone: () => void;
}) {
  return (
    <span aria-hidden="true" className="absolute inset-x-3 bottom-1 h-[2px] overflow-hidden rounded-full bg-line-strong">
      {reduced ? (
        <span className="block h-full w-full rounded-full bg-accent" />
      ) : (
        <span
          key={index}
          className="autoplay-bar block h-full w-full rounded-full bg-accent"
          style={{ "--ms": `${ms}ms`, animationPlayState: playing ? "running" : "paused" } as CSSProperties}
          onAnimationEnd={onDone}
        />
      )}
    </span>
  );
}
