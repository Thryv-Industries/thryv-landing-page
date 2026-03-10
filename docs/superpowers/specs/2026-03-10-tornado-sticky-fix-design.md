# Design: Tornado Features Sticky Fix

**Date:** 2026-03-10
**Status:** Approved
**Scope:** Fix desktop tornado sticky scroll + mobile/desktop coexistence

---

## Problem

On desktop (≥ 768px), the `TornadoFeatures` section uses `position: sticky` to pin a
3D tornado card carousel while the user scrolls through 500vh of section height. The
sticky behaviour is completely broken — the section scrolls normally instead of staying
pinned. This occurs on all browsers (Chrome, Firefox, Safari).

The mobile implementation (horizontal snap carousel) works correctly and is unrelated to
the bug.

---

## Root Cause

### Primary: `overflow-x: clip` on `<html>` and `<body>`

CSS disallows one overflow axis being `visible` while the other is non-`visible` on the
same element. When `globals.css` sets `overflow-x: clip` on `html`, browsers compute
`overflow-y` as `clip` too (axis consistency rule). This makes `<html>` a non-scrolling,
clipped container.

`position: sticky` works by anchoring to the nearest scrolling ancestor. With `<html>`
clipped rather than scrolling, sticky elements inside have no valid scroll container and
silently fail on all browsers.

The sticky element's ancestor chain is:
```
sticky div → TornadoFeatures section → main → body → html (clipped — root cause)
```

### Secondary: RAF loop defects

Three bugs in the scroll animation logic degrade the animation quality once sticky works:

1. **Dead loop on zero height** — `tick()` returns early when `sectionHeight <= 0`
   without rescheduling `requestAnimationFrame`. If this fires during hydration, the loop
   dies permanently until the next scroll event.

2. **Runaway RAF loop** — the loop runs continuously via `requestAnimationFrame(tick)`
   even after the lerp has converged. Wastes CPU; creates a subtle "keeps running after
   you stop" feel.

3. **Layout thrash** — `section.offsetHeight` is read on every RAF frame inside `tick()`,
   forcing a layout recalculation each frame.

---

## Design

### Change 1 — `globals.css`: Remove body/html overflow-x

Remove `overflow-x: clip` from both `html` and `body`. No body-level replacement is
needed:

- The TornadoFeatures sticky container already has `overflow: hidden`, which clips tornado
  cards to the viewport bounds.
- Sibling sections that have elements extending beyond the viewport (e.g. Hero) already
  apply `overflow-hidden` on their own section elements — these are siblings, not
  ancestors of the sticky element, so they don't interfere with sticky.

**Before:**
```css
html { overflow-x: clip; }
body { overflow-x: clip; }
```

**After:**
```css
/* removed — was making <html> a non-scrolling container, breaking position: sticky */
```

### Change 2 — `TornadoFeatures.tsx`: Fix RAF loop

**Fix 1 — reschedule on early return:**
```ts
// Before
if (sectionHeight <= 0) return;

// After
if (sectionHeight <= 0) {
  rafRef.current = requestAnimationFrame(tick);
  return;
}
```

**Fix 2 — convergence threshold (stop runaway RAF):**
```ts
const diff = targetTheta - currentThetaRef.current;
if (Math.abs(diff) < 0.001) {
  currentThetaRef.current = targetTheta;
  updateCards(currentThetaRef.current);
  return; // settled — next scroll event will restart the loop
}
currentThetaRef.current += diff * 0.08;
```

**Fix 3 — precompute sectionHeight:**
```ts
// Compute once when scroll listener attaches, store in a ref
const sectionHeightRef = useRef(0);
// ...inside useEffect, before attaching listener:
sectionHeightRef.current = section.offsetHeight - window.innerHeight;
// ...inside tick(), read from ref instead of calling offsetHeight each frame
```

### Change 3 — Mobile carousel: no changes

The mobile carousel (`block md:hidden`) and desktop tornado (`hidden md:block`) are fully
independent. Tailwind responsive prefixes ensure only one renders visibly at a time. The
mobile path is unaffected by all changes above.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/globals.css` | Remove `overflow-x: clip` from `html` and `body` |
| `src/components/TornadoFeatures.tsx` | Fix 3 RAF loop bugs |

---

## Success Criteria

- Desktop (≥ 768px): scrolling through the TornadoFeatures section keeps the tornado
  pinned for the full 500vh — cards rotate through all 6 features before the section
  exits the viewport.
- Mobile (< 768px): horizontal snap carousel works exactly as before.
- No horizontal scrollbar introduced on any section.
- RAF loop stops running when the user is not scrolling (no continuous background work).
