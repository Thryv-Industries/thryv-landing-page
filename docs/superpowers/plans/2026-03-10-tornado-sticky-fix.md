# Tornado Sticky Fix Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix `position: sticky` on the desktop tornado section so it pins correctly while scrolling, and clean up the RAF loop so it stops consuming CPU when idle.

**Architecture:** Two-file change. `globals.css` drops the body/html `overflow-x: clip` that forces `<html>` into a non-scrolling clipped container — the root cause of sticky failing. `TornadoFeatures.tsx` gets three small RAF loop fixes: precomputed height, rescued early return, and a convergence threshold. Mobile carousel is untouched.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-10-tornado-sticky-fix-design.md`

---

## Chunk 1: CSS Root Cause Fix

### Task 1: Remove `overflow-x: clip` from `html` and `body`

**Files:**
- Modify: `src/app/globals.css:35-44`

**Background:** CSS axis-consistency rule forces `overflow-y` to also be computed as `clip` when `overflow-x: clip` is set on the same element. This makes `<html>` a non-scrolling clipped container. `position: sticky` has no valid scroll container to anchor to, so it silently fails on all browsers. Removing this from `html`/`body` restores the default viewport as the scroll container. Individual sections that need horizontal clipping (Hero already has `overflow-hidden` on its section element) are unaffected.

- [ ] **Step 1: Remove the two `overflow-x: clip` rules from globals.css**

Open `src/app/globals.css`. Find these two blocks and delete the `overflow-x: clip` lines:

```css
/* BEFORE */
html {
  overflow-x: clip;
}

body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-body), system-ui, sans-serif;
  overflow-x: clip;
}
```

```css
/* AFTER */
html {
  /* overflow-x: clip removed — was making <html> a non-scrolling container,
     breaking position: sticky on all descendants */
}

body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-body), system-ui, sans-serif;
}
```

Note: the empty `html {}` block can be removed entirely if there are no other rules inside it. Check the file — if the block is empty after removing the line, delete the whole block.

- [ ] **Step 2: Run the dev server and verify no horizontal scrollbar appears**

```bash
npm run dev
```

Open `http://localhost:3000` in a desktop browser (≥ 768px wide viewport). Check:
- No horizontal scrollbar on the page
- Scroll through all sections — confirm no elements bleed beyond viewport width
- The Hero section's floating stat cards should still be clipped correctly (Hero has its own `overflow-hidden`)

If a horizontal scrollbar appears on a specific section, that section needs its own `overflow-x: hidden` on its section element (do not re-add to body/html).

- [ ] **Step 3: Verify sticky is now working**

Still on `http://localhost:3000`, scroll down to the Features section. The inner card carousel should now stay pinned to the viewport as you scroll through 500vh of the section (the effective pinned scroll distance is ~400vh — 500vh section minus 100vh viewport), then release and continue scrolling normally.

Expected: cards rotate in 3D as you scroll, stuck in place until you've scrolled through all 6 features.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: remove overflow-x clip from html/body to restore position sticky"
```

---

## Chunk 2: RAF Loop Fixes

### Task 2: Precompute `sectionHeight` outside the tight loop

**Files:**
- Modify: `src/components/TornadoFeatures.tsx:108-146`

**Background:** `section.offsetHeight` inside `tick()` is read on every animation frame, forcing a browser layout recalculation each frame (layout thrash). Store it in a ref once when the scroll listener attaches and read the ref in `tick()`.

- [ ] **Step 1: Add a `sectionHeightRef` and populate it in the effect**

Find the `useEffect` in `TornadoFeatures.tsx` (line ~108). Add a ref and compute the height once before the tick loop starts:

```tsx
// At the top of the component, alongside other refs:
const sectionHeightRef = useRef(0);
```

Inside the `useEffect`, after the `if (window.matchMedia(...).matches) return;` guard and before `let running = true;`, add:

```tsx
sectionHeightRef.current = section.offsetHeight - window.innerHeight;
```

- [ ] **Step 2: Update `tick()` to read from the ref instead**

Inside `tick()`, replace:

```tsx
const sectionHeight = section.offsetHeight - window.innerHeight;
if (sectionHeight <= 0) return;
```

With:

```tsx
const sectionHeight = sectionHeightRef.current;
if (sectionHeight <= 0) {
  rafRef.current = requestAnimationFrame(tick);
  return;
}
```

This also fixes the dead-loop bug: previously the early return killed the RAF loop permanently if height was zero during hydration. Now it reschedules and tries again on the next frame.

- [ ] **Step 3: Verify dev server still works**

```bash
npm run dev
```

Open `http://localhost:3000` on desktop. Scroll through the Features section. Tornado should behave identically to before (or better — no layout thrash). No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/TornadoFeatures.tsx
git commit -m "perf: precompute sectionHeight ref to avoid layout thrash in RAF loop"
```

---

### Task 3: Add convergence threshold to stop the RAF loop when idle

**Files:**
- Modify: `src/components/TornadoFeatures.tsx` (inside `tick()`)

**Background:** The lerp `currentThetaRef.current += (target - current) * 0.08` asymptotically approaches the target but never reaches it exactly. Without a stopping condition, the RAF loop runs indefinitely even when the user is not scrolling, wasting CPU. A threshold of `0.001` radians (≈ 0.057°) is imperceptible. When the delta is below this, snap to target and return without rescheduling — the next scroll event (via `handleScroll`) will restart the loop.

- [ ] **Step 1: Replace the lerp + unconditional reschedule with a threshold check**

Inside `tick()`, find:

```tsx
const targetTheta = progress * Math.PI * 2;

currentThetaRef.current += (targetTheta - currentThetaRef.current) * 0.08;
updateCards(currentThetaRef.current);

rafRef.current = requestAnimationFrame(tick);
```

Replace with:

```tsx
const targetTheta = progress * Math.PI * 2;
const diff = targetTheta - currentThetaRef.current;

if (Math.abs(diff) < 0.001) {
  // Snapped — animation settled. Stop the loop; next scroll event will restart it.
  currentThetaRef.current = targetTheta;
  updateCards(currentThetaRef.current);
  return;
}

currentThetaRef.current += diff * 0.08;
updateCards(currentThetaRef.current);

rafRef.current = requestAnimationFrame(tick);
```

- [ ] **Step 2: Verify smooth animation with no perceptible snap**

```bash
npm run dev
```

Open `http://localhost:3000` on desktop. Scroll slowly through the Features section:
- Cards should rotate smoothly with slight easing lag (the lerp)
- After stopping mid-scroll, cards should settle to their final position quickly (within ~10 frames) without any visible snap
- After fully scrolling through the section, the loop should be idle (you can confirm in Chrome DevTools → Performance → check that there's no continuous rAF activity when not scrolling)

- [ ] **Step 3: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: no errors, clean build.

- [ ] **Step 4: Final commit**

```bash
git add src/components/TornadoFeatures.tsx
git commit -m "perf: add convergence threshold to stop RAF loop when tornado animation settles"
```

---

## Verification Checklist

After all tasks are complete, verify these end-to-end:

- [ ] **Desktop (≥ 768px):** Scrolling into Features section — inner content pins to viewport
- [ ] **Desktop:** Scrolling through Features section — all 6 feature cards rotate through (full 2π spin across ~400vh of scroll)
- [ ] **Desktop:** Scrolling past Features section — content unpins and normal scroll resumes
- [ ] **Desktop:** Left panel text updates to match the frontmost card
- [ ] **Desktop:** Progress dots at bottom of left panel update as cards rotate
- [ ] **Mobile (< 768px):** Horizontal swipe carousel works, no sticky behaviour
- [ ] **Mobile:** All 6 feature cards visible by swiping
- [ ] **No horizontal scrollbar** on any viewport width
- [ ] **`npm run build` passes** with no errors
