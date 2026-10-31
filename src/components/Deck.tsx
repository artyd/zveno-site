"use client";

import { useEffect } from "react";

const DURATION = 700;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Presentation controller. One wheel gesture, key press or anchor click moves exactly one slide with a
// 700ms eased scroll. Native scrolling (scrollbar drag, touch) keeps working on top of scroll-snap.
// Does nothing on phones, short windows and under prefers-reduced-motion.
export function Deck() {
  useEffect(() => {
    const root = document.documentElement;
    const layout = matchMedia("(min-width: 768px) and (min-height: 600px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const slides = Array.from(document.querySelectorAll<HTMLElement>("main > .slide"));
    if (!slides.length) return;

    let current = 0;
    let animating = false;
    let raf = 0;
    let lockUntil = 0;
    let lastWheel = 0;
    let lastAbs = 0;

    const enabled = () => layout.matches && !reduced.matches;
    const top = (i: number) => slides[i].offsetTop;

    const mark = (i: number) => {
      current = i;
      slides.forEach((s, k) => s.classList.toggle("is-active", enabled() && k === i));
    };
    // After a move the slide we left is off screen, so it can reset and be ready to play again.
    const settle = () => slides.forEach((s, k) => k !== current && s.classList.remove("is-active"));

    const nearest = () => {
      const y = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      slides.forEach((s, k) => {
        if (s.offsetTop <= y) idx = k;
      });
      return idx;
    };

    const goTo = (target: number, instant = false) => {
      const i = Math.max(0, Math.min(slides.length - 1, target));
      cancelAnimationFrame(raf);
      const span = Math.abs(i - nearest());
      mark(i);
      const to = top(i);
      const from = window.scrollY;
      if (instant || Math.abs(to - from) < 2) {
        animating = false;
        root.style.scrollSnapType = "";
        window.scrollTo(0, to);
        settle();
        return;
      }
      animating = true;
      root.style.scrollSnapType = "none";
      const dur = DURATION + Math.min(Math.max(span - 1, 0), 3) * 120;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        window.scrollTo(0, from + (to - from) * ease(t));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          animating = false;
          root.style.scrollSnapType = "";
          lockUntil = performance.now() + 60;
          settle();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (!enabled() || e.ctrlKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest("[data-no-deck]")) return;
      e.preventDefault();
      const now = performance.now();
      const abs = Math.abs(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY);
      const gap = now - lastWheel;
      const prev = lastAbs;
      lastWheel = now;
      lastAbs = abs;
      if (animating || now < lockUntil || abs < 4) return;
      // Momentum from the last flick keeps arriving, decaying. A new gesture starts after a pause or a clear ramp up.
      const fresh = gap > 120 || abs > prev * 1.25 + 6;
      if (!fresh) return;
      goTo(current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (!enabled() || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest("input, textarea, select, [contenteditable='true'], [data-no-deck]")) return;
      const interactive = !!t?.closest("button, a, summary, [role='tab'], [role='button']");
      let dir = 0;
      let abs: number | null = null;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          dir = 1;
          break;
        case "ArrowUp":
        case "PageUp":
          dir = -1;
          break;
        case " ":
          if (interactive) return;
          dir = e.shiftKey ? -1 : 1;
          break;
        case "Home":
          abs = 0;
          break;
        case "End":
          abs = slides.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      if (animating) return;
      goTo(abs ?? current + dir);
    };

    const slideOf = (el: Element | null) => {
      const slide = el?.closest("main > .slide");
      return slide ? slides.indexOf(slide as HTMLElement) : -1;
    };

    const onClick = (e: MouseEvent) => {
      if (!enabled() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target instanceof Element ? e.target : null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const i = slideOf(id ? document.getElementById(id) : slides[0]);
      if (i < 0) return;
      e.preventDefault();
      history.replaceState(null, "", id ? `#${id}` : location.pathname);
      goTo(i);
    };

    // Native scrolling (scrollbar, touch, find in page) moves the current slide too.
    let ticking = false;
    const onScroll = () => {
      if (animating || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (animating || !enabled()) return;
        const i = nearest();
        if (i !== current) {
          mark(i);
          settle();
        }
      });
    };

    // Content that does not fit its slide is scaled down, so nothing is ever cut off.
    const bodies = slides.map((s) => s.querySelector<HTMLElement>(":scope > .slide-body"));
    const fit = () => {
      slides.forEach((s, k) => {
        const b = bodies[k];
        if (!b) return;
        if (!layout.matches) {
          b.style.transform = "";
          return;
        }
        const cs = getComputedStyle(s);
        const room = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const need = b.offsetHeight;
        const f = need > room ? Math.max(0.55, room / need) : 1;
        b.style.transform = f < 0.995 ? `scale(${f})` : "";
      });
    };
    const ro = new ResizeObserver(fit);
    slides.forEach((s, k) => {
      ro.observe(s);
      const b = bodies[k];
      if (b) ro.observe(b);
    });

    // Which slides are on screen: marquees and carousels run only for these.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.classList.toggle("is-visible", en.intersectionRatio > 0.25)),
      { threshold: [0, 0.25, 0.5, 1] },
    );
    slides.forEach((s) => io.observe(s));

    const apply = () => {
      const on = enabled();
      if (on) root.dataset.deck = "1";
      else delete root.dataset.deck;
      if (on) mark(nearest());
      else slides.forEach((s) => s.classList.remove("is-active"));
      fit();
    };
    apply();
    if (enabled() && location.hash.length > 1) {
      const i = slideOf(document.getElementById(decodeURIComponent(location.hash.slice(1))));
      if (i >= 0) goTo(i, true);
    }

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (enabled() && !animating) window.scrollTo(0, top(current));
      }, 120);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    layout.addEventListener("change", apply);
    reduced.addEventListener("change", apply);
    document.fonts?.ready.then(fit);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      layout.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);
      root.style.scrollSnapType = "";
      delete root.dataset.deck;
      slides.forEach((s) => s.classList.remove("is-active", "is-visible"));
      bodies.forEach((b) => {
        if (b) b.style.transform = "";
      });
    };
  }, []);

  return null;
}
