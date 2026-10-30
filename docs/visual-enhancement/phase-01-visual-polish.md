# Phase 01 — Solfera visual polish

## Existing appearance and audit

The site uses React 18, Vite 5, React Router, Lucide icons, and one stylesheet (`src/styles/index.css`). The current CSS already defines the Solfera wine, ruby, rose, blush, and champagne tokens, plus gradients, shadows, glass cards, and responsive layouts. The repository has no `.git` directory, so Git status and a source diff are unavailable. Existing files were left in place.

Before this phase, the registration page background looked comparatively flat, secondary cards had less depth than the primary artwork frames, and some pill and input borders looked faint. The hero and event sections already had lighting; the refinements below adjust its balance without replacing artwork or moving content.

## Improvements implemented

- Added static ruby and burgundy radial light to the event, about, and registration page backgrounds.
- Added a soft highlight behind the hero title, a subtle shadow on its lettering, and restrained highlights on the hero information pills and official artwork frames.
- Refined the meaning card, timeline items, event information strip, countdown, statistics, values, and CTA cards with low opacity surface reflections and controlled shadows.
- Refined form panel, notice, field, radio choice, and support card surfaces. Input placeholders have stronger contrast; keyboard focus remains visible.
- Balanced button hover, focus, and press shadows using existing Solfera colors.

All changes are in CSS. No section order, dimensions, text, assets, routes, form logic, backend behavior, or countdown logic changed. No packages, DOM nodes, pseudo-elements, blur filters, or automatic animations were added.

## Files and design tokens

- `src/styles/index.css`: Phase 01 scoped styling for the existing components.
- This document, four before screenshots, four after screenshots, `baseline-metrics.json`, and `after-metrics.json` under `docs/visual-enhancement/`.
- Reused `--bg-primary`, `--champagne`, `--border-gold`, `--radius-*`, and existing Solfera color values. No new design tokens were needed.

## Screenshots

| Page | Before | After |
| --- | --- | --- |
| Home, 1440 px | [before-home-1440.png](before-home-1440.png) | [after-home-1440.png](after-home-1440.png) |
| Registration, 1440 px | [before-register-1440.png](before-register-1440.png) | [after-register-1440.png](after-register-1440.png) |
| Home, 390 px | [before-home-390.png](before-home-390.png) | [after-home-390.png](after-home-390.png) |
| Registration, 390 px | [before-register-390.png](before-register-390.png) | [after-register-390.png](after-register-390.png) |

Screenshots were captured in Chrome with reduced motion enabled so pre-existing scroll reveals were visible. Countdown digits naturally differ between captures.

## Responsive and regression results

Browser checks ran on both routes at 320, 375, 390, 430, 768, 1024, and 1440 px. At every width, the document had zero horizontal overflow, no button content was clipped, and the measured section positions, section heights, full page heights, and form field lists matched the baseline. See [baseline-metrics.json](baseline-metrics.json) and [after-metrics.json](after-metrics.json).

At 390 and 1440 px, the hero registration CTA opened `/register`; the navigation link returned to `/#gala`; the countdown seconds updated; radio selection, text input focus, and invalid form feedback worked. No browser page errors were reported. No live registration was submitted. `npm run build` passed. The project has no lint, typecheck, or test script in `package.json`.

## Known limits

- The repository has no Git history, so a Git diff could not be produced.
- Existing automatic motion in the original CSS and components was preserved; Phase 01 did not add motion or address Phase 2 behavior.
