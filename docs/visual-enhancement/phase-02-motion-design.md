# Phase 02 — Solfera motion design

## Audit and approach

The site uses React, Vite, CSS keyframes/transitions, and one existing `IntersectionObserver` hook. It has no animation library. Before this phase, Hero elements entered in sequence, sections used scroll reveals, and the artwork, CTA, and scroll indicator had continuous effects. The artwork float, artwork border/shadow breathing, and CTA glow animated large shadows indefinitely. Scroll-reveal content was hidden by default in CSS, so an observer failure could leave it invisible.

This phase refines the existing CSS and observer rather than adding another motion system. Section positions, dimensions, content, artwork, routes, registration logic, and countdown logic are unchanged.

## Animation inventory

| Family | Elements | Timing and behavior |
| --- | --- | --- |
| Hero entrance | Kicker, title, tagline, description, metadata, CTA, artwork | One time on page entry; 0.5–0.65 s with 0.03–0.28 s delays. Opacity and 10–14 px vertical offsets; artwork uses 0.985 initial scale. The CTA sequence completes in under 0.8 s. |
| Scroll reveal | Event meaning, artwork, schedule, countdown, statistics, About, values, CTA | Existing observer, once per element. Opacity/transform transition: 0.58 s; artwork frame: 0.62 s. Offsets are 12–14 px. Sibling value cards use delays of 0.04–0.16 s. |
| Card arrival | Timeline and statistics cards | One time when the parent reveals; 0.5 s, 8 px offset, up to 0.18 s stagger. |
| Ambient accent | Hero backdrop only | One radial light moves 20 px over a 12 s alternating cycle using opacity and transform. Pointer events are disabled. |
| Interaction feedback | Existing buttons, artwork frames, form controls, radio choices, errors | Existing hover/focus/press transitions remain. Artwork hover scaling is reduced to 1.012 and hover transforms are disabled on touch devices. No form field moves while typing. |

The existing scroll-wheel cue remains on desktop. The continuous artwork float, artwork shadow/border breathing, and CTA shadow pulse were removed. After entrance animations settle, Chrome reports two running decorative animations on desktop: `heroLightDrift` and the existing `mouseScroll` cue.

## Components, files, and dependencies

- `src/styles/index.css`: shorter Hero and reveal timing; one ambient pseudo-element; card arrival; gentler artwork hover; mobile and reduced-motion rules.
- `src/utils/useScrollReveal.js`: arms hidden reveal styles only after `IntersectionObserver` has been created and attached. It cleans up the observer and root class on unmount. If motion is reduced or the observer is unavailable or throws during setup, content remains visible.
- No component markup, assets, content, routes, business logic, backend files, or dependencies changed.

The Hero and registration UI remain usable if an animation does not run: CSS no longer gives Hero entrance elements a permanently hidden base opacity. The registration form has no whole-form entrance that could replay when its status changes; its existing focus, validation, loading, and outcome feedback remain.

## Mobile, accessibility, and performance

At widths up to 640 px, Hero entrance durations are 0.42 s, reveal offsets are 8 px, and both the ambient light and scroll-wheel loop stop. `prefers-reduced-motion: reduce` disables automatic motion and leaves all reveal content visible immediately. With `IntersectionObserver` unavailable, the hook does not arm hidden content. All effects are presentational and do not intercept clicks.

No animation dependency was added. The new continuous ambient effect animates only opacity and transform on a small decorative layer. The previous large shadow animations were removed. Production CSS increased from 11.66 to 11.80 kB gzip; the reveal hook chunk changed from 0.37 to 0.40 kB gzip. These are bundle measurements, not field performance scores.

## Evidence and regression checks

- [Hero at 1440 px](phase-02-hero-1440.png), [Hero at 390 px](phase-02-hero-390.png), and [event reveal at 1440 px](phase-02-event-reveal-1440.png). Earlier reduced-motion screenshots are in [Phase 01](phase-01-visual-polish.md).
- Browser checks covered both routes at 320, 375, 390, 430, 768, 1024, and 1440 px, with motion enabled and reduced: 28 combinations. Full page heights, section geometry, and form field lists matched the Phase 01 baseline. There was no horizontal overflow or clipped button content.
- At 390 and 1440 px in both motion modes, the countdown changed by one second; Hero CTA, mobile/desktop navbar anchors, phone and email links, keyboard focus, radio selection, and invalid-form feedback worked. A mocked API response confirmed the success state and a mocked status error recovered through Retry. No production registration was submitted. No browser page errors were reported.
- Normal desktop activated the ambient animation and observer; normal mobile stopped the ambient animation; reduced motion disabled the Hero and ambient animations and did not arm hidden reveals. With `IntersectionObserver` unavailable, offscreen content remained visible.
- `npm run build` passed. `package.json` provides no lint, typecheck, or test script.

## Known limits

- The site is a React client-side application, so it does not render page content with all JavaScript disabled. The reveal system itself remains fail-safe when the observer is missing or its setup fails.
- A video recording was attempted, but this environment lacks Playwright's FFmpeg executable. The screenshots above were captured successfully.
- No field Core Web Vitals score was measured. Browser geometry and animation inventory provide the available local performance evidence.
