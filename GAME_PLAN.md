# Mini-game on the main page — implementation plan

> Living document. Sections may evolve as we discover constraints during implementation; every change should be reflected in the Decision log at the bottom.
> Current page is a Vite + TS + Tailwind app whose only content is the "Download CV" / "View Markdown" buttons (see `src/main.ts`, `src/cv/index.ts`). The game should live on this same page without hurting LCP or shipping a heavy bundle.

---

## 0. Hard performance budget (given, non-negotiable)

- Animation must not affect LCP
- Animation must not create long tasks (> 50 ms on main thread)
- Animation CPU usage on mobile idle < 3–5%
- Animation must pause outside viewport
- Animation bundle < 20 KB gzip
- Animation must remain visually acceptable at 30 FPS
- Animation must gracefully degrade on low-end devices
- Animation must respect `prefers-reduced-motion`

Derived implicit rules:

- No loading spinner / progress bar — the page must look "done" on first paint regardless of game state.
- Game code must not block the critical rendering path: load only after LCP element is painted (via `requestIdleCallback` / lazy import / `IntersectionObserver`).
- Assets (sprites, audio) count toward the 20 KB budget; if they don't fit, they have to be procedural.

---

## 1. Requirements

### 1.1 Locked

- **Role on page**: hero-style composition — the game is the prominent visual element on the main page, but its rendering surface does **not** stretch full-width; it lives in a centered, bounded container alongside the CV download UI.
- **Gameplay scope**: CV-themed reskin of the Chrome-Dino formula — same core mechanics (run, jump, duck, avoid obstacles, score), but the actors are drawn from a CV/developer-life vocabulary (e.g. dev character dodging deadlines / meetings / tickets / bugs). Final theming details TBD.
- **Input methods**: keyboard + touch + mouse click, all supported in parallel. Adaptive on-screen hint based on detected pointer type.

### 1.2 Locked (continued)

- **Visual stack**: DOM + CSS transforms + inline SVG (variant A).
  - Each entity is a small DOM node (typically a `<span>` containing inline SVG).
  - Movement via `transform: translate3d(...)` written in JS each `requestAnimationFrame` tick.
  - Animation of sub-parts (running legs, flapping wings) via CSS keyframes on child `<g>` / `<path>` nodes.
  - SVGs are inlined as JS template strings to keep everything in a single bundle (no extra network request).
  - `fill: currentColor` everywhere so theming is free via CSS custom properties.
  - Rationale: compositor offload keeps main-thread CPU near zero, `prefers-reduced-motion` is one CSS rule, light/dark theming via CSS variables is free, total bundle estimate ~5–7 KB gzip — large headroom inside the 20 KB budget.

### 1.3 Locked (continued, default picks — overridable)

- **Score persistence**: `localStorage` personal best (key `cv-mini-game/hi-score`). Adds ~50 bytes of code, no infra. Score readable to assistive tech via `aria-live="polite"`. No remote leaderboard.
- **Audio**: none in v1. Removes any autoplay/policy risk, saves ~1–2 KB, no toggle UI. Can be added later as an opt-in WebAudio (procedural beeps) without affecting the rest of the architecture.
- **Accessibility** (basic pack): focusable container (`tabindex="0"`, `role="application"`, `aria-label`), visible focus ring matching site theme, `aria-live="polite"` region for score/game-over text, contrast ≥ 4.5:1 against background using existing theme colors, all entities readable by silhouette (not by color alone), full keyboard control (already in requirements).
- **CV-themed bestiary** (v1, "Dev daily life"):
  - **Player**: small developer character with headphones and a laptop tucked under one arm. Two-state running animation (legs swap every 8 ticks). Jump pose is a single sprite. Duck pose is a compressed sprite.
  - **Ground obstacles**:
    - Coffee mug (☕-shaped silhouette, small — jump over it).
    - Stack of tickets (slightly taller — jump over it).
  - **Aerial obstacle** (Chrome Dino's pterodactyl analog):
    - Meeting-invite chat bubble that bobs at head height — duck under it.
  - All entities drawn as inline SVGs with `fill: currentColor` and color-stop CSS variables so they re-skin to light/dark theme for free.

---

## 2. Acceptable trade-offs / constraints we accept

### 2.1 Visual fidelity on low-end devices

- Detect low-end via heuristic: `navigator.hardwareConcurrency <= 4` OR `navigator.deviceMemory <= 2` OR `matchMedia('(prefers-reduced-data: reduce)').matches`.
- On low-end: FPS cap drops from 60 to 30; ground parallax disabled (single CSS-animated layer); aerial obstacle is dropped from the spawn pool; player running animation halves its frame rate.
- Visual smoothness drop is accepted as the cost of holding < 3–5% CPU.

### 2.2 `prefers-reduced-motion` behavior

- Default behavior when the OS-level flag is set: **render a single static scene** (player, ground, one obstacle silhouette), do **not** start the rAF loop, do not auto-scroll the ground.
- Show a short caption inside the focusable container: "Motion disabled. Activate to play one round." Activating (Space / tap / click on the container while focused) starts a **discrete-step** version of the game: the world only advances on input — every jump moves the world forward one obstacle. No continuous motion.
- This satisfies the requirement without removing the feature entirely for motion-sensitive users.

### 2.3 Offscreen / tab-hidden behavior

- `IntersectionObserver` on the game container; when intersectionRatio drops below 0.1, the rAF loop is `cancelAnimationFrame`-ed and any CSS animations are paused (`animation-play-state: paused`). On re-entry, resumes from same state — no reset.
- `document.visibilitychange` (tab backgrounded): same pause path.
- Window `blur`: same pause path.
- Pause persists for as long as the page is alive; no fully-unmount logic in v1 (keep state cheap to resume).

### 2.4 Bundle squeeze fallback order

If gzip size exceeds 75% of the 20 KB budget at any milestone, drop features in this order:

1. The "junior → senior" aesthetic evolution (if it had been added).
2. Aerial obstacle (meeting-invite bubble) and its duck mechanic.
3. Parallax/cloud background layer.
4. HI-score persistence UI text (still keep the value in `localStorage`, just hide the indicator).
5. Player sub-part CSS animations (legs/laptop bob).

### 2.5 Browser support floor

- Modern evergreen only: Chrome / Edge / Firefox / Safari last 2 versions, iOS Safari 15+, Android Chrome 15+.
- ES2020 baseline (matches Vite default). No transpilation for legacy.
- No polyfills shipped. Features used (`IntersectionObserver`, `matchMedia`, `requestIdleCallback`, `requestAnimationFrame`, `Pointer Events`) are all baseline.
- `requestIdleCallback` is missing on Safari — feature-detect and fall back to `setTimeout(fn, 1)` without polyfill.

### 2.6 Bundle delivery

- Game is **lazy-loaded** as a separate Vite chunk (`import('./game')`), not part of the main bundle.
- Trigger order: after `window.load` → `requestIdleCallback` → `IntersectionObserver` (only fetch the chunk if the container is in or near the viewport).
- A statically-sized empty placeholder is rendered immediately so the layout is reserved on first paint → no CLS, no LCP impact.
- The placeholder element has `content-visibility: auto` and `contain: strict` to skip rendering work until needed.

### 2.7 Privacy / network

- Zero network calls at runtime (no analytics, no remote leaderboard).
- Only browser storage: one `localStorage` key.

---

## 3. Tech stack

### 3.1 Runtime dependencies

- **Zero new runtime dependencies.** Vanilla TypeScript + DOM + inline SVG + CSS.
- Existing project deps (`tailwindcss`, `jspdf`, `hypher`, etc.) are not touched.
- No game engine library (kontra.js, phaser, etc.) — overhead per requirement and 20 KB ceiling.

### 3.2 Rendering

- **Surface**: DOM, one root element `<div class="game-root">…</div>`, fixed dimensions (e.g. 600×180 CSS px on desktop, scales down to ~320×120 on mobile via responsive width).
- **Entities**: one `<span class="game-entity">` per object containing inline SVG. Position via `style.transform = translate3d(x, y, 0)` written each frame.
- **Sub-animations** (legs, wings, ground scroll): CSS keyframes with `animation-play-state` controlled by the loop's pause hook.
- **Theming**: SVGs use `fill: currentColor` + CSS custom properties (`--game-fg`, `--game-bg`, `--game-accent`) so they re-skin with site theme.

### 3.3 Game loop

- Hand-rolled `requestAnimationFrame`.
- **Fixed-timestep physics** (one simulation step = 16.66 ms) with accumulator pattern: variable render, deterministic physics.
- FPS cap: when `prefers-reduced-data` or low-end heuristic triggers, cap at 30 FPS by gating render-frame execution to every other tick.
- Pause/resume API hooks `IntersectionObserver` + `visibilitychange` + `blur`.
- Long-task guard: only one `forEach` over entities per tick, no synchronous DOM reads in render path.

### 3.4 Module layout

```
src/game/
  index.ts        // public createGame(container) → { start, stop, destroy }
  loop.ts         // rAF, fixed-timestep accumulator, FPS cap, pause
  input.ts        // unified jump/duck event source from kbd + touch + click
  physics.ts      // gravity, jump curve, AABB collision
  spawn.ts        // RNG-based obstacle scheduler
  entities/
    player.ts     // DOM + state tick
    ground.ts     // CSS-animated parallax strip
    obstacle.ts   // factory: coffee | tickets | meeting-bubble
  svg.ts          // SVG template strings for all entities
  score.ts        // current score + HI score (localStorage)
  a11y.ts         // ARIA live region, focus management, motion preference
  capability.ts   // device tier detection, prefers-reduced-motion, etc.
  styles.css      // component-scoped CSS, scoped to .game-root
```

### 3.5 Build / loading

- `src/main.ts` imports the game via dynamic `import('./game')` wrapped in:
  ```ts
  const loadGame = () => import('./game').then(({ createGame }) => createGame(container));
  window.addEventListener('load', () => {
    const schedule = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1));
    schedule(() => new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      loadGame();
    }, { rootMargin: '200px' }).observe(container));
  });
  ```
- The placeholder is plain HTML/CSS in `src/main.ts`, no JS cost.
- Vite output: separate chunk `game-[hash].js`, expected ~5–7 KB gzip.

### 3.6 Input

- Single source of truth `input.ts` emits abstract events `jump` / `duck` / `release`.
- Keyboard: `Space`, `ArrowUp`, `KeyW` → jump; `ArrowDown`, `KeyS` → duck.
- Pointer: tap top half of container → jump; tap bottom half → duck (mobile-only ergonomic, also works with mouse click).
- Touch swipes optional — only added if v1 ergonomics feels lacking.
- Focus required on the container before keyboard events fire (so we don't hijack the page's `Space`).

### 3.7 Storage

- Single `localStorage` key `cv-mini-game/hi-score`, value is the numeric high score as string.
- Read once on init, written on every game-over if new > old.
- Wrapped in try/catch — Safari private mode rejects writes.

### 3.8 Styles / theming

- New file `src/game/styles.css` co-located with module, imported only by `src/game/index.ts` (so it's part of the lazy chunk).
- Reuses existing CSS variables from `src/styles/globals.css` where possible. Defines its own `--game-*` vars layered on top.

### 3.9 Tooling

- Lint: existing Biome config.
- Types: existing `tsconfig.json`.
- Tests: no test harness yet in this project — out of scope for v1. Manual perf checks via Chrome DevTools + Lighthouse.

---

## 4. Execution steps

Milestones are sized so each is independently mergeable. Every milestone ends with a measurement step; if a perf goal regresses, we stop and fix before moving on.

### M0 — Scaffold + lazy plumbing

- Add `src/game/index.ts` exporting `createGame(container)` that just inserts an empty `<div class="game-root">` of fixed size.
- Add a hero block in `src/main.ts` above the CV buttons: a placeholder div of the same fixed size (CSS `aspect-ratio` reserves layout), with `content-visibility: auto`.
- Wire lazy load (`load` → `requestIdleCallback` → `IntersectionObserver`).
- **Exit**:
  - `pnpm build` produces a separate `game-*.js` chunk visible in `dist/`.
  - Lighthouse LCP unchanged vs. previous main (measured before/after).
  - No CLS introduced (placeholder dims match final game dims).

### M1 — Static scene

- Inline SVG template strings for ground + player (idle) + 1 coffee obstacle.
- CSS variables `--game-fg/--game-bg/--game-accent` mapped to existing theme tokens (light & dark).
- `prefers-reduced-motion`: just render the static scene. No loop yet.
- **Exit**:
  - Visually correct on light/dark, desktop/mobile widths.
  - Bundle size logged (target < 4 KB gzip at this point).
  - No layout shifts after lazy chunk loads.

### M2 — Loop + world motion

- Implement `loop.ts` with fixed-timestep accumulator, FPS cap, pause API.
- Ground scrolls via CSS keyframes (not JS); obstacles spawn from RNG and move via `style.transform`.
- `IntersectionObserver` + `visibilitychange` + `blur` pause.
- No player input yet; coffee just walks past.
- **Exit**:
  - 60 FPS on mid-tier laptop, 30 FPS cap on phone profile.
  - PerformanceObserver reports zero `longtask` entries during 30 s of play.
  - CPU usage in Chrome DevTools Performance Monitor < 3% with tab focused on a 4× CPU throttle.
  - Loop fully halts when scrolled out of view (verified via console-log on pause/resume).

### M3 — Player physics + collisions + game-over

- Jump (variable height by hold time), gravity, ducking pose.
- AABB collision detection between player and active obstacles.
- Game-over state: freeze motion, show retry prompt.
- Input wiring (kbd + pointer).
- **Exit**:
  - Playable end-to-end; collision feels fair (verified manually).
  - Restart works without page reload.
  - Long-task count still zero.

### M4 — Score, HI, accessibility, aerial obstacle

- Score increments by distance traveled; displayed in a `<span>` updated only when changing whole digits.
- HI score from `localStorage`, updated on game-over.
- Add meeting-invite aerial obstacle and the duck mechanic.
- a11y pack: `role="application"`, `tabindex="0"`, `aria-label`, focus ring, `aria-live="polite"` for score & game-over, contrast verified, silhouettes verified.
- Input hint copy auto-adjusts to detected pointer type ("Press Space" vs "Tap to jump").
- **Exit**:
  - Manual a11y checklist passes (focus order, screen-reader sanity check, contrast).
  - Bundle size still under target (< 12 KB gzip — buffer left for v1 polish).

### M5 — Perf hardening & low-end fallbacks

- Implement `capability.ts` (`hardwareConcurrency`, `deviceMemory`, `prefers-reduced-data`).
- Engage 30 FPS cap, drop parallax, drop aerial obstacle on low-end.
- Implement the discrete-step reduced-motion mode.
- Measure all 8 hard perf goals on real-device profile (Moto G4 Lighthouse profile + a physical low-end device if available).
- **Exit**:
  - All 8 perf goals from Section 0 measured and green.
  - Bundle size confirmed < 20 KB gzip (target ≤ 10 KB).

### M6 — Polish + docs

- Final theming pass to align with site palette.
- Brief copy: in-game instruction line, fail message in voice.
- Add a `README` section (or inline comments) documenting the public API and the lazy-load contract.
- **Exit**:
  - Visual review pass.
  - All decision-log entries cross-checked against shipped behavior.

### Out of scope for v1 (parking lot)

- Audio toggle.
- "Junior → senior" aesthetic evolution.
- Online leaderboard.
- Achievements / cosmetics.
- Gamepad input.
- Multi-language strings (English only).
- Automated tests / Playwright e2e.

---

## Decision log

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| R1.Q1 | Role of game on page | Hero-style composition, but rendered in a centered, bounded container (not full-width) | Game must feel like a first-class element of the page, while keeping CV-download UI clearly visible and the rendering area small enough to control perf |
| R1.Q2 | Gameplay scope | CV-themed reskin of Chrome Dino mechanics | Tightly ties the game to the page's purpose (CV) and differentiates from the original |
| R1.Q4 | Input methods | Keyboard + touch + mouse click, all in parallel | Same page must work on every input device a visitor might have |
| R1.Q3 | Visual stack / asset source | Variant A: DOM + CSS transforms + inline SVG | Compositor-offloaded animation, lowest main-thread CPU risk, free `prefers-reduced-motion` and theme integration, easy to fit in budget |
| R1.Q5 | Score persistence | localStorage personal best | ~50 B of code, no infra, real motivator; no remote leaderboard needed |
| R1.Q6 | Audio | None in v1 | Saves ~1–2 KB, avoids autoplay policies, can be added later without architectural change |
| R1.Q7 | Accessibility | Basic pack (focus + ARIA + aria-live + contrast + silhouette readability) | Small overhead, large inclusivity win, consistent with site standards |
| R1.Q8 | CV-themed bestiary v1 | "Dev daily life": dev character, coffee + tickets (ground), meeting-invite bubble (aerial) | Universally readable, simplest to draw as small inline SVGs, easy to extend later |
| R2.Q1 | Behavior on low-end devices | FPS cap 30, no parallax, no aerial obstacle, halved player animation | Heuristic via hardwareConcurrency / deviceMemory / prefers-reduced-data |
| R2.Q2 | `prefers-reduced-motion` mode | Static scene by default; opt-in discrete-step play | Respects user preference fully without removing the feature |
| R2.Q3 | Offscreen / hidden behavior | Pause (no cancel/destroy), resume from same state | Cheap and predictable; avoids re-init cost |
| R2.Q4 | Bundle squeeze priority | "junior→senior" → aerial obstacle → parallax → HI text → sub-animations | Drop visual polish before mechanics; drop mechanics before core gameplay |
| R2.Q5 | Browser support | Modern evergreen only, ES2020, no polyfills | Matches site audience; keeps bundle minimal |
| R2.Q6 | Delivery | Lazy chunk via dynamic import + idle + IntersectionObserver | Required to hit "no LCP impact" goal |
| R3.Q1 | Runtime deps | Zero new deps | 20 KB budget rules out every general-purpose engine |
| R3.Q2 | Game loop | Hand-rolled rAF with fixed-timestep accumulator | Deterministic physics, simple FPS cap, no library overhead |
| R3.Q3 | Storage | Single localStorage key `cv-mini-game/hi-score` | Simplest possible; try/catch for private mode |
