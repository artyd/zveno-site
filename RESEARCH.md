# Research: how strong AI / B2B product sites are built

Study done October 2026 before building the Zveno site. Live homepages were fetched and rendered at 1440×900; computed styles (type size, weight, tracking, nav blur) were read in the browser. Sites: Linear, Vercel, Cursor, Raycast, Warp, Zed, Conductor. The `ui-ux-pro-max` skill was used for the design-system and UX checklist.

## What each site does well

**Linear** (linear.app)
- Left-aligned hero, 64px H1 at weight ~510, tracking −0.022em; one-line grey subhead.
- Flat, untilted full-width product UI that bleeds off the fold; a floating agent-chat panel overlaps a corner for depth.
- Fixed transparent nav with `backdrop-filter: blur(20px)`; `data-theme` plus `prefers-color-scheme` and reduced-motion rules.
- Sections alternate: big H2 left, short copy and "Learn more" right.

**Vercel** (vercel.com)
- Geist with very tight tracking (H1 64px / 400 / −0.06em). Pill CTA pair (primary + secondary).
- Each section: H2 on top, UI mockup on two thirds, right rail with one metric and a 4-item feature list.

**Cursor** (cursor.com)
- OS-detected primary button: "Download for Windows" straight to the installer, plus a persistent "Download" pill in the nav.
- Product shown in a framed window on a painted backdrop card.
- Real agent vocabulary in mockups: status groups ("In progress", "Ready for review"), elapsed time, `+135 −21` diff counts.
- Repeats the download CTA at the bottom.

**Raycast** (raycast.com)
- Floating, inset, rounded nav container with a Download button that carries the OS icon.
- Small mono line under the CTA: "Windows 10+ (x64 or ARM64)" and a copyable install command.
- Two-tone section headings: claim in full colour, continuation in grey.

**Warp** (warp.dev)
- Hero visual is a grid of agent tasks with a queued / working / shipped legend and a live counter; a roster of agents with model tags and statuses.
- Numbered 01–06 cards; FAQ accordion. Monospace headlines (we will not copy that).

**Zed** (zed.dev)
- Now a single-screen page; one large three-pane screenshot (threads, agent chat with inline edits, diff panel). Weakest reference.

**Conductor** (conductor.build) — closest competitor
- "Run a team of coding agents…" H1, one CTA, one pull quote.
- Hero screenshot of parallel workspaces with branch, status and +/- badges, collapsed "17 tool calls" rows, a "Ready to merge" chip.

## Patterns we borrow for Zveno

1. **Short one-line H1 in Geist**, weight 500–600, tracking −0.03 to −0.04em. Ours is the product's own tagline: "The key link between an idea and a product is you."
2. **Download for Windows as the primary hero CTA**, with the Windows icon, plus a ghost secondary ("See how it works").
3. **Mono microline under the CTA**: "Windows 10 and 11 · x64" and "macOS, Linux and phones coming".
4. **Flat, untilted hero product shot** in a glass window with Windows controls (Zveno is Windows-first), one floating glass panel on top for depth: the agent roster with mascots.
5. **Real agent-state vocabulary** taken from the prototype: status chips, model/effort, step rows (`Edit src/app.tsx +4 −1`, `Run npx vitest · 14 passed`), Decision inbox cards.
6. **Agent roster with mascots** ("bugs"): each row has its bug, model tag and status. This is Zveno's own visual answer to Warp's fleet grid.
7. **Two-tone section headings**: claim in `--text`, continuation in `--faint`.
8. **Feature tour as a segmented tab control** that mirrors the app's own header tabs (Feed · Board · Project · Preview · Library · Decisions), each with a real prototype screenshot and three short facts.
9. **Numbered "how it works" chain** (01–04: Orchestrator → agents → review → ship), drawn as links of a chain, which matches the name ("zveno" means "link").
10. **Floating inset glass nav** with blur and Download always visible.
11. **Provider cards with honest status** (Available / Soon) instead of a fake logo wall: there are no customers yet.
12. **Closing download block** repeating the CTA with every platform and its status.

## The design system is the product's own

The `ui-ux-pro-max` design-system search suggested Space Grotesk + DM Sans and a green CTA. We override this on purpose: the site must look like Zveno itself, so it uses SPEC §4 directly:
- Geist / Geist Mono; section labels in mono, 10.5–12px, uppercase, .05em tracking.
- Light and dark tokens copied from `THEMES` in `design/Zveno.dc.html` (desk gradient, `--win-bg`, `--panel`, `--surface`, text, accent, ok / warn / err / answer).
- Liquid glass: translucent panels with `backdrop-filter: blur(36px) saturate(170%)` over the coloured desk gradient. One accent (blue). No gradients on UI elements, no emoji.
- Radii from SPEC §4.4: window 20px, cards 14–16px, buttons 8–10px, chips 6px.
- Mascots ported from `bugEl()` as a React SVG component with the same keyframes (squish, float, blink, look, glow).

From the skill's UX checklist we keep: 4.5:1 text contrast in both themes, visible focus rings, 44px touch targets on mobile, `prefers-reduced-motion`, no horizontal scroll at 375px, alt text on every screenshot, SVG icons only.

## Things we avoid

- No hero without a CTA (Linear): Zveno is a download product.
- No 3D tilt or perspective on screenshots; none of the seven sites do it.
- No logo wall or invented testimonials before there are real users.
- No text-scramble or heavy canvas hero effects; they hurt legibility and LCP.
- No macOS traffic lights on a Windows-first product.
- No second accent colour; no all-mono or serif type system.
