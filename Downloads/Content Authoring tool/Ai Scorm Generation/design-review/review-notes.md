# Dashboard designer review

Scope: router-discovered home destination only, 1440 x 1000, no arguments.
Application source, styles, router and theme were not edited.

Confirmed findings:

- Gray supporting text has measured 2.60:1 contrast against white in four places.
- The recent-course title is 331px wide inside a 132px ellipsis container and
  provides no full-title disclosure.
- Resume Editing text measures 2.89:1 against its orange button.
- Repeated metric cards are 118px tall versus 134px for the license card.
  Their top edges all align at y=284: this is sizing, not top-edge misalignment.
- Four hand-rolled author avatars render at 26.34375 x 32px. The shared Avatar
  uses shrink-0; this table implementation omits it and becomes oval.
- Four shared Badge instances override semantic styling with raw palette classes.
  This is a low-severity maintainability observation against a provisional
  baseline; green Published and amber Draft meanings are not themselves errors.

Spacing: 89 measured adjacent pairs, 40 on-rhythm, 49 deliberate, zero drifting,
broken or too-tight gaps. Every pair has an individual live-band screenshot.
The suggested compact rhythm is 8 / 16 / 24 / 32px, with a 4px base step.

No confirmed peer radius/shadow mismatch, top-edge misalignment or desktop
horizontal overflow was found. Hero gradients and the separate recent-course
card are intentional different roles. The StatsCard hover shadow uses a literal
rgba value but matches its peers; it is not evidence of a visual inconsistency.
Gradient-backed text is not assigned a fabricated solid-background contrast
ratio; the measurement file lists those checks for visual review.

Limitation: this checkout had neither DESIGN_SYSTEM.md nor a gallery route.
The new DESIGN_SYSTEM.md documents existing tokens/components as provisional.
An approved baseline gallery comparison remains unavailable; no gallery or app
route was added as part of this review-only command.

Verification: see verification.json for source preservation, identity rejection,
crop dimensions, distinct occurrence images, thumbnail aspect ratios, and modal
opening/closing checks. The report was also opened visibly in the Codex browser.
