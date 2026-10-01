# Design review baseline

Status: provisional, extracted from this checkout's existing shared components and
`src/styles/theme.css`. This documents existing code; it is not an approved visual
specification. There is currently no component gallery route in the router.
Reports must disclose that gallery comparison is unavailable, and must not claim
full baseline conformance until an approved gallery exists.

## Tokens and shared components

- Read palette values from `src/styles/theme.css`, including `--primary`,
  `--foreground`, `--muted-foreground`, `--card`, `--border`, and `--destructive`.
- Shared buttons: `src/app/components/ui/button.tsx`. Default/small/large heights
  are 36/32/40px; icon buttons are 36px square. Use named variants and sizes.
- Shared cards: `src/app/components/ui/card.tsx`. Use `bg-card`,
  `text-card-foreground`, `rounded-xl`, border, 24px section padding/gaps.
- Base radius is 10px. Named radii: small 6px, medium 8px, large 10px,
  extra-large 14px. Compare repeated peers first; hero treatments can differ.
- Shared badges: `src/app/components/ui/badge.tsx`. Review palette overrides
  separately from documented variants; do not infer approved success/warning
  tokens from arbitrary Tailwind color names.
- `StatsCard` is the current Dashboard metric-card reference. Compare its peers
  by role and rendered shape even if their DOM structures differ.

## Review rules

Hardcoded colors and shared-component overrides are maintainability findings.
Do not equate every color outside semantic tokens with a confirmed visual defect:
decorative gradients and intentional status colors require human judgment.
Destructive/error colors belong to destructive/error actions, not neutral data.
Compare radius, shadow, badge size, button size and row alignment among peers.
Report misaligned top edges as `layout-breaking`, separately from spacing.
Flag clipped text and overflow; distinguish intentional scroll containers and
decorative overflow from broken layouts. Intentional ellipsis still needs access
to the full meaningful label. Do not flag disabled controls for low contrast.

## Spacing

Base spacing unit: 4px. Proposed compact rhythm: **tight 8 / related 16 /
section 24 / region 32px**. It is a recommendation, not a retroactive requirement.
4px multiples can be on-rhythm outside that compact set. Explicit 2px micro-gaps,
inline text flow, centered and distributed layouts can be deliberate.
Measure visible adjacent siblings in each layout group in both axes, including
adjacent wrapped rows. Skip decorative absolute layers and SVG internals.
Negative gaps are broken only when the elements actually intersect; 0px touching
table cells or inline runs can be deliberate. Nonzero gaps below 4px need context.
Save every measured pair, including correct gaps; never invent drifting gaps.

## Contrast and evidence

Use 4.5:1 for normal text and 3:1 for large text as the review thresholds.
Calculate effective solid backgrounds; mark gradients/transparency that cannot
be resolved as manual review, not a fabricated contrast failure.
Each occurrence needs its own measured live-page box/band and tight screenshot.
Keep full-page fallback rare and explain why the target cannot be located.
Source-only findings must be mapped back to rendered elements where possible.
